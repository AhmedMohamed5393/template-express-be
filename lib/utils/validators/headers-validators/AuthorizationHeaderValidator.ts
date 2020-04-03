import { IHeaderValidator } from "./IHeaderValidator";

export class AuthorizationHeaderValidator implements IHeaderValidator{

    constructor() {}

    /**
     * validates if there is a user id in authorization
     * can be changed to check authorizetion and authentication of user
     * if we used jwt or any authentication method
     * @param authorizationHeader autiorization header value
     */
    public isHeaderValid(authorizationHeader: any): boolean {
        return authorizationHeader ? true : false;
    }
}