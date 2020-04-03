import { NumericParamsValidator } from "../../../../lib/utils/validators/request-validators/shared/NumericParamsValidator";
import { NumericValidator } from "../../../../lib/utils/validators/shared-validators/NumericValidator";

let numericParamValidatorOfNumericReturnTrue: NumericValidator;
let numericParamValidatorOfNumericReturnfalse: NumericValidator;
let paramValidator: NumericParamsValidator;
let param: number;
let paramName: string;
export class NumericValidatorReturnTrueMock extends NumericValidator {
    public isPositveNumber(value: number): boolean {
        return true;
    }

    public isNumber(value: number): boolean {
        return true;
    }

    public isIntegerNumber(value: number): boolean {
        return true;
    }
}

export class NumericValidatorReturnFalseMock extends NumericValidator {
    public isPositveNumber(value: number): boolean {
        return false;
    }

    public isNumber(value: number): boolean {
        return false;
    }

    public isIntegerNumber(value: number): boolean {
        return false;
    }
}

beforeAll(() => {
    numericParamValidatorOfNumericReturnTrue = new NumericValidatorReturnTrueMock();
    numericParamValidatorOfNumericReturnfalse = new NumericValidatorReturnFalseMock();

});

test("should create instance successfully", () => {
    param = 15;
    paramName = "amount";
    paramValidator = new NumericParamsValidator(param, paramName);
    expect(paramValidator).toBeInstanceOf(NumericParamsValidator);
});

describe("in case param is number,integer and positive", () => {
    param = 15;
    paramName = "amount";
    paramValidator = new NumericParamsValidator(param, paramName);

    test("isParamNumber should return object of praram and paramName  if param is number", () => {
        const validator = paramValidator.isParamNumber(numericParamValidatorOfNumericReturnTrue);
        expect(validator).toEqual({ "param": 15, "paramName": "amount" });
    });

    test("isParamNotDecimal should return object of praram and paramName if param is not decimal", () => {
        const validator = paramValidator.isParamNotDecimal(numericParamValidatorOfNumericReturnTrue);
        expect(validator).toEqual({ "param": 15, "paramName": "amount" });
    });

    test("isParamPositveNumber should return object of praram and paramName if param ispositive number", () => {
        const validator = paramValidator.isParamPositveNumber(numericParamValidatorOfNumericReturnTrue);
        expect(validator).toEqual({ "param": 15, "paramName": "amount" });
    });
});

describe("in case param is not number,integer and positive", () => {

    test("isParamNumber should return error of if param is not number", () => {
        param = NaN;
        paramName = "amount";
        paramValidator = new NumericParamsValidator(param, paramName);
        try {
            paramValidator.isParamNumber(numericParamValidatorOfNumericReturnfalse);
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });

    test("isParamNotDecimal should return error if param is decimal", () => {
        param = 15.5;
        paramName = "amount";
        paramValidator = new NumericParamsValidator(param, paramName);
        try {
            paramValidator.isParamNotDecimal(numericParamValidatorOfNumericReturnfalse);
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });

    test("isParamPositveNumber should return error if param is not positive number", () => {
        param = 0;
        paramName = "amount";
        paramValidator = new NumericParamsValidator(param, paramName);
        try {
            paramValidator.isParamPositveNumber(numericParamValidatorOfNumericReturnfalse);
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});
