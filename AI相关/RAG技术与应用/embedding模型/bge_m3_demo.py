#!/usr/bin/env python
# coding: utf-8
"""
BGE-M3 Embedding 示例

BGE-M3 支持稠密检索、词法匹配与多向量交互，适合中英文 RAG 场景。
首次运行会从 ModelScope 下载模型，体积较大，请耐心等待。
"""

import os

from FlagEmbedding import BGEM3FlagModel
from modelscope import snapshot_download

# 模型缓存目录，可通过环境变量 BGE_M3_CACHE_DIR 自定义
_cache_dir = os.environ.get(
    "BGE_M3_CACHE_DIR",
    os.path.join(os.path.expanduser("~"), ".cache", "bge-m3-models"),
)
model_dir = snapshot_download("BAAI/bge-m3", cache_dir=_cache_dir)

model = BGEM3FlagModel(model_dir, use_fp16=True)

sentences_1 = ["What is BGE M3?", "Defination of BM25"]
sentences_2 = [
    "BGE M3 is an embedding model supporting dense retrieval, lexical matching and multi-vector interaction.",
    "BM25 is a bag-of-words retrieval function that ranks a set of documents based on the query terms appearing in each document",
]

# dense_vecs 为稠密向量，用于常规语义检索
embeddings_1 = model.encode(
    sentences_1,
    batch_size=12,
    max_length=8192,
)["dense_vecs"]
embeddings_2 = model.encode(sentences_2)["dense_vecs"]

# 矩阵乘法计算 query-document 相似度
similarity = embeddings_1 @ embeddings_2.T
print("相似度矩阵:")
print(similarity)
# 预期输出近似:
# [[0.6265, 0.3477], [0.3499, 0.678 ]]
