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


    // export type JudgeStatusResponse = BasicHttpResponse<JudgeStatus>;
    // -------------------------------------------------------------
    // export type JudgeResultResponse = BasicHttpResponse<JudgeDetail>;
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
        // | JudgeStatusResponse
        // | JudgeResultResponse
        | SystemStatusResponse;
}
