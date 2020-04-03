import { RequestHeaderValidator } from "../validators/request-headers-validators/RequestHeaderValidator";
import { UpdateProductAmountRequestValidator } from "../validators/request-validators/UpdateProductAmountRequestValidator";
import { IMiddleware } from "./IMiddleware";

export class UpdateProductAmountMiddleware implements IMiddleware {

    public execute(req: any, res: any, next: any): void {
        try {
            (new RequestHeaderValidator()).isRequestHeadersValid(req);
            (new UpdateProductAmountRequestValidator()).isRequestValid(req);
            next();
        } catch (error) {
            res.status(400).json({"message": "Bad Request", "error": error.message});
        }
    }

}
