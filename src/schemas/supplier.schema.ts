import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema()
export class Supplier {

  @Prop({required: true})
  name : string;

  @Prop({type: Object, required: true})
  config : any;
  
  @Prop()
  createdById: string;

  @Prop()
  createdDay: Date;

  @Prop()
  updatedById: string;

  @Prop()
  updatedDay: Date;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);