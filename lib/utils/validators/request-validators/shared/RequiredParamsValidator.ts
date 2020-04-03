import { RequiredKeysValidator } from "../../shared-validators/RequiredKeysValidator";

export class RequiredParamsValidator{
    private requiredParamsKeysEnum: any; // required paramaters enum check enmus/requests
    
    constructor(requiredParamsKeysEnum: any) {
        this.requiredParamsKeysEnum = requiredParamsKeysEnum;
    }

    /**
     * validate if request body has required keys
     * @param requestBody 
     */
    public areRequiredParamsSet(requestBody: any) {
        const requiredParamsValidator = new RequiredKeysValidator(this.getEnumValuesAsList(this.requiredParamsKeysEnum));
        return requiredParamsValidator.areParamsSet(Object.keys(requestBody));

    }

    /**
     * get enms values and as array of strings of them
     * @param keysEnum Enum of required request keys
     */
    private getEnumValuesAsList(keysEnum: any) {
        const keys = Object.keys(keysEnum).filter((key) => this.requiredParamsKeysEnum[key as any]);
        const values = keys.map((key) => this.requiredParamsKeysEnum[key]);
        return values;
    }
}