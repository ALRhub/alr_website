---
title: "Adaptive Replanning in Reinforcement Learning"
types: ["master"]
supervisors: ["max-nagy"]
topics: ["Reinforcement Learning", "Action Chunking", "Replanning"]
start: ASAP
added: 2026-03-10
assigned: false
pdf: "/theses/replanning.pdf"
---

Recent RL methods generate chunks of multiple consecutive actions to increase sample efficiency and overall performance. Currently these chunks get executed in an open-loop manner. This has two disadvantages: Firstly, when unexpected events happen (like an object slipping out of the robot's gripper), the agent can only react after the chunk was fully executed. Secondly, some tasks like locomotion are inherently difficult to solve with (long) action chunks and require careful tuning of the chunk size to learn useful behaviour at all.

The goal of this thesis is to adapt an action chunking RL method to dynamically decide when to continue executing the current chunk and when to replan.

## Tasks

- **Getting familiar with the base algorithm**: You will choose or design a suitable task to test your replanning method. You will use an existing SEAR algorithm to train chunking, non-replanning policies as a baseline.

- **Literature Research**: To identify promising approaches for replanning, you will conduct a literature research of applicable methods from hierarchical RL, Imitation Learning, model-based RL and other RL approaches.

- **Implementation**: You will implement one or more methods for adaptive replanning based on the existing code base.

- **Evaluation**: You will analyze the method both quantitatively using benchmark tasks as well as qualitatively: Why does the method work? When does it learn to replan, when does it fail to do so?

Action chunking in RL is a hot topic right now and your method could enable a leap in capability — this opens up the possibility of publishing your results as a paper.
