import Product, { ProductProps } from "./product.entity";

describe("Product Domain", () => {
  
  it("should create a product", () => {
    const expectedName = "Product 1"; 
    const expectedPrice = 12.50; 

    const expectedProps: ProductProps = {
      name: expectedName, 
      price: expectedPrice
    };

    const aProduct = Product.create(expectedProps);

    expect(aProduct.name).toBe(expectedName);
    expect(aProduct.price).toBe(expectedPrice);
  });

  it("should throw error when product name is blank", () => {
    expect(() => {
      const expectedName = ""; 
      const expectedPrice = 12.50; 
  
      const expectedProps: ProductProps = {
        name: expectedName, 
        price: expectedPrice
      };

      const aProduct = Product.create(expectedProps);
  
      expect(aProduct.name).toBe(expectedName);
      expect(aProduct.price).toBe(expectedPrice);
    }).toThrowError("Can not be blank");
  });

  
  it("should throw error when product name is null", () => {
    expect(() => {
      const expectedName = null; 
      const expectedPrice = 12.50; 
  
      const expectedProps: ProductProps = {
        name: expectedName, 
        price: expectedPrice
      };

      const aProduct = Product.create(expectedProps);

      expect(aProduct.name).toBe(expectedName);
      expect(aProduct.price).toBe(expectedPrice);
    }).toThrowError("Can not be null");
  });

  it("should throw error when product price is 0 or minus", () => {
    expect(() => {
      const expectedName = "Product 1"; 
      const expectedPrice = 0; 
  
      const expectedProps: ProductProps = {
        name: expectedName, 
        price: expectedPrice
      };

      const aProduct = Product.create(expectedProps);

      expect(aProduct.name).toBe(expectedName);
      expect(aProduct.price).toBe(expectedPrice);
    }).toThrowError("Can not be 0 or minus");
  });

  it("should throw error when product price is null", () => {
    expect(() => {
      const expectedName = "Product 1"; 
      const expectedPrice = null; 
  
      const expectedProps: ProductProps = {
        name: expectedName, 
        price: expectedPrice
      };

      const aProduct = Product.create(expectedProps);
        
      expect(aProduct.name).toBe(expectedName);
      expect(aProduct.price).toBe(expectedPrice);
    }).toThrowError("Can not be null");
  });
});
