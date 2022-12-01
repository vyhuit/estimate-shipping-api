/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { ProductType, ProductTypeDocument } from "src/product/schemas/product.schema";
import { Supplier, SupplierDocument } from "src/supplier/schemas/supplier.schema";
import { ProductTypeDto } from "./dto/base-product-type.dto";
export declare class ProductService {
    private readonly productTypeModel;
    private readonly supplierModel;
    constructor(productTypeModel: Model<ProductTypeDocument>, supplierModel: Model<SupplierDocument>);
    getEstimateTime(supplier: string, dateStart: Date): Promise<{
        orderPlace: Date;
        shipping: {
            min: Date;
            max: Date;
        };
        delivery: {
            min: Date;
            max: Date;
        };
        config: {
            name: string;
            config: {
                shipping: {
                    min: number;
                    max: number;
                };
                delivery: {
                    min: number;
                    max: number;
                };
            };
        } | (Supplier & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        });
    }>;
    create(createDto: ProductTypeDto): Promise<ProductType>;
    estimateShipping(data: any): Promise<any>;
}
