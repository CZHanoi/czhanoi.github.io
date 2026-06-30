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



## 文件格式

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

其中 `MAF` 是 allele `A1` 的频率，`NCHROBS` 是 allele observation 数，`NCHROBS=978`表示观测到 978 个 allele；常染色体二倍体下通常约等于 489 个非缺失样本 × 2。

`A1`通常是minor allele，`A2`通常是major allele。

**allele frequency 主要对 S-LDSC 有用**，S-LDSC 里很多 annotation 和 M 值处理会**区分 SNP 频率（做MAF分层、common SNP 过滤和 annotation 相关处理）**，如

- common SNP
- low-frequency SNP
- MAF bins
- MAF 5%-50% 的 M_5_50

#### PLINK binary genotype

PLINK binary genotype 一般由三件套组成：

```
.bed  二进制 genotype 矩阵，biallelic variant genotype calls 的主要二进制表示
.bim  SNP/variant 信息
.fam  sample/individual 信息
```

#### `.bim` SNP信息表

```
1  rs575272151  0  11008  G  C
1  rs544419019  0  11012  G  C
1  rs540538026  0  13110  A  G
```

`.bim` 没有表头，每行一个 SNP。PLINK 官方说明 `.bim` 每行六列：chromosome code、variant identifier、position in Morgans/cM、base-pair coordinate、allele 1、allele 2。

告诉 LDSC 每个 SNP 在哪里、叫什么、有哪些 allele，并且定义 .bed 二进制 genotype 矩阵中 SNP 的顺序。

**必须和 PLINK `.bim` 文件一一对应。**

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
|  `baseline_v1.2`  | 经典 baseline model，约 53 annotations | cell-type specific analysis 中常用于检验 tau P-value。       |
| `baselineLD_v2.2` | 97 annotations                         | 更强调整 LD、MAF、selection、QTL、sequence age 等因素，常用于 enrichment 估计。 |

官网的readme 推荐：识别 critical tissues/cell-types 的 tau P-value 用 `baseline v1.2`；估计 heritability enrichment，包括 tissue-specific annotation，用 `baselineLD v2.2`。

#### `annot.gz` **annotation matrix**

一行一个 SNP，前 4 列是 SNP 坐标信息，后面 97 列是 baselineLD v2.2 注释

前4列：

| 列    | 作用                                                         |
| ----- | ------------------------------------------------------------ |
| `CHR` | 染色体编号，1–22。                                           |
| `BP`  | base-pair 坐标；                                             |
| `SNP` | rsID；LDSC 和 summary statistics 合并主要靠这个。            |
| `CM`  | genetic map position，单位 centiMorgan；计算 1 cM LD window 时用。 |

后面列的分类：

|         类型          | 例子                                              | 含义                                     |
| :-------------------: | ------------------------------------------------- | ---------------------------------------- |
|   binary annotation   | `Coding_UCSC`, `Promoter_UCSC`, `DHS_Trynka`      | SNP 是否落在该功能区域内，通常 0/1。     |
| continuous annotation | `GERP.NS`, `Recomb_Rate_10kb`, `CpG_Content_50kb` | SNP 对应的连续功能、进化或 LD 相关数值。 |

`base` 是全 SNP annotation，一般全为 1，相当于“所有 SNP”的基线项。

[详细注释在这里](https://chatgpt.com/c/6a413e32-c79c-83ed-868e-5ef674c12152)

#### `.l2.ldscore.gz` annotation-specific LD score

是 S-LDSC 的核心自变量。

列含义：

|        列        | 作用                                                      |
| :--------------: | --------------------------------------------------------- |
|      `CHR`       | 染色体编号，1–22。                                        |
|      `SNP`       | rsID；LDSC 和 summary statistics 合并主要靠这个。         |
|       `BP`       | base-pair 坐标。                                          |
|     `baseL2`     | **普通 LD score，即该 SNP tag 到所有 SNP 的 LD 总量**。   |
| `<annotation>L2` | SNP 对该 **annotation** 的 annotation-specific LD score。 |

如`Coding_UCSCL2`表示：$l_{j,\text{Coding}} = \sum_k r_{jk}^2 \cdot I(k \in Coding\_UCSC)$，

即第 $j$ 个 SNP 通过 LD tag 到 coding annotation 中 SNP 的总量。

`.l2.ldscore.gz` 可以因为 `--print-snps` 只输出 regression SNP，例如 HapMap3 SNP。官方教程也说明：如果计算 LD score 时用了 `--print-snps`，`.l2.ldscore.gz` 可以比 `.annot.gz` 行数更少；但 `.annot.gz` 必须仍然有 reference panel 的所有 SNP。

#### `.l2.M`&`.l2.M_5_50`

`.l2.M`这是 annotation 的 **总 SNP 数 / 总 annotation 值** 文件。

数据只有一行数字，列数等于 `.l2.ldscore.gz` 中 LD score annotation 列数，顺序和 `.l2.ldscore.gz` 的 annotation 顺序一致；

|       注释类型        | 说明                                                         |
| :-------------------: | ------------------------------------------------------------ |
|   binary annotation   | 值约等于该 annotation 中 SNP 的数量。                        |
| continuous annotation | 值是该 annotation 在 SNP 上的总和，不一定是整数，也可以为负。 |

`.l2.M_5_50` 每列是对应 annotation 中 **MAF > 5%** 的 SNP 数；`.l2.M` 格式相同，但不限制 MAF。

S-LDSC 默认常用 **common SNP** 来估计 heritability proportion / enrichment。官方 continuous annotation 教程也说明，相关 quantile 文件是在 MAF ≥ 5% 的 reference SNP 上计算的，因为 S-LDSC 用 common SNP 来计算 heritability estimates。

#### `baselineLD.<chr>.log`

运行：

```
ldsc.py --l2 --bfile ... --annot ... --out ...
```

生成 LD score 时的日志。



### `weights`

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





## S-LDSC算法简略概述

### LDSC

普通 LDSC 回归近似是：
$$
E[\chi_j^2] \approx 1 + \frac{N h_g^2}{M} l_j + a
$$
其中：

| 符号       | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| $\chi_j^2$ | GWAS 中第 $j$ 个 SNP 的 association chi-square。             |
| $N$        | GWAS 样本量。                                                |
| $h_g^2$    | SNP heritability。                                           |
| $M$        | 参考 SNP 总数。                                              |
| $l_j$      | 第 $j$ 个 SNP 的普通 LD score。                              |
| $a$        | 截距，吸收 population stratification、cryptic relatedness 等 confounding。 |



### S-LDSC

S-LDSC 是 Stratified LDSC，即多个 annotation-specific LD score 解释分层遗传力。它不是只有一个 LD score，而是为每个 annotation 计算一个 annotation-specific LD score：
$$
E[χ_j²]
=
1
+
N Σ_c τ_c ℓ(j,c)
+
N a
$$
S-LDSC 的模型是：
$$
E[\chi_j^2] \approx 1 + N \sum_c \tau_c l_{j,c} + a
$$
 $\tau_c$ 是 annotation $c$ 的 per-SNP heritability contribution，条件于其他 annotation，而$l_{j,c}$为：
$$
l_{j,c}=k∑r_{jk}^2a_{k,c}
$$
其中：

| 符号      | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| $c$       | annotation 类别，例如 coding、promoter、enhancer、MAF bin、GERP 等。 |
| $a_{k,c}$ | SNP $k$ 在 annotation $c$ 上的值；可以是 0/1，也可以是连续值「取决于注释类型」。 |
| $l_{j,c}$ | SNP $j$ tag 到 annotation $c$ 中 SNP 的 LD 总量。            |

表示为每个 annotation 计算一个 annotation-specific LD score。

其中

如果 SNP j 周围有很多 promoter SNP，
那么 promoter-specific LD score 就高。

如果高 promoter LD score 的 SNP χ² 系统性更高，
S-LDSC 就会认为 promoter annotation 贡献了更多 h²。