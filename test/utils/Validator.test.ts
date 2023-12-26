import Validator from "@/utils/Validator";

describe("Class - Validator", () => {
  describe("notifications()", () => {
    it("ensures null return if error combination returns null", () => {
      const errors = Validator.notifications(
        Validator.isRequired("value"),
        Validator.isDefined("value"),
        Validator.isNotEmpty("value"),
        Validator.isShorterThan("value", 5),
        Validator.isLongerThan("value", 5),
        Validator.isNumber(1),
        Validator.isString("value"),
        Validator.matchesRegex("12345678900", /\d{11}/)
      );

      expect(errors).toBeNull();
    });

    it("ensures null return if error combination returns null", () => {
      const errors = Validator.notifications(
        Validator.isRequired(null),
        Validator.isDefined(null),
        Validator.isNotEmpty(null),
        Validator.isShorterThan("value", 4),
        Validator.isLongerThan("value", 4),
        Validator.isNumber("1"),
        Validator.isString(1),
        Validator.matchesRegex("@12345678900", /\d{11}/)
      );

      expect(errors).not.toBeNull();
    });
  });

  describe("isRequired()", () => {
    it("ensures returns null if value is given", () => {
      const error = Validator.isRequired("value");

      expect(error).toBeNull();
    });

    it("ensures error validation if value is null", () => {
      const error = Validator.isRequired(null, "O valor não pode ser nulo!");
      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser nulo!");
    });

    it("ensures error validation if value is undefined", () => {
      const error = Validator.isRequired(
        undefined,
        "O valor não pode ser undefined!"
      );
      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser undefined!");
    });

    it("ensures returns default error message", () => {
      const error = Validator.isRequired(null);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor é obrigatório!");
    });
  });

  describe("isDefined()", () => {
    it("ensures returns null if value is given", () => {
      const error = Validator.isDefined("value");

      expect(error).toBeNull();
    });

    it("ensures error validation if value is null", () => {
      const error = Validator.isDefined(null, "O valor precisa ser informado!");

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor precisa ser informado!");
    });

    it("ensures error validation if value is undefined", () => {
      const error = Validator.isDefined(
        undefined,
        "O valor não pode ser undefined!"
      );
      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser undefined!");
    });

    it("ensures returns default error message", () => {
      const error = Validator.isDefined(null);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser indefinido!");
    });
  });

  describe("isNotEmpty()", () => {
    it("ensures returns null if the value is provided and is of type string", () => {
      const error = Validator.isNotEmpty("value");
      expect(error).toBeNull();
    });

    it("ensures returns null if the value is provided and is of type number", () => {
      const error = Validator.isNotEmpty(123);
      expect(error).toBeNull();
    });

    it("ensures returns null if the value is provided and is of type boolean", () => {
      const error = Validator.isNotEmpty(true);
      expect(error).toBeNull();
    });

    it("ensures returns null if the value is provided and is of type object", () => {
      const object = {
        name: "John",
        age: 25,
      };
      const error = Validator.isNotEmpty(object);
      expect(error).toBeNull();
    });

    it("ensures returns error if the value type object null", () => {
      const error = Validator.isNotEmpty(null);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser vazio!");
    });

    it("ensures returns null if the value is provided and is of type array", () => {
      const array = [1, 2, 3];
      const error = Validator.isNotEmpty(array);
      expect(error).toBeNull();
    });

    it("ensures returns error if the value is empty array", () => {
      const error = Validator.isNotEmpty([]);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser vazio!");
    });

    it("ensures returns error if the value is undefined", () => {
      const error = Validator.isNotEmpty(undefined);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser vazio!");
    });

    it("ensures returns error for unsupported value type", () => {
      const error = Validator.isNotEmpty(Symbol("unsupported"));

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor não pode ser vazio!");
    });

    it("ensures returns error with custom message if the value is empty string", () => {
      const error = Validator.isNotEmpty("", "Campo obrigatório");

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("Campo obrigatório");
    });
  });

  describe("isShorterThan()", () => {
    let minLength = 0;
    it("ensures returns null if value is provided and is of type string", () => {
      minLength = 5;
      const error = Validator.isShorterThan("value", minLength);
      expect(error).toBeNull();
    });

    it("ensures returns error if value is string and shorter than value provided", () => {
      minLength = 6;
      const error = Validator.isShorterThan("value", minLength);
      expect(error).not.toBeNull();
    });

    it("ensures returns null if value is provided and is of type array string", () => {
      minLength = 1;
      const error = Validator.isShorterThan(["value"], minLength);
      expect(error).toBeNull();
    });

    it("ensures returns error if value is string array and shorter than value provided", () => {
      minLength = 2;
      const error = Validator.isShorterThan(["value"], minLength);
      expect(error).not.toBeNull();
    });

    it("ensures returns default error message if value is provided and is of type string", () => {
      minLength = 6;
      const error = Validator.isShorterThan(
        "value",
        minLength,
        "O valor não pode ser menor!"
      );

      expect(error).not.toBeNull();
    });
  });

  describe("isLongerThan()", () => {
    let maxLength = 0;
    it("ensures returns null if value is provided and is of type string", () => {
      maxLength = 5;
      const error = Validator.isLongerThan("value", maxLength);

      expect(error).toBeNull();
    });

    it("ensures returns error if value is string and longer than value provided", () => {
      maxLength = 4;
      const error = Validator.isLongerThan("value", maxLength);

      expect(error).not.toBeNull();
    });

    it("ensures returns null if value is provided and is of type array string", () => {
      maxLength = 1;
      const error = Validator.isLongerThan(["value"], maxLength);

      expect(error).toBeNull();
    });

    it("ensures returns error if value is string array and shorter than value provided", () => {
      maxLength = 1;
      const error = Validator.isLongerThan(
        ["value - 1", "value - 2"],
        maxLength
      );

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe(
        `O valor não pode ter mais que ${maxLength} caracteres!`
      );
    });

    it("ensures returns default error message if value is provided and is of type string", () => {
      maxLength = 4;
      const error = Validator.isLongerThan(
        "value",
        maxLength,
        "O valor não pode ser maior!"
      );

      expect(error).not.toBeNull();
    });
  });

  describe("isNumber()", () => {
    it("ensures returns null if value is provided and type of is number", () => {
      const error = Validator.isNumber(1);
      expect(error).toBeNull();
    });

    it("ensures returns error if value is provided and type is not of type number", () => {
      const error = Validator.isNumber("1");

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor deve ser um número válido!");
    });

    it("ensures returns error if value is provided and is of type NaN", () => {
      const error = Validator.isNumber(NaN);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor deve ser um número válido!");
    });

    it("ensures returns default error message if value is provided and is of type string", () => {
      const error = Validator.isNumber("1", "O valor deve ser válido!");

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor deve ser válido!");
    });
  });

  describe("isString()", () => {
    it("ensures returns null if value is provided and type of is string", () => {
      const error = Validator.isString("value");
      expect(error).toBeNull();
    });

    it("ensures returns error if value is provided and type is not of type string", () => {
      const error = Validator.isString(1);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor deve ser do tipo string!");
    });

    it("ensures returns default error message if value is provided and is not of type string", () => {
      const error = Validator.isString(1, "O valor deve ser uma string!");

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe("O valor deve ser uma string!");
    });
  });

  describe("matchesRegex()", () => {
    it("ensures returns null if value is provided and type of is string and match regex", () => {
      const error = Validator.matchesRegex("12345678900", /\d{11}/);
      expect(error).toBeNull();
    });

    it("ensures returns error if value is provided and not match regex", () => {
      const error = Validator.matchesRegex("@2345678900", /\d{11}/);

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe(
        "O valor não corresponde ao padrão esperado!"
      );
    });

    it("ensures returns default error message if value is provided and not match regex", () => {
      const error = Validator.matchesRegex(
        "@2345678900",
        /\d{11}/,
        "O valor não corresponde ao padrão da regex informada!"
      );

      expect(error).not.toBeNull();
      expect(error?.errorMessage).toBe(
        "O valor não corresponde ao padrão da regex informada!"
      );
    });
  });
});
