"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = void 0;
var aws_serverless_express_1 = require("aws-serverless-express");
var middleware_1 = require("aws-serverless-express/middleware");
var express = require("express");
var cors = require("cors");
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
var binaryMimeTypes = [];
var cachedServer;
process.on('unhandledRejection', function (reason) {
    console.error(reason);
});
process.on('uncaughtException', function (reason) {
    console.error(reason);
});
function bootstrapServer() {
    return __awaiter(this, void 0, Promise, function () {
        var expressApp, nestApp, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!cachedServer) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    expressApp = express();
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 2:
                    nestApp = _a.sent();
                    // nestApp.enableCors({
                    //   credentials: true
                    // })
                    nestApp.use(middleware_1.eventContext());
                    return [4 /*yield*/, nestApp.init()];
                case 3:
                    _a.sent();
                    // const expressApp = nestApp.getHttpAdapter().getInstance();
                    expressApp.use(cors());
                    expressApp.use(nestApp.getHttpAdapter().getInstance());
                    cachedServer = aws_serverless_express_1.createServer(expressApp);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(error_1)];
                case 5: return [2 /*return*/, Promise.resolve(cachedServer)];
            }
        });
    });
}
exports.handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                context.callbackWaitsForEmptyEventLoop = false;
                return [4 /*yield*/, bootstrapServer()];
            case 1:
                cachedServer = _a.sent();
                return [2 /*return*/, aws_serverless_express_1.proxy(cachedServer, event, context, 'PROMISE').promise];
        }
    });
}); };
