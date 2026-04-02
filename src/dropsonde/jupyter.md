---
title: Hanoi's Jupyter
date: 2026-03-27
cover: yue.jpg
category:
  - Oracle
tag:
  - Manager
star: False
article: true

---



## 更新后版本

[三二七-汉边改革](/medicine/#三二七-汉边改革)

对`nodecw1`到`nodecw12`实行`jupyter runtime`和（主要是）`jupyter config`分离制度，实现`kernel`隔离。

```bash
# nodecw1
~/bin/start_jlab.sh 1513
# nodecw2
~/bin/start_jlab.sh 8686
# nodecw3
~/bin/start_jlab.sh 1705
# nodecw4
~/bin/start_jlab.sh 1323
# nodecw5
~/bin/start_jlab.sh 2216
# nodecw6
~/bin/start_jlab.sh 2114
# nodecw7
~/bin/start_jlab.sh 2222
# nodecw8  →Permission Denied
~/bin/start_jlab.sh 1919
# gpucw1
~/bin/start_jlab.sh 9999
# nodecw9  →Permission Denied
~/bin/start_jlab.sh 2122
# nodecw10 →Permission Denied
~/bin/start_jlab.sh 1013
# nodecw11
~/bin/start_jlab.sh 1614
# nodecw12
~/bin/start_jlab.sh 1224
# nodecw13 →Permission Denied
~/bin/start_jlab.sh 1330
```

`~/bin/start_jlab.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

PORT="${1:?usage: start_jlab.sh <port>}"
NODE="$(hostname -s)"

BASE_DIR="$HOME/.jupyter_instances/${NODE}_${PORT}"
RUNTIME_DIR="$BASE_DIR/runtime"
CONFIG_DIR="$BASE_DIR/config"
LOG_DIR="$HOME/jupyter_log"

mkdir -p "$RUNTIME_DIR" "$CONFIG_DIR" "$LOG_DIR"


export JUPYTER_RUNTIME_DIR="$RUNTIME_DIR"


export JUPYTER_CONFIG_DIR="$CONFIG_DIR"


if [ -f "$HOME/.jupyter/jupyter_server_config.py" ] && [ ! -f "$CONFIG_DIR/jupyter_server_config.py" ]; then
    cp "$HOME/.jupyter/jupyter_server_config.py" "$CONFIG_DIR/jupyter_server_config.py"
fi

if [ -f "$HOME/.jupyter/jupyter_server_config.json" ] && [ ! -f "$CONFIG_DIR/jupyter_server_config.json" ]; then
    cp "$HOME/.jupyter/jupyter_server_config.json" "$CONFIG_DIR/jupyter_server_config.json"
fi

JUPYTER_BIN="$HOME/miniforge3/bin/jupyter"

nohup "$JUPYTER_BIN" lab \
  --ServerApp.ip=127.0.0.1 \
  --ServerApp.port="$PORT" \
  --ServerApp.open_browser=False \
  --ServerApp.root_dir="$HOME" \
  > "$LOG_DIR/log_jupyter_${PORT}_${NODE}.log" 2>&1 &

echo $! > "$BASE_DIR/jupyter.pid"

echo "Started JupyterLab on node=$NODE port=$PORT"
echo "Runtime dir: $JUPYTER_RUNTIME_DIR"
echo "Config dir : $JUPYTER_CONFIG_DIR"
echo "Log file   : $LOG_DIR/log_jupyter_${PORT}_${NODE}.log"
```



### jupyter基础信息查看命令

```bash
jupyter --paths
jupyter server --show-config
jupyter kernelspec list
```

### kernel管理

#### python创建

```bash
mamba create -n py311 python=3.11 ipykernel -y
mamba activate py311
python -m ipykernel install --user --name py311 --display-name "Python (py311)"
```

#### R创建

```bash
mamba create -n r4 r-base -y
mamba activate r4
R
```

然后运行

```R
install.packages("IRkernel")# , repos="https://cloud.r-project.org")
IRkernel::installspec(user = TRUE, name = "ir-r4", displayname = "R (r4)")
q()
```



### 附：重新搭建Jupyter

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







## 旧党

```bash
mamba activate base

nohup jupyter lab --port=2222 --no-browser 2>&1 >log_jupyter_2222nodecw7.log &
nohup jupyter lab --port=2019 --no-browser 2>&1 >log_jupyter_2019nodeyj1.log &
nohup jupyter lab --port=1513 --no-browser 2>&1 >log_jupyter_1513nodecw1.log &
nohup jupyter lab --port=8686 --no-browser 2>&1 >log_jupyter_8686nodecw2.log &
nohup jupyter lab --port=1705 --no-browser 2>&1 >log_jupyter_1705nodecw3.log &
nohup jupyter lab --port=1323 --no-browser 2>&1 >log_jupyter_1323nodecw4.log &
nohup jupyter lab --port=2216 --no-browser 2>&1 >log_jupyter_2216nodecw5.log &
nohup jupyter lab --port=2114 --no-browser 2>&1 >log_jupyter_2114nodecw6.log &
nohup jupyter lab --port=2222 --no-browser 2>&1 >jupyter_log/log_jupyter_2222nodecw7.log &
nohup jupyter lab --port=1919 --no-browser 2>&1 >log_jupyter_1919nodecw8.log &
nohup jupyter lab --port=9999 --no-browser 2>&1 >log_jupyter_9999gpucw1.log &

nohup jupyter lab --port=2019 --no-browser 2>&1 >log_jupyter_2019nodeyj1.log &
nohup jupyter lab --port=2122 --no-browser 2>&1 >log_jupyter_2122nodecw9.log &
nohup jupyter lab --port=1013 --no-browser 2>&1 >log_jupyter_1013nodecw10.log &
nohup jupyter lab --port=1614 --no-browser 2>&1 >log_jupyter_1614nodecw11.log &
nohup jupyter lab --port=1224 --no-browser 2>&1 >log_jupyter_1224nodecw12.log &

nohup jupyter lab --port=1330 --no-browser 2>&1 >log_jupyter_1330nodecw13.log &

```



```bash
python -m ipykernel install --user --name=merfish --display-name "Python310 (merfish)"
```

