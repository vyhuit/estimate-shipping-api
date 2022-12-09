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
  Request,
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import {SkipThrottle} from "@nestjs/throttler";
import {SupplierModel} from "src/models/supplier";
import {AccessTokenAuthGuard} from "src/common/guard/access-token.guard";
import {ThrottlerBehindProxyGuard} from "src/common/guard/throttler-behind-proxy.guard";
import {SupplierService} from "../services/supplier.service";
@UseGuards(ThrottlerBehindProxyGuard)
@UseGuards(AccessTokenAuthGuard)
@Controller("supplier")
export class SupplierController {
  constructor(private supplierService : SupplierService,) {};

  @Get()
  async getAll(@Request()req : any, @Res()response : any) {
    if (req.user) {
      try {
        const result = await this.supplierService.getAll();
        return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Success', result});
      } catch (err) {
        console.log("ERR =====> ", err);
        throw new NotFoundException(err.message);
      }
    }
  };
  @Post("create")
  async create(@Request()req : any, @Res()response : any, @Body()data : SupplierModel) {
    if (req.user) {
      data.createdById = req.user.userId;
      data.createdDay = new Date();
      try {
        const result = await this.supplierService.create(data);
        return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: result});
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({isSuccess: false, message: err.message, data: {}});
      }
    } else {
      throw new UnauthorizedException();
    }
  };

  @Delete("/:id")
  async delete(@Request()req : any, @Res()response : any, @Param("id")id : string) {
    if (req.user) {
      try {
        const result = await this.supplierService.delete(id);
        return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: result});
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({isSuccess: false, message: err.message, data: {}});
      }
    } else {
      throw new UnauthorizedException();
    }
  };

// @SkipThrottle()
  @Get("/:id")
  async getSupplier(@Request()req : any, @Res()response : any, @Param("id")id : string) {
    if (req.user) {
      try {
        const result = await this.supplierService.getSupplierById(id);
        return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: result});
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({isSuccess: false, message: err.message, data: {}});
      }
    } else {
      throw new UnauthorizedException();
    }
  };

  @Put("/:id")
  async update(@Request()req : any, @Res()response : any, @Param("id")id : string, @Body()data : SupplierModel) {
    if (req.user) {
      data.updatedById = req.user.userId;
      data.updatedDay = new Date();
      try {
        const result = await this.supplierService.update(id, data);
        return response.status(HttpStatus.OK).json({isSuccess: true, message: 'Successfully', data: result});
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({isSuccess: false, message: err.message, data: {}});
      }
    } else {
      throw new UnauthorizedException();
    }
  };
}
