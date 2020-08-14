# HTTPS协议

1. 每个资源具有其各自操作，具体请看说明。

2. 任意操作均需要使用公共参数，具体请见公共参数说明。

3. 不同版本的协议使用不同前缀，现在使用 `/v1`

4. json 视作字符串处理

5. 失败情况下返回 `ErrorResponse` ， 不再一一说明

## 公共参数

| 参数名 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
| `nonce` | `string` | `true` | 用于检查消息是否已经处理过 防范重放攻击 |
| `timestamp` | `decInt` | `true` | 过时的消息将被忽略 用于防止重放攻击 |
| `signature` | `string` | `true` | 签名 |
| `accesskey` | `string` | `true` | accesskey |

## 如何构造签名

1. 构造参数字符串

    1. 对参数排序

        - 按照参数名的字典序

        - 不包括 Signature

    - 字符集为 `UTF-8`

    - 编码规则为 `RFC3986`

    - 用 `=` 连接参数名和值

    - 使用 `&` 分隔参数，头尾没有

2. 构造请求字符串

    `大写HTTP方法名` + `:` + `api 地址` + `?` + `参数字符串`

3. 计算 Signature

    ```typescript
    let signature = crypto
    .createHmac("sha256",SecrectKey)
    .update(RequestString)
    .digest('hex')
    ```

    [关于HMAC算法](https://www.biaodianfu.com/hmac.html)

4. 然后即可将 Signature 加入参数列表，完成计算。

>对于 `POST` 认为其 `body` 是一个参数，值为对应的对象字符串化的结果，传输时也是传递字符串。

## 返回值基本结构

返回一个 json对象，其 `statuscode` 键的值应当等同于 HTTP 应答码，
可选包含 `message` 字段为额外的说明消息，`body` 字段见说明。

## 资源

### 评测任务

#### 创建评测任务

URL: `/v1/judges`

方法: `POST`

请求体: `CreateJudgeRequest`

#### 查询评测列表

URL: `/v1/judges`

方法: `GET`

| 参数名 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
| `pagesize` | `decInt` | `false` | 每页返回的数量上限， 默认为 `50`， 设为 `0` 代表查询所有的值（可能会很多，慎用）|
| `page` | `decInt` | `false` | 代表查询的页码，从 `0` 开始计数 |
| `status` | `string[]` | `false` | 查询状态为指定值之一的评测 `,` 分隔多个值 |

返回 `JudgesResponse`

#### 查询评测的信息

URL： `/judges/${taskId}/status`

方法: `GET`

返回: `JudgeStatusResponse`

#### 查询评测的结果

URL： `/judges/${taskId}/result`

方法: `GET`

无参数

在 `judged` 之前请求会返回 404 和 `ErrorResponse`

返回: `JudgeResultResponse`

### 系统状态

#### 查询系统负载

URL: `/v1/system/status`

方法: `GET`

无参数

返回: `SystemStatusResponse` 包含控制端和评测机的负载等信息。
