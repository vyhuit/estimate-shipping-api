import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ObjectId} from "bson";
import {Model} from "mongoose";
import { ESTIMATE_DEFAULT } from "src/common/constants/estimate-shipping";
import { addDateExcludeWorkingDay } from "src/common/helpers/estimate-shipping";
import { ProductTypeModel } from "src/models/product-type";
import {ProductType, ProductTypeDocument} from "src/schemas/product.schema";
import {Supplier, SupplierDocument} from "src/schemas/supplier.schema";

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductType.name) private readonly productTypeModel : Model < ProductTypeDocument >, @InjectModel(Supplier.name) private readonly supplierModel : Model < SupplierDocument >) {};

  async getEstimateTime(supplier : string, dateStart : Date) {
    const supplierCheck = await this.supplierModel.findOne({_id: supplier});
    const data = supplierCheck || ESTIMATE_DEFAULT;

    return {
      orderPlace: new Date(),
      shipping: {
        min: addDateExcludeWorkingDay("min", dateStart, data.config.shipping.min),
        max: addDateExcludeWorkingDay("max", dateStart, data.config.shipping.max)
      },
      delivery: {
        min: addDateExcludeWorkingDay("min", dateStart, data.config.delivery.min),
        max: addDateExcludeWorkingDay("max", dateStart, data.config.delivery.max)
      },
      config: data
    };;
  }

  async create(createDto : ProductTypeModel): Promise < ProductType > {
    const createProductType = new this.productTypeModel(createDto);
    return createProductType.save();
  }

  async estimateShipping(data : any): Promise < any > {
    let checkType = await this.productTypeModel.findOne(data);
    let supplierId = checkType?.supplierId || new ObjectId().toString(); //lay config default khi data chua co.
    const estTime = await this.getEstimateTime(supplierId, new Date());
    return {type: data.type, supplierId: supplierId, estTime: estTime};
  };
}
