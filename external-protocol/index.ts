import {
    File,
    DynamicFile,
    Judge,
    TestCase,
    TestPolicy,
    JudgeState,
    JudgeResult,
    JudgeStatus,
    HardwareStatus,
} from "../internal-protocol";

export interface ErrorResponse {
    code: number;
    message: string;
}

export type CreateJudgeRequest = {
    data?: File;
    dynamicFiles?: DynamicFile[];
    judge: Judge;
    test?: {
        cases: TestCase[];
        policy: TestPolicy;
    };
    callbackUrls: {
        update: string;
        finish: string;
    };
};

export type CreateJudgeOutput = {
    id: string;
};

export type UpdateJudgeCallback = {
    id: string;
    state: JudgeState;
};

export type FinishJudgeCallback = {
    id: string;
    result: JudgeResult;
};

export type SystemStatusOutput = {
    controller: {
        hardware: HardwareStatus;
    };
    judgers: {
        maxTaskCount: number;
        coreCount?: number;
        name?: string;
        systemInfo?: string;
        hardware: HardwareStatus;
        judge: JudgeStatus;
    }[];
};
