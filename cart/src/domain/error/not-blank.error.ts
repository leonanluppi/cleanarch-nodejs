import DomainError from "./domain.error";

export default class NotBlankError extends DomainError {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NotBlankError.prototype);
  }
}
