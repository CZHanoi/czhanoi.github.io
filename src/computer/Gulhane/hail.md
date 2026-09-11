---
title: hail
icon: dna
article: true
cover: annovar.jpg
category:
  - code
tag:
  - format
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Multitudes, multitudes in the valley of decision:<br>
    for the day of the LORD is near<br>
    in the valley of decision."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Joel 3:14 (King James Version)</span>
</blockquote>




## hail

### 安装

```bash
mamba env create -f hail.yml
mamba activate hail
python -m ipykernel install --user --name hail --display-name "Py310 hail"
```

`hail.yml`在`/cwStorage/home/chenzhh/Env/hail.yml`

```yaml
name: hail

channels:
  - conda-forge

dependencies:
  # Python
  - python=3.10

  # Java
  - openjdk=11

  # C / C++ runtime and compiler toolchain
  - libgcc-ng
  - libstdcxx-ng
  - gcc_linux-64
  - gxx_linux-64
  - make
  - pkg-config

  # BLAS / LAPACK
  - openblas
  - libblas
  - liblapack

  # Python packaging tools
  - pip
  - setuptools
  - wheel
  - ipykernel

  # Install Hail from PyPI rather than Bioconda
  - pip:
      - hail
```



### 需要宏观剔除的reads

|            类别            |                            解释                             | 举例                                                         | 主要问题                      |
| :------------------------: | :---------------------------------------------------------: | ------------------------------------------------------------ | ----------------------------- |
|     **LowComplexity**      | DNA 这一小段本身太“单调”、重复；最接近 `LCR-hs38.bed`的概念 | `AAAAAAAAAAAA`、`CACACACACA`、`CAGCAGCAG...`                 | 比对和 indel calling 容易出错 |
|      **Mappability**       |              一条短 read 无法确定自己来自哪里               | 一个 150 bp 序列在 chr1、chr5、chr9 都差不多一样             | read 容易 map 错位置          |
| **Segmental Duplications** |              基因组存在很长的一整块“复制粘贴”               | chr1 有一段 20 kb，chr5 又有一个 99% 相似的版本              | 大批 reads 无法区分两个副本   |
|    **Other Difficult**     |              因特殊生物学/参考基因组原因而困难              | MHC、KIR、VDJ、reference gap                                 | 个体差异巨大或参考结构复杂    |
|         **Union**          |                  把若干种技术困难区域合并                   | Low mappability + Segmental duplications + 极端 high/low GC + LowComplexity tandem repeats / homopolymers + **chrX / chrY 的 XTR** 和 **ampliconic regions** | 得到一个更宽泛的“高风险区”    |







### 基础概念

数据结构图示：

```
                            COLUMN = sample
                    HG00096      HG00099      HG00105
                       │            │            │
                       ▼            ▼            ▼

ROW   chr1:904165   [entry]       [entry]      [entry]
      G>A            GT            GT           GT
       │             AD            AD           AD
       │             DP            DP           DP
       │             GQ            GQ           GQ
       ▼             PL            PL           PL

      chr1:909917   [entry]       [entry]      [entry]
      G>A

      chr1:986963   [entry]       [entry]      [entry]
      C>T
```

解释：

| 字段（Entry） |               全称                | 问题                                   | 涉及的操作                                                   |
| :-----------: | :-------------------------------: | -------------------------------------- | ------------------------------------------------------------ |
|    **GT**     |             Genotype              | 最终判断你是什么基因型？               |                                                              |
|    **AD**     |           Allele Depth            | REF、ALT 各有多少 reads 支持？         | **allele balance QC****[x, y]                                |
|    **DP**     |            Read Depth             | 这个样本在这个位置总共有多少测序深度？ | **uninformative reads**<int 32>                              |
|    **GQ**     |         Genotype Quality          | 对最终 GT 有多大信心？                 | 越大 → 最优 genotype 和竞争 genotype 区分得越明显  → genotype call 越可靠 |
|    **PL**     | Phred-scaled genotype likelihoods | 0/0、0/1、1/1 分别有多不符合数据？     | **PL 越小越好，0 最好。**[x, y, z]                           |

$PL_i=-10\log_{10}\left(\frac{L_i}{L_{\mathrm{best}}}\right)$

所以`PL = 10` → 该 genotype 的 likelihood 约为最佳 genotype 的 1/10；PL = 20 → 约为 1/100，依次类推。

接下来QC:

```
                     MatrixTable
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
          COLUMN        ENTRY        ROW
          sample       genotype    variant
             │           │           │
             ▼           ▼           ▼
         sample_qc     DP/GQ/AD    variant_qc
             │          GT/PL         │
             ▼           ▼           ▼
        filter_cols   filter_entries filter_rows
             │           │           │
             ▼           ▼           ▼
         删除整个人    删除一个格子    删除整个位点
```



### Sample_QC

|          字段          | 解释                                                         |
| :--------------------: | :----------------------------------------------------------- |
|    `dp_stats.mean`     | **这个 sample 跨所有位点的平均 DP**（Read Depth）            |
|    `dp_stats.stdev`    | 这个 sample 的 DP 标准差                                     |
|     `dp_stats.min`     | 这个 sample 所有 genotype entry 中最小 DP                    |
|     `dp_stats.max`     | 最大 DP                                                      |
|    `gq_stats.mean`     | **这个 sample 跨所有 genotype 的平均 GQ**（Genotype Quality） |
|    `gq_stats.stdev`    | GQ 标准差                                                    |
|      `call_rate`       | **这个 sample 有成功 genotype call 的位点比例**              |
|       `n_called`       | 有有效 GT 的位点数量                                         |
|     `n_not_called`     | GT missing 的位点数量                                        |
|      `n_filtered`      | 被 entry filtering 掉的 genotype 数量                        |
|      `n_hom_ref`       | `0/0` 数量                                                   |
|        `n_het`         | heterozygous genotype 数量                                   |
|      `n_hom_var`       | homozygous ALT 数量                                          |
|      `n_non_ref`       | `n_het + n_hom_var`                                          |
|     `n_singleton`      | 该 sample 携带的 private/singleton alternate allele 数       |
|        `n_snp`         | SNP alternate allele 数量                                    |
|     `n_insertion`      | insertion 数量                                               |
|      `n_deletion`      | deletion 数量                                                |
|     `n_transition`     | transition 数量                                              |
|    `n_transversion`    | transversion 数量                                            |
|       `r_ti_tv`        | transition / transversion                                    |
|    `r_het_hom_var`     | heterozygous / homozygous-alt                                |
| `r_insertion_deletion` | insertion / deletion                                         |

其中：$call\ rate = \frac{n_{\text{called}}} {n_{\text{rows}}}$，对这个 sample 来说，全部 variant 中，有多少比例成功得到了 genotype call



### Genotype QC

                  genotype entry
                       │
        ┌──────────────┼──────────────┐
        │              │              │
       DP             GQ             AD
    深度是否够？    call可信么？    allele balance正常么？
                                      │
                                      ▼
                             GT和read evidence
                              是否互相一致？

将会用到的概念AB：

`ab = mt.AD[1] / hl.sum(mt.AD)`：$AB = \frac{ALT} {REF+ALT}$

​	※注：`split_multi_hts()`用于处理：**multiallelic 位点**

具体条件如下：

`mt.GT.is_hom_ref() & (ab <= 0.1)`：GT = 0/0 并且 ALT reads ≤ 10%

`mt.GT.is_hom_var() & (ab >= 0.9)`：GT = 1/1 并且 ALT reads ≥ 90%

`mt.GT.is_het() & (ab >= 0.25) & (ab <= 0.75)`：GT = heterozygous 并且 ALT fraction 在 25%~75%

​	但**AB 偏离 0.5 到底有多严重，不能完全脱离 DP 来判断**，一方面**multiallelic 位点**，另一方面本身reads越高，偏离0.5的程度理论上越低。

最后实际执行filter：

`mt.filter_entries(filter_condition)`：按照上面条件执行，同时也会过滤掉`AD`或`GT`为missing的entry。



###  Variant QC

| 字段                 | 含义                                           |
| -------------------- | ---------------------------------------------- |
| `dp_stats`           | 当前 variant 跨 samples 的 DP 分布             |
| `gq_stats`           | 当前 variant 跨 samples 的 GQ 分布             |
| `AC`                 | allele count                                   |
| `AF`                 | allele frequency                               |
| `AN`                 | 总 called allele number                        |
| `homozygote_count`   | 各 allele 的纯合子数量                         |
| `call_rate`          | 当前 variant 在 samples 中成功 call 的比例     |
| `n_called`           | 成功得到 GT 的 sample 数                       |
| `n_not_called`       | GT missing 的 sample 数                        |
| `n_filtered`         | 被 genotype QC filter 的 entry 数              |
| `n_het`              | 该 variant 的 heterozygous samples 数          |
| `n_non_ref`          | 携带至少一个 non-reference allele 的 sample 数 |
| `het_freq_hwe`       | HWE 下预期 heterozygous frequency              |
| `p_value_hwe`        | Hardy-Weinberg equilibrium 双侧检验 p-value    |
| `p_value_excess_het` | excess heterozygosity 单侧 HWE test            |

其中

$AN = 这个位点所有人的genotype\times2$

$AC = REF和ALT分别的数量$

$AF = AC/AN$

即`mt.variant_qc.AF[0]`最终是：REF frequency，`mt.variant_qc.AF[1]`最终是ALT frequency



注意：`info.AF` 和 `variant_qc.AF`bu不完全一致，前者直接来自上游VCF，后者为重新计算的（当前 MatrixTable 中还剩下的 sample + 当前未过滤 genotype）



### HWE （被归入 variants QC）

对应`variant_qc.p_value_hwe`

例如一个常染色体二等位 variant：`AA Aa aa`

如果 allele frequencies 是：$p,\ q$

Hardy-Weinberg equilibrium 预期：$AA:p^2$     $Aa:2pq$     $aa:q2$

**※HWE 检验在二等位位点才有严格统计意义**；对 multiallelic variants，`variant_qc()` 会把相应 HWE 字段置为 missing，并建议需要时先 split multi-allelic variants。
