import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UseGuards
} from "@nestjs/common";
import { ProductTypeModel } from "src/common/models/product-type";
import { ThrottlerBehindProxyGuard } from "src/security/guard/throttler-behind-proxy.guard";
import { ProductService } from "../services/product.service";
@UseGuards(ThrottlerBehindProxyGuard)

@Controller("product")
export class ProductController {
  constructor(private prodService : ProductService) {};

  @Post("estimate-shipping")
  async estimateShipping(@Body()data : any, @Res()response : any) {
    try {
      const result = await this.prodService.estimateShipping(data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: result});
    } catch (err) {
      console.log("!!!ERR =>>>> ", err);
      throw new NotFoundException(err.message);
    }
  };

  @Post("product-type-supplier")
  async createProductTypeWithSupplier(@Body()data : ProductTypeModel, @Res()response : any) {
    try {
      const newProductType = await this.prodService.create(data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: newProductType});
    } catch (err) {
      console.log("!!!ERR =>>>> ", err);
      throw new NotFoundException(err.message);
    }
  };
}
