import NotBlankError from "./error/not-blank.error";
import NotNullError from "./error/not-null.error";
import ZeroOrMinusError from "./error/zero-or-minus.error";
import Entity from './entity';
import Product from "./product.entity";

export type CartItem = {
  item: Product,
  quantity: number
}

export type CartProps = {
  _id?: string;
  totalQuantity?: number;
  totalPrice?: number;
  products?: CartItem[]
}

export default class Cart extends Entity<CartProps>{

  constructor({ _id, ...props }: CartProps) {
    super(props, _id)
		this.validate();
	}

  public static create (props: CartProps): Cart {
    const anInstance =  new Cart(props);
    anInstance.props.products = anInstance.props.products || [];
    anInstance.props.totalQuantity = anInstance.props.totalQuantity || 0;
    anInstance.props.totalPrice = anInstance.props.totalQuantity || 0;
    return anInstance;
  }

  public validate(): void {}

  private static validQuantity(quantity: number) {
    return quantity >= 1;
  }

  public calculateTotalPrice(): number {
    const math = (acc: number, product: CartItem) => {
      return acc + product.item.price * product.quantity;
    }

    this.props.totalPrice = this.props.products.reduce(math, 0);
    return this.props.totalPrice;
  }

  public calculateTotalQuantity(): number {
    const sum = (acc: number, product: CartItem) => {
      return acc + product.quantity;
    }

    this.props.totalQuantity = this.props.products.reduce(sum, 0);
    return this.props.totalQuantity;
  }

  public add(item: Product, quantity: number = 1): void {
    if (!Cart.validQuantity(quantity)) {
      // throw new ValidationError(
      //   'SKU needs to have a quantity between 1 and 1000',
      // )
    }

    const index = this.props.products.findIndex((p) => p.item.id === item.id);
    const alreadyExistsInCart = index == -1 ? false : true;
   
    // no exists
    if (!alreadyExistsInCart) {
      this.props.products = [...this.props.products, { item, quantity }];
    }

    if (alreadyExistsInCart) {
      const product = {
        ...this.props.products[index],
        quantity: this.props.products[index].quantity + quantity,
      };
  
      const products = [
        ...this.props.products.slice(0, index),
        product,
        ...this.props.products.slice(index + 1),
      ];
  
      this.props.products = products;
    }

    this.props.totalPrice = this.calculateTotalPrice();
    this.props.totalQuantity = this.calculateTotalQuantity();
  }

  public remove(itemId: string): void {
    const products = this.props.products.filter(
      (product) => product.item.id !== itemId
    );

    this.props.products = products;
    this.props.totalPrice = this.calculateTotalPrice();
    this.props.totalQuantity = this.calculateTotalQuantity();
  }

  public empty() {
    this.props.products = [];
    this.props.totalPrice = 0;
    this.props.totalQuantity = 0;
  }

  public unmarshal(): CartProps {
    return {
      _id: this.id,
      totalQuantity: this.totalQuantity,
      totalPrice: this.totalPrice,
      products: this.products
    }
  }

  public get id(): string {
    return this._id;
  }
  
  public get totalQuantity(): number {
    return this.props.totalQuantity;
  }

  public get products(): Array<CartItem> {
    return this.props.products;
  }

  public get totalPrice(): number {
    return this.props.totalPrice;
  }
}
