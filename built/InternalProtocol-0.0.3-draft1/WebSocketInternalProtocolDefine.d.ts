export declare namespace WebSocketProtocolDefinition {
    interface BasicMessage {
        type: MessageType;
        body: unknown;
    }
    export enum MessageType {
        StatusReportControl = 17,
        StatusReport = 18,
        JudgeRequest = 33,
        Disconnect = 125,
        Shutdown = 126,
        Error = 127
    }
    export interface StatusReportControlPayload {
        setReportInterval?: number;
        immediate: boolean;
    }
    export interface StatusReportControlMessage extends BasicMessage {
        type: MessageType.StatusReportControl;
        body: StatusReportControlPayload;
    }
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
    export enum JudgerStatus {
        Booting = "booting",
        Booted = "booted",
        RequestingToken = "requestingToken",
        EstablishingWebsocket = "establishingWebsocket",
        Connected = "connected",
        Error = "error",
        Fatal = "fatal",
        ShuttingDown = "shuttingDown",
        Terminated = "terminated"
    }
    export type TimeType = string;
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
    export type File = {
        id: string;
        hashsum?: string;
    } & ({
        url: string;
        authorization?: string;
    } | {
        content: string;
    });
    export enum JudgeType {
        Normal = "normal",
        Special = "special",
        Interactive = "interactive"
    }
    export enum TestPolicy {
        Fuse = "fuse",
        All = "all"
    }
    export interface Limit {
        runtime: {
            memory: number;
            cpuTime: number;
            output: number;
        };
        compiler: {
            memory: number;
            cpuTime: number;
            output: number;
            message: number;
        };
    }
    export interface Excuteable {
        source: File;
        environment: string;
        limit: Limit;
    }
    export type DynamicFile = {
        type: "builtin";
        name: string;
    } | {
        type: "remote";
        file: File;
        name: string;
    };
    export type Judge = {
        type: JudgeType.Normal;
        user: Excuteable;
    } | {
        type: JudgeType.Special;
        user: Excuteable;
        spj: Excuteable;
    } | {
        type: JudgeType.Interactive;
        user: Excuteable;
        interactor: Excuteable;
    };
    export interface JudgeRequest {
        taskId: string;
        data?: File;
        dynamicFiles?: DynamicFile[];
        judge: Judge;
        test?: {
            cases: {
                input: string;
                output: string;
            }[];
            policy: TestPolicy;
        };
    }
    export interface JudgeRequestMessage extends BasicMessage {
        type: MessageType.JudgeRequest;
        body: JudgeRequest;
    }
    export interface ShutdownRequest {
        reboot: boolean;
        rebootDelay?: number;
        reason?: string;
    }
    export interface ShutdownMessage extends BasicMessage {
        type: MessageType.Shutdown;
        body: ShutdownRequest;
    }
    export interface ErrorInfo {
        code: number;
        message?: string;
    }
    export interface ErrorMessage extends BasicMessage {
        type: MessageType.Error;
        body: ErrorInfo;
    }
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
    export type DisconnectPayload = DisconnectPayloadControler | DisconnectPayloadJudger;
    export interface DisconnectMessage {
        type: MessageType.Disconnect;
        body: DisconnectPayload;
    }
    export type WebSocketMessage = StatusReportControlMessage | StatusReportMessage | JudgeRequestMessage | ShutdownMessage | ErrorMessage;
    export type WebSocketCloseReason = DisconnectMessage;
    export {};
}
