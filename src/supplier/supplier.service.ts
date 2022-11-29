import {HttpStatus, Injectable, NotFoundException, Res} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {response} from "express";
import {Model} from "mongoose";
import {ResponseModel} from "src/utils/models";
import {resourceLimits} from "worker_threads";
import {BaseSupplierDto} from "./dto/base-supplier.dto";
import {Supplier, SupplierDocument} from "./schemas/supplier.schema";

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private readonly supplierModel : Model < SupplierDocument >,) {};

  async create(createSupplierDto : BaseSupplierDto): Promise < Supplier > {
    return this.supplierModel.create(createSupplierDto);
  };

  async delete(type : string): Promise < Supplier > {
    const result = await this.supplierModel.findOneAndRemove(
      {name: type}
    );
    if (! result) {
      throw new NotFoundException(`Error`);
    }
    return result;
  };

  async update(id : string, data : BaseSupplierDto) {
    const result = await this.supplierModel.findByIdAndUpdate(id, data);
    if (! result) {
      throw new NotFoundException(`Student ${
        data.name
      } #${id} not found`);
    }
    return result;
  };

  async getAll(): Promise < Supplier[] > {
    const result = await this.supplierModel.find();
    return result;
  };

  async getSupplierById(id : string): Promise < Supplier > {
    const result = await this.supplierModel.findById(id);
    return result;
  };
}
