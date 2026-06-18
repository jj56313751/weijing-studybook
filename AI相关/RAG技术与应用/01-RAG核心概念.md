# RAG 核心概念

## 什么是 RAG

**RAG（Retrieval-Augmented Generation，检索增强生成）** 在生成回答前，先从外部知识库检索相关文档，再把检索结果作为上下文交给大模型生成答案。

```
用户问题
   │
   ▼
Query 改写（可选）──────► 更独立、更利于检索的 query
   │
   ▼
Embedding 编码 query
   │
   ▼
向量检索（FAISS 等）────► Top-K 相关文档块
   │
   ▼
拼接 Prompt（上下文 + 问题）
   │
   ▼
LLM 生成回答
```

## 为什么需要 RAG

| 问题 | RAG 如何解决 |
|------|-------------|
| 知识截止 | 接入可更新的私有/领域文档 |
| 幻觉 | 回答基于检索到的原文上下文 |
| 领域专业性 | 注入企业文档、手册、论文等 |
| 可追溯 | 可标注来源页码、文档片段 |

## RAG 关键环节

### 1. 文档加载与解析

- PDF：`pypdf.PdfReader` 按页提取文本
- 需记录字符与页码的映射，便于回答时引用来源

### 2. 文本分块（Chunking）

```python
RecursiveCharacterTextSplitter(
    separators=["\n\n", "\n", ".", " ", ""],
    chunk_size=1000,      # 每块最大字符数
    chunk_overlap=200,    # 块间重叠，避免语义被截断
)
```

- `chunk_size` 过大：检索粒度粗，噪声多
- `chunk_size` 过小：上下文不完整
- `chunk_overlap`：相邻块共享部分内容，减少边界信息丢失

### 3. Embedding 向量化

将文本块编码为固定维度的稠密向量，常见模型：

| 模型 | 特点 |
|------|------|
| BGE-M3 | 支持稠密检索、词法匹配、多向量交互；中英文表现好 |
| GTE-Qwen2 | 基于 Qwen2 的指令式 Embedding；query 需加 prompt |

相似度常用点积或余弦相似度（L2 归一化后点积等价于余弦）。

### 4. 向量存储与检索

- **FAISS**：Facebook 开源的向量相似度搜索库，适合本地原型
- 流程：`FAISS.from_texts(chunks, embeddings)` 建库 → `similarity_search(query, k=10)` 检索
- 可 `save_local` / `load_local` 持久化，避免重复 Embedding

### 5. 生成（Generation）

将检索到的文档块拼成 context，构造 Prompt：

```
根据以下上下文回答问题:

{context}

问题: {query}
```

交给 LLM（如通义千问、DeepSeek）生成最终答案。

## Query 改写

用户真实提问往往不适合直接做向量检索，常见类型：

| 类型 | 示例 | 改写目标 |
|------|------|----------|
| 上下文依赖 | 「还有其他设施吗？」 | 补全主题，变成独立问句 |
| 对比型 | 「哪个更好玩？」 | 明确比较对象 |
| 模糊指代 | 「都什么时候开始？」 | 替换「都」为具体实体 |
| 多意图 | 「门票多少钱？需要预约吗？」 | 拆成多个子问题 |
| 反问型 | 「这不会也要排队吧？」 | 转为客观检索问句 |
| 需联网 | 「今天开放吗？」 | 识别时效性，改写为搜索词 |

## 实践案例对应关系

| 案例 | 技术栈 | 目录 |
|------|--------|------|
| BGE-M3 / GTE-Qwen2 | FlagEmbedding、SentenceTransformer | `embedding模型/` |
| ChatPDF | pypdf + LangChain + FAISS + 通义 | `ChatPDF-Faiss/` |
| Query 改写 | dashscope + Prompt 工程 | `Query改写/` |

## 常见问题

**Q：向量库能否多个 PDF 共用一个目录？**

不能。索引与页码映射绑定具体文档，换 PDF 必须重新建库。

**Q：Embedding 模型和检索时的模型要一致吗？**

要一致。建库与查询必须使用同一 Embedding 模型，否则向量空间不匹配。

**Q：k 值怎么选？**

k 越大召回越多，但 context 更长、成本更高；一般 5~10，按文档长度和任务调整。
