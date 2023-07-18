import CreateProductUseCase, { CreateProductInput } from "./create-product.usecase";

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    save: jest.fn()
  }
};

describe("CreateProductUseCase", () => {
  
  it("should create a product", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);
    const expectedInput: CreateProductInput = {
      name: "Product 1",
      price: 12.50
    };

    const expectedOutput = await createProductUseCase.execute(expectedInput);
    
    expect(expectedOutput).toEqual({
      id: expect.any(String),
      name: expectedInput.name,
      price: expectedInput.price
    });
  });

  it("should throw error when product name is null", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);
    const expectedInput: CreateProductInput = {
      name: null,
      price: 12.50
    };

    await expect(createProductUseCase.execute(expectedInput)).rejects.toThrow(
      "Can not be null"
    );
  });

  it("should throw error when product name is blank", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);
    const expectedInput: CreateProductInput = {
      name: "",
      price: 12.50
    };

    await expect(createProductUseCase.execute(expectedInput)).rejects.toThrow(
      "Can not be blank"
    );
  });
  
  it("should throw error when product price is 0 or minus", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);
    const expectedInput: CreateProductInput = {
      name: "Product 1",
      price: 0
    };

    await expect(createProductUseCase.execute(expectedInput)).rejects.toThrow(
      "Can not be 0 or minus"
    );
  });
  
  it("should throw error when product price is null", async () => {
    const repository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(repository);
    const expectedInput: CreateProductInput = {
      name: "Product 1",
      price: null
    };

    await expect(createProductUseCase.execute(expectedInput)).rejects.toThrow(
      "Can not be null"
    );
  });
});

