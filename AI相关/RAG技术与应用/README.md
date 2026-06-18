# RAG 技术与应用

> 学习来源：知乎 AI 大模型应用开发 · 第 8 章

## 目录结构

```
RAG技术与应用/
├── README.md                 # 本文件：总览与索引
├── 01-RAG核心概念.md          # 概念与流程笔记
├── embedding模型/             # Embedding 实践
├── ChatPDF-Faiss/            # PDF + FAISS + LLM 问答
└── Query改写/                # Query 改写与联网搜索识别
```

## 学习路线

| 阶段 | 内容 | 对应目录 |
|------|------|----------|
| 1 | 理解 RAG 原理与典型流程 | `01-RAG核心概念.md` |
| 2 | 掌握 Embedding 模型与相似度计算 | `embedding模型/` |
| 3 | 搭建 PDF 知识库问答（FAISS + LLM） | `ChatPDF-Faiss/` |
| 4 | Query 改写提升检索质量 | `Query改写/` |

## 环境准备

```bash
# Embedding 示例
cd embedding模型 && pip install -r requirements.txt

# ChatPDF 示例（需配置 DASHSCOPE_API_KEY）
cd ChatPDF-Faiss && pip install -r requirements.txt

# Query 改写示例（需配置 DASHSCOPE_API_KEY）
cd Query改写 && pip install -r requirements.txt
```

```bash
export DASHSCOPE_API_KEY="你的阿里云百炼 API Key"
```

## 核心知识点速览

1. **RAG**：检索增强生成，用外部知识库弥补 LLM 知识截止与幻觉问题。
2. **Embedding**：将文本映射为稠密向量，语义相近的文本向量距离更近。
3. **向量检索**：FAISS 等库对向量建索引，按相似度召回 Top-K 文档块。
4. **文本分块**：长文档需 `chunk_size` + `chunk_overlap` 切分，平衡上下文与检索粒度。
5. **Query 改写**：多轮对话、指代消解、多意图拆分等，让检索 query 更独立、更明确。

## 学习日期

- 2026-06-15：整理笔记与代码示例
