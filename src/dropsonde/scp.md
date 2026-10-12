---
title: 传输&下载&基础处理
date: 2026-03-02
cover: england.jpg
category:
  - Oracle
tag:
  - Manager
star: False
article: False
---



<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    "Wherefore criest thou unto me?<br>
    speak unto the children of Israel,<br>
    that they go forward."
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Exodus 14:15 (King James Version)</span>
</blockquote>



## 传输



### rclone

tips: 现在除非特别简便的小文件，大部分推荐使用rclone，最重要的优势是**可以挂在后台，终端关掉依然继续运行**；而[scp](#scp)等其他工具使用`nohup`和输入密码操作会冲突。

#### 安装：

```bash
mamba install rclone
```





### SCP

```bash
scp -P 59813 -r ./pre chenzhh@10.190.248.214:/public/home/chenzhh/Ashoka/Fro
scp -P 30299 -r ./Fro/ zy_22111220045@10.193.2.99:/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/Data
#当前目录下所有文件
scp -P 30089 -r "$(pwd)" zy_22111220045@10.193.2.99:/cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/Data/stereo/
```





## 下载



### synapse

之前的情报有误，其实大部分文件还是可以下载的，只有设计基因组原始文件需要二次审批，由PI写一个申请，我没有尝试过；

#### 安装

[官方文档 synapse-api-clients](https://docs.synapse.org/synapse-docs/installing-synapse-api-clients)

```bash
# mamba activate /cpfs01/projects-HDD/cfff-afe2df89e32e_HDD/zy_22111220045/miniforge3/envs/ucsc_kent_compat
pip install synapseclient

synapse login -p "authtoken"
# 输入自己的token
synapse -h
```

[`authtoken`获取](https://accounts.synapse.org/authenticated/personalaccesstokens)



#### 使用

```bash
nohup bash -c '
synapse get -r syn61929919 \
  --downloadLocation "./syn61929919" \
  --manifest root

download_rc=$?
printf "%s\n" "$download_rc" > "../logs/syn61929919.exitcode"
exit "$download_rc"
' > "../log/syn61929919.download.log" 2>&1 &
```



### ZIP

```
zip -r TF.zip ./TF -x "*/.git/*" -x "*/__pycache__/*" -x "*.pyc"
```
