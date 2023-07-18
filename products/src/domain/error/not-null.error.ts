import DomainError from "./domain.error";

export default class NotNullError extends DomainError {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotNullError.prototype);
  }
}
