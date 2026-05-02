---
title: Mamba 
date: 2026-03-02
cover: renaissance.jpeg
category:
  - Oracle
tag:
  - Manager
star: False
article: true
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Time crumbles things; everything grows old and is forgotten under the power of time."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Aristotle</span>
</blockquote>
## mamba环境管理

### Goni

#### Goni-metal

- 运行[`METAL`](https://github.com/statgen/METAL)

```bash
mamba create -y -n goni-metal -c conda-forge python=3.11 pandas numpy matplotlib matplotlib-venn cmake make cxx-compiler git bedtools pigz wget curl
#git clone https://github.com/statgen/METAL.git
#上传至服务器"$HOME/software/METAL"
mkdir build && cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
 make -j"$(nproc)"
```



```
mamba install ipykernel
python -m ipykernel install --user --name goni-metal --display-name "Py311 Goni-metal"
```



### STalign

见[STalign](/computer/STalign.md)

- ST配准

  

### Faxai

```bash
mamba create -n Faxai -c conda-forge --override-channels python=3.11 scanpy pandas jupyterlab ipykernel -y

mamba activate Faxai

python -m ipykernel install --user --name faxai --display-name "Py311 Faxai"

pip install glasbey
```

- 单细胞数据的基础分析

```bash
mamba activate Faxai
mamba install -c conda-forge -c bioconda --strict-channel-priority r-base=4.4 r-cli r-crayon r-hdf5r r-matrix r-r6 r-rlang r-seurat r-seuratobject r-stringi r-withr
```

```bash
Rscript -e 'install.packages("remotes", repos="https://cloud.r-project.org")'
R CMD INSTALL /home1/chenzhh/package/R/seurat-disk-master
# Test
Rscript -e 'library(SeuratDisk); cat("SeuratDisk version:", as.character(packageVersion("SeuratDisk")), "\n")'
Rscript -e 'library(SeuratDisk); sessionInfo()'

mamba install r-irkernel -y

mamba install -y -c conda-forge -c bioconda --strict-channel-priority r-data.table r-dplyr  r-ggplot2 r-patchwork r-ggalluvial r-stringr r-forcats r-tibble \
  bioconductor-biomart bioconductor-zellkonverter bioconductor-singlecellexperiment
  
mamba install r-bpcells r-wgcna bioconductor-edger r-gprofiler -y
mamba install -c conda-forge r-broom r-purrr
```



```R
# install.packages("IRkernel", repos="https://cloud.r-project.org")
IRkernel::installspec(user = TRUE, name = "faxai-r", displayname = "R453 Faxai")
q()
```

### 

### SIMO

```
mamba create -n simo python=3.8 -y
mamba activate simo
pip install simo-omics scanpy
mamba install ipykernel
python -m ipykernel install --user --name simo --display-name "Py38 SIMO"
```



### Mujigae

见[Secnicplus](/computer/code/scenicplus#installation)

- 主要用于[SCENIC+](https://scenicplus.readthedocs.io/en/latest/)分析



### macs2

用于使用[`macs2`]()

```bash
mamba create -n macs2 macs2 -c conda-forge -c bioconda --strict-channel-priority
mamba activate macs2
which macs2
# /cwStorage/home/chenzhh/miniforge3/envs/macs2/bin/macs2
```



## Cfff平台的mamba建立



### 前言-为什么不能安装在`$HOME`下面？

#### 容器内文件系统的两类区域：

**1. 临时层（容器自己的根文件系统）**

- 包括 `/`、`/usr`、`/etc`、`/root`、`/home/zy_22111220045` 等等。
- 这些来自**镜像**。镜像是**只读**模板，容器启动时会在镜像之上加一层"可写层"（overlayfs / aufs 之类）让你能改东西。
- 但这一层**容器销毁就没了**。DSW 关闭、重启、扩缩容、迁移到别的物理机时，容器会被重建，可写层丢失，回到镜像里的初始状态。
- 所以 `~`存在镜像中，简单说就是在 home 里装的东西是绑定镜像的（对每个DSW来说，重要的是`~/.bashrc`）

**2. 持久层（外挂存储 / 数据卷）**

- `/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045` 这种路径，是 **CPFS**（阿里云的并行文件系统，类似 Lustre）通过网络挂载进容器的。
- 它**不在容器里**，物理上存在远端的存储集群。容器只是把它"挂载"到这个路径。
- 容器销毁、重建、换机器都不会影响 CPFS 里的数据。所以这个目录下的东西**永远在**。



由此，我们的思路就很明确了；

①如果这个mamba想被HPC调用，或者多个容器打开不同的DSW都能使用→安装在持久层；

②如果这个mamba只想自己用，则→安装在临时层，然后保存镜像。

**我将选择第①种：******下面的任务只需要运行一下！！！！**

### 安装`Miniforge3`

下载

```bash
https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
```

然后

```bash
bash Miniforge3-Linux-x86_64.sh -b -p /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/miniforge3
```

### **每次用新的镜像创建新的DSW时运行：**

基础配置

```bash
cat > ~/.bash_profile <<'EOF'
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
EOF
```

写入`~/.bashrc`

```bash
cat >> ~/.bashrc <<'EOF'

# ---- mamba (Miniforge3) on shared storage ----
export MAMBA_ROOT_PREFIX=/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/miniforge3
export PATH=$MAMBA_ROOT_PREFIX/bin:$PATH
export CONDARC=$MAMBA_ROOT_PREFIX/.condarc

if [ -f "$MAMBA_ROOT_PREFIX/etc/profile.d/conda.sh" ]; then
    source "$MAMBA_ROOT_PREFIX/etc/profile.d/conda.sh"
fi
if [ -f "$MAMBA_ROOT_PREFIX/etc/profile.d/mamba.sh" ]; then
    source "$MAMBA_ROOT_PREFIX/etc/profile.d/mamba.sh"
fi
# -----------------------------------------------
EOF

```

然后检查

```bash
source ~/.bashrc
echo $MAMBA_ROOT_PREFIX
which mamba
mamba --version
```

### 解决`pkgs`冲突问题

```bash
CONDARC="/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/miniforge3/.condarc"

# cp "$CONDARC" "${CONDARC}.bak.$(date +%Y%m%d%H%M%S)"

mkdir -p "$HOME/.conda/pkgs"

cat > "$CONDARC" <<EOF
channels:
  - conda-forge

pkgs_dirs:
  - $HOME/.conda/pkgs

mirrored_channels:
  conda-forge:
    - https://conda.anaconda.org/conda-forge
    - https://prefix.dev/conda-forge
EOF
```



## ※HPC任务调用自己的mamba环境



需要在脚本中显式`source`

```bash
#!/bin/bash
#SBATCH --job-name=myjob
#SBATCH --output=%j.out
# 其他 SBATCH 指令...

# === 显式加载 mamba（不依赖 ~/.bashrc）===
export MAMBA_ROOT_PREFIX=/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/miniforge3
export PATH=$MAMBA_ROOT_PREFIX/bin:$PATH
export CONDARC=$MAMBA_ROOT_PREFIX/.condarc
source $MAMBA_ROOT_PREFIX/etc/profile.d/conda.sh
source $MAMBA_ROOT_PREFIX/etc/profile.d/mamba.sh

# === 激活环境，跑程序 ===
mamba activate myenv
python train.py

```



## Rebuild 重建

现在如果迁移成功的话，我们账号通过最新的`10.190.xxx.xxx`登录节点之后，应该得到下面的结果：

```shell
pwd 
```

输出为：

```bash
/home1/chenzhh
```

而请注意，

```bash
pwd -P
```

输出为：

```bash
/cwStorage/home/chenzhh
```

其中：

`$HOME` 是你登录环境里的家目录写法

`pwd -P` 会给你当前目录的**物理路径**



### 基础配置（mamba安装、jupyter的启动）

#### 〇查看架构

```bash
uname -m
arch
#任选其一
```

#### ①下载

```bash
wget https://github.com/conda-forge/miniforge/releases/download/26.1.1-3/Miniforge3-26.1.1-3-Linux-x86_64.sh
# 或者本地下载再传到服务器上
echo "b25b828b702df4dd2a6d24d4eb56cfa912471dd8e3342cde2c3d86fe3dc2d870  Miniforge3-26.1.1-3-Linux-x86_64.sh" | sha256sum -c -
```

#### ②运行安装脚本

```
#因为过于熟悉，咱们直接非交互式安装了就💦
bash Miniforge3-26.1.1-3-Linux-x86_64.sh -b -p "$HOME/miniforge3"
```

#### ③check step 1:

验证conda可以使用

```
source "$HOME/miniforge3/etc/profile.d/conda.sh"

conda activate
```



#### ④写入`~/.bashrc`

```bash
# ~/miniforge3/bin/conda init bash
上一步骤并非必须，因为conda确实能够被mamba平替，以及实践操作下来，下面的步骤完成以后一样可以使用conda
export MAMBA_ROOT_PREFIX="$PREFIX"
"$PREFIX/bin/mamba" shell init -s bash -r "$MAMBA_ROOT_PREFIX"
```



#### ⑤check step 2:

新打开一个终端：

```bash
echo "$MAMBA_ROOT_PREFIX"
which mamba
mamba info
```

没有报错则说明安装成功



#### ⑥附：更新`.condarc`

```bash
mamba config list --sources
```

应该会得到类似输出：

```bash
channels:
  - conda-forge  # '/cwStorage/home/chenzhh/miniforge3/.condarc'
mirrored_channels:
  conda-forge:
    - https://conda.anaconda.org/conda-forge  # '/cwStorage/home/chenzhh/miniforge3/.condarc'
    - https://prefix.dev/conda-forge  # '/cwStorage/home/chenzhh/miniforge3/.condarc
```

我的建议是统一存储在`~/.mambarc`

```bash
conda config --file ~/.mambarc --set show_channel_urls true
```

然后

```bash
cat > ~/.mambarc <<'YAML'
channels:
  - conda-forge
  - bioconda
  - nvidia
channel_priority: strict
show_channel_urls: true
YAML
# 清理索引缓存，让新源立即生效
conda clean -i -y

```

就大功告成了

#### ⑦附：重新搭建Jupyter

##### 安装&基础配置生成

```
mamba activate base
mamba install jupyter -y
jupyter server --generate-config
# Writing default config to: '/cwStorage/home/chenzhh/.jupyter/jupyter_server_config.py'
```

##### 设置密码

```bash
jupyter server password
# Enter password: 
# Verify password:
```

##### 查看当前运行的jupyter

```bash
jupyter server list
# Currently running servers:
# http://localhost:1224/ :: /cwStorage/home/chenzh
```

##### 关掉

```bash
jupyter server stop 1224
```

##### 启动

```bash
nohup jupyter lab --config="$HOME/.jupyter/jupyter_server_config.py" \
  > "$HOME/jupyter_log/log_jupyter_1224_$(hostname).log" 2>&1 &
```





#### ⑧`~/.condarc`

```bash
# ~/.condarc
channels:
  - defaults
  - conda-forge
channel_priority: flexible
```





## mamba 环境迁移

起因：某个大傻纸把所有的cfff上所有的mamba环境都安装在`/home`下面了；但后面要使用HPC的时候，只能调用`/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/`目录下的内容，因此导致需要将mamba环境迁移到后面的目录中

操作

```bash
SRC=/home/zy_22111220045/miniconda3/envs/scenicplus
DEST=/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/Env/scenicplus
mkdir -p "$(dirname "$DEST")"
conda create --prefix "$DEST" --clone "$SRC" --copy -y

# find "$DEST" -type d -name "__pycache__" -prune -exec rm -rf {} +
# grep -R "/home/zy_22111220045/miniconda3/envs/scenicplus" -n "$DEST/bin" | head
# grep -RIn --binary-files=without-match "/home/zy_22111220045/miniconda3/envs/scenicplus" "$DEST/bin" | head
```

其中

`conda create`：创建一个新环境。 

`--prefix "$DEST"`（等价 `-p "$DEST"`）：把新环境**创建在这个绝对路径**。

`--clone "$SRC"`：**从现有本地环境复制一份**到新环境（尽量做到“同一个环境的拷贝”）。

`--copy`：安装/落盘时**用复制**，而不是硬链接/软链接（跨文件系统时更稳，尤其你从 `/home` 到 `/cpfs01`）。

`-y`：自动回答 yes



使用的时候便可以:

```
conda activate /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/Env/scenicplus
```

