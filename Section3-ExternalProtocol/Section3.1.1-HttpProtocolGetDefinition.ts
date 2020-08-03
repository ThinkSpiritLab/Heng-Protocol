export declare namespace Heng.ExternalProtocol.v1.Http.Get
{
    export interface BasicHttpResponse<T>
    {
        statuscode: number;
        message?: string;
        body: T;
    }
    // ----------------------------------------------------------------
    export type JudgesResponse = BasicHttpResponse<string[]>;
    // ----------------------------------------------------------------
    export enum JudgeStateEnum
    {
        Waiting = "Waiting",
        Preparing = "Preparing",
        Pending = "Pending",
        Judging = "Judging",
        Judged = "Judged",
    }

    export enum JudgeResultType
    {
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

    export interface BriefJudgeCaseResult
    {
        result: JudgeResultType;
        time: number;
        memory: number;
    }

    export interface BriefJudgeResult
    {
        cases: BriefJudgeCaseResult[];
    }

    export interface JudgeWaitingState
    {
        judgeId: string;
        state: JudgeStateEnum.Waiting
        | JudgeStateEnum.Preparing
        | JudgeStateEnum.Pending
        | JudgeStateEnum.Judging;
    }
    export interface JudgeFinishState
    {
        judgeId: string;
        state: JudgeStateEnum.Judged;
        result: BriefJudgeResult;
    }
    export type JudgeState = JudgeWaitingState
        | JudgeFinishState;

    export type JudgeStateResponse = BasicHttpResponse<JudgeState[]>;
    // -------------------------------------------------------------
    export interface JudgeCaseResult
    {
        result: JudgeResultType;
        time: number;
        memory: number;
        extraMessage?: string;
    }
    export interface JudgeDetail
    {
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
    export type JudgeDetailResponse = BasicHttpResponse<JudgeDetail>;
    // ----------------------------------------------------------------
    export interface TaskStatus
    {
        preparing: {
            downloading: number;
            readingCache: number;
        };
        pending: number;
        running: number;
        finished: number;
        total: number;
    }
    export interface CpuUsage
    {
        percentage: number;
        recent?: {
            [minute: number]: number;
        };
    }

    export interface MemoryUsage
    {
        percentage: number;
        recent?: {
            [minute: number]: number;
        };
    }

    export interface HardwareStatus
    {
        cpu: CpuUsage;
        memory: MemoryUsage;
    }
    export interface JudgerStatus
    {
        name: string;
        hardware: HardwareStatus;
    }

    export interface SystemStatus
    {
        tasks: TaskStatus;
        controller: HardwareStatus;
        judgers: JudgerStatus[];
    }

    export type SystemStatusResponse = BasicHttpResponse<SystemStatus>;
    // -------------------------------------------------------------
    export type ErrorResponse = BasicHttpResponse<undefined>;

    export type HttpResponse = ErrorResponse
        | JudgesResponse
        | JudgeStateResponse
        | JudgeDetailResponse
        | SystemStatusResponse;
}
