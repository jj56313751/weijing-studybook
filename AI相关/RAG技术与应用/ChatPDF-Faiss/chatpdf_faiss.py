#!/usr/bin/env python
# coding: utf-8
"""
ChatPDF + FAISS 示例

完整 RAG 流程：PDF 解析 -> 分块 -> Embedding -> FAISS 检索 -> LLM 问答

使用前：
1. pip install -r requirements.txt
2. export DASHSCOPE_API_KEY="你的 API Key"
3. 将 PDF 放到与本脚本相同目录，或修改 PDF_FILENAME
"""

import os
import pickle
from typing import List, Tuple

from langchain_community.embeddings import DashScopeEmbeddings
from langchain_community.llms import Tongyi
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader

DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY")
if not DASHSCOPE_API_KEY:
    raise ValueError("请设置环境变量 DASHSCOPE_API_KEY")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_FILENAME = "sample.pdf"  # 替换为你的 PDF 文件名
PDF_PATH = os.path.join(SCRIPT_DIR, PDF_FILENAME)
VECTOR_DB_DIR = os.path.join(SCRIPT_DIR, "vector_db")


def extract_text_with_page_numbers(pdf) -> Tuple[str, List[int]]:
    """从 PDF 提取文本，并记录每个字符对应的页码"""
    text = ""
    char_page_mapping = []

    for page_number, page in enumerate(pdf.pages, start=1):
        extracted_text = page.extract_text()
        if extracted_text:
            text += extracted_text
            char_page_mapping.extend([page_number] * len(extracted_text))
        else:
            print(f"第 {page_number} 页未提取到文本")

    return text, char_page_mapping


def build_page_info(chunks: List[str], char_page_mapping: List[int]) -> dict:
    """为每个文本块计算来源页码（取块内出现最多的页码）"""
    page_info = {}
    current_pos = 0

    for chunk in chunks:
        chunk_start = current_pos
        chunk_end = current_pos + len(chunk)
        chunk_pages = char_page_mapping[chunk_start:chunk_end]

        if chunk_pages:
            page_counts = {}
            for page in chunk_pages:
                page_counts[page] = page_counts.get(page, 0) + 1
            page_info[chunk] = max(page_counts, key=page_counts.get)
        else:
            page_info[chunk] = 1

        current_pos = chunk_end

    return page_info


def process_text_with_splitter(
    text: str, char_page_mapping: List[int], save_path: str = None
) -> FAISS:
    """文本分块、向量化并构建 FAISS 知识库"""
    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", ".", " ", ""],
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )

    chunks = text_splitter.split_text(text)
    print(f"文本被分割成 {len(chunks)} 个块")

    embeddings = DashScopeEmbeddings(
        model="text-embedding-v1",
        dashscope_api_key=DASHSCOPE_API_KEY,
    )

    knowledge_base = FAISS.from_texts(chunks, embeddings)
    knowledge_base.page_info = build_page_info(chunks, char_page_mapping)
    print(f"页码映射完成，共 {len(knowledge_base.page_info)} 个文本块")

    if save_path:
        os.makedirs(save_path, exist_ok=True)
        knowledge_base.save_local(save_path)
        with open(os.path.join(save_path, "page_info.pkl"), "wb") as f:
            pickle.dump(knowledge_base.page_info, f)
        print(f"向量库已保存到: {save_path}")

    return knowledge_base


def load_knowledge_base(load_path: str, embeddings=None) -> FAISS:
    """从磁盘加载 FAISS 向量库及页码映射"""
    if embeddings is None:
        embeddings = DashScopeEmbeddings(
            model="text-embedding-v1",
            dashscope_api_key=DASHSCOPE_API_KEY,
        )

    knowledge_base = FAISS.load_local(
        load_path, embeddings, allow_dangerous_deserialization=True
    )

    page_info_path = os.path.join(load_path, "page_info.pkl")
    if os.path.exists(page_info_path):
        with open(page_info_path, "rb") as f:
            knowledge_base.page_info = pickle.load(f)

    return knowledge_base


def ask(knowledge_base: FAISS, query: str, k: int = 10):
    """检索 + LLM 问答，并打印来源页码"""
    docs = knowledge_base.similarity_search(query, k=k)
    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""根据以下上下文回答问题:

{context}

问题: {query}"""

    llm = Tongyi(model_name="deepseek-v3", dashscope_api_key=DASHSCOPE_API_KEY)
    response = llm.invoke(prompt)
    print(response)
    print("\n来源页码:")

    unique_pages = set()
    for doc in docs:
        text_content = getattr(doc, "page_content", "")
        source_page = knowledge_base.page_info.get(text_content.strip(), "未知")
        if source_page not in unique_pages:
            unique_pages.add(source_page)
            print(f"  第 {source_page} 页")


def main():
    if not os.path.isfile(PDF_PATH):
        raise FileNotFoundError(
            f"未找到 PDF: {PDF_PATH}\n"
            "请将 PDF 放到 ChatPDF-Faiss 目录，或修改 PDF_FILENAME"
        )

    pdf_reader = PdfReader(PDF_PATH)
    text, char_page_mapping = extract_text_with_page_numbers(pdf_reader)
    print(f"提取文本长度: {len(text)} 字符")

    knowledge_base = process_text_with_splitter(
        text, char_page_mapping, save_path=VECTOR_DB_DIR
    )

    # 修改为你的实际问题
    query = "请根据文档内容回答一个相关问题"
    ask(knowledge_base, query)


if __name__ == "__main__":
    main()
