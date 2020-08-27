export namespace Post {
    export interface BasicHttpRequest<T> {
        nonce: string;
        timestamp: number; // 64位时间好像超出上界，但是应该影响不大
        body: T;
        accesskey: string;
        signature: string;
    }
    export interface BasicHttpResponse<T> {
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

    export enum JudgeType {
        Normal = "normal",
        Special = "special",
        Interactive = "interactive",
    }
    export enum TestPolicy {
        Fuse = "fuse",
        All = "all",
    }
    export interface Limit {
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

    export interface Excuteable {
        source: File;
        environment: string; // how to compile or excute
        limit: Limit;
    }

    export type DynamicFile =
        | {
              type: "builtin";
              name: string; // "user_source" "user_bin"
          }
        | {
              type: "remote";
              file: File;
              name: string;
          };

    export type Judge =
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
    export type CallBackUrl = string;
    export interface JudgeCallbackUrls {
        judgeStateCallBackUrl?: CallBackUrl;
        judgeResultCallBackUrl: CallBackUrl;
    }
    export interface JudgeRequest {
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

        judgeCallbackUrls: JudgeCallbackUrls;
    }
    export interface ExtendJudgeRequest {
        taskId: string;

        dynamicFiles?: DynamicFile[]; // provide ["user_source","user_bin"]

        judge: Judge;

        judgeCallbackUrls?: JudgeCallbackUrls;
    }
    export interface CreateJudgePayload {
        mainJudge: JudgeRequest;
        extra?: ExtendJudgeRequest[];
    }
    export type CreateJudgeRequest = BasicHttpRequest<CreateJudgePayload>;

    export type CreateJudgesResponse = BasicHttpResponse<string[]>;
    // ----------------------------------------------------------------
}
