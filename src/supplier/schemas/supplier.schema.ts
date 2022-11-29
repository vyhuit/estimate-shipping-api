import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {

  @Prop({required: true})
  name : string;

  @Prop({type: Object, required: true})
  config : any;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);