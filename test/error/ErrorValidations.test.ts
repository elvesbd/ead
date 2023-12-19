import ErrorType from "@/constants/ErrorType";
import ErrorValidation from "@/error/ErrorValidation";

describe("ErrorValidation", () => {
  it("ensures that create an error type invalid email", () => {
    const errorCode = ErrorType.INVALID_EMAIL;
    const errorValue = "john@";

    const error = new ErrorValidation({
      code: errorCode,
      value: errorValue,
    });

    expect(error.value).toBe(errorValue);
    expect(error.code).toBe(ErrorType.INVALID_EMAIL);
  });

  it("ensures that create an error type min length", () => {
    const errorCode = ErrorType.MIN_LENGTH;
    const errorValue = "John";

    const error = new ErrorValidation({
      code: errorCode,
      value: errorValue,
      extras: { minLength: 6 },
    });

    expect(error.value).toBe(errorValue);
    expect(error.code).toBe(ErrorType.MIN_LENGTH);
    expect(error.extras.minLength).toBe(6);
  });

  it("ensures that create an error type unknown", () => {
    const errorOne = ErrorValidation.newError();
    const errorTwo = new ErrorValidation();

    expect(errorOne.code).toBe(ErrorType.UNKNOWN);
    expect(errorTwo.code).toBe(ErrorType.UNKNOWN);
  });

  it("ensures that create an error type unknown", () => {
    const errorCode = ErrorType.UNKNOWN;
    const errorValue = "John";

    const error = new ErrorValidation({
      code: errorCode,
      value: errorValue,
    });

    expect(error.toString()).toBe(
      "Error: UNKNOWN (code: UNKNOWN, value: John, extras: {})"
    );
  });

  it("ensures that throws an error with the specified message", () => {
    const errorCode = "ERROR";
    const errorValue = "value";

    expect(() => ErrorValidation.throw(errorCode, errorValue)).toThrow(
      errorCode
    );
  });
});
