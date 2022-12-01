"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var bson_1 = require("bson");
var product_schema_1 = require("src/product/schemas/product.schema");
var supplier_schema_1 = require("src/supplier/schemas/supplier.schema");
var helper_1 = require("src/utils/helper");
var enum_1 = require("../utils/enum");
var ProductService = /** @class */ (function () {
    function ProductService(productTypeModel, supplierModel) {
        this.productTypeModel = productTypeModel;
        this.supplierModel = supplierModel;
    }
    ;
    ProductService.prototype.getEstimateTime = function (supplier, dateStart) {
        return __awaiter(this, void 0, void 0, function () {
            var supplierCheck, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.supplierModel.findOne({ _id: supplier })];
                    case 1:
                        supplierCheck = _a.sent();
                        data = supplierCheck || enum_1.ESTIMATE_DEFAULT;
                        return [2 /*return*/, {
                                orderPlace: new Date(),
                                shipping: {
                                    min: helper_1.helper.addDateExcWorkingDay("min", dateStart, data.config.shipping.min),
                                    max: helper_1.helper.addDateExcWorkingDay("max", dateStart, data.config.shipping.max)
                                },
                                delivery: {
                                    min: helper_1.helper.addDateExcWorkingDay("min", dateStart, data.config.delivery.min),
                                    max: helper_1.helper.addDateExcWorkingDay("max", dateStart, data.config.delivery.max)
                                },
                                config: data
                            }];
                }
            });
        });
    };
    ProductService.prototype.create = function (createDto) {
        return __awaiter(this, void 0, Promise, function () {
            var createProductType;
            return __generator(this, function (_a) {
                createProductType = new this.productTypeModel(createDto);
                return [2 /*return*/, createProductType.save()];
            });
        });
    };
    ProductService.prototype.estimateShipping = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var checkType, supplierId, estTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productTypeModel.findOne(data)];
                    case 1:
                        checkType = _a.sent();
                        supplierId = (checkType === null || checkType === void 0 ? void 0 : checkType.supplierId) || new bson_1.ObjectId().toString();
                        return [4 /*yield*/, this.getEstimateTime(supplierId, new Date())];
                    case 2:
                        estTime = _a.sent();
                        return [2 /*return*/, { type: data.type, supplierId: supplierId, estTime: estTime }
                            // // DDoanj nay them data cho nhieu de test thoi
                            //     if (!checkType) {
                            //       let mockup = [
                            //         "63885ab778a1b11665e560b9",
                            //         "63871e9a2625ce55651a44f9",
                            //         "63871ea92625ce55651a44fb",
                            //         "63885ab778a1b11665e560b9",
                            //         "63871e9a2625ce55651a44f9",
                            //         "63871ea92625ce55651a44fb",
                            //         "63885ab778a1b11665e560b9",
                            //         "63871e9a2625ce55651a44f9",
                            //         "63871ea92625ce55651a44fb"
                            //       ];
                            //       let ran = helper.getRandomInt(mockup.length - 1);
                            //       let temp = {
                            //         type: data.type,
                            //         supplierId: mockup[ran]
                            //       }
                            //       this.create(temp);
                            //     }
                            // // ///////
                        ];
                }
            });
        });
    };
    ;
    ProductService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(product_schema_1.ProductType.name)), __param(1, mongoose_1.InjectModel(supplier_schema_1.Supplier.name))
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
