/**
 * Request Validator Interface to be implemented from any Request validator class
 * to make function naming consistent and can change the behaviour on runtime or inject behaviour
 *  with IOC in the future
 */
export interface IRequestValidator {
    isRequestValid(request: any): boolean;
}
