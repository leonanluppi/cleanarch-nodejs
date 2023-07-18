import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ProductModel from './product.schema';
import { ProductMongoRepository } from './product-mongo.repository';
import Product from './../../domain/product.entity';


describe("ProductMongoRepository", () => {

  let repository: ProductMongoRepository;
  const mockModel = {
    findAll: jest.fn(),
    create: jest.fn().mockImplementation(domain => domain)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMongoRepository, {
        provide: getModelToken(ProductModel.name),
        useValue: mockModel
      }]
    }).compile();

    repository = module.get<ProductMongoRepository>(ProductMongoRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should save new product', async () => {
    const expectedProduct = Product.create({
      name: "Product 1",
      price: 15
    });

    expect(await repository.save(expectedProduct)).toEqual({
      "_id": expect.any(String),
      props: {
        name: "Product 1",
        price: 15
      }
    })
  });
});
