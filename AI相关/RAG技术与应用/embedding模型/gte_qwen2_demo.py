#!/usr/bin/env python
# coding: utf-8
"""
GTE-Qwen2 Embedding 示例

演示两种用法：
1. SentenceTransformer 封装（推荐，代码简洁）
2. 底层 AutoModel + last_token_pool（理解原理）

GTE-Qwen2 为指令式模型：query 编码时需加 prompt，document 不需要。
"""

from pathlib import Path

import torch
import torch.nn.functional as F
from modelscope import AutoModel, AutoTokenizer, snapshot_download
from sentence_transformers import SentenceTransformer
from torch import Tensor

MODELSCOPE_CACHE = Path.home() / ".cache" / "modelscope"
model_dir = snapshot_download(
    "iic/gte_Qwen2-1.5B-instruct", cache_dir=str(MODELSCOPE_CACHE)
)

queries = [
    "how much protein should a female eat",
    "summit define",
]
documents = [
    "As a general guideline, the CDC's average requirement of protein for women ages 19 to 70 is 46 grams per day. But, as you can see from this chart, you'll need to increase that if you're expecting or training for a marathon. Check out the chart below to see how much protein you should be eating each day.",
    "Definition of summit for English Language Learners. : 1  the highest point of a mountain : the top of a mountain. : 2  the highest level. : 3  a meeting or series of meetings between the leaders of two or more governments.",
]


def demo_sentence_transformer():
    """方式一：SentenceTransformer 高层 API"""
    print("=== SentenceTransformer 方式 ===")
    model = SentenceTransformer(model_dir, trust_remote_code=True)
    model.max_seq_length = 8192

    # query 使用 prompt_name="query"，document 不加 prompt
    query_embeddings = model.encode(queries, prompt_name="query")
    document_embeddings = model.encode(documents)

    scores = (query_embeddings @ document_embeddings.T) * 100
    print(scores.tolist())
    print()


def last_token_pool(last_hidden_states: Tensor, attention_mask: Tensor) -> Tensor:
    """从最后隐藏状态中提取每个序列最后一个有效 token 的表示"""
    left_padding = attention_mask[:, -1].sum() == attention_mask.shape[0]
    if left_padding:
        return last_hidden_states[:, -1]
    sequence_lengths = attention_mask.sum(dim=1) - 1
    batch_size = last_hidden_states.shape[0]
    return last_hidden_states[
        torch.arange(batch_size, device=last_hidden_states.device), sequence_lengths
    ]


def get_detailed_instruct(task_description: str, query: str) -> str:
    """将任务描述与 query 组合为指令格式"""
    return f"Instruct: {task_description}\nQuery: {query}"


def demo_auto_model():
    """方式二：AutoModel 底层实现，便于自定义池化与归一化"""
    print("=== AutoModel 底层方式 ===")
    task = "Given a web search query, retrieve relevant passages that answer the query"
    instruct_queries = [
        get_detailed_instruct(task, q) for q in queries
    ]
    input_texts = instruct_queries + documents

    tokenizer = AutoTokenizer.from_pretrained(model_dir, trust_remote_code=True)
    model = AutoModel.from_pretrained(model_dir, trust_remote_code=True)

    batch_dict = tokenizer(
        input_texts, max_length=8192, padding=True, truncation=True, return_tensors="pt"
    )
    outputs = model(**batch_dict)
    embeddings = last_token_pool(outputs.last_hidden_state, batch_dict["attention_mask"])
    embeddings = F.normalize(embeddings, p=2, dim=1)

    scores = (embeddings[:2] @ embeddings[2:].T) * 100
    print(scores.tolist())
    print()


if __name__ == "__main__":
    demo_sentence_transformer()
    demo_auto_model()
