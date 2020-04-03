import { AddProductToCartMiddleware } from "./AddProductToCartMiddleware";
import { IMiddleware } from "./IMiddleware";
import { UpdateProductAmountMiddleware } from "./UpdateProductAmountMiddleware";

export class MiddlewareFactory {
    private middlewareMap: Map<string, IMiddleware> ;
    constructor() {
        this.middlewareMap = new Map<string, IMiddleware>();
        this.createMiddlewares();
    }
    /**
     * getMiddleware object by middlewareName
     */
    public getMiddleware(middlewareName: string) {
        return this.middlewareMap.get(middlewareName);
    }

    private createMiddlewares() {
        this.middlewareMap.set(AddProductToCartMiddleware.name, new AddProductToCartMiddleware());
        this.middlewareMap.set(UpdateProductAmountMiddleware.name, new UpdateProductAmountMiddleware());
    }
}

export default MiddlewareFactory;
