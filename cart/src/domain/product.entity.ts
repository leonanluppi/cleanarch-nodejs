import NotBlankError from "./error/not-blank.error";
import NotNullError from "./error/not-null.error";
import ZeroOrMinusError from "./error/zero-or-minus.error";
import Entity from './entity';

export type ProductProps = {
  _id?: string;
  name: string;
  price: number;
}

export default class Product extends Entity<ProductProps>{

  constructor({ _id, ...props }: ProductProps) {
    super(props, _id)
		this.validate();
	}

  public static create (props: ProductProps): Product {
    return new Product(props);
  }

  public validate(): void {
    if (this.name == null || this.name == undefined) {
      throw new NotNullError("Can not be null");
    }
    if (this.name == "") {
      throw new NotBlankError("Can not be blank");
    }

    if (this.price == null || this.price == undefined) {
      throw new NotNullError("Can not be null");
    }
    if (this.price <= 0) {
      throw new ZeroOrMinusError("Can not be 0 or minus");
    }
  }

  public unmarshal(): ProductProps {
    return {
      _id: this.id,
      name: this.name,
      price: this.price
    }
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get price(): number {
    return this.props.price;
  }
}
