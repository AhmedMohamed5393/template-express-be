/**
 * Middleware Interface to be implemented from any Middleware class
 * to make function naming consistent and can change the behaviour on runtime or inject behaviour
 * with IOC in the future
 */
export interface IMiddleware {
    execute(req: any, res: any, next: any): void;
}
