declare namespace Heng.InternalProtocol.V0_0_3.HTTP {
    // // ---------------------------------------------------
    interface BasicResponse {
        // contextID: ContextID; // 消息的标识符
        type: ResponseType; // 消息的种类
        body: unknown; // 消息携带的其它信息
        nonce: string;
    }

    export enum ResponseType {
        Ack = 1, // 对其它消息的确认
        Authentication = 3, //认证消息
        Error = 127, // 出错了
    }
    export interface AckResponse extends BasicResponse {
        type: ResponseType.Ack;
        body: undefined;
    }
    // ----------------------------------------------------------------
    export interface AuthenticationPayload {
        JWTToken: string;
    }
    export interface AuthenticationResponse extends BasicResponse {
        type: ResponseType.Authentication;
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
        time: number; // ms
        memory: number; // kib
        extraMessage?: string;
    }

    export interface JudgeResult {
        taskId: string;
        cases: JudgeCaseResult[];
        extra?: {
            user?: {
                compileMessage?: string;
                compileTime?: number; // ms
            };
            spj?: {
                compileMessage?: string;
                compileTime?: number; // ms
            };
            interactor?: {
                compileMessage?: string;
                compileTime?: number; // ms
            };
        };
    }
    // ----------------------------------------------------------------
    export interface ErrorInfo {
        code: number;
        message?: string;
    }

    export interface ErrorResponse extends BasicResponse {
        type: ResponseType.Error;
        body: ErrorInfo;
    }
    // ----------------------------------------------------------------
    export type HttpResponse = AckResponse | AuthenticationResponse | ErrorResponse;
}
