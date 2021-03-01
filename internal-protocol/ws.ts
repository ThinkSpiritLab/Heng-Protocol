import {
    JudgeState,
    JudgeResult,
    StatusReport,
    DynamicFile,
    File,
    Judge,
    TestCase,
    TestPolicy,
} from "../";

import { ConnectionSettings, ErrorInfo } from "./";

export interface Message {
    type: "req" | "res";
    seq: number; // u32
    time: string; // RFC3339
    body: unknown;
}

export interface Request<M extends string, A = unknown> extends Message {
    type: "req";
    body: {
        method: M; // RPC method name
        args: A; // RPC arguments
    };
}

export interface Response<R = unknown> extends Message {
    type: "res";
    body:
        | {
              output: R; // RPC output
          }
        | {
              error: ErrorInfo;
          };
}

export type CreateJudgeArgs = {
    id: string;
    data?: File;
    dynamicFiles?: DynamicFile[];
    judge: Judge;
    test?: {
        cases: TestCase[];
        policy: TestPolicy;
    };
};

export type CreateJudgeRequest = Request<"CreateJudge", CreateJudgeArgs>;

export type CreateJudgeResponse = Response<null>;

export type ExitArgs = {
    reconnect?: {
        delay: number; // milliseconds
    };
    reason?: string;
};

export type ExitRequest = Request<"Exit", ExitArgs>;

export type ExitResponse = Response<null>;

export type LogArgs = {
    level: "warn" | "error";
    code: number;
    message: string;
};

export type LogRequest = Request<"Log", LogArgs>;

export type LogResponse = Response<null>;

export type ControlArgs = Partial<ConnectionSettings> | null;

export type ControlRequest = Request<"Control", ControlArgs>;

export type ControlResponse = Response<ConnectionSettings>;

export type ReportStatusArgs = {
    collectTime: string; // RFC3339
    nextReportTime: string; // RFC3339
    report: StatusReport;
};

export type ReportStatusRequest = Request<"ReportStatus", ReportStatusArgs>;

export type ReportStatusResponse = Response<null>;

export type UpdateJudgesArgs = {
    id: string;
    state: JudgeState;
};

export type UpdateJudgesRequest = Request<"UpdateJudges", UpdateJudgesArgs>;

export type UpdateJudgesResponse = Response<null>;

export type FinishJudgesArgs = {
    id: string;
    result: JudgeResult;
};

export type FinishJudgesRequest = Request<"FinishJudges", FinishJudgesArgs>;

export type FinishJudgesResponse = Response<null>;

export type JudgerMethod = "CreateJudge" | "Exit" | "Control";
export type JudgerArgs = CreateJudgeArgs | ExitArgs | ControlArgs;
export type JudgerRequest = CreateJudgeRequest | ExitRequest | ControlRequest;

export type ControllerMethod =
    | "Exit"
    | "Log"
    | "ReportStatus"
    | "UpdateJudges"
    | "FinishJudges";

export type ControllerArgs =
    | ExitArgs
    | LogArgs
    | ReportStatusArgs
    | UpdateJudgesArgs
    | FinishJudgesArgs;

export type ControllerRequest =
    | ExitRequest
    | LogRequest
    | ReportStatusRequest
    | UpdateJudgesRequest
    | FinishJudgesRequest;
