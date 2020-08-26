export declare namespace Post {
    interface BasicHttpRequest<T> {
        nonce: string;
        timestamp: number;
        body: T;
        accesskey: string;
        signature: string;
    }
    interface BasicHttpResponse<T> {
        statuscode: number;
        message?: string;
        body: T;
    }
    type File = {
        id: string;
        hashsum?: string;
    } & ({
        url: string;
        authorization?: string;
    } | {
        content: string;
    });
    enum JudgeType {
        Normal = "normal",
        Special = "special",
        Interactive = "interactive"
    }
    enum TestPolicy {
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
    type CallBackUrl = string;
    interface JudgeCallback {
        judgeState?: CallBackUrl;
        judgeResult: CallBackUrl;
    }
    interface JudgeRequest {
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
        judgeCallback: JudgeCallback;
    }
    interface ExtendJudgeRequest {
        taskId: string;
        dynamicFiles?: DynamicFile[];
        judge: Judge;
        judgeCallback?: JudgeCallback;
    }
    interface CreateJudgePayload {
        mainJudge: JudgeRequest;
        extra?: ExtendJudgeRequest[];
    }
    type CreateJudgeRequest = BasicHttpRequest<CreateJudgePayload>;
    type CreateJudgesResponse = BasicHttpResponse<string[]>;
}
