import { RequestHeaderValidator } from "../validators/request-headers-validators/RequestHeaderValidator";
import { AddProductToCartRequestValidator } from "../validators/request-validators/AddProductToCartRequestValidator";
import { IMiddleware } from "./IMiddleware";
export class AddProductToCartMiddleware implements IMiddleware {

    constructor() { }

    public execute(req: any, res: any, next: any) {
        try {
            (new RequestHeaderValidator()).isRequestHeadersValid(req);
            (new AddProductToCartRequestValidator()).isRequestValid(req);
            next();
        } catch (error) {
            res.status(400).json({ "message": "Bad Request", "error": error.message });
        }
    }
}
