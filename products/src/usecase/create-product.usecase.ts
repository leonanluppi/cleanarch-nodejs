import { ProductRepository } from "src/domain/product.repository";
import { UseCase } from "./usecase.interface";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import Product from "./../domain/product.entity";

export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

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

export default class CreateProductUseCase implements UseCase<CreateProductInput, ProductPresenter> {
  constructor(private readonly repo: ProductRepository) {}

	public async execute(anInput: CreateProductInput): Promise<ProductPresenter> {
		const product: Product = Product.create(anInput);
    await this.repo.save(product);
    return new ProductPresenter(product);
  }
}
