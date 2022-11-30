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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bson_1 = require("bson");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
const supplier_schema_1 = require("../supplier/schemas/supplier.schema");
const helper_1 = require("../utils/helper");
const enum_1 = require("../utils/enum");
let ProductService = class ProductService {
    constructor(productTypeModel, supplierModel) {
        this.productTypeModel = productTypeModel;
        this.supplierModel = supplierModel;
    }
    ;
    async getEstimateTime(supplier, dateStart) {
        const supplierCheck = await this.supplierModel.findOne({ _id: supplier });
        const config = supplierCheck
            ? supplierCheck.config
            : enum_1.ESTIMATE_DEFAULT.config;
        return {
            orderPlace: new Date(),
            shipping: {
                min: helper_1.helper.addDateExcWorkingDay("min", dateStart, config.shipping.min),
                max: helper_1.helper.addDateExcWorkingDay("max", dateStart, config.shipping.max)
            },
            delivery: {
                min: helper_1.helper.addDateExcWorkingDay("min", dateStart, config.delivery.min),
                max: helper_1.helper.addDateExcWorkingDay("max", dateStart, config.delivery.max)
            }
        };
        ;
    }
    async create(createDto) {
        const createProductType = new this.productTypeModel(createDto);
        return createProductType.save();
    }
    async estimateShipping(data) {
        let checkType = await this.productTypeModel.find(data);
        let supplierId = checkType.length > 0
            ? checkType[0].supplierId
            : new bson_1.ObjectId().toString();
        const estTime = await this.getEstimateTime(supplierId, new Date());
        return { type: data.type, supplierId: supplierId, estTime: estTime };
    }
    ;
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.ProductType.name)),
    __param(1, (0, mongoose_1.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map