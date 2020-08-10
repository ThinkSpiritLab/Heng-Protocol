export declare namespace HTTPProtocolDefinition {
    interface BasicResponse {
        type: ResponseType;
        body: unknown;
        nonce: string;
    }
    enum ResponseType {
        Ack = 1,
        Authentication = 3,
        Error = 127
    }
    interface AckResponse extends BasicResponse {
        type: ResponseType.Ack;
        body: undefined;
    }
    interface AuthenticationPayload {
        JWTToken: string;
    }
    interface AuthenticationResponse extends BasicResponse {
        type: ResponseType.Authentication;
        body: AuthenticationPayload;
    }
    enum JudgeState {
        Confirmed = "confirmed",
        ReadingCache = "readingCache",
        Downloading = "downloading",
        Pending = "pending",
        Judging = "judging",
        Finished = "finished"
    }
    enum JudgeResultType {
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
        Unjudged = "Unjudged"
    }
    interface JudgeCaseResult {
        result: JudgeResultType;
        time: number;
        memory: number;
        extraMessage?: string;
    }
    interface JudgeResult {
        taskId: string;
        cases: JudgeCaseResult[];
        extra?: {
            user?: {
                compileMessage?: string;
                compileTime?: number;
            };
            spj?: {
                compileMessage?: string;
                compileTime?: number;
            };
            interactor?: {
                compileMessage?: string;
                compileTime?: number;
            };
        };
    }
    interface ErrorInfo {
        code: number;
        message?: string;
    }
    interface ErrorResponse extends BasicResponse {
        type: ResponseType.Error;
        body: ErrorInfo;
    }
    type HttpResponse = AckResponse | AuthenticationResponse | ErrorResponse;
}
