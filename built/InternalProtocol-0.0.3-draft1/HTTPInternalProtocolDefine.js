"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPProtocolDefinition = void 0;
var HTTPProtocolDefinition;
(function (HTTPProtocolDefinition) {
    let ResponseType;
    (function (ResponseType) {
        ResponseType[ResponseType["Ack"] = 1] = "Ack";
        ResponseType[ResponseType["Authentication"] = 3] = "Authentication";
        ResponseType[ResponseType["Error"] = 127] = "Error";
    })(ResponseType = HTTPProtocolDefinition.ResponseType || (HTTPProtocolDefinition.ResponseType = {}));
    // --------------------------------------------------------------------
    let JudgeState;
    (function (JudgeState) {
        JudgeState["Confirmed"] = "confirmed";
        JudgeState["ReadingCache"] = "readingCache";
        JudgeState["Downloading"] = "downloading";
        JudgeState["Pending"] = "pending";
        JudgeState["Judging"] = "judging";
        JudgeState["Finished"] = "finished";
    })(JudgeState = HTTPProtocolDefinition.JudgeState || (HTTPProtocolDefinition.JudgeState = {}));
    // ----------------------------------------------------------------
    let JudgeResultType;
    (function (JudgeResultType) {
        JudgeResultType["Accepted"] = "Accepted";
        JudgeResultType["WrongAnswer"] = "WrongAnswer";
        JudgeResultType["TimeLimitExceeded"] = "TimeLimitExceeded";
        JudgeResultType["MemoryLimitExceeded"] = "MemoryLimitExceeded";
        JudgeResultType["OutpuLimitExceeded"] = "OutpuLimitExceeded";
        JudgeResultType["RuntimeError"] = "RuntimeError";
        JudgeResultType["CompileError"] = "CompileError";
        JudgeResultType["CompileTimeLimitExceeded"] = "CompileTimeLimitExceeded";
        JudgeResultType["CompileMemoryLimitExceeded"] = "CompileMemoryLimitExceed";
        JudgeResultType["CompileFileLimitExceeded"] = "CompileFileLimitExceed";
        JudgeResultType["SystemError"] = "SystemError";
        JudgeResultType["SystemTimeLimitExceeded"] = "SystemTimeLimitExceed";
        JudgeResultType["SystemMemoryLimitExceeded"] = "SystemMemoryLimitExceed";
        JudgeResultType["SystemOutpuLimitExceeded"] = "SystemOutpuLimitExceeded";
        JudgeResultType["SystemRuntimeError"] = "SystemRuntimeError";
        JudgeResultType["SystemCompileError"] = "SystemCompileError";
        JudgeResultType["Unjudged"] = "Unjudged";
    })(JudgeResultType = HTTPProtocolDefinition.JudgeResultType || (HTTPProtocolDefinition.JudgeResultType = {}));
})(HTTPProtocolDefinition = exports.HTTPProtocolDefinition || (exports.HTTPProtocolDefinition = {}));
