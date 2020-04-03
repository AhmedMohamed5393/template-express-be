/**
 * validate numeric value of any variable
 */
export class NumericValidator {
    constructor() {}
    /**
     * validate if the value bigger than 0 "Is +ve"
     * @param value  value
     */
    public isPositveNumber(value: number): boolean {
        return value > 0;
    }

    /**
     * validate if the value is a number
     * @param value
     */
    public isNumber(value: number): boolean {
        return !isNaN(value);
    }

    /**
     * validate if the value is not decimal
     * @param value
     */
    public isIntegerNumber(value: number): boolean {
        return Number.isInteger(value);
    }
}

export default NumericValidator;
