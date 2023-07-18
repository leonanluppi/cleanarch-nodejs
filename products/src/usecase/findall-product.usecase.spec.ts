import Product from "./../domain/product.entity";
import FindAllProductsUsecase from "./findall-product.usecase";

const product1: Product = Product.create({
  name: "Product 1",
  price: 12.50
});

const product2: Product = Product.create({
  name: "Product 2",
  price: 12.50
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    save: jest.fn()
  }
};


describe('FindAllProductsUsecase', () => {
  
  it("should list a products", async () => {
    const repository = MockRepository();
    const findProductUseCase = new FindAllProductsUsecase(repository);

    const expectedOutput = await findProductUseCase.execute();
    
    expect(expectedOutput.length).toBe(2);
    expect(expectedOutput[0]).toEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price
    });
    expect(expectedOutput[1]).toEqual({
      id: product2.id,
      name: product2.name,
      price: product2.price
    });
  });
});

