export type File = {
    hashsum?: string; //sha256
} & (
    | {
          type: "url";
          url: string;
          //authorization?: string;
      }
    | {
          type: "direct";
          content: string;
      }
);

export type DynamicFile =
    | {
          type: "builtin";
          name: string; // provide: "usr:code" "spj:code" "interactor:code"
      }
    | {
          type: "remote";
          file: File;
          name: string;
      };

export enum TestPolicy {
    Fuse = "fuse",
    All = "all",
}

export interface TestCase {
    input: string; // file path in compressed main File or dynamic file identifier
    output: string; // file path in compressed main File or dynamic file identifier
}

export enum JudgeType {
    Normal = "normal",
    Special = "special",
    Interactive = "interactive",
}

export type Judge =
    | {
          type: JudgeType.Normal;
          user: Executable;
      }
    | {
          type: JudgeType.Special;
          user: Executable;
          spj: Executable;
      }
    | {
          type: JudgeType.Interactive;
          user: Executable;
          interactor: Executable;
      };

export interface Executable {
    source: File;
    environment: {
        language: string;
        system: "Windows" | "Linux" | "Darwin";
        arch: "x64" | "arm" | "risc-v" | "powerpc" | "mips";
        options: { [key: string]: string | number | boolean };
    }; // how to compile or excute
    limit: Limit;
}

export interface JudgeStatus {
    pending: number;
    preparing: {
        downloading: number;
        readingCache: number;
        compiling: number;
    };
    judging: number;
    finished: number;
    total: number;
}

export interface HardwareStatus {
    cpu: {
        percentage: number;
        loadavg?: [number, number, number];
    };
    memory: {
        percentage: number;
    };
}

export interface Limit {
    runtime: {
        memory: number; // byte
        cpuTime: number; // milliseconds
        output: number; // byte
    };
    compiler: {
        memory: number; // byte
        cpuTime: number; // milliseconds
        output: number; // byte
        message: number; // byte
    };
}

export interface StatusReport {
    hardware: HardwareStatus;
    judge: JudgeStatus;
}

export enum JudgeState {
    Confirmed = "confirmed",
    Pending = "pending",
    Preparing = "preparing",
    Judging = "judging",
    Finished = "finished",
}

export enum JudgeResultKind {
    Accepted = "Accepted",
    WrongAnswer = "WrongAnswer",
    PresentationError = "PresentationError",

    TimeLimitExceeded = "TimeLimitExceeded",
    MemoryLimitExceeded = "MemoryLimitExceeded",
    OutpuLimitExceeded = "OutpuLimitExceeded",
    RuntimeError = "RuntimeError",

    CompileError = "CompileError",
    CompileTimeLimitExceeded = "CompileTimeLimitExceeded",
    CompileMemoryLimitExceeded = "CompileMemoryLimitExceed",
    CompileFileLimitExceeded = "CompileFileLimitExceed",

    SystemError = "SystemError",
    SystemTimeLimitExceeded = "SystemTimeLimitExceed",
    SystemMemoryLimitExceeded = "SystemMemoryLimitExceed",
    SystemOutpuLimitExceeded = "SystemOutpuLimitExceeded",
    SystemRuntimeError = "SystemRuntimeError",
    SystemCompileError = "SystemCompileError",

    Unjudged = "Unjudged",
}

export interface JudgeCaseResult {
    kind: JudgeResultKind;
    time: number; // ms
    memory: number; // byte
    extraMessage?: string;
}

export interface JudgeResult {
    cases: JudgeCaseResult[];
    extra?: {
        user?: {
            compileMessage?: string;
            compileTime?: number; // ms
        };
        spj?: {
            compileMessage?: string;
            compileTime?: number; // ms
        };
        interactor?: {
            compileMessage?: string;
            compileTime?: number; // ms
        };
    };
}
