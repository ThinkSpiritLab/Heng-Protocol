export declare namespace Heng.ExternalProtocol.v1.Http.Post
{
    export interface BasicHttpRequest<T>
    {
        url: string;
        messageid: string;
        tiemstamp: string | number; // 64位时间好像超出上界，但是应该影响不大
        body: T;
        ackey: string;
        signature: string;
    }
    export interface BasicHttpResponse<T>
    {
        statuscode: number;
        message?: string;
        body: T;
    }
    // ----------------------------------------------------------------
    export type File = {
        id: string;
        hashsum?: string;
    } & (
            | {
                url: string;
                authorization?: string;
            }
            | {
                content: string;
            }
        );

    export enum JudgeType
    {
        Normal = "normal",
        Special = "special",
        Interactive = "interactive",
    }
    export enum TestPolicy
    {
        Fuse = "fuse",
        All = "all",
    }
    interface Limit
    {
        // 运行：内存、时间、输出
        // 编译: 内存、时间、输出(标准流、生成文件）

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

    interface Excuteable
    {
        source: File;
        environment: string; // how to compile or excute
        limit: Limit;
    }

    type DynamicFile =
        | {
            type: "builtin";
            name: string; // "user_source" "user_bin"
        }
        | {
            type: "remote";
            file: File;
            name: string;
        };

    type Judge =
        | {
            type: JudgeType.Normal;
            user: Excuteable;
        }
        | {
            type: JudgeType.Special;
            user: Excuteable;
            spj: Excuteable;
        }
        | {
            type: JudgeType.Interactive;
            user: Excuteable;
            interactor: Excuteable;
        };

    export interface JudgeRequest
    {
        taskId: string;

        data?: File; // zip

        dynamicFiles?: DynamicFile[]; // provide ["user_source","user_bin"]

        judge: Judge;

        test?: {
            cases: {
                input: string; // file path or dynamic file identifier
                output: string; // file path or dynamic file identifier
            }[];

            policy: TestPolicy; // 全部/短路
        };
    }
    export interface ExtendJudgeRequest
    {
        taskId: string;

        data?: File; // zip

        dynamicFiles?: DynamicFile[]; // provide ["user_source","user_bin"]

        judge: Judge;
    }
    export interface CreateJudgePayload
    {
        mainJudge: JudgeRequest;
        extra?: ExtendJudgeRequest[];
    }
    export type CreateJudgeRequest = BasicHttpRequest<CreateJudgePayload>;

    export type CreateJudgesResponse = BasicHttpResponse<string[]>;
    // ----------------------------------------------------------------
}