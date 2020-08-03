# 架构

本文以图片为主，描述了系统的总体架构

## 系统组成

系统主要由一个评测控制端和多个评测机组成。

所有的评测机是等价的。运算速度的区别通过基线测试来计算修正系数。

## 系统外部

系统可以服务于多个需要进行在线评测的外部系统

同时可以向具有观察员权限的系统或用户提供系统运行状态

## 架构图

### 数据流图

#### 系统

![strcture-system](./plantumlsrc/strcture-system.svg)

#### 评测机

![strcture-judger](./plantumlsrc/strcture-judger.svg)
