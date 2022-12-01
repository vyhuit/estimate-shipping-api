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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const base_product_type_dto_1 = require("./dto/base-product-type.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(prodService) {
        this.prodService = prodService;
    }
    ;
    async estimateShipping(data, response) {
        try {
            console.log("controller data: ", data);
            const result = await this.prodService.estimateShipping(data);
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Successfully', data: result });
        }
        catch (err) {
            console.log("!!!ERR =>>>> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
    async createProductTypeWithSupplier(data, response) {
        try {
            const newProductType = await this.prodService.create(data);
            return response.status(common_1.HttpStatus.OK).json({ isSuccess: true, message: 'Successfully', data: newProductType });
        }
        catch (err) {
            console.log("!!!ERR =>>>> ", err);
            throw new common_1.NotFoundException(err.message);
        }
    }
    ;
};
__decorate([
    (0, common_1.Post)("estimate-shipping"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "estimateShipping", null);
__decorate([
    (0, common_1.Post)("product-type-supplier"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_product_type_dto_1.ProductTypeDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductTypeWithSupplier", null);
ProductController = __decorate([
    (0, common_1.Controller)("product"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map