---
title: "The Curse of Dimensionality in Reinforcement Learning"
types: ["bachelor", "master"]
supervisors: ["max-nagy", "serge-thilges"]
topics: ["Reinforcement Learning", "Dimensionality", "Action Chunking"]
start: ASAP
added: 2026-03-10
assigned: false
pdf: "/theses/dimscaling.pdf"
---

Modern reinforcement learning approaches increasingly operate in high-dimensional spaces. Action chunking methods generate sequences of actions and embodied AI systems—from full-body humanoids to dextrous manipulation—require controlling dozens to hundreds of degrees of freedom. While these high-dimensional action spaces (often paired with equally high-dimensional observation spaces) are known to be challenging, the field currently lacks comprehensive quantitative analysis of how dimensionality itself impacts learning performance.

This thesis systematically investigates how observation and action dimensionality affects RL performance, and develops architectural approaches for mitigating dimensionality-induced learning difficulties.

## Bachelor Thesis Scope

- **Literature Review**: Survey dimensionality challenges and mitigation strategies in RL
- **Experimental Framework**: Artificially scale observation/action dimensions using random projection matrices
- **Analysis**: Quantify relationships between dimensionality and performance (sample efficiency, final performance, stability)

## Master Thesis Scope (extends Bachelor scope)

- **Multi-Transition Prediction**: Implement Actor/Critic architectures operating on multiple environments at once
- **Architectural Mitigations**: Evaluate architectures for high-dimensional spaces (attention, factored representations, dimension-wise processing)
- **Comparative Evaluation**: Compare mitigation strategies across dimensionality regimes and task complexities

This work addresses a fundamental open question in reinforcement learning and could provide actionable insights for the design of algorithms targeting high-dimensional control problems. Strong results may lead to publication at a top-tier conference or workshop.
