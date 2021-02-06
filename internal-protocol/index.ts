import * as HTTP from "./http";
import * as WS from "./ws";
export { HTTP, WS };

export interface ConnectionSettings {
    statusReportInterval: number; // milliseconds
}

export interface ErrorInfo {
    code: number;
    message?: string;
}
