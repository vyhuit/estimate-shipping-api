import { ProductTypeDto } from "./dto/base-product-type.dto";
import { ProductService } from "./product.service";
export declare class ProductController {
    private prodService;
    constructor(prodService: ProductService);
    estimateShipping(data: any, response: any): Promise<any>;
    createProductTypeWithSupplier(data: ProductTypeDto, response: any): Promise<any>;
}
