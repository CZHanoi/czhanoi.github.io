---
cover: /assets/images/ottoman.jpg
title:  吉祥事变 Auspicious Incident
icon: star-and-crescent
index: false
article: true
sticky: 99
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Here let us all for death prepare,<br>
    Or on the last great journey fare."
    <br>
    <span style="font-size: 0.9rem; color: #777;">
        — Vālmīki, <em>Rāmāyaṇa</em> (Ayodhyā-kāṇḍa 2.47.7); English verse trans. Ralph T. H. Griffith, <em>The Ramayana</em>, Book II, Canto XLVII (“The Citizens’ Return”)
    </span>
    <br>
    <span style="font-size: 0.9rem; color: #777;">
        Sanskrit: इहैव निधनं यामो महाप्रस्थानमेव वा।
    </span>
</blockquote>
自壬辰冬时至今，我们处于黑暗时代。——

（批注：耶尼切里：圣经；坦齐马特：歌词；花厅御诏：）

## 耶尼切里 Janissary

——单细胞技术整理

<div class="vp-card-container">
  <VPCard
    title="Janissary"
    desc="/ˈdʒænɪˌseri/ · n. 亲信，近卫；（奥斯曼帝国）土耳其禁卫军士兵"
    background="rgba(12, 188, 30, 0.3)"
    logo="/logoDark.png"
  />
</div>


| 基础代码 | 简介 |
| :--- | :--- |
| [Convert](./convert/) | 格式转换，格式 |
| [SCENIC+](./code/scenicplus.md) | SCENIC+ |
| [gsMap](./gsmap.md) | gsMap |
| [STalign](./code/STalign.md) | STalign 配准 |
| [hdWGCNA](./code/hdWGCNA.md) |  |

### Novae

```bash
mamba create --name novae python=3.12 -y
mamba activate novae
pip install 'novae[multimodal,conch,llm]'
python -m ipykernel install --user --name novae --display-name "Py312 novae"
```

#### novae_gpu

```bash
CONDA_OVERRIDE_GLIBC=2.17 mamba create -n novae_gpu -c conda-forge python=3.12 pip ipykernel "numpy=2.2.*" h5py pyarrow -y
python -m pip install     torch==2.5.1     torchvision==0.20.1     --index-url https://download.pytorch.org/whl/cu121
mamba install "numpy==2.2.6"   "pandas==2.2.3"   "h5py==3.14.0"   "scipy"   "scikit-learn==1.7.1"   "igraph"   "anndata==0.11.4"   "scanpy==1.11.5" -c bioconda -c conda-forge
python -m pip install   --constraint <(printf '%s\n' \                              
    'numpy==2.2.6' \
    'pandas==2.2.3' \
    'h5py==3.14.0' \
    'scipy==1.15.3' \
    'scikit-learn==1.7.1' \
    'igraph==0.11.9' \
    'anndata==0.11.4' \
    'scanpy==1.11.5')   "novae[conch,llm]==1.1.1"
    
python -m ipykernel install --user --name novae-gpu --display-name "Py312 novae-gpu"
```



### Allensdk

```bash
mamba create -n allensdk -c conda-forge python=3.10 scanpy=1.11.5 pip ipykernel jupyterlab -y
python -m pip install "git+https://github.com/AllenInstitute/AllenSDK.git@master"
python -m ipykernel install --user --name allensdk --display-name "Py310 allensdk"
```

```python
python - <<'PY'
import numpy
import pandas
import scipy
import scanpy
import allensdk

print("numpy   :", numpy.__version__)
print("pandas  :", pandas.__version__)
print("scipy   :", scipy.__version__)
print("scanpy  :", scanpy.__version__)
print("allensdk:", allensdk.__version__)
PY
```



### spAlignDE

这些代码

```bash
cd /cwStorage/home/chenzhh/Env/spAlignDE-main
unset PYTHONPATH
export PYTHONNOUSERSITE=1
# mamba env create -f environment.yml -y
# mamba create -n spAlignDE -c conda-forge python=3.10.14 pip=26.0.1 setuptools=80.9.0 wheel=0.46.3 -y
# python -m pip install torch==2.10.0+cu128 torchvision==0.25.0+cu128 --index-url https://download.pytorch.org/whl/cu128
mamba create -y -n spAlignDE -c conda-forge --override-channels python=3.10.14 pip setuptools wheel git numpy=1.26.4 scipy=1.10.1 pandas=2.2.3 anndata=0.10.8 "h5py=3.11.*=nompi*" matplotlib-base=3.9.2 shapely=2.0.6 scanpy=1.10.3 scikit-image=0.24.0 scikit-learn=1.5.2 seaborn=0.13.2 harmonypy=0.2.0 python-igraph=0.11.9 leidenalg=0.10.2 louvain=0.8.2 umap-learn=0.5.11 einops=0.8.1 pynrrd=1.0.0 pyyaml=6.0 ipykernel ipywidgets jupyterlab nbconvert nbformat plotly

mamba activate spAlignDE
python -m pip install --only-binary=:all: pillow==12.1.0 imagecodecs==2025.3.30 opencv-python-headless==4.10.0.84 tifffile==2025.5.10 webdataset==1.0.2
python -m pip install torch==2.6.0+cu118 torchvision==0.21.0+cu118 --index-url https://download.pytorch.org/whl/cu118
python -c "import torch,torchvision; print('torch=',torch.__version__); print('torchvision=',torchvision.__version__); print('CUDA runtime=',torch.version.cuda); print('CUDA available=',torch.cuda.is_available()); print('GPU=',torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'NONE'); print('capability=',torch.cuda.get_device_capability(0) if torch.cuda.is_available() else 'NONE')"
python -c "import torch; x=torch.randn(4096,4096,device='cuda'); y=x@x; torch.cuda.synchronize(); print(y.shape,y.device,torch.cuda.get_device_name(0))"

python -m pip install --no-deps "pybanksy @ git+https://github.com/prabhakarlab/Banksy_py.git@43e2d692db6705c0195039764194473912e4cfc2"
python -m pip install --only-binary=:all: pyarrow==17.0.0
mamba install -y -c conda-forge --override-channels "greenlet<3.5" "sqlalchemy<2.1" "jupyter-cache=1.0.1"
python -m pip install streamlit==1.60.0 myst-nb==1.1.2 pytest==9.1.1 sphinx==7.4.7 sphinx-rtd-theme==2.0.0
python -m pip install --no-deps --no-build-isolation -e .

# ↑ mamba -f 安装到pip的时候会卡住，目前没有更好的解决方案
python -m pip install --no-deps python-igraph==0.11.9
mamba install -y -c conda-forge --override-channels scikit-learn=1.6.1
python -m ipykernel install --user --name spAlignDE --display-name "Python310 spAlignDE"
```



##  坦齐马特 Tanzimat

——遗传相关技术整理

<div class="vp-card-container">
   <VPCard
    title="Tanzimat"
    desc="/ˈtanzɪmat/ · n. 改革；（奥斯曼帝国 1839–1876 年的）整顿、重组改革"
    background="var(--vp-c-bg-soft)"
    logo="/logo.png"
  />
</div>
- 隶属于[三二七汉边改革](/medicine/enthalpy.md)

代码分区块整理：



### [PLINK](plink.md)



### 遗传度

#### [GCTA](./Tanzimat/GCTA.md)

👉🏻[文档地址](https://yanglab.westlake.edu.cn/software/gcta/#Overview)

#### [MPH](./Tanzimat/GCTA.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)



### 注释

#### [ANNOVAR](./Tanzimat/ANNOVAR.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)

#### [VEP](./Tanzimat/VEP.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)



### Fine-mapping

[SuSiE](./Tanzimat/SuSiE.md)

[FINEMAP](./Tanzimat/FINEMAP.md)

[GCTB](./Tanzimat/GCTB.md)



### [STAAR](./Tanzimat/STAAR.md)

👉🏻[STAAR github](https://github.com/li-lab-genetics/STAAR)

👉🏻[cellSTAAR github](https://github.com/edvanburen/cellSTAAR/)

👉🏻[MetaSTAARlite github](https://github.com/li-lab-genetics/MetaSTAARlite/)




### [进化基因组学](./Tanzimat/Evolution.md)

👉🏻[HARE](https://github.com/ossmith/HARE)



### [与scRNA-seq的联合分析](./Tanzimat/sc.md)

#### [gsMap](./Tanzimat/sc.md#gsMap)

👉🏻[文档地址](https://yanglab.westlake.edu.cn/gsmap/document/software)



### [freesurfer&fsl](./Tanzimat/fs.md)

👉🏻[文档地址](https://annovar.openbioinformatics.org/en/latest/user-guide/startup/)



## 花厅御诏（Gülhane Hatt-ı Şerif）

——WGS数据基础处理





### [hail](./Gulhane/hail.md)

👉🏻[教程](https://hail.is/docs/0.2/index.html)

👉🏻[hail-is/HAIL](https://github.com/hail-is/HAIL)

👉🏻[Nealelab/whole_genome_analysis_pipeline](https://github.com/Nealelab/whole_genome_analysis_pipeline)
