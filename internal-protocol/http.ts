export interface AcquireTokenRequest {
    maxTaskCount: number;
    coreCount?: number;
    name?: string;
    systemInfo?: string;
    timeRatio?: number;
}

export interface AcquireTokenOutput {
    token: string;
}

export interface ErrorInfo {
    code: number;
    message?: string;
}
