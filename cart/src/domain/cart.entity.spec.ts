import Product, { ProductProps } from "./product.entity";
import Cart, { CartProps, CartItem } from "./cart.entity";

describe("Cart Domain", () => {
  const aProduct1 = Product.create({ name: "Product 1", price: 12.50 });
  const aProduct2 = Product.create({ name: "Product 2", price: 15 });
  

  beforeEach(() => {
    expect(aProduct1).not.toBeNull();
    expect(aProduct2).not.toBeNull();
  });

  it("should create an empty cart", () => {
    const expectedCart: CartProps = {};

    const aCart = Cart.create(expectedCart);

    expect(aCart.totalPrice).toBe(0);
    expect(aCart.totalQuantity).toBe(0);
    expect(aCart.products.length).toEqual(0);
  });

  it("should create an empty cart and then add a product", () => {
    const expectedCart: CartProps = {};

    const aCart = Cart.create(expectedCart);

    aCart.add(aProduct1);

    expect(aCart.products.length).toEqual(1);
    expect(aCart.totalPrice).toBeGreaterThan(1);
    expect(aCart.totalQuantity).toBeGreaterThanOrEqual(1);
    expect(aCart.products[0]).toEqual({
      item: aProduct1,
      quantity: 1
    });
  });

  it("should create an empty cart and then add two products", () => {
    const expectedCart: CartProps = {};

    const aCart = Cart.create(expectedCart);

    aCart.add(aProduct1);
    aCart.add(aProduct2);

    const expectedTotalPrice = aProduct1.price + aProduct2.price;

    expect(aCart.products.length).toEqual(2);
    expect(aCart.totalPrice).toEqual(expectedTotalPrice);
    expect(aCart.totalQuantity).toBeGreaterThanOrEqual(2);
  });

  it("should create an empty cart and add two products and then remove one", () => {
    const expectedCart: CartProps = {};

    const aCart = Cart.create(expectedCart);

    aCart.add(aProduct1);
    aCart.add(aProduct2);

    expect(aCart.products.length).toEqual(2);
    expect(aCart.totalQuantity).toBeGreaterThanOrEqual(2);

    aCart.remove(aProduct2.id);

    expect(aCart.products.length).toEqual(1);
    expect(aCart.totalQuantity).toEqual(1);
  });

  it("should create an empty cart and add two products and then empty", () => {
    const expectedCart: CartProps = {};

    const aCart = Cart.create(expectedCart);

    aCart.add(aProduct1);
    aCart.add(aProduct2);

    const expectedTotalPrice = aProduct1.price + aProduct2.price;

    expect(aCart.products.length).toEqual(2);
    expect(aCart.totalPrice).toEqual(expectedTotalPrice);
    expect(aCart.totalQuantity).toBeGreaterThanOrEqual(2);

    aCart.empty();

    expect(aCart.products.length).toEqual(0);
    expect(aCart.totalPrice).toEqual(0);
    expect(aCart.totalQuantity).toEqual(0);
  });
});
