"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var Post;
(function (Post) {
    let JudgeType;
    (function (JudgeType) {
        JudgeType["Normal"] = "normal";
        JudgeType["Special"] = "special";
        JudgeType["Interactive"] = "interactive";
    })(JudgeType = Post.JudgeType || (Post.JudgeType = {}));
    let TestPolicy;
    (function (TestPolicy) {
        TestPolicy["Fuse"] = "fuse";
        TestPolicy["All"] = "all";
    })(TestPolicy = Post.TestPolicy || (Post.TestPolicy = {}));
    // ----------------------------------------------------------------
})(Post = exports.Post || (exports.Post = {}));
