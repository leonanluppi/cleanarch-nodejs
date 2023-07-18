import { Module } from '@nestjs/common';
import { ProductMongoRepository } from '../mongodb/product-mongo.repository';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from '../mongodb/product.schema';
import CreateProductUseCase from 'src/usecase/create-product.usecase';
import { ProductsController } from '../api/products.api';
import FindAllProductsUsecase from 'src/usecase/findall-product.usecase';

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;


@Module({
	imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
    ),
		MongooseModule.forFeature([
			{ 
				name: ProductModel.name, 
				schema: ProductSchema
			}
		])
	],
	controllers: [
    ProductsController
  ],
	providers: [
		ProductMongoRepository,
		{
			useFactory: (repository: ProductMongoRepository) => {
				return new CreateProductUseCase(repository);
			},
			provide: CreateProductUseCase,
			inject: [ProductMongoRepository]
		},
		{
			useFactory: (repository: ProductMongoRepository) => {
				return new FindAllProductsUsecase(repository);
			},
			provide: FindAllProductsUsecase,
			inject: [ProductMongoRepository]
		}		
	]
})
export class ProductModule {}
