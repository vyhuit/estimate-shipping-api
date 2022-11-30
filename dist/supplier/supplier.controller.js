"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const base_supplier_dto_1 = require("./dto/base-supplier.dto");
const supplier_service_1 = require("./supplier.service");
let SupplierController = class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    ;
    async getAll(response) {
        try {
            const result = await this.supplierService.getAll();
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Success', result });
        }
        catch (err) {
            console.log("ERR =====> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
    async create(response, data) {
        try {
            const result = await this.supplierService.create(data);
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Supplier has been successfully created', result });
        }
        catch (err) {
            console.log("ERR =====> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
    async delete(response, type) {
        try {
            const result = await this.supplierService.delete(type);
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Supplier has been successfully DELETED', result });
        }
        catch (err) {
            console.log("ERR =====> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
    async getSupplier(response, id) {
        try {
            const result = await this.supplierService.getSupplierById(id);
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Success', result });
        }
        catch (err) {
            console.log("ERR =====> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
    async update(response, id, data) {
        try {
            const result = await this.supplierService.update(id, data);
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Successfully updated', result });
        }
        catch (err) {
            console.log("ERR =====> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, base_supplier_dto_1.BaseSupplierDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)("/:type"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("type")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getSupplier", null);
__decorate([
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, base_supplier_dto_1.BaseSupplierDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "update", null);
SupplierController = __decorate([
    (0, common_1.Controller)("supplier"),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierController);
exports.SupplierController = SupplierController;
//# sourceMappingURL=supplier.controller.js.map