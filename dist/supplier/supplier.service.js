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
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const supplier_schema_1 = require("./schemas/supplier.schema");
let SupplierService = class SupplierService {
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }
    ;
    async create(createSupplierDto) {
        return this.supplierModel.create(createSupplierDto);
    }
    ;
    async delete(type) {
        const result = await this.supplierModel.findOneAndRemove({ name: type });
        if (!result) {
            throw new common_1.NotFoundException(`Error`);
        }
        return result;
    }
    ;
    async update(id, data) {
        const result = await this.supplierModel.findByIdAndUpdate(id, data);
        if (!result) {
            throw new common_1.NotFoundException(`Student ${data.name} #${id} not found`);
        }
        return result;
    }
    ;
    async getAll() {
        const result = await this.supplierModel.find();
        return result;
    }
    ;
    async getSupplierById(id) {
        const result = await this.supplierModel.findById(id);
        return result;
    }
    ;
};
SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SupplierService);
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map