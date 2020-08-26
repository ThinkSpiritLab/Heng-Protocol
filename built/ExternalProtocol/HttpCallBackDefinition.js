"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callbacks = void 0;
var Callbacks;
(function (Callbacks) {
    let JudgeStateEnum;
    (function (JudgeStateEnum) {
        JudgeStateEnum["Waiting"] = "Waiting";
        JudgeStateEnum["Preparing"] = "Preparing";
        JudgeStateEnum["Pending"] = "Pending";
        JudgeStateEnum["Judging"] = "Judging";
        JudgeStateEnum["Judged"] = "Judged";
    })(JudgeStateEnum = Callbacks.JudgeStateEnum || (Callbacks.JudgeStateEnum = {}));
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
    })(JudgeResultType = Callbacks.JudgeResultType || (Callbacks.JudgeResultType = {}));
})(Callbacks = exports.Callbacks || (exports.Callbacks = {}));
