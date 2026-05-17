---
title: 代理
date: 2026-05-17
cover: proxy.jpg
category:
  - Oracle
tag:
  - Manager
star: False
article: False
---





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

