# 公共定义

## HTTP 通信

### 如何构造签名

1. 构造参数字符串

    1. 对参数排序

        - 按照参数名的字典序

    - 字符集为 `UTF-8`

    - 编码规则为 `RFC3986`

    - 用 `=` 连接参数名和值

    - 使用 `&` 分隔参数，头尾没有

2. 构造请求头字符串

    1. 对Header排序

        - 按照Header名的字典序

        - 不包括 `x-heng-signature`

    - 字符集为 `UTF-8`

    - 编码规则为 `RFC3986`

    - 用 `=` 连接Header名和值

    - 使用 `&` 分隔Header，头尾没有

3. 构造请求字符串

    `大写HTTP方法名` + `:` + `请求头字符串` + `:` + `api 地址` + `?` + `参数字符串`

4. 计算 Signature

    ```typescript
    let signature = crypto
    .createHmac("sha256",SecrectKey)
    .update(RequestString)
    .digest('hex')
    ```

    [关于HMAC算法](https://www.biaodianfu.com/hmac.html)

5. 然后即可将 `x-heng-signature` 加入请求头，完成计算。

### 公共参数

|     Header 名      |   参数名    |  值类型  | 必选？ |                  说明                   |
| :----------------: | :---------: | :------: | :----: | :-------------------------------------: |
|   `x-heng-nonce`   |   `nonce`   | `string` | `true` | 用于检查消息是否已经处理过 防范重放攻击 |
| `x-heng-timestamp` | `timestamp` | `decInt` | `true` |   过时的消息将被忽略 用于防止重放攻击   |
| `x-heng-signature` | `signature` | `string` | `true` |                  签名                   |
| `x-heng-accesskey` | `accesskey` | `string` | `true` |            客户系统或评测端 AccessKey             |

## 软件环境

客户系统通过 `Executable` 的 `environment` 字段指定程序的运行环境。

不同语言，系统和架构可能会有不同的选项。

在同一个评测任务内，spj，user 和 interactor 必须拥有相同的 system 和 arch。