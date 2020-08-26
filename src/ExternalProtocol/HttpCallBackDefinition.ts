export namespace Callbacks {
    export enum JudgeStateEnum {
        Waiting = "Waiting",
        Preparing = "Preparing",
        Pending = "Pending",
        Judging = "Judging",
        Judged = "Judged",
    }

    export interface JudgeStatus {
        judgeId: string;
        state:
            | JudgeStateEnum.Waiting
            | JudgeStateEnum.Preparing
            | JudgeStateEnum.Pending
            | JudgeStateEnum.Judging
            | JudgeStateEnum.Judged;
    }
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
        time: number; //ms
        memory: number; //byte
        extraMessage?: string;
    }
    export interface JudgeDetail {
        judgeId: string;
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
}
