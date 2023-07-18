import { ProductRepository } from "src/domain/product.repository";
import { UseCase } from "./usecase.interface";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import Product from "./../domain/product.entity";

export class ProductPresenter {

  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly price: number;

  constructor(aDomain: Product) {
    this.id = aDomain.id;
    this.name = aDomain.name;
    this.price = aDomain.price;
  }
}

export default class FindAllProductsUsecase implements UseCase<void, ProductPresenter[]> {
  constructor(private readonly repo: ProductRepository) {}

	public async execute(): Promise<ProductPresenter[]> {
    const aResults = await this.repo.findAll();
    return aResults.map(p => new ProductPresenter(p));
  }
}
