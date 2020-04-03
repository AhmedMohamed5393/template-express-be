import NumericValidator from "../../shared-validators/NumericValidator";

export class NumericParamsValidator {
    private param: number;
    private paramName: string;
    constructor(param: number, paramName: string) {
        this.param = param;
        this.paramName = paramName;
    }

    /**
    * validate if param is valid number
    */
    public isParamNumber(validator?: NumericValidator): any {
        const numericValidator = validator || new NumericValidator();
        if (!numericValidator.isNumber(this.param)) {
            throw new Error(`${this.paramName} must be a number`);
        }
        return this;
    }

    /**
     * validate if param is not decimal
     */
    public isParamNotDecimal(validator?: NumericValidator): any {
        const numericValidator = validator || new NumericValidator();
        if (!numericValidator.isIntegerNumber(this.param)) {
            throw new Error(`not valid ${this.paramName} must be integar`);
        }
        return this;
    }

    /**
     * validate if param is +ve 
     */
    public isParamPositveNumber(validator?: NumericValidator): any {
        const numericValidator = validator || new NumericValidator();
        if (!numericValidator.isPositveNumber(this.param)) {
            throw new Error(`not valid ${this.paramName} must be bigger than 0`);
        }
        return this;
    }
}