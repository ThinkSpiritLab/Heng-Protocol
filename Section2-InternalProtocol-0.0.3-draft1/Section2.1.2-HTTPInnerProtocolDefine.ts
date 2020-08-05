declare namespace Heng.InternalProtocol.V0_0_3.HTTP {
    // // ---------------------------------------------------
    interface BasicMessage {
        // contextID: ContextID; // 消息的标识符
        type: MessageType; // 消息的种类
        body: unknown; // 消息携带的其它信息
        messageUUID: string;
    }

    export enum MessageType {
        Ack = 1, // 对其它消息的确认
        Authentication = 3, //认证消息
        Error = 127, // 出错了
    }
    export interface AckMessage extends BasicMessage {
        type: MessageType.Ack;
        body: undefined;
    }
    // ----------------------------------------------------------------
    export interface AuthenticationPayload {
        JWTToken: string;
    }
    export interface AuthenticationMessage extends BasicMessage {
        type: MessageType.Authentication;
        body: AuthenticationPayload;
    }
    // --------------------------------------------------------------------
    export enum JudgeState {
        Confirmed = "confirmed",
        ReadingCache = "readingCache",
        Downloading = "downloading",
        Pending = "pending",
        Judging = "judging",
        Finished = "finished",
    }

    // ----------------------------------------------------------------
    export enum JudgeResultType {
        Accepted = "Accepted",
        WrongAnswer = "WrongAnswer",

        TimeLimitExceeded = "TimeLimitExceeded",
        MemoryLimitExceeded = "MemoryLimitExceeded",
        OutpuLimitExceeded = "OutpuLimitExceeded",
        RuntimeError = "RuntimeError",

        CompileError = "CompileError",
        CompileTimeLimitExceeded = "CompileTimeLimitExceeded",
        CompileMemoryLimitExceeded = "CompileMemoryLimitExceed",
        CompileFileLimitExceeded = "CompileFileLimitExceed",

        SystemError = "SystemError",
        SystemTimeLimitExceeded = "SystemTimeLimitExceed",
        SystemMemoryLimitExceeded = "SystemMemoryLimitExceed",
        SystemOutpuLimitExceeded = "SystemOutpuLimitExceeded",
        SystemRuntimeError = "SystemRuntimeError",
        SystemCompileError = "SystemCompileError",

        Unjudged = "Unjudged",
    }

    export interface JudgeCaseResult {
        result: JudgeResultType;
        time: number;
        memory: number;
        extraMessage?: string;
    }

    export interface JudgeResult {
        cases: JudgeCaseResult[];
        extra?: {
            user?: {
                compileMessage?: string;
                compiletime?: number;
            };
            spj?: {
                compileMessage?: string;
                compiletime?: number;
            };
            interactor?: {
                compileMessage?: string;
                compiletime?: number;
            };
        };
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
    export type HttpMessage = AckMessage | AuthenticationMessage | ErrorMessage;
}
