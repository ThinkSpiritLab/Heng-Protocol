declare namespace Heng.InternalProtocol.V0_0_3.WebSocket {
    interface BasicMessage {
        // contextID: ContextID; // 消息的标识符
        type: MessageType; // 消息的种类
        body: unknown; // 消息携带的其它信息
    }

    export enum MessageType {
        StatusReportControl = 17, // 状态请求
        StatusReport = 18, // 状态消息（心跳或经请求）

        JudgeRequest = 33, // 评测任务消息

        Disconnect = 125, //断联消息
        Shutdown = 126, // 系统软关闭命令
        Error = 127, // 出错了
    }

    // ----------------------------------------------------------------
    export interface StatusReportControlPayload {
        setReportInterval?: number; //ms
        immediate: boolean;
    }

    export interface StatusReportControlMessage extends BasicMessage {
        type: MessageType.StatusReportControl;
        body: StatusReportControlPayload;
    }
    // ----------------------------------------------------------------
    export interface CpuUsage {
        percentage: number;
        loadavg?: [number, number, number];
    }

    export interface MemoryUsage {
        percentage: number;
    }

    export interface HardwareStatus {
        cpu: CpuUsage;
        memory: MemoryUsage;
    }

    export interface TaskStatus {
        preparing: {
            downloading: number;
            readingCache: number;
        };
        pending: number;
        running: number;
        finished: number;
        total: number;
    }

    enum JudgerStatus {
        Booting = "booting",
        Booted = "booted",
        RequestingToken = "requestingToken",
        EstablishingWebsocket = "establishingWebsocket",
        Connected = "connected",
        Error = "error",
        Fatal = "fatal",
        ShuttingDown = "shuttingDown",
        Terminated = "terminated",
    }

    type TimeType = string; //RFC3339

    export interface StatusReportPayload {
        time: TimeType;
        nextReportTime: TimeType;
        hardware: HardwareStatus;
        task: TaskStatus;
    }

    export interface StatusReportMessage extends BasicMessage {
        type: MessageType.StatusReport;
        body: StatusReportPayload;
    }
    // ----------------------------------------------------------------
    export type File = {
        id: string;
        hashsum?: string;
    } & (
        | {
              url: string;
              authorization?: string;
          }
        | {
              content: string;
          }
    );

    export enum JudgeType {
        Normal = "normal",
        Special = "special",
        Interactive = "interactive",
    }
    export enum TestPolicy {
        Fuse = "fuse",
        All = "all",
    }
    interface Limit {
        // 运行：内存、时间、输出
        // 编译: 内存、时间、输出(标准流、生成文件）

        runtime: {
            memory: number; //byte
            cpuTime: number; //milliseconds
            output: number; //byte
        };
        compiler: {
            memory: number; //byte
            cpuTime: number; //milliseconds
            output: number; //byte
            message: number; //byte
        };
    }

    interface Excuteable {
        source: File;
        environment: string; // how to compile or excute
        limit: Limit;
    }

    type DynamicFile =
        | {
              type: "builtin";
              name: string; // "user_source" "user_bin"
          }
        | {
              type: "remote";
              file: File;
              name: string;
          };

    type Judge =
        | {
              type: JudgeType.Normal;
              user: Excuteable;
          }
        | {
              type: JudgeType.Special;
              user: Excuteable;
              spj: Excuteable;
          }
        | {
              type: JudgeType.Interactive;
              user: Excuteable;
              interactor: Excuteable;
          };

    export interface JudgeRequest {
        taskId: string;

        data?: File; // zip

        dynamicFiles?: DynamicFile[]; // provide ["user_source","user_bin"]

        judge: Judge;

        test?: {
            cases: {
                input: string; // file path or dynamic file identifier
                output: string; // file path or dynamic file identifier
            }[];

            policy: TestPolicy; // 全部/短路
        };
    }
    export interface JudgeRequestMessage extends BasicMessage {
        type: MessageType.JudgeRequest;
        body: JudgeRequest;
    }

    // ----------------------------------------------------------------
    export interface ShutdownRequest {
        reboot: boolean;
        rebootDelay?: number; // milliseconds
        reason?: string;
    }

    export interface ShutdownMessage extends BasicMessage {
        type: MessageType.Shutdown;
        body: ShutdownRequest;
    }
    // ----------------------------------------------------------------
    export interface ErrorInfo {
        code: number;
        message?: string;
    }

    export interface ErrorMessage extends BasicMessage {
        type: MessageType.Error;
        body: ErrorInfo;
    }
    // ----------------------------------------------------------------
    export interface DisconnectPayloadJudger {
        time: TimeType;
        expectedRecoveryTime?: TimeType;
        hardware: HardwareStatus;
        task: TaskStatus;
        errorInfo: ErrorInfo;
    }
    export interface DisconnectPayloadControler {
        time: TimeType;
        expectedRecoveryTime?: TimeType;
        errorInfo: ErrorInfo;
    }
    export type DisconnectPayload =
        | DisconnectPayloadControler
        | DisconnectPayloadJudger;
    export interface DisconnectMessage {
        type: MessageType.Disconnect;
        body: DisconnectPayload;
    }
    // ----------------------------------------------------------------
    export type WebSocketMessage =
        | StatusReportControlMessage
        | StatusReportMessage
        | JudgeRequestMessage
        | ShutdownMessage
        | ErrorMessage;
    export type WebSocketCloseReason = DisconnectMessage;
}
