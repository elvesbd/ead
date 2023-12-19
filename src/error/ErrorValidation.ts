import ErrorType from "@/constants/ErrorType";
import { ErrorValidationProps } from "./interfaces/ErrorValidation";

export default class ErrorValidation extends Error {
  readonly code: string;
  readonly value: any;
  readonly extras: any;

  constructor(readonly props?: ErrorValidationProps) {
    super(props?.code ?? ErrorType.UNKNOWN);
    this.code = props?.code ?? ErrorType.UNKNOWN;
    this.value = props?.value;
    this.extras = props?.extras ?? {};
  }

  static newError(code?: string, value?: any, extras?: any): ErrorValidation {
    return new ErrorValidation({ code, value, extras });
  }

  static throw(code: string, value?: any, extras?: any): never {
    throw new ErrorValidation({ code, value, extras });
  }

  toString() {
    return `${this.name}: ${this.message} (code: ${this.code}, value: ${
      this.value
    }, extras: ${JSON.stringify(this.extras)})`;
  }
}
