export namespace Get {
    export interface BasicHttpResponse<T> {
        statuscode: number;
        message?: string;
        body: T;
    }
    // ----------------------------------------------------------------
    export interface JudgesResponsePayload {
        judges: string[];
        pageCount: number;
    }

    export type JudgesResponse = BasicHttpResponse<JudgesResponsePayload>;
    // ----------------------------------------------------------------
    export enum JudgeStateEnum {
        Waiting = "Waiting",
        Preparing = "Preparing",
        Pending = "Pending",
        Judging = "Judging",
        Judged = "Judged",
    }

    export interface BriefJudgeCaseResult {
        result: JudgeResultType;
        time: number;
        memory: number;
    }

    export interface BriefJudgeResult {
        cases: BriefJudgeCaseResult[];
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

    export type JudgeStatusResponse = BasicHttpResponse<JudgeStatus>;
    // -------------------------------------------------------------
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
    export type JudgeResultResponse = BasicHttpResponse<JudgeDetail>;
    // ----------------------------------------------------------------
    export interface TaskStatus {
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
    export interface JudgerStatus {
        name: string;
        hardware: HardwareStatus;
    }

    export interface SystemStatus {
        tasks: TaskStatus;
        controller: HardwareStatus;
        judgers: JudgerStatus[];
    }

    export type SystemStatusResponse = BasicHttpResponse<SystemStatus>;
    // -------------------------------------------------------------
    export type ErrorResponse = BasicHttpResponse<undefined>;

    export type HttpResponse =
        | ErrorResponse
        | JudgesResponse
        | JudgeStatusResponse
        | JudgeResultResponse
        | SystemStatusResponse;
}
