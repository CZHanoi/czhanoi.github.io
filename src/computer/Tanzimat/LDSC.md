---
title: LDSC
icon: dna
article: true
category:
  - code
tag:
  - format
---



<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Do not be quick to anger,<br>
    for once you are angry, you will reveal your true skill;<br>
    and then others will discover<br>
    that your true skill is not very good."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Arabic proverb</span>
</blockquote>



## 「一」文件格式

### reference genotype panel

指的是一批外部参考人群的真实基因型数据，如**1000 Genomes European ancestry**，GRCh38/hg38 坐标的参考基因型 panel：

```bash
1000G.EUR.hg38.1.bed
1000G.EUR.hg38.1.bim
1000G.EUR.hg38.1.fam
1000G.EUR.hg38.1.frg
```

作用是：用一批 ancestry 匹配的人群 genotype，估计 SNP 之间的 LD 结构，也就是 SNP 与 SNP 之间的相关结构（矩阵格式）。

LDSC/S-LDSC 需要知道：

- SNP $j$和 SNP $k$在参考人群中是否相关？
- 相关程度 $r_{jk}$ 是多少？
- $r_{jk}^2$ 加起来是多少？

#### `.frq` allele frequency report

「严格意义上不是PLINK文件」

```
CHR           SNP   A1   A2          MAF  NCHROBS
1     rs575272151    G    C      0.08896      978
1     rs544419019    G    C      0.08896      978
1     rs540538026    A    G      0.05419      978
```

其中：

​	 `MAF` ： allele `A1` 的频率
​	`NCHROBS` ： allele observation 数，`NCHROBS=978`表示观测到 978 个 allele；常染色体二倍体下通常约等于 489 个非缺失样本 × 2。
​	`A1`通常是minor allele，`A2`通常是major allele。

**allele frequency 主要对 S-LDSC 有用**，S-LDSC 里很多 annotation 和 M 值处理会**区分 SNP 频率（做MAF分层、common SNP 过滤和 annotation 相关处理）**，如

- common SNP
- low-frequency SNP
- MAF bins
- MAF 5%-50% 的 M_5_50

### PLINK binary genotype

PLINK binary genotype 一般由三件套组成：
	①`.bed`(binary biallelic genotype table)：  二进制 genotype 矩阵，**biallelic** variant genotype calls 的主要二进制表示
	②`.bim`(extended MAP file)： Binary MAP，SNP/variant 信息
	③`.fam`(family/sample information file)： sample/individual 信息



#### `.bim` SNP信息表

```
1  rs575272151  0  11008  G  C
1  rs544419019  0  11012  G  C
1  rs540538026  0  13110  A  G
```

`.bim` 没有表头，每行一个 SNP。PLINK 官方说明 `.bim` 每行六列：chromosome code、variant identifier、position in Morgans/cM、base-pair coordinate、allele 1、allele 2。

告诉 LDSC 每个 SNP 在哪里、叫什么、有哪些 allele，并且定义 .bed 二进制 genotype 矩阵中 SNP 的顺序。

**必须和 PLINK `.bed 文件一一对应。**

#### `.fam`：样本信息表

```
HG00096 HG00096 0 0 0 -9
HG00097 HG00097 0 0 0 -9
HG00099 HG00099 0 0 0 -9
```

`.fam` 没有表头，每行一个**样本**。PLINK 官方说明 `.fam` 每行六列：Family ID、Within-family ID、father ID、mother ID、sex code、phenotype value。

|  列  |    值     | 含义                              |
| :--: | :-------: | --------------------------------- |
|  1   | `HG00096` | FID，family ID                    |
|  2   | `HG00096` | IID，individual ID                |
|  3   |    `0`    | 父亲 ID；`0` 表示未知或不在数据中 |
|  4   |    `0`    | 母亲 ID；`0` 表示未知或不在数据中 |
|  5   |    `0`    | 性别；`1` 男，`2` 女，`0` 未知    |
|  6   |   `-9`    | phenotype；`-9` 通常表示缺失      |

phenotype 都是 `-9`：因为这是 **reference genotype panel**，不是 GWAS phenotype 数据，它只用来估计 LD，不关心这些人的疾病状态、身高、BMI 等表型。所以 phenotype 缺失完全正常。

`.fam` 是 reference panel 的样本信息表，在 LDSC 中主要用于定义 `.bed` 矩阵的样本顺序和样本数。



#### `bed`：真实 genotype 矩阵

存的是每个样本、每个 SNP 的 genotype，例如：

```
              rs575272151  rs544419019  rs540538026 ...
HG00096             0            0            1
HG00097             1            0            0
HG00099             2            1            0
...
```

`.bed` 文件按 variant blocks 存储 genotype code，且第一 marker block 对应 `.bim` 文件中的第一个 marker；genotype code 的含义包括 homozygous first allele、missing、heterozygous、homozygous second allele。



### S-LDSC annotation reference files

下载地址

```
数据地址：
https://zenodo.org/records/10515792
服务器储存地址：
/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/ref/LDSC
GRCh38_bundle  archive  baselineLD_v2.2  baseline_v1.2  hm3_no_MHC.list.txt  plink_files  readme_baseline_versions.txt  weights
```

baselineLD_v2.2包括每条染色体的下面的文件：

```
baselineLD.1.annot.gz
baselineLD.1.l2.M
baselineLD.1.l2.M_5_50
baselineLD.1.l2.ldscore.gz
baselineLD.1.log
```

`baseline_v1.2` 和 `baselineLD_v2.2` 文件结构完全一样：

区别是 annotation 模型不同：

|       模型        | annotation 数                          | 用途倾向                                                     |
| :---------------: | -------------------------------------- | ------------------------------------------------------------ |
|  `baseline_v1.2`  | 经典 baseline model，约 53 annotations | cell-type specific analysis 中常用于检验 τ P-value。         |
| `baselineLD_v2.2` | 97 annotations                         | 更强调整 LD、MAF、selection、QTL、sequence age 等因素，常用于 enrichment 估计。 |

官网推荐：

​	识别 critical tissues/cell-types 的 tau P-value 用 `baseline v1.2`；

​	估计 heritability enrichment（如tissue-specific annotation）用 `baselineLD v2.2`。

#### `annot.gz` **annotation matrix**

一行一个 SNP，前 4 列是 SNP 坐标信息，从第 5 列开始后面 97 列是 baselineLD v2.2 注释

```bash
zcat baselineLD.1.annot.gz | awk '{print $1,$2,$3,$4,$5}' | head
CHR BP SNP CM base
1 11008 rs575272151 0 1
1 11012 rs544419019 0 1
1 13110 rs540538026 0 1
1 13116 rs62635286 0 1
1 13118 rs200579949 0 1
1 13273 rs531730856 0 1
1 13550 rs554008981 0 1
1 14464 rs546169444 0 1
1 14599 rs531646671 0 1
```

解释：

| 列     | 作用                                                         |
| ------ | ------------------------------------------------------------ |
| `CHR`  | 染色体编号，1–22。                                           |
| `BP`   | base-pair 坐标；                                             |
| `SNP`  | rsID；LDSC 和 summary statistics 合并主要靠这个。            |
| `CM`   | genetic map position，单位 centiMorgan；计算 1 cM LD window 时用。 |
| `base` | baseline 模型中的 **base annotation**，相当于全 SNP 基础项；通常所有 SNP 都是 `1` |

后面列的分类：

|         类型          | 例子                                              | 含义                                     |
| :-------------------: | ------------------------------------------------- | ---------------------------------------- |
|   binary annotation   | `Coding_UCSC`, `Promoter_UCSC`, `DHS_Trynka`      | SNP 是否落在该功能区域内，通常 0/1。     |
| continuous annotation | `GERP.NS`, `Recomb_Rate_10kb`, `CpG_Content_50kb` | SNP 对应的连续功能、进化或 LD 相关数值。 |



[详细注释在这里](https://chatgpt.com/c/6a413e32-c79c-83ed-868e-5ef674c12152)

#### `.l2.ldscore.gz` annotation-specific LD score

是 S-LDSC 的核心自变量。

```bash
zcat baselineLD.1.l2.ldscore.gz | awk '{print $1,$2,$3,$4,$5}' | head
zcat baselineLD.1.l2.ldscore.gz | cut -f1-5 | head
CHR     SNP     				BP      baseL2  Coding_UCSCL2
1       rs3094315       817186  80.826  0.178
1       rs3131972       817341  80.939  0.183
1       rs3131969       818802  90.281  0.310
1       rs1048488       825532  80.678  0.176
1       rs3115850       825767  80.482  0.143
1       rs2286139       826352  90.200  0.320
1       rs12562034      833068  32.887  0.295
1       rs4040617       843942  85.641  0.209
1       rs2980300       850609  89.501  0.286
```

列含义：

|        列        | 作用                                                      |
| :--------------: | --------------------------------------------------------- |
|      `CHR`       | 染色体编号，1–22。                                        |
|      `SNP`       | rsID；LDSC 和 summary statistics 合并主要靠这个。         |
|       `BP`       | base-pair 实际的物理坐标。                                |
|     `baseL2`     | **普通 LD score，即该 SNP tag 到所有 SNP 的 LD 总量**。   |
| `<annotation>L2` | SNP 对该 **annotation** 的 annotation-specific LD score。 |

如`Coding_UCSCL2`表示：$l_{j,\text{Coding}} = \sum_k r_{jk}^2 \cdot I(k \in Coding\_UCSC)$，即第 $j$ 个 SNP 通过 LD tag 到 coding annotation 中 SNP 的总量。

`.l2.ldscore.gz` 可以因为 `--print-snps` 只输出 regression SNP，例如 HapMap3 SNP。如果计算 LD score 时用了 `--print-snps`，`.l2.ldscore.gz` 可以比 `.annot.gz` 行数更少；但 `.annot.gz` 必须仍然有 reference panel 的所有 SNP，即。

```bash
python ldsc.py \
    --l2 \
    --bfile 1000G.EUR.QC.$CHR \
    --ld-wind-cm 1 \
    --print-snps listHM3.txt \
    --annot yourannot.$CHR.annot.gz \
    --out yourannot.$CHR
```



#### `.l2.M`&`.l2.M_5_50`

`.l2.M`这是 annotation 的 **总 SNP 数 / 总 annotation 值** 文件。

数据只有**一行数字**，列数等于 `.l2.ldscore.gz` 中 LD score annotation 列数，顺序和 `.l2.ldscore.gz` 的 annotation 顺序一致；

|       注释类型        | 说明                                                         |
| :-------------------: | ------------------------------------------------------------ |
|   binary annotation   | 值约等于该 annotation 中 SNP 的数量。                        |
| continuous annotation | 值是该 annotation 在 SNP 上的总和，不一定是整数，也可以为负。 |

`.l2.M_5_50` 每列是对应 annotation 中 **MAF > 5%** 的 SNP 数；`.l2.M` 格式相同，但不限制 MAF。

S-LDSC 默认常用 **common SNP** 来估计 heritability proportion / enrichment。官方 continuous annotation 教程也说明，相关 quantile 文件是在 MAF ≥ 5% 的 reference SNP 上计算的，因为 S-LDSC 用 common SNP 来计算 heritability estimates。

#### `baselineLD.<chr>.log`

运行：

```
python ldsc.py --l2 --bfile ... --annot ... --out ...
```

生成 LD score 时的日志。



### `weights`目录

`weights`目录下包含：

```
weights.hm3_noMHC.1.l2.ldscore.gz
weights.hm3_noMHC.1.l2.M
weights.hm3_noMHC.1.l2.M_5_50
weights.hm3_noMHC.1.log
```

#### `weights.hm3_noMHC.<chr>.l2.ldscore.gz`

是 **regression weight LD score**。普通 LDSC 和 S-LDSC 都要用它：

```bash
--w-ld-chr weights/weights/weights.hm3_noMHC.
```

```
CHR     SNP     BP      L2
1       rs3094315       817186  7.070
1       rs3131972       817341  7.089
1       rs3131969       818802  6.981
```

非分层 LD score，也就是只有一个 LD score 列，用来给回归加权。LDSC wiki 说明，`--w-ld` 是用于 regression weights 的 LD score；理想情况下，它应是 regression SNP 集合上的 $\sum r^2$，但 LDSC 对 weight LD score 的精确选择通常不太敏感。

#### `.l2.M` 和 `.l2.M_5_50`

和 baseline 里的含义类似，是该 LD score 文件配套的 M 文件。普通 LDSC 解析 LD score 文件时也会配套读这些文件。





## 「二」S-LDSC概念、算法概述

### 核心概念

| 概念                    | 含义                                                         |
| ----------------------- | ------------------------------------------------------------ |
| **GWAS 的 $\chi^2$**    | GWAS 对每个 SNP 进行关联检验得到的统计量<br>简单理解：检验不同 genotype dosage（通常为 0/1/2 个 effect allele）是否对应 phenotype 的系统性差异。在无 association 且无 confounding 的理想情况下，$E[\chi^2]=1$；$\chi^2$ 越大通常代表 association evidence 越强。 |
| **tag**                 | 表示一个 SNP 通过 LD **代理 / 捕获 / 间接携带**另一个 SNP 的遗传信息。例如 $SNP_j$ 与 $SNP_k$ 高度 LD，则可以说 $SNP_j$ **tags** $SNP_k$。 |
| **LD**                  | linkage disequilibrium，连锁不平衡。LDSC 中通常用两个 SNP genotype 的相关系数 $r_{jk}$ 描述，并使用其平方 $r_{jk}^2$ 表示 LD/tagging 强度。理论上的 $r_{jk}^2\in[0,1]$。 |
| **LD Score**            | $SNP_j$ 与 reference SNP 的 $r^2$ 之和：$l_j=\sum_k r_{jk}^2$。可以理解为 **$SNP_j$ 总共能够 tag 到多少遗传变异**。 |
| **LDSC 的 $l_j$**       | LDSC 的核心自变量，即 $SNP_j$ 的普通 LD Score。              |
| **$a_{k,c}$**           | $SNP_k$ 在 annotation $c$ 上的 annotation value。可以是 0/1，也可以是连续值。 |
| **$\tau_c$**            | 在控制模型中的其他 annotations 后，annotation $c$ 每增加 1 个单位，对 **per-SNP effect-size variance / per-SNP heritability** 的条件贡献。 |
| **S-LDSC 的 $l_{j,c}$** | annotation-specific LD Score，表示 $SNP_j$ 通过 LD tag 到的、与 annotation (c) 相关的 **LD-weighted annotation 总量**。<br>对于 0/1 annotation，可以简单理解为 $SNP_j$ tag 到 annotation $c$ 中 SNP 的 LD 总量。 |



### LD Score

对于两个 SNP，使用基因型相关系数的平方 $r_{jk}^2$ 表示 LD 强度，即 $SNP_j$ 对 $SNP_k$ 的 **tagging 强度**。

普通 LD Score 定义为：
$$
l_j=\sum_k r_{jk}^2
$$
其中：

| **符号**   | **含义**                                                  |
| ---------- | --------------------------------------------------------- |
| $j$        | 当前研究的 SNP，即 $SNP_j$                                |
| $k$        | 被 $SNP_j$ tag 到的 reference SNP                         |
| $r_{jk}^2$ | $SNP_j$ 与 $SNP_k$ 的 LD 强度                             |
| $l_j$      | $SNP_j$ 的 LD Score，即对 reference SNP 的总 tagging 程度 |

例如：

$$
r_{j1}^2=1,\quad
r_{j2}^2=0.6,\quad
r_{j3}^2=0.3,\quad
r_{j4}^2=0.1
$$

那么：

$$
l_j=1+0.6+0.3+0.1=2
$$

可以粗略理解为：**LD Score 衡量一个 SNP 通过 LD 能“看到 / tag 到”多少遗传变异。**

LD Score 高的 SNP能 tag 到更多遗传变异，因此在 polygenic trait 中，也更有机会 tag 到真正具有遗传效应的 SNP。*理论上 LD Score 是 $r^2$ 的求和；LDSC 软件实际计算时还会进行有限参考样本导致的 $r^2$ 偏差校正。*

### LDSC

思想：**如果一个性状具有大量 causal variants，那么 LD Score 越高的 SNP 越容易 tag 到 causal variation，因此其 GWAS $\chi^2$ 平均也应该越高。**

普通 LDSC 回归近似是：
$$
E[\chi_j^2] \approx 1 + \frac{N h_g^2}{M} l_j + a
$$
其中：

| 符号       | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| $\chi_j^2$ | GWAS 中第 $j$ 个 SNP 的 association chi-square。「一个统计量」 |
| $N$        | GWAS 样本量。                                                |
| $h_g^2$    | SNP heritability。                                           |
| $M$        | 参考 SNP 总数。                                              |
| $l_j$      | 第 $j$ 个 SNP 的普通 LD score。                              |
| $a$        | 截距，吸收 population stratification、cryptic relatedness 等 confounding。 |

因此 LDSC 本质上是在大量 SNP 上观察：

$$
l_j\uparrow
\quad\Longrightarrow\quad
E[\chi_j^2]\uparrow
$$

回归斜率为：
$$
\frac{Nh_g^2}{M}
$$
因此可以利用 **LD Score 与 GWAS $\chi^2$ 的关系估计 SNP heritability**。



*LDSC 实际使用加权回归，而不是普通 OLS。*

### S-LDSC

S-LDSC 是 **Stratified LD Score Regression**。

普通 LDSC 只有一个总体 LD Score：
$$
l_j=\sum_k r_{jk}^2
$$
S-LDSC 则进一步为每个 annotation 计算一个 **annotation-specific LD Score**：
$$
\sum_k r_{jk}^2a_{k,c}
$$
其中：

| **符号**  | **含义**                                                     |
| --------- | ------------------------------------------------------------ |
| $c$       | annotation，例如 coding、promoter、enhancer、MAF bin、GERP 等 |
| $a_{k,c}$ | $SNP_k$ 在 annotation $c$ 上的值，可以是 0/1，也可以是连续值 |
| $l_{j,c}$ | $SNP_j$ 对 annotation $c$ 的 annotation-specific LD Score    |
| $\tau_c$  | 控制其他 annotation 后，annotation $c$ 每增加 1 个单位，对 per-SNP heritability / effect-size variance 的条件贡献 |

S-LDSC 回归模型为：
$$
E[\chi_j^2]
\approx
1+
N\sum_c\tau_c l_{j,c}
+
a
$$
对于二元 annotation，例如 promoter：$$\begin{cases}
1, SNP_k\text{ 位于 promoter};\
0, SNP_k\text{ 不位于 promoter}
\end{cases}\}$$

所以：$$\sum_k
r_{jk}^2
a_{k,\mathrm{Promoter}}$$可以理解为：**$SNP_j$ 通过 LD tag 到 promoter SNP 的 LD 总量，**即**$SNP_j$ 与 promoter SNP 的 $r^2$ 总量高，则 promoter-specific LD Score 高。**

如果在控制 coding、enhancer、MAF、LD-related annotations 等其他变量后：
$$
l_{j,\mathrm{Promoter}}\uparrow
\quad\Longrightarrow\quad
E[\chi_j^2]\uparrow
$$
则会估计出相应的 promoter $\tau_c$；如果 $\tau_c>0$ 且具有统计学证据，则说明 **promoter annotation 与更高的 per-SNP heritability 条件性相关**。

S-LDSC 的标准定义正是以 $l_{j,c}=\sum_k r_{jk}^2a_{k,c}$ 为自变量，并将 $\tau_c$ 定义为控制其他 annotations 后对 per-SNP heritability 的贡献。

