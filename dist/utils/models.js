"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
class ResponseModel {
    constructor(parram) {
        this.parram = parram;
        this.isSuccess = this.parram.isSuccess || false;
        this.data = this.parram.data || {};
        this.errors = this.parram.error || [];
        this.msg = this.parram.msg || "";
    }
    ;
    getResponse() {
        return this;
    }
}
exports.ResponseModel = ResponseModel;
;
//# sourceMappingURL=models.js.map