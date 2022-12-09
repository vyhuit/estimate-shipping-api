import {
  Body,
  Controller,
  HttpStatus, Post, Request, Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { ProductTypeModel } from "src/models/product-type";
import { AccessTokenAuthGuard } from "src/common/guard/access-token.guard";
import { ThrottlerBehindProxyGuard } from "src/common/guard/throttler-behind-proxy.guard";
import { ProductService } from "../services/product.service";
@UseGuards(ThrottlerBehindProxyGuard)
@Controller("product")
export class ProductController {
  constructor(private prodService : ProductService) {};

  @Post("estimate-shipping")
  async estimateShipping(@Body()data : any, @Request()req : any, @Res()response : any) {
    try {
      const result = await this.prodService.estimateShipping(data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: result});
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({isSuccess: false, message: err.message, data: {}});
    }
  };

  @UseGuards(AccessTokenAuthGuard)
  @Post("product-type-supplier")
  async createProductTypeWithSupplier(@Request()req : any, @Body()data : ProductTypeModel, @Res()response : any) {
    if (req.user) {
      data.createdById = req.user.userId;
      data.createdDay = new Date();
      try {
        const newProductType = await this.prodService.create(data);
        return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: newProductType});
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({isSuccess: false, message: err.message, data: {}});
      }
    } else {
      throw new UnauthorizedException();
    }
  };
}
