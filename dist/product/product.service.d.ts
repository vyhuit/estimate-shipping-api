import { Model } from "mongoose";
import { ProductType, ProductTypeDocument } from "src/product/schemas/product.schema";
import { SupplierDocument } from "src/supplier/schemas/supplier.schema";
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
    }>;
    create(createDto: ProductTypeDto): Promise<ProductType>;
    estimateShipping(data: any): Promise<any>;
}
