export declare namespace Get {
    interface BasicHttpResponse<T> {
        statuscode: number;
        message?: string;
        body: T;
    }
    interface JudgesResponsePayload {
        judges: string[];
        pageCount: number;
    }
    type JudgesResponse = BasicHttpResponse<JudgesResponsePayload>;
    enum JudgeStateEnum {
        Waiting = "Waiting",
        Preparing = "Preparing",
        Pending = "Pending",
        Judging = "Judging",
        Judged = "Judged"
    }
    interface BriefJudgeCaseResult {
        result: JudgeResultType;
        time: number;
        memory: number;
    }
    interface BriefJudgeResult {
        cases: BriefJudgeCaseResult[];
    }
    interface JudgeStatus {
        judgeId: string;
        state: JudgeStateEnum.Waiting | JudgeStateEnum.Preparing | JudgeStateEnum.Pending | JudgeStateEnum.Judging | JudgeStateEnum.Judged;
    }
    type JudgeStatusResponse = BasicHttpResponse<JudgeStatus>;
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
    interface JudgeDetail {
        judgeId: string;
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
    type JudgeResultResponse = BasicHttpResponse<JudgeDetail>;
    interface TaskStatus {
        waiting: number;
        preparing: {
            downloading: number;
            readingCache: number;
        };
        pending: number;
        running: number;
        finished: number;
        total: number;
    }
    interface CpuUsage {
        percentage: number;
        loadavg?: [number, number, number];
    }
    interface MemoryUsage {
        percentage: number;
    }
    interface HardwareStatus {
        cpu: CpuUsage;
        memory: MemoryUsage;
    }
    interface JudgerStatus {
        name: string;
        hardware: HardwareStatus;
    }
    interface SystemStatus {
        tasks: TaskStatus;
        controller: HardwareStatus;
        judgers: JudgerStatus[];
    }
    type SystemStatusResponse = BasicHttpResponse<SystemStatus>;
    type ErrorResponse = BasicHttpResponse<undefined>;
    type HttpResponse = ErrorResponse | JudgesResponse | JudgeStatusResponse | JudgeResultResponse | SystemStatusResponse;
}
