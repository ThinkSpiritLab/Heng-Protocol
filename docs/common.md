# 公共定义

## HTTP 通信

### 如何验证签名

签名字符串：

```
{http method}\n
{url path}\n
{query strings}\n
{signed headers}\n
{body hash}\n
```

1. {http method}

    大写 HTTP 方法名，例如 `GET`, `POST`。

2. {url path}

    以 '/' 开头的 URL 路径，例如 `/v1/judgers/token`

3. {query strings}

    1. 将所有查询参数按照 name 的字典序排序
    2. value 按照 RFC3986 编码
    3. name 和 value 之间用 '=' 连接
    4. 键值对之间用 '&' 连接

    例如 `name1=value&name2=%2Bvalue2`

4. {signed headers}

    1. 将白名单内的所有请求头按照 name 的字典序排序
    2. name 转为小写
    3. value 按照 RFC3986 编码
    4. name 和 value 之间用 '=' 连接
    5. 键值对之间用 '&' 连接

5. {body hash}

    1. 如果没有 body，返回 Hex(SHA256("")))
    2. 如果有 body，返回 Hex(SHA256(body)))

    例如：(空字符串哈希)
    `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` 

6. 以上 5 个部分分别加换行符 '\n'，连接起来，得到 RequestString

7. signature = Hex(HMAC_SHA256(SecretKey, RequestString)))

    ```typescript
    const signature = crypto
        .createHmac("sha256", SecrectKey)
        .update(RequestString)
        .digest('hex')
    ```

    [关于HMAC算法](https://www.biaodianfu.com/hmac.html)

8. 将计算得到的 signature 与请求头中的 `x-heng-signature` 比对，如果完全一致，那么签名正确。

以上字符集均为 UTF-8

| 请求头白名单       |
| ------------------ |
| `content-type`     |
| `x-heng-accesskey` |
| `x-heng-nonce`     |
| `x-heng-timestamp` |

### 公共请求头

|     Header 名      |  值类型  |  必选  |                  说明                   |
| :----------------: | :------: | :----: | :-------------------------------------: |
| `x-heng-accesskey` | `string` | `true` |       客户系统或评测端 AccessKey        |
|   `x-heng-nonce`   | `string` | `true` | 用于检查消息是否已经处理过 防范重放攻击 |
| `x-heng-timestamp` | `decInt` | `true` |     过时的消息将被忽略 防范重放攻击     |
| `x-heng-signature` | `string` | `true` |                  签名                   |

## 软件环境

客户系统通过 `Executable` 的 `environment` 字段指定程序的运行环境。

不同语言，系统和架构可能会有不同的选项。

在同一个评测任务内，spj，user 和 interactor 必须拥有相同的 system 和 arch。