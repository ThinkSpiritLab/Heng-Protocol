export declare namespace Callbacks {
    enum JudgeStateEnum {
        Waiting = "Waiting",
        Preparing = "Preparing",
        Pending = "Pending",
        Judging = "Judging",
        Judged = "Judged"
    }
    interface JudgeStatus {
        judgeId: string;
        state: JudgeStateEnum.Waiting | JudgeStateEnum.Preparing | JudgeStateEnum.Pending | JudgeStateEnum.Judging | JudgeStateEnum.Judged;
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
}
