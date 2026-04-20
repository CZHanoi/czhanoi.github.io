---
title: hdWGCNA
date: 2026-04-17
cover: hdWGNCA.png
category:
  - code
tag:
  - scRNAseq
  - Tanzimat
star: false
article: true
---


## Install

将`hdWGCNA`安装到经典环境[`Otaku`]()下面

```bash
mamba install -c conda-forge -c bioconda r-seurat r-hdf5r r-wgcna r-igraph r-tidyverse r-ggraph r-harmony r-enrichr r-devtools bioconductor-ucell bioconductor-genomicranges bioconductor-geneoverlap
R -q -e 'remotes::install_local("/path/to/hdWGCNA", dependencies = TRUE, upgrade = "never")'
```

验证

```R
library(hdWGCNA)
```



## WGCNA基础概念

$x_i$：第 $i$ 个基因的表达谱

$\mathrm{cor}(x_i,x_j)$：两个基因表达谱的相关系数

$a_{ij}$：基因 $i$ 和 $j$ 之间的邻接值，也就是“连边强度”

$\beta$：软阈值幂，用来放大强相关、压低弱相关

$E$：模块特征基因（module eigengene）



### Co-expression network（共表达网络）

- 定义为无向（undirected）、加权（weighted）的基因网络
- 节点（Node）为基因表达谱，边（Edge）由基因表达的两两相关性决定

- 无符号网络（unsigned network）中，邻接值定义为 $a_{ij}=|\mathrm{cor}(x_i,x_j)|^\beta$
- 有符号网络（signed network ）中， 则为$a_{ij}=|(1+\mathrm{cor}(x_i,x_j))/2|^\beta$

**无符号网络（unsigned）只看“相关得有多强”，不管方向；有符号网络（signed）既看强度也看方向，所以强负相关会被当成“几乎不连”。**



### Moudle（模块）

- 模块是由**高度互连的基因**组成的簇

- 在**无符号网络**中，模块对应于**绝对相关性较高**的一组基因

- 在**有符号网络**中，模块对应于**彼此正相关**的一组基因



### Connectivity / Degree（连通度 / 度）

- 定义为它与网络中其他基因连接强度之和 $k_i=\sum_{u\ne i} a_{ui}$

### Intramodular connectivity $k_{IM}$（模块内连通度）

- 衡量的是：某个给定基因相对于**某一个特定模块中的基因**而言，有多么紧密连接或共表达，可以被理解为一种**模块归属程度**的度量，看的是“**在自己这个模块里有多核心**”。
- 用于寻找枢纽基因（Hub）

### Module eigengene $E$（模块特征基因 / 模块特征向量）

- 为某个给定模块的**第一主成分**(PC)
- 看作该模块内所有基因表达谱的一个**代表**

后面做“模块和表型的相关性”时，常常不是拿每个基因去相关，而是直接拿模块 eigengene 去相关。

### Eigengene significance（特征基因显著性）

- 性状 $y$ 可用时（例如病例/对照状态，或体重），就可以把**模块特征基因**与这个结局变量做相关分析，这个相关系数就称为特征基因的显著性（eigengene significance）
- 衡量的是**某个模块**整体上**和研究性状关系**有多强

### Module Membership / eigengene-based connectivity $k_{ME}$（模块成员度 / 基于 eigengene 的连通度）

- 对于每个基因，我们通过将它的表达谱与某个给定模块的模块特征基因做相关，来定义一种“**模糊的**（fuzzy）”模块归属度。

- $MM^{blue}(i)=K^{blue}_{cor,i}=\mathrm{cor}(x_i,E^{blue})$ ，即基因 $i$ 与蓝色模块（$M^{blue}$） eigengene 的相关程度，表示第 $i$ 个基因相对于蓝色模块的成员度（$M$）

若 $MM^{blue}(i)$接近 0，说明该基因并不属于蓝色模块；如果 $MM^{blue}(i)$ 接近 1 或 -1，则说明它与蓝色模块基因高度连接。

- 模块成员度可以对所有输入基因定义，而不管它原先是否被分到该模块
- 模块成员度$k_{ME}$与模块内连通度 $k_{IM}$ 高度相关，模块内高度连接的 hub gene 往往也具有很高的$k_{ME}$

### Hub gene（枢纽基因 / 中心基因）

- 模块中具有高 $k_{IM}$的基因



### Gene significance, GS（基因显著性）

- $GS_i$为$i$基因与表型的相关性，或 $-\log(p)$（要求：当 gene significance 为 0 时，表示该基因对于你关心的生物学问题**不显著**），**取决于要研究的生物学问题**
- $GS_i$ 的绝对值越大，第 $i$ 个基因在生物学上就越重要

### Module significance（模块显著性）

- 定义为：某个给定模块内**所有基因显著性绝对值的平均值**

当 gene significance 被定义为“基因表达谱与外部性状 $y$ 的相关性”时，这个指标通常与“模块 eigengene 和 $y$ 的相关性”高度相关
