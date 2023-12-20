import ErrorType from "@/constants/ErrorType";
import ErrorValidation from "@/error/ErrorValidation";

describe("ErrorValidation", () => {
  it("ensures that create an error type invalid email", () => {
    const errorMessage = ErrorType.INVALID_EMAIL;
    const errorValue = "john@";

    const error = new ErrorValidation({
      errorMessage,
      value: errorValue,
    });

    expect(error.value).toBe(errorValue);
    expect(error.errorMessage).toBe(ErrorType.INVALID_EMAIL);
  });

  it("ensures that create an error type min length", () => {
    const errorMessage = ErrorType.MIN_LENGTH;
    const errorValue = "John";

    const error = new ErrorValidation({
      errorMessage,
      value: errorValue,
      extras: { minLength: 6 },
    });

    expect(error.value).toBe(errorValue);
    expect(error.errorMessage).toBe(ErrorType.MIN_LENGTH);
    expect(error.extras.minLength).toBe(6);
  });

  it("ensures that create an error type unknown", () => {
    const errorOne = ErrorValidation.newError();
    const errorTwo = new ErrorValidation();

    expect(errorOne.errorMessage).toBe(ErrorType.UNKNOWN);
    expect(errorTwo.errorMessage).toBe(ErrorType.UNKNOWN);
  });

  it("ensures that calls toString method", () => {
    const errorMessage = ErrorType.UNKNOWN;
    const errorValue = "John";

    const error = new ErrorValidation({
      errorMessage,
      value: errorValue,
    });

    expect(error.toString()).toBe(
      "Error: UNKNOWN (errorMessage: UNKNOWN, value: John, extras: {})"
    );
  });

  it("ensures that throws an error with the specified message", () => {
    const errorMessage = "ERROR";
    const errorValue = "value";

    expect(() => ErrorValidation.throw(errorMessage, errorValue)).toThrow(
      errorMessage
    );
  });
});
