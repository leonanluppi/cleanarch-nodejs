import Product from "./product.entity";

export interface ProductRepository {
  save(aProduct: Product): Promise<Product>;
  findAll(): Promise<Array<Product>>;
}
 