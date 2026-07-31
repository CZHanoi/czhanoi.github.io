---
title: SuSiE
icon: dna
article: true
cover: joseon.jpg
category:
  - code
  - knowledge
tag:
  - Tanzimat
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;"> "Cleanse my heart from all vain, evil, and wandering thoughts;<br>Enlighten my understanding;<br>Kindle my affections." <br> <span style="font-size: 0.9rem; color: #777;">— the Prayer Before the Divine Office (<em>Aperi, Domine, os meum</em>)</span> </blockquote>



## Install & Calling

```shell
mamba create -y -n FM   --override-channels   -c conda-forge   -c bioconda   python=3.11   jupyterlab   notebook   ipykernel   numpy   pandas   scipy   matplotlib   pyarrow   openpyxl   r-base=4.4   r-data.table   r-matrix   r-ggplot2   r-irkernel   finemap=1.4.2   plink2   gcta
mamba activate FM
R
```



```R
# install.packages("remotes")
remotes::install_github("stephenslab/susieR")
# Rscript -e 'IRkernel::installspec(name="ir-fm", displayname="R (FM: SuSiE)")'
IRkernel::installspec(user = TRUE, name = "r-fm", displayname = "R453 Finemapping")
```



```shell
python -m ipykernel install --user --name FM --display-name "Py311 Finemapping"

GCTB_HOME="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5"
GCTB_BIN="${GCTB_HOME}/bin"
readlink -f "${GCTB_BIN}/gctb"
# /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5/dist/gctb_2.5.5_Linux/gctb
```



```bash
mkdir -p \
  "${CONDA_PREFIX}/etc/conda/activate.d" \
  "${CONDA_PREFIX}/etc/conda/deactivate.d"

cat > "${CONDA_PREFIX}/etc/conda/activate.d/gctb.sh" <<'EOF'
export _FM_PATH_BEFORE_GCTB="${PATH}"
export GCTB_HOME="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5"
export PATH="${GCTB_HOME}/bin:${PATH}"
EOF

cat > "${CONDA_PREFIX}/etc/conda/deactivate.d/gctb.sh" <<'EOF'
if [[ -n "${_FM_PATH_BEFORE_GCTB:-}" ]]; then
  export PATH="${_FM_PATH_BEFORE_GCTB}"
fi

unset _FM_PATH_BEFORE_GCTB
unset GCTB_HOME
EOF
```

我的建议是直接建立软链接：



```bash
GCTB_REAL="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/public/czh_data/Tanzimat/software/gctb/2.5.5/dist/gctb_2.5.5_Linux/gctb"
ln -s \
  "${GCTB_REAL}" \
  "${CONDA_PREFIX}/bin/gctb"
readlink -f "${CONDA_PREFIX}/bin/gctb"
```



```bash
mamba env export -n FM --no-builds > /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/Env/FM_environment.yml
```



## SuSiE原理

### SuSiE: Sum of Single Effects

解释：对于一个**稀疏贝叶斯多元线性回归模型**：$y=μ+Xb+ε$，把总效应向量 $b$ 拆成多个**“单效应向量”**的和：
$$
b
=
b^{(1)}
+
b^{(2)}
+
\cdots
+
b^{(L)}\\
其中，\left\|b^{(\ell)}\right\|_0\leq 1
$$
$\left\|b^{(\ell)}\right\|_0\leq 1$ ：表示每一个 $b^{(\ell)}$ 中**只允许一个位置非零**。

$L$：**表示模型最多允许多少个单效应**。



※`susieR` 使用 **IBSS 算法**反复更新这些单效应，并输出每个单效应的**后验概率**、**总体 PIP** 和 **credible sets**。


$$
y
=
\mu\mathbf{1}_n
+
\sum_{\ell=1}^{L}Xb^{(\ell)}
+
\varepsilon\\
其中，\left\|b^{(\ell)}\right\|_0\leq 1
$$
其中每个单效应向量最多只有一个非零元素，这里 $\|\cdot\|_0$ 表示非零元素的数量。



### 普通多元线性回归模型

对于第$i$个人来说，假设有$p$个SNP，其**基因-表型的真实模型**的表示为：
$$
y_i
=
\mu
+
x_{i1}b_1
+
x_{i2}b_2
+
\cdots
+
x_{ip}b_p
+
\varepsilon_i
\\等价于：y_i
=
\mu
+
\sum_{j=1}^{p}x_{ij}b_j
+
\varepsilon_i
$$
其中：

$n$：样本数量；

$p$：SNP 数量；

$i$：个体编号，$i=1,\ldots,n$；

$j$：SNP 编号，$j=1,\ldots,p$；

$y_i$：第 $i$ 个人的表型；

$x_{ij}$：第 $i$ 个人在第 $j$ 个 SNP 上的基因型编码；

$b_j$：控制其他 SNP 后，第 $j$ 个 SNP 的直接统计效应；

$\mu$：总体平均值；

$\varepsilon_i$：不能被这些 SNP 解释的部分。

表达的精神是：<u>对于每一个个体，他的$p$个基因型$x_j$，产生对应的效应$b$，使其偏离平均值$μ$的程度</u>。可以写作矩阵格式：
$$
矩阵形式：y=μ+Xb+ε
$$
其中：

$y$：长度为 $n$ 的表型向量；（样本×1）

$X$：$n\times p$ 的基因型矩阵；（样本×SNP）

$b$：长度为 $p$ 的 SNP 效应向量；（SNP×1）

$\varepsilon$：长度为 $n$ 的残差向量。（样本×1）



### 单效应假设 "Single Effects" 及 后验概率$\alpha_{\ell j}$

**Fine-mapping 的稀疏假设**：一个区域中可能有 1000 个 SNP，但真正具有直接效应的可能只有 1～3 个。

**单效应（Single Effects）**:指的便是稀疏假设下，代表SNP产生效应的向量，每个有效应的SNP对应一个单效应向量$b^{(l)}$，总效应变量就是各个单效应向量$b^{(l)}$的和：
$$
b^{(1)}=\begin{bmatrix}0.8\\0\\0\\0\\0\end{bmatrix},b^{(2)}
=
\begin{bmatrix}
0\\
0\\
0\\
-0.6\\
0
\end{bmatrix}，
b
=
b^{(1)}
+
b^{(2)}，b
=
\begin{bmatrix}
0.8\\
0\\
0\\
-0.6\\
0
\end{bmatrix}
$$
但计算的时候，我们只能估计每个SNP有多少概率贡献这个单效应，记作：
$$
α_{ℓj}\ \ ,\ \ where：\sum_{j=1}^{p}
\alpha_{\ell j}
=
1
$$
其中：

$\ell$：第几个单效应；（$L$）

$j$：第几个 SNP；($p$)

$\alpha_{\ell j}$：第 $\ell$ 个效应位于 SNP $j$ 的后验概率。

如$α_{1,1}=0.55$表示：在模型的第一个独立信号中，SNP1 是效应变量的概率为 55%。

※`fit$alpha` 在 `susieR` 中就是一个 $L\times p$ 的矩阵：每一行对应一个单效应，每一列对应一个 SNP。



#### $\alpha$的计算过程

**残差$r_i$**：已经扣除了其他已发现信号后，还剩下多少表型没有被解释。



对于 SNP $j$，先计算边际效应$\hat{\beta}_j$（暂时假设 $x$ 和 $r$ 已经做过中心化）：
$$
\hat{b}_j
=
\frac{
\sum_{i=1}^{n}x_{ij}r_i
}{
\sum_{i=1}^{n}x_{ij}^2
}
$$
$\hat b_j$：用当前残差估计出的 SNP $j$ 的效应；

$x_{ij}$：第 $i$ 个人的 SNP $j$ 基因型；

$r_i$：第 $i$ 个人当前尚未解释的表型；

$\sum_i x_{ij}r_i$：基因型和残差一起变化的程度；

$\sum_i x_{ij}^2$：该 SNP 在样本中的变异量。



效应的不确定性（类似于标准误），记作$s_j$。



##### <1>`SuSiE` 给效应大小设置一个正态先验：

$$
b_{j}
\sim
N\!\left(
0,\tau^2
\right)
$$

$\sim$：服从某个分布；

$N$：正态分布；

0：先验均值，表示分析前不认为效应一定是正或负；

$\tau^2$：先验方差；$\tau^2$ 越大，表示模型事先允许出现更大的效应。



##### <2>随后计算每个 SNP 的 Bayes factor：

$$
BF_j
=
\sqrt{
\frac{
s_j^2
}{
s_j^2+\tau^2
}
}
\exp
\left[
\frac{
\hat{b}_j^2\tau^2
}{
2s_j^2
\left(
s_j^2+\tau^2
\right)
}
\right]
$$

其中：

$BF_j$：SNP $j$ **有效应相对于没有效应的证据**；

$\exp(a)=e^a$：指数函数；

$\hat b_j^2$：估计效应的平方；

$s_j^2$：标准误的平方；

$\tau^2$：先验效应方差。

**作用是：**将①效应估计 $\hat b_j$；②不确定性 $s_j$；③先验效应范围 $\tau^2$；合并成一个“证据强度”。



##### 计算每个SNP对单效应的贡献概率分布（即，后验概率）

对于每个单效应$b_\ell$：
$$
\alpha_{\ell j}
=
P\!\left(
\gamma_{\ell j}=1
\mid
X,y
\right)\\
\\\alpha_{\ell j}
=
\frac{
\pi_j BF_{\ell j}
}{
\sum_{k=1}^{p}
\pi_k BF_{\ell k}
}
$$
$\alpha_j$：这个单效应位于 SNP $j$ 的后验概率；

$\pi_j$：分析之前认为 SNP $j$ 有效应的先验概率；如果所有 SNP 没有功能注释，通常可以设置：$\pi_j=\frac{1}{p}$，即`prior_weights=NULL`；

$BF_j$：数据对 SNP $j$ 的支持程度；

$k$：求和时使用的临时 SNP 编号；

分母$\sum_{k=1}^{p}\pi_k BF_{\ell k}$：所有 SNP 的“先验 × 数据证据”之和。



### IBSS：Iterative Bayesian Stepwise Selection

迭代贝叶斯逐步选择，SuSiE文章提出的迭代方法，不重要，就是一种不断来回修正最后得到稳定$\alpha_{\ell j}$解的过程。



### 后验纳入概率 PIP: Posterior Inclusion Probability

表示：SNP $j$ 在所有单效应中，至少参与一个非零效应的概率。
$$
PIP_j
=
1-
\prod_{\ell=1}^{L}
(1-\alpha_{\ell j})
$$
其中：

$PIP_j$：SNP $j$ 的总体后验纳入概率；

$L$：允许的最大效应数量；

$\alpha_{\ell j}$：第 $\ell$ 个效应位于 SNP $j$ 的概率；

$1-\alpha_{\ell j}$：第 $\ell$ 个效应不在 SNP $j$ 上的概率；

**※表达的精神是**：<u>连乘得到所有效应都不在 SNP $j$ 上的概率，用 1 减去它后得到至少有一个效应位于 SNP $j$ 的概率。</u>



### 可信集合 Credible Set

对于每个**单效应**$b_\ell$，构建 **95% credible set**。可以理解为从大到小依次纳入$\alpha$高的SNP，直到＞0.95。如：

1. 按概率从大到小排序；
2. 先加入 SNP1，累计概率为 0.55；
3. 再加入 SNP2，累计概率为：$0.55+0.43=0.98$→已经超过 0.95，因此停止。

最终得到：$CS_1=\{SNP1,SNP2\}$；它的含义是：<u>对于第一个独立信号，SNP1 和 SNP2 这个集合累计承载了至少 95% 的后验概率。</u>模型基本确定这个信号位于 SNP1 和 SNP2 之间，但可能因为二者 LD 太高，无法进一步判断具体是哪一个。



### 纯度 Purity

Purity 用于判断一个 credible set 中的 SNP 是否属于同一个高 LD 簇。

一个常见指标是集合内部 SNP 之间最小的绝对相关性：
$$
\operatorname{purity}
=
\min_{j,k\in CS}|R_{jk}|
$$
$CS$：某个 credible set；

$j,k$：集合内任意两个 SNP；

$R_{jk}$：两个 SNP 的相关系数；

例如：purity=0.93，说明集合内即使是相关性最低的一对 SNP，其绝对相关性也有 0.93。通常表示：这是一个非常紧密的 LD 簇，数据知道信号就在这个簇中，但不知道具体是哪一个 SNP。









