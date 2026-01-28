
# 🧠 CausalMarketing AI: 归因与策略优化平台

> **从相关性走向因果性：精准驱动每一分营销预算。**

[![Project Status](https://img.shields.io/badge/Status-Advanced_Beta-blueviolet?style=for-the-badge)](https://github.com/your-username/causal-marketing)
[![Stack](https://img.shields.io/badge/Stack-React_19_%2B_Tailwind_%2B_Gemini_3-blue?style=for-the-badge)](https://github.com/your-username/causal-marketing)

## 🌟 项目背景 (Background)
在当前的互联网存量竞争时代，简单的销量预测已无法满足精细化运营的需求。各大厂（字节跳动、美团、阿里、滴滴）的面试官越来越关注候选人对 **因果推断 (Causal Inference)** 的理解。

**核心痛点：** 
- “销量增加是因为发了券，还是这些用户本来就会买？”
- “如何识别出那些只有发了券才会转化的‘真增量’用户？”

**CausalMarketing AI** 旨在通过 Uplift Modeling、PSM 等算法，结合 **Gemini 3** 的大模型分析能力，提供一套从数据归因到策略优化的全链路解决方案。

---

## 🚀 核心功能模块 (Core Modules)

### 1. Uplift Modeling (增益模型)
基于因果推断的四象限法则，将用户精准分类：
- **Persuadables (说服型):** 只有干预才转化。这是营销预算应该 **唯一聚焦** 的群体。
- **Sure Things (自然转化型):** 不干预也会买。对该群体发券会导致严重的预算浪费。
- **Lost Causes (无论如何不买):** 营销投入无效。
- **Sleeping Dogs (勿扰型):** 干预反而会导致负面效果（如反感退订）。

### 2. PSM Tool (倾向性得分匹配)
在非随机实验（观察性数据）中模拟 A/B Test。
- **交互式可视化:** 实时展示干预组（Treatment）与对照组（Control）在匹配前后的分布情况。
- **参数调优:** 支持 Caliper（卡钳值）、Kernel（核函数）和 Bandwidth（带宽）的动态调整，平衡 Bias 与 Sample Loss。

### 3. AI Causal Strategist (AI 策略专家)
集成 **Google Gemini 3**，自动分析复杂的因果模型输出：
- 生成 **“真实增量效应 (True Incremental Effect)”** 报告。
- 提供针对 ROI 最大化的个性化营销建议。

### 4. Interview Hub (大厂面试保障)
专为 DS/DA/MLE 岗位设计：
- 深度解析 **S-Learner, T-Learner, X-Learner, DR-Learner** 等进阶算法。
- 提供阿里、美团、字节等大厂面试中的因果推断高频考点。

---

## 🛠 技术栈 (Tech Stack)

- **Frontend:** React 19, Tailwind CSS (现代、响应式 UI)
- **Visualization:** Recharts (交互式因果效应分析图表)
- **AI Core:** @google/genai (Gemini 3 Flash - 策略合成与算法解释)
- **Methodology:** Causal Inference (HTE, PSM, Uplift Modeling)

---

## 📈 业务价值 (Business Impact)

| 传统归因 (Correlation) | 场景 | 因果归因 (Causal) |
| :--- | :--- | :--- |
| 计算所有领券用户的转化 | **ROI 计算** | 只计算由券带来的 **增量转化** |
| 全量投放以维持 GMV | **策略部署** | 剔除自然转化型，节省 **20%~40%** 成本 |
| 无法解释用户动机 | **用户洞察** | 识别不同人群对策略的敏感度 |

---

## 💻 快速开始 (Quick Start)

1. **配置 API Key:**
   确保环境中配置了 `process.env.API_KEY` 以启用 Gemini AI 智能分析功能。

2. **本地启动:**
   ```bash
   npm install
   npm run dev
   ```

3. **进入 Dashboard:**
   查看 Incremental GMV (增量 GMV) 趋势，这是衡量营销部门真实贡献的核心指标。

---

## 🎨 UI 预览 (Design Aesthetics)

平台采用 **Slate & Blue** 的极简工业风设计，强调数据的“确定性”与“科技感”：
- **高对比度图表:** 清晰区分干预效应。
- **卡片式布局:** 模块化展示复杂的统计学指标。
- **实时响应:** 匹配过程全动效反馈。

---

## 🤝 贡献与反馈
如果你对因果推断在营销场景的应用有更深度的见解，欢迎提交 PR。

**“数据驱动业务，因果赋能增长。”**
