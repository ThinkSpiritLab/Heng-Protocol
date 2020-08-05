# 内部通信协议 0.0.3

## 综述

### 协议目的

1. 协调评测机和控制端的通信。

2. 验证评测机的身份，防止恶意攻击

3. 兼容缓存机制的运行

## 名称解释

### 评测机端的 SecrectKey

评测机端的 SecrectKey 。由控制端生成，与 ackey 相关联。由管理员填入评测机的配置文件中。如不慎泄密或失密，应使用控制端的管理功能注销对应的密钥对。

### 评测机端的 ackey

用于识别不同的评测机及其密钥，无保密必要

### 评测会话 token

在评测机开启 ws 连接前，向控制端申请的临时令牌。对单个 ws 连接有效。

### 任务令牌

流量控制系统的组成部分。令牌与评测机关联。向评测机下发任务需占用一个对应评测机的任务令牌并登记到活动任务令牌队列中。当评测结束并返回后，释放任务令牌至可用池中。

## 组成部分

协议包含两个主要部分，一个 `WebSocket` 连接用于评测机状态上报,评测系统状态管理和评测任务的发放和一套 `RESTful` 的 API 用于评测状态的更新和评测机的认证。

<!--
评测机向控制端请求token，带上签名。
控制端分配一个token，关联到评测机。

评测机向控制端发起ws连接，url参数中附带token。
控制端检查token，有效则返回upgrade。

建立连接后
控制端不定期发放任务，评测机定期发送当前状态以维持连接。

评测机接收任务后，通过ws发送状态更新。

软关机：
控制端发送shutdown消息，评测机照常心跳，完成所有任务后关闭连接，附带原因。
控制端注销token。

硬关机：
控制端直接断开连接，附带原因，并且注销token，将该评测机的未完成任务收回转移至其他评测机。

评测机主动下线：
评测机遇到不可恢复的异常时可以主动关闭连接，附带原因。
控制端处理这种情况的做法与硬关机类似。

-->

## 总体原则

`WebSocket` 连接用于所有控制端主动向评测端发送的消息和评测端发起的不需要回复的消息。

`HTTPS api` 用于评测端发送的需要回复的消息，如评测任务的结果等。

## 大体流程

1. 建立连接

    1. 评测端使用 SecrectKey 和 ackey 向控制端申请会话 token。

    2. 使用 token 建立 ws 连接

2. 评测

    1. 通过 ws 连接接受任务，发送心跳等

    2. 通过 https api 更新评测任务状态和结果

3. 软关机

    1. 控制端通过 ws 发出软关机指令并停止发放新任务

    2. 评测端继续通过 ws 发送心跳，通过 https api 更新已有评测任务状态和结果

    3. 评测端发送最终心跳，关闭连接并给出关闭理由

    4. 控制端记录关机状态，等评测端全部关闭或超时后关闭

## WebSocket 消息格式

WebSocket 连接地址为 `/v1/judgers/websocket`

| 参数名 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
| `token` | `string` | `true` | 从 `/judgers/token` 获取的token |

### 基本消息

基本消息具有两个字段

`type`和`body`。

`type`是一个表示消息类型的整数，具体含义见定义文件或各消息的说明。

`body`的类型由各消息定义，可能为`undefined`。

任意在 ws 信道上传输的消息都必须是基本消息。

### 评测请求消息

此消息由控制端发送

消息的 `type` 为 `MessageType.JudgeRequest`

body 为 `JudgeRequest`

其中需要注意，

- `taskId` 对应一次发送任务的尝试，例如任务失败重发的情形应当生成新的 `taskId`

- `policy` 取 `TestPolicy.Fuse` 时，不一定会在第一个失败后结束（比如并行评测）

### 评测端状态报告消息

此消息由评测端发送

消息的 `type` 为 `MessageType.StatusReport`

body 为 `StatusReportPayload`

其中注意 `TimeType` 指 RFC 3339 格式

### 状态报告控制消息

此消息由控制端发送

消息的 `type` 为 `MessageType.StatusReportControl`

body 为 `StatusReportControlPayload`

其中，`setReportInterval` 以秒计

### 关闭消息

此消息由控制端发送

消息的 `type` 为 `MessageType.Shutdown`

body 为 `ShutdownRequest`

其中 `rebootDelay` 以秒计

### 断联消息

此消息由控制端或评测端在主动断开连接时发送

此消息为一个例外，应当附在 websocket 的 closereason 中。

由于意外的存在，不能保证存在此条消息。

消息的 `type` 为 `MessageType.Disconnect`

body 为 `DisconnectPayload`

其中注意 `TimeType` 指 RFC 3339 格式

### 错误消息

此消息由评测端在发生非致命错误时发送

消息的 `type` 为 `MessageType.Error`

body 为 `ErrorInfo`

其中 `code` 的含义尚待定义

`message` 应当是人类可读的对断联原因的说明

## HTTPS 消息格式

POST 限制请求体大小为 `1MB`

### 如何构造签名

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

### 公共参数

| 参数名 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
| `nonce` | `string` | `true` | 用于检查消息是否已经处理过 防范重放攻击 |
| `timestamp` | `decInt` | `true` | 过时的消息将被忽略 用于防止重放攻击 |
| `signature` | `string` | `true` | 签名 |
| `ackey` | `string` | `true` | ackey |

### 评测机登录

URL： `/judgers/token`

方法： `GET`

| 参数名 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
| `maxTaskCount` | `decInt` | `true` | 声明评测端评测能力的整数 |
| `name` | `string` | `false` | 评测机的名字，不建议重复 |
| `software` | `string` | `false` | 评测机的软件及版本，可以重复 |

成功状态下返回

`AuthenticationResponse`

失败则返回

`ErrorResponse`

### 评测状态更新

URL： `/judges/${taskId}/status`

| 参数名 | 值类型 | 说明 |
| :-: | :-: | :-: |
|`taskId`|`string`|计划更新状态的评测|

方法: `PUT`

| 请求体 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
|`state`|`JudgeState`|`true`|状态，允许的取值见 `JudgeState` 定义|

成功状态下返回

`AckResponse`

失败则返回

`ErrorResponse`

### 评测结果提交

URL： `/judges/${taskId}/result`

| 参数名 | 值类型 | 说明 |
| :-: | :-: | :-: |
|`taskId`|`string`|计划更新状态的评测|

方法: `POST`

| 请求体 | 值类型 | 必选？ | 说明 |
| :-: | :-: | :-: | :-: |
|`result`|`JudgeResult`|`true`|结果|

成功状态下返回

`AckResponse`

失败则返回

`ErrorResponse`
