#!/usr/bin/env python
# coding: utf-8
"""
Query 改写示例

覆盖五类常见需改写的 query：
- 上下文依赖型
- 对比型
- 模糊指代型
- 多意图型
- 反问型

使用前：export DASHSCOPE_API_KEY="你的 API Key"
"""

import json
import os

import dashscope

dashscope.api_key = os.getenv("DASHSCOPE_API_KEY")
if not dashscope.api_key:
    raise ValueError("请设置环境变量 DASHSCOPE_API_KEY")


def get_completion(prompt, model="qwen-turbo-latest"):
    """调用通义千问生成文本"""
    messages = [{"role": "user", "content": prompt}]
    response = dashscope.Generation.call(
        model=model,
        messages=messages,
        result_format="message",
        temperature=0,
    )
    return response.output.choices[0].message.content


class QueryRewriter:
    """Query 改写器，按类型选择不同 Prompt 策略"""

    def __init__(self, model="qwen-turbo-latest"):
        self.model = model

    def rewrite_context_dependent_query(self, current_query, conversation_history):
        """上下文依赖型：将省略上下文的追问改写为完整独立问句"""
        instruction = """
你是一个智能的查询优化助手。请分析用户的当前问题以及前序对话历史，判断当前问题是否依赖于上下文。
如果依赖，请将当前问题改写成一个独立的、包含所有必要上下文信息的完整问题。
如果不依赖，直接返回原问题。
"""
        prompt = f"""
### 指令 ###
{instruction}

### 对话历史 ###
{conversation_history}

### 当前问题 ###
{current_query}

### 改写后的问题 ###
"""
        return get_completion(prompt, self.model)

    def rewrite_comparative_query(self, query, context_info):
        """对比型：明确比较对象，生成适合检索的对比 query"""
        instruction = """
你是一个查询分析专家。请分析用户的输入和相关的对话上下文，识别出问题中需要进行比较的多个对象。
然后，将原始问题改写成一个更明确、更适合在知识库中检索的对比性查询。
"""
        prompt = f"""
### 指令 ###
{instruction}

### 对话历史/上下文信息 ###
{context_info}

### 原始问题 ###
{query}

### 改写后的查询 ###
"""
        return get_completion(prompt, self.model)

    def rewrite_ambiguous_reference_query(self, current_query, conversation_history):
        """模糊指代型：消解「它」「都」「这个」等指代"""
        instruction = """
你是一个消除语言歧义的专家。请分析用户的当前问题和对话历史，找出问题中 "都"、"它"、"这个" 等模糊指代词具体指向的对象。
然后，将这些指代词替换为明确的对象名称，生成一个清晰、无歧义的新问题。
"""
        prompt = f"""
### 指令 ###
{instruction}

### 对话历史 ###
{conversation_history}

### 当前问题 ###
{current_query}

### 改写后的问题 ###
"""
        return get_completion(prompt, self.model)

    def rewrite_multi_intent_query(self, query):
        """多意图型：将复合问题拆分为 JSON 数组"""
        instruction = """
你是一个任务分解机器人。请将用户的复杂问题分解成多个独立的、可以单独回答的简单问题。以JSON数组格式输出。
"""
        prompt = f"""
### 指令 ###
{instruction}

### 原始问题 ###
{query}

### 分解后的问题列表 ###
请以JSON数组格式输出，例如：["问题1", "问题2", "问题3"]
"""
        response = get_completion(prompt, self.model)
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return [response]

    def rewrite_rhetorical_query(self, current_query, conversation_history):
        """反问型：提取真实意图，转为客观检索问句"""
        instruction = """
你是一个沟通理解大师。请分析用户的反问或带有情绪的陈述，识别其背后真实的意图和问题。
然后，将这个反问改写成一个中立、客观、可以直接用于知识库检索的问题。
"""
        prompt = f"""
### 指令 ###
{instruction}

### 对话历史 ###
{conversation_history}

### 当前问题 ###
{current_query}

### 改写后的问题 ###
"""
        return get_completion(prompt, self.model)

    def auto_rewrite_query(self, query, conversation_history="", context_info=""):
        """自动识别 query 类型并返回 JSON 结果"""
        instruction = """
你是一个智能的查询分析专家。请分析用户的查询，识别其属于以下哪种类型：
1. 上下文依赖型 - 包含"还有"、"其他"等需要上下文理解的词汇
2. 对比型 - 包含"哪个"、"比较"、"更"等比较词汇
3. 模糊指代型 - 包含"它"、"他们"、"都"、"这个"等指代词
4. 多意图型 - 包含多个独立问题
5. 反问型 - 包含"不会"、"难道"等反问语气

请返回JSON格式：
{
    "query_type": "查询类型",
    "rewritten_query": "改写后的查询",
    "confidence": "置信度(0-1)"
}
"""
        prompt = f"""
### 指令 ###
{instruction}

### 对话历史 ###
{conversation_history}

### 上下文信息 ###
{context_info}

### 原始查询 ###
{query}

### 分析结果 ###
"""
        response = get_completion(prompt, self.model)
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return {
                "query_type": "未知类型",
                "rewritten_query": query,
                "confidence": 0.5,
            }


def main():
    rewriter = QueryRewriter()
    print("=== Query 改写示例 ===\n")

    # 上下文依赖型
    history = """
用户: "我想了解一下上海迪士尼乐园的最新项目。"
AI: "上海迪士尼乐园最新推出了'疯狂动物城'主题园区。"
用户: "这个园区有什么游乐设施？"
"""
    print("【上下文依赖型】")
    print(rewriter.rewrite_context_dependent_query("还有其他设施吗？", history))
    print()

    # 多意图型
    print("【多意图型】")
    print(rewriter.rewrite_multi_intent_query("门票多少钱？需要提前预约吗？停车费怎么收？"))
    print()

    # 自动识别
    print("【自动识别】")
    result = rewriter.auto_rewrite_query("哪个园区更好玩？")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
