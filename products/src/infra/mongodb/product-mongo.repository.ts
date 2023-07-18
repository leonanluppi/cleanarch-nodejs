import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductRepository } from "src/domain/product.repository";
import ProductModel, { toProductDomain } from "./product.schema";
import { Model } from "mongoose";
import Product from "src/domain/product.entity";

@Injectable()
export class ProductMongoRepository implements ProductRepository {

  constructor(
    @InjectModel(ProductModel.name) private readonly repository: Model<ProductModel>
  ) {}
  
  public async findAll(): Promise<Array<Product>> {
    const aList: ProductModel[] = await this.repository.find({});
    return aList.map(m => toProductDomain(m));
  }

	public async save(aDomain: Product): Promise<Product> {
    const aModel: ProductModel = await this.repository.create(aDomain.unmarshal());
    return toProductDomain(aModel);
	}
}
