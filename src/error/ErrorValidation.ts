import ErrorType from "@/constants/ErrorType";
import { ErrorValidationProps } from "./interfaces/ErrorValidation";

export default class ErrorValidation extends Error {
  readonly errorMessage: string;
  readonly value: any;
  readonly extras: any;

  constructor(readonly props?: ErrorValidationProps) {
    super(props?.errorMessage ?? ErrorType.UNKNOWN);
    this.errorMessage = props?.errorMessage ?? ErrorType.UNKNOWN;
    this.value = props?.value;
    this.extras = props?.extras ?? {};
  }

  static newError(
    errorMessage?: string,
    value?: any,
    extras?: any
  ): ErrorValidation {
    return new ErrorValidation({ errorMessage, value, extras });
  }

  static throw(errorMessage: string, value?: any, extras?: any): never {
    throw new ErrorValidation({ errorMessage, value, extras });
  }

  toString() {
    return `${this.name}: ${this.message} (errorMessage: ${
      this.errorMessage
    }, value: ${this.value}, extras: ${JSON.stringify(this.extras)})`;
  }
}
