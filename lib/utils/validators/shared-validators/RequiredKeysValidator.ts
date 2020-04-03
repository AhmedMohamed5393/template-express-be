export class RequiredKeysValidator {

    private requiredKeys: string[]; // required keys of object
    constructor(requiredKeys: string[]) {
        this.requiredKeys = requiredKeys;
    }

    /**
     * check if the params required included in paramasKey if not will throw an error
     * @param paramsKeys array of keys as string of object we want to be checked
     */
    public areParamsSet(paramsKeys: string[]): boolean {
        this.requiredKeys.forEach((key) => {
            if (paramsKeys.indexOf(key) === -1) {
                throw new Error(`${key} is required`);
            }
        });
        return true;
    }
}

export default RequiredKeysValidator;
