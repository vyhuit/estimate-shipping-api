import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ObjectId} from "bson";
import {Model} from "mongoose";
import {ProductType, ProductTypeDocument} from "src/product/schemas/product.schema";
import {Supplier, SupplierDocument} from "src/supplier/schemas/supplier.schema";
import {helper} from "src/utils/helper";
import {ESTIMATE_DEFAULT} from "../utils/enum";
import {ProductTypeDto} from "./dto/base-product-type.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductType.name)private readonly productTypeModel : Model < ProductTypeDocument >, @InjectModel(Supplier.name)private readonly supplierModel : Model < SupplierDocument >) {};

  async getEstimateTime(supplier : string, dateStart : Date) {
    const supplierCheck = await this.supplierModel.findOne({_id: supplier});
    const data = supplierCheck || ESTIMATE_DEFAULT;

    return {
      orderPlace: new Date(),
      shipping: {
        min: helper.addDateExcWorkingDay("min", dateStart, data.config.shipping.min),
        max: helper.addDateExcWorkingDay("max", dateStart, data.config.shipping.max)
      },
      delivery: {
        min: helper.addDateExcWorkingDay("min", dateStart, data.config.delivery.min),
        max: helper.addDateExcWorkingDay("max", dateStart, data.config.delivery.max)
      },
      config: data
    };;
  }

  async create(createDto : ProductTypeDto): Promise < ProductType > {
    const createProductType = new this.productTypeModel(createDto);
    return createProductType.save();
  }

  async estimateShipping(data : any): Promise < any > {
    let checkType = await this.productTypeModel.findOne(data);
    let supplierId = checkType?.supplierId || new ObjectId().toString(); //lay config default khi data chua co.
    const estTime = await this.getEstimateTime(supplierId, new Date());
    return {type: data.type, supplierId: supplierId, estTime: estTime}
    
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
  };
}
