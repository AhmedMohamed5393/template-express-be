import { NumericValidator } from "../../../lib/utils/validators/shared-validators/NumericValidator";

const numericValidator = new NumericValidator();

test("should create NumericValidator instance successfully", () => {
    expect(new NumericValidator()).toBeInstanceOf(NumericValidator);
});

test("isPositveNumber should return true if number is positive", () => {
    expect(numericValidator.isPositveNumber(5)).toEqual(true);
});

test("isPositveNumber should return false if number is not positive", () => {
    expect(numericValidator.isPositveNumber(-5)).toEqual(false);
});

test("isNumber should return true if number", () => {
    expect(numericValidator.isNumber(5)).toEqual(true);
});

test("isNumber should return false if is not number", () => {
    expect(numericValidator.isNumber(NaN)).toEqual(false);
});

test("isIntegerNumber should return true if number is integer", () => {
    expect(numericValidator.isIntegerNumber(5)).toEqual(true);
});

test("isIntegerNumber should return false if number is not integer", () => {
    expect(numericValidator.isIntegerNumber(5.5)).toEqual(false);
});
