import { AuthorizationHeaderValidator } from "../headers-validators/AuthorizationHeaderValidator";
import { IRequestHeaderValidator } from "./IRequestHeaderValidator";

export class RequestHeaderValidator implements IRequestHeaderValidator {

    constructor() {}

    public isRequestHeadersValid(request: any): boolean {
        return this.isAuthorizationHeaderValid(request.headers.authorization);
    }

    /**
     * check if  authorization header is valid 
     * @param authorizationHeader authorization header 
     */
    private isAuthorizationHeaderValid(authorizationHeader: any): boolean {
        const authorizationHeaderValidator = new AuthorizationHeaderValidator();
        if (!authorizationHeaderValidator.isHeaderValid(authorizationHeader)) {
            throw new Error(`authorization is not valid`);
        }
        return true;
    }

}
