"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketProtocolDefinition;
(function (WebSocketProtocolDefinition) {
    let MessageType;
    (function (MessageType) {
        MessageType[MessageType["StatusReportControl"] = 17] = "StatusReportControl";
        MessageType[MessageType["StatusReport"] = 18] = "StatusReport";
        MessageType[MessageType["JudgeRequest"] = 33] = "JudgeRequest";
        MessageType[MessageType["Disconnect"] = 125] = "Disconnect";
        MessageType[MessageType["Shutdown"] = 126] = "Shutdown";
        MessageType[MessageType["Error"] = 127] = "Error";
    })(MessageType = WebSocketProtocolDefinition.MessageType || (WebSocketProtocolDefinition.MessageType = {}));
    let JudgerStatus;
    (function (JudgerStatus) {
        JudgerStatus["Booting"] = "booting";
        JudgerStatus["Booted"] = "booted";
        JudgerStatus["RequestingToken"] = "requestingToken";
        JudgerStatus["EstablishingWebsocket"] = "establishingWebsocket";
        JudgerStatus["Connected"] = "connected";
        JudgerStatus["Error"] = "error";
        JudgerStatus["Fatal"] = "fatal";
        JudgerStatus["ShuttingDown"] = "shuttingDown";
        JudgerStatus["Terminated"] = "terminated";
    })(JudgerStatus = WebSocketProtocolDefinition.JudgerStatus || (WebSocketProtocolDefinition.JudgerStatus = {}));
    let JudgeType;
    (function (JudgeType) {
        JudgeType["Normal"] = "normal";
        JudgeType["Special"] = "special";
        JudgeType["Interactive"] = "interactive";
    })(JudgeType = WebSocketProtocolDefinition.JudgeType || (WebSocketProtocolDefinition.JudgeType = {}));
    let TestPolicy;
    (function (TestPolicy) {
        TestPolicy["Fuse"] = "fuse";
        TestPolicy["All"] = "all";
    })(TestPolicy = WebSocketProtocolDefinition.TestPolicy || (WebSocketProtocolDefinition.TestPolicy = {}));
})(WebSocketProtocolDefinition = exports.WebSocketProtocolDefinition || (exports.WebSocketProtocolDefinition = {}));
