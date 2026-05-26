---
title: 代理
date: 2026-05-17
cover: proxy.jpg
icon: fa6-solid:user-shield
category:
  - Oracle
tag:
  - Manager
star: False
article: False
---

<blockquote style="font-style: italic; font-size: 1.2rem; margin-top: 10px; color: #555;">
    The might of one fair face sublimes my love,
    ...
    I live and love in God's peculiar light.
    <br>
    <span style="font-size: 0.9rem; color: #777;">— Michelangelo Buonarroti, <em>Sonnet</em></span>
</blockquote>



```bash
code ~/.ssh/config
```

## 基础查看

①🪜打开的时候

```bash
scutil --proxy
<dictionary> {
  HTTPEnable : 1
  HTTPPort : 7897
  HTTPProxy : 127.0.0.1
  HTTPSEnable : 1
  HTTPSPort : 7897
  HTTPSProxy : 127.0.0.1
  ProxyAutoConfigEnable : 0
  SOCKSEnable : 1
  SOCKSPort : 7897
  SOCKSProxy : 127.0.0.1
}
```

②🪜关闭的时候

```bash
scutil --proxy
<dictionary> {
  HTTPEnable : 0
  HTTPSEnable : 0
  ProxyAutoConfigEnable : 0
  SOCKSEnable : 0
}
```

含义：我的Mac 当前开启了系统代理，并且 HTTP、HTTPS、SOCKS 三种代理都指向 `127.0.0.1:7897`。

其中：

|          字段           |   开启时    | 意义                                                         |
| :---------------------: | :---------: | ------------------------------------------------------------ |
|      `HTTPEnable`       |     `1`     | HTTP 代理已开启                                              |
|       `HTTPProxy`       | `127.0.0.1` | HTTP 代理服务器地址是本机                                    |
|       `HTTPPort`        |   `7897`    | HTTP 代理端口是 7897                                         |
|      `HTTPSEnable`      |     `1`     | HTTPS 代理已开启                                             |
|      `HTTPSProxy`       | `127.0.0.1` | HTTPS 代理服务器地址是本机                                   |
|       `HTTPSPort`       |   `7897`    | HTTPS 代理端口是 7897                                        |
|      `SOCKSEnable`      |     `1`     | SOCKS 代理已开启                                             |
|      `SOCKSProxy`       | `127.0.0.1` | SOCKS 代理服务器地址是本机                                   |
|       `SOCKSPort`       |   `7897`    | SOCKS 代理端口是 7897                                        |
| `ProxyAutoConfigEnable` |     `0`     | 没有启用 PAC 自动代理配置文件；Apple 把 PAC 称为“Automatic Proxy Configuration”，需要填 PAC URL。([Apple Support](https://support.apple.com/guide/mac-help/change-proxy-settings-on-mac-mchlp2591/mac?utm_source=chatgpt.com)) |



## 本地运行

### R

查看：

```R
print(Sys.getenv(c("http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY", "no_proxy", "NO_PROXY"), unset = NA))
system("scutil --proxy | egrep 'HTTP|HTTPS|SOCKS|ProxyAuto'", intern = FALSE)
system("nc -z 127.0.0.1 7897 && echo 'proxy port OK' || echo 'proxy port CLOSED'", intern = FALSE)
```

使用代理：

```R
proxy <- "http://127.0.0.1:7897"

Sys.setenv(
  http_proxy  = proxy,
  https_proxy = proxy,
  HTTP_PROXY  = proxy,
  HTTPS_PROXY = proxy,
  all_proxy   = proxy,
  ALL_PROXY   = proxy,
  no_proxy    = "localhost,127.0.0.1,::1",
  NO_PROXY    = "localhost,127.0.0.1,::1"
)
```

取消代理：

```R
Sys.unsetenv(c("http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY", "no_proxy", "NO_PROXY"))
```

### python

查看：

```python
import os, subprocess, socket

print({k: os.environ.get(k) for k in ["http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY", "no_proxy", "NO_PROXY"]})

subprocess.run("scutil --proxy | egrep 'HTTP|HTTPS|SOCKS|ProxyAuto'", shell=True)

s = socket.socket()
ok = s.connect_ex(("127.0.0.1", 7897)) == 0
s.close()
print("proxy port:", "OK" if ok else "CLOSED")
```

使用代理：

```python
proxy = "http://127.0.0.1:7897"

os.environ.update({
    "http_proxy": proxy,
    "https_proxy": proxy,
    "HTTP_PROXY": proxy,
    "HTTPS_PROXY": proxy,
    "all_proxy": proxy,
    "ALL_PROXY": proxy,
    "no_proxy": "localhost,127.0.0.1,::1",
    "NO_PROXY": "localhost,127.0.0.1,::1",
})

```

取消代理：

```python
for k in ["http_proxy", "https_proxy", "HTTP_PROXY", "HTTPS_PROXY", "all_proxy", "ALL_PROXY", "no_proxy", "NO_PROXY"]:
    os.environ.pop(k, None)
```



## ※ 代理到服务器！

注：*一旦开始使用，🪜的流量会飞一样流逝QAQ……*

### SSH 反向代理转发

#### ①再次确认本地开启代理

```bash
lsof -iTCP:7897 -sTCP:LISTEN -n -P

# 测试能否访问github
# curl -I -x http://127.0.0.1:7897 https://github.com
```

得到下面输出：

```
COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
com.vorte 23018 hanoi   10u  IPv6 0xd2ea14628adac5dd      0t0  TCP *:7897 (LISTEN)
```

#### ②打通服务器-cfff

```bash
ssh -N \
  -L 1515:127.0.0.1:8088 \
  -R 127.0.0.1:17897:127.0.0.1:7897 \
  -p 30089 zy_22111220045@10.193.2.99
```

```bash
ssh -N -L 2604:127.0.0.1:8088 -R 127.0.0.1:17897:127.0.0.1:7897 -p 30143 zy_22111220045@10.193.2.99
```

相比之前，`-R`的作用是让服务器访问自己的 `127.0.0.1:17897`，其实会通过 SSH 访问你 Mac 的 `127.0.0.1:7897`。

测试是否打通：

```bash
export http_proxy=http://127.0.0.1:17897
export https_proxy=http://127.0.0.1:17897
export HTTP_PROXY=http://127.0.0.1:17897
export HTTPS_PROXY=http://127.0.0.1:17897
export all_proxy=http://127.0.0.1:17897
export ALL_PROXY=http://127.0.0.1:17897
export no_proxy=localhost,127.0.0.1,::1
export NO_PROXY=localhost,127.0.0.1,::1
# 测试可否链接github
curl -I https://github.com
```

得到输出就打通了。

验证：`git`安装[`SCENIC+`](/golden-rain/multi-omics-atac/scenicplus.md)

#### ③塞入mamba环境

```bash
conda env config vars set \
  http_proxy=http://127.0.0.1:17897 \
  https_proxy=http://127.0.0.1:17897 \
  HTTP_PROXY=http://127.0.0.1:17897 \
  HTTPS_PROXY=http://127.0.0.1:17897 \
  all_proxy=http://127.0.0.1:17897 \
  ALL_PROXY=http://127.0.0.1:17897 \
  no_proxy=localhost,127.0.0.1,::1 \
  NO_PROXY=localhost,127.0.0.1,::1
  
env | grep -i proxy
curl -I https://github.com
```



在R中安装包的时候需要显式指定`github_pat`（目前没有什么更好的方法，唉）

```R
proxy <- "http://127.0.0.1:17897"

Sys.setenv(
  http_proxy  = proxy,
  https_proxy = proxy,
  HTTP_PROXY  = proxy,
  HTTPS_PROXY = proxy,
  all_proxy   = proxy,
  ALL_PROXY   = proxy,
  no_proxy    = "localhost,127.0.0.1,::1",
  NO_PROXY    = "localhost,127.0.0.1,::1",
  GITHUB_PAT  = "贴出github_token"
)

Sys.getenv("GITHUB_PAT") != ""

remotes::install_github(
  "edvanburen/cellSTAAR",
  auth_token = Sys.getenv("GITHUB_PAT")
)
```



### ②打通服务器-类脑登录节点



TBA后面再写

```

```

