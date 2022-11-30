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
  Res
} from "@nestjs/common";
import {BaseSupplierDto} from "./dto/base-supplier.dto";
import {SupplierService} from "./supplier.service";

@Controller("supplier")
export class SupplierController {
  constructor(private supplierService : SupplierService,) {};

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
  async create(@Res()response : any, @Body()data : BaseSupplierDto) {
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


  @Get("/:id")
  async getSupplier(@Res()response : any, @Param("id") id : string) {
    try {
      const result = await this.supplierService.getSupplierById(id);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Success', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };

  @Put("/:id")
  async update(@Res()response : any, @Param("id") id : string, @Body()data : BaseSupplierDto) {
    try {
      const result = await this.supplierService.update(id, data);
      return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully updated', result});
    } catch (err) {
      console.log("ERR =====> ", err);
      throw new NotFoundException(err.message);
    }
  };
}
