import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "bson";
import { Model } from "mongoose";
import { ProductType, ProductTypeDocument } from "src/product/schemas/product.schema";
import { Supplier, SupplierDocument } from "src/supplier/schemas/supplier.schema";
import { helper } from "src/utils/helper";
import { ESTIMATE_DEFAULT } from "../utils/enum";
import { ProductTypeDto } from "./dto/base-product-type.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductType.name)private readonly productTypeModel : Model < ProductTypeDocument >, @InjectModel(Supplier.name)private readonly supplierModel : Model < SupplierDocument >) {};

  async getEstimateTime(supplier : string, dateStart : Date) {
    const supplierCheck = await this.supplierModel.findOne({_id: supplier});
    const config = supplierCheck
      ? supplierCheck.config
      : ESTIMATE_DEFAULT.config;
    
    return {
      orderPlace: new Date(),
      shipping: {
        min: helper.addDateExcWorkingDay("min", dateStart, config.shipping.min),
        max: helper.addDateExcWorkingDay("max", dateStart, config.shipping.max)
      },
      delivery: {
        min: helper.addDateExcWorkingDay("min", dateStart, config.delivery.min),
        max: helper.addDateExcWorkingDay("max", dateStart, config.delivery.max)
      }
    };;
  }

  async create(createDto : ProductTypeDto): Promise < ProductType > {
    const createProductType = new this.productTypeModel(createDto);
    return createProductType.save();
  }

  async estimateShipping(data : any): Promise < any > {
    let checkType = await this.productTypeModel.find(data);

    let supplierId = checkType.length > 0
      ? checkType[0].supplierId
      : new ObjectId().toString();

    const estTime = await this.getEstimateTime(supplierId, new Date());
    return {type: data.type, supplierId: supplierId, estTime: estTime}
  };
}
