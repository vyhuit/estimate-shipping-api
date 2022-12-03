import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SupplierModel } from "src/common/models/supplier";
import { Supplier, SupplierDocument } from "../schemas/supplier.schema";

@Injectable()
export class SupplierService {
  constructor(@InjectModel(Supplier.name) private readonly supplierModel : Model < SupplierDocument >,) {};

  async create(createSupplierDto : SupplierModel): Promise < Supplier > {
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

  async update(id : string, data : SupplierModel) {
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
