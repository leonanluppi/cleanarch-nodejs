import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import Product from './../../domain/product.entity';

@Schema()
export default class ProductModel extends Document {

  @Prop({
    type: String,
    required: true
  })
  _id: string;

  @Prop({
    type: String,
    required: true 
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    min: 0.1
  })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);

export const toProductDomain = (aModel: ProductModel): Product => {
  return Product.create({
    "_id": aModel.id,
    name: aModel.name,
    price: aModel.price
  });
}
