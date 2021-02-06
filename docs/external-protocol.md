# 外部通信协议

## 综述

### 协议目的

1. 承载外部系统的评测需要，提供可靠稳定的评测结果。

2. 验证合法的外部系统，防止缓存攻击和非法请求。

## 组成部分

外部通信协议是基于 HTTP 的短连接通信协议，未来可能增加基于 WebSocket 的长连接通信。

## 协议名词解释

### 客户系统

调用本系统进行自动化评测的系统。

### AccessKey

用于分辨各个客户系统的字符串，对每个客户系统唯一，无需保密。

### SecrectKey

用于认证客户系统身份的字符串。客户系统的请求应当按照协议描述签名。需由客户系统严格保密。

### 评测状态

指一个评测当前情况，具有如下可取值：

- `confirmed` 已被确认接受

- `pending` 正在排队等待

- `preparing` 正在准备评测

- `judging` 正在评测

- `finished` 评测已结束

## HTTP 通信格式

1. 任意请求均需签名，具体请见[公共定义](../docs/common.md)。

2. 不同版本的协议使用不同前缀，现在使用 `/v1`

3. 失败情况下以非`2xx` 状态码返回 `ErrorResponse`， 不再一一说明

### 创建评测任务

URL: `/v1/judges`

方法: `POST`

请求体: `CreateJudgeRequest`

成功后返回 `CreateJudgeOutput`

说明：

创建评测时，通过 `callbackUrls` 字段注册回调，为了安全起见，注册的回调 `URL` 应当包含不能被猜测的路径或参数。

当触发状态回调时，控制端会以 `POST` 方法访问 `callbackUrls.update` ，请求体为 `UpdateJudgeCallback` 。

当触发结果回调时，控制端会以 `POST` 方法访问 `callbackUrls.finish` ，数据内容为 `FinishJudgeCallback` 。

当回调 `URL` 返回非 `2xx` 状态码时，控制端的行为由实现定义，不保证保存数据。

### 查询系统负载

URL: `/v1/system/status`

方法: `GET`

无参数

成功后返回: `SystemStatusOutput`，包含控制端和评测机的负载等信息。

