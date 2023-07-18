import DomainError from "./domain.error";

export default class ZeroOrMinusError extends DomainError {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, ZeroOrMinusError.prototype);
  }
}
