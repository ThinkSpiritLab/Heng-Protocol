export declare namespace Get {
    interface BasicHttpResponse<T> {
        statuscode: number;
        message?: string;
        body: T;
    }
    type JudgesResponse = BasicHttpResponse<string[]>;
    enum JudgeStateEnum {
        Waiting = "Waiting",
        Preparing = "Preparing",
        Pending = "Pending",
        Judging = "Judging",
        Judged = "Judged"
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
    interface BriefJudgeCaseResult {
        result: JudgeResultType;
        time: number;
        memory: number;
    }
    interface BriefJudgeResult {
        cases: BriefJudgeCaseResult[];
    }
    interface JudgeWaitingState {
        judgeId: string;
        state: JudgeStateEnum.Waiting | JudgeStateEnum.Preparing | JudgeStateEnum.Pending | JudgeStateEnum.Judging;
    }
    interface JudgeFinishState {
        judgeId: string;
        state: JudgeStateEnum.Judged;
        result: BriefJudgeResult;
    }
    type JudgeState = JudgeWaitingState | JudgeFinishState;
    type JudgeStateResponse = BasicHttpResponse<JudgeState[]>;
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
            };
            spj?: {
                compileMessage?: string;
            };
            interactor?: {
                compileMessage?: string;
            };
        };
    }
    type JudgeDetailResponse = BasicHttpResponse<JudgeDetail>;
    interface TaskStatus {
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
        recent?: {
            [minute: number]: number;
        };
    }
    interface MemoryUsage {
        percentage: number;
        recent?: {
            [minute: number]: number;
        };
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
    type HttpResponse = ErrorResponse | JudgesResponse | JudgeStateResponse | JudgeDetailResponse | SystemStatusResponse;
}
