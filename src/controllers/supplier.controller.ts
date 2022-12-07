import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards
} from "@nestjs/common";
import {SkipThrottle} from "@nestjs/throttler";
import {SupplierModel} from "src/common/models/supplier";
import {ThrottlerBehindProxyGuard} from "src/security/guard/throttler-behind-proxy.guard";
import {SupplierService} from "../services/supplier.service";
@UseGuards(ThrottlerBehindProxyGuard)

@Controller("supplier")
export class SupplierController {
  constructor(private supplierService : SupplierService,) {};

// @SkipThrottle()
  @Get()
  async getAll(@Res()response : any) {
    try {
      const result = await this.supplierService.getAll();
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Success', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };

  @Post("create")
  async create(@Res()response : any, @Body()data : SupplierModel) {
    try {
      const result = await this.supplierService.create(data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Supplier has been successfully created', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };

  @Delete("/:type")
  async delete(@Res()response : any, @Param("type")type : string) {
    try {
      const result = await this.supplierService.delete(type);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Supplier has been successfully DELETED', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };

// @SkipThrottle()
  @Get("/:id")
  async getSupplier(@Res()response : any, @Param("id")id : string) {
    try {
      const result = await this.supplierService.getSupplierById(id);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Success', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };

  @Put("/:id")
  async update(@Res()response : any, @Param("id")id : string, @Body()data : SupplierModel) {
    try {
      const result = await this.supplierService.update(id, data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully updated', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };
}
