import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiProduces, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import CreateProductUseCase, { CreateProductInput } from "src/usecase/create-product.usecase";
import FindAllProductsUsecase from "src/usecase/findall-product.usecase";

@ApiTags("products")
@Controller("products")
export class ProductsController {

  constructor(
		private readonly createUseCase: CreateProductUseCase,
		private readonly findAllUseCase: FindAllProductsUsecase
	) {}

	@Post()
	@ApiCreatedResponse({ description: "Return a product created" })
	@ApiUnprocessableEntityResponse({ description: "Bad Request" })
	@ApiConsumes("application/json")
	@ApiProduces("application/json")
	public async create(@Body() anInput: CreateProductInput) {
		return this.createUseCase.execute(anInput);
  }

	@Get()
	public async findAll() {
		return this.findAllUseCase.execute();
  }
}
