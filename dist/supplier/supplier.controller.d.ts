import { BaseSupplierDto } from "./dto/base-supplier.dto";
import { SupplierService } from "./supplier.service";
export declare class SupplierController {
    private supplierService;
    constructor(supplierService: SupplierService);
    getAll(response: any): Promise<any>;
    create(response: any, data: BaseSupplierDto): Promise<any>;
    delete(response: any, type: string): Promise<any>;
    getSupplier(response: any, id: string): Promise<any>;
    update(response: any, id: string, data: BaseSupplierDto): Promise<any>;
}
