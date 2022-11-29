import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res
} from "@nestjs/common";
import {ProductTypeDto} from "./dto/base-product-type.dto";
import {ProductService} from "./product.service";

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
  async createProductTypeWithSupplier(@Body()data : ProductTypeDto, @Res()response : any) {
    try {
      const newProductType = await this.prodService.create(data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: newProductType});
    } catch (err) {
      console.log("!!!ERR =>>>> ", err);
      throw new NotFoundException(err.message);
    }
  };
}
