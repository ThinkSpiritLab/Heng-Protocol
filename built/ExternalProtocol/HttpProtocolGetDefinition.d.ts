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
    type HttpResponse = ErrorResponse | JudgesResponse | SystemStatusResponse;
}
