#!/usr/bin/env python
# coding: utf-8
"""
Query 联网搜索识别与改写

判断 query 是否需要实时联网信息（价格、营业时间、天气等），
并改写为更适合搜索引擎检索的关键词组合。

使用前：export DASHSCOPE_API_KEY="你的 API Key"
"""

import json
import os
from datetime import datetime

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


class WebSearchQueryRewriter:
    """识别需联网搜索的 query，并生成搜索策略"""

    def __init__(self, model="qwen-turbo-latest"):
        self.model = model

    def identify_web_search_needs(self, query, conversation_history=""):
        """判断 query 是否依赖实时/外部信息"""
        instruction = """
你是一个智能的查询分析专家。请分析用户的查询，判断是否需要联网搜索来获取最新、最准确的信息。

需要联网搜索的情况包括：
1. 时效性信息 - 包含"最新"、"今天"、"现在"、"实时"、"当前"等
2. 价格信息 - 包含"多少钱"、"价格"、"费用"、"票价"等
3. 营业信息 - 包含"营业时间"、"开放时间"、"是否开放"等
4. 活动/天气/交通/预订/实时状态等信息

请返回JSON格式：
{
    "need_web_search": true/false,
    "search_reason": "需要搜索的原因",
    "confidence": "置信度(0-1)"
}
"""
        prompt = f"""
### 指令 ###
{instruction}

### 对话历史 ###
{conversation_history}

### 用户查询 ###
{query}

### 分析结果 ###
"""
        response = get_completion(prompt, self.model)
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return {
                "need_web_search": False,
                "search_reason": "无法解析",
                "confidence": 0.5,
            }

    def rewrite_for_web_search(self, query, search_type="general"):
        """将口语化 query 改写为搜索友好的关键词"""
        instruction = """
你是一个专业的搜索查询优化专家。请将用户的查询改写为更适合搜索引擎检索的形式。

改写技巧：
1. 添加具体地点
2. 添加时间范围
3. 使用关键词组合
4. 去除口语化表达

请返回JSON格式：
{
    "rewritten_query": "改写后的搜索查询",
    "search_keywords": ["关键词1", "关键词2"],
    "search_intent": "搜索意图",
    "suggested_sources": ["建议搜索的网站类型"]
}
"""
        prompt = f"""
### 指令 ###
{instruction}

### 原始查询 ###
{query}

### 搜索类型 ###
{search_type}

### 改写结果 ###
"""
        response = get_completion(prompt, self.model)
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return {
                "rewritten_query": query,
                "search_keywords": [query],
                "search_intent": "信息查询",
                "suggested_sources": ["官方网站"],
            }

    def generate_search_strategy(self, query, search_type="general"):
        """生成完整搜索策略（关键词、平台、时间范围）"""
        current_date = datetime.now().strftime("%Y年%m月%d日")
        instruction = f"""
你是一个搜索策略专家。请为用户的查询制定详细的搜索策略。

当前日期：{current_date}

请返回JSON格式：
{{
    "primary_keywords": ["主要关键词"],
    "extended_keywords": ["扩展关键词"],
    "search_platforms": ["搜索平台"],
    "time_range": "具体的时间范围"
}}
"""
        prompt = f"""
### 指令 ###
{instruction}

### 用户查询 ###
{query}

### 搜索类型 ###
{search_type}

### 搜索策略 ###
"""
        response = get_completion(prompt, self.model)
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return {
                "primary_keywords": [query],
                "extended_keywords": [],
                "search_platforms": ["百度"],
                "time_range": "最近一周",
            }

    def auto_web_search_rewrite(self, query, conversation_history=""):
        """一站式：识别 -> 改写 -> 生成搜索策略"""
        search_analysis = self.identify_web_search_needs(query, conversation_history)

        if not search_analysis.get("need_web_search", False):
            return {
                "need_web_search": False,
                "reason": "查询不需要联网搜索",
                "original_query": query,
            }

        rewritten_result = self.rewrite_for_web_search(query)
        search_strategy = self.generate_search_strategy(query)

        return {
            "need_web_search": True,
            "search_reason": search_analysis.get("search_reason", ""),
            "confidence": search_analysis.get("confidence", 0.5),
            "original_query": query,
            "rewritten_query": rewritten_result.get("rewritten_query", query),
            "search_keywords": rewritten_result.get("search_keywords", []),
            "search_intent": rewritten_result.get("search_intent", ""),
            "suggested_sources": rewritten_result.get("suggested_sources", []),
            "search_strategy": search_strategy,
        }


def main():
    searcher = WebSearchQueryRewriter()
    print("=== Query 联网搜索改写示例 ===\n")

    query = "上海迪士尼乐园今天开放吗？现在人多不多？"
    result = searcher.auto_web_search_rewrite(query)

    if result["need_web_search"]:
        print(f"需要联网搜索: {result['search_reason']}")
        print(f"改写查询: {result['rewritten_query']}")
        print(f"搜索关键词: {result['search_keywords']}")
        print(f"搜索策略: {json.dumps(result['search_strategy'], ensure_ascii=False, indent=2)}")
    else:
        print(f"不需要联网搜索: {result['reason']}")


if __name__ == "__main__":
    main()
