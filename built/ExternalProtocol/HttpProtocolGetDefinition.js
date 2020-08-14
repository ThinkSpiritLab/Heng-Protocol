"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
var Get;
(function (Get) {
    // ----------------------------------------------------------------
    let JudgeStateEnum;
    (function (JudgeStateEnum) {
        JudgeStateEnum["Waiting"] = "Waiting";
        JudgeStateEnum["Preparing"] = "Preparing";
        JudgeStateEnum["Pending"] = "Pending";
        JudgeStateEnum["Judging"] = "Judging";
        JudgeStateEnum["Judged"] = "Judged";
    })(JudgeStateEnum = Get.JudgeStateEnum || (Get.JudgeStateEnum = {}));
    // -------------------------------------------------------------
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
    })(JudgeResultType = Get.JudgeResultType || (Get.JudgeResultType = {}));
})(Get = exports.Get || (exports.Get = {}));
