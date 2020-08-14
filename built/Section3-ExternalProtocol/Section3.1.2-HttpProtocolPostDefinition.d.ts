export declare namespace Post {
    export interface BasicHttpRequest<T> {
        nonce: string;
        timestamp: number;
        body: T;
        ackey: string;
        signature: string;
    }
    export interface BasicHttpResponse<T> {
        statuscode: number;
        message?: string;
        body: T;
    }
    export type File = {
        id: string;
        hashsum?: string;
    } & ({
        url: string;
        authorization?: string;
    } | {
        content: string;
    });
    export enum JudgeType {
        Normal = "normal",
        Special = "special",
        Interactive = "interactive"
    }
    export enum TestPolicy {
        Fuse = "fuse",
        All = "all"
    }
    interface Limit {
        runtime: {
            memory: number;
            cpuTime: number;
            output: number;
        };
        compiler: {
            memory: number;
            cpuTime: number;
            output: number;
            message: number;
        };
    }
    interface Excuteable {
        source: File;
        environment: string;
        limit: Limit;
    }
    type DynamicFile = {
        type: "builtin";
        name: string;
    } | {
        type: "remote";
        file: File;
        name: string;
    };
    type Judge = {
        type: JudgeType.Normal;
        user: Excuteable;
    } | {
        type: JudgeType.Special;
        user: Excuteable;
        spj: Excuteable;
    } | {
        type: JudgeType.Interactive;
        user: Excuteable;
        interactor: Excuteable;
    };
    export interface JudgeRequest {
        taskId: string;
        data?: File;
        dynamicFiles?: DynamicFile[];
        judge: Judge;
        test?: {
            cases: {
                input: string;
                output: string;
            }[];
            policy: TestPolicy;
        };
    }
    export interface ExtendJudgeRequest {
        taskId: string;
        dynamicFiles?: DynamicFile[];
        judge: Judge;
    }
    export interface CreateJudgePayload {
        mainJudge: JudgeRequest;
        extra?: ExtendJudgeRequest[];
    }
    export type CreateJudgeRequest = BasicHttpRequest<CreateJudgePayload>;
    export type CreateJudgesResponse = BasicHttpResponse<string[]>;
    export {};
}
