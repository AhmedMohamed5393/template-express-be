import { ICart } from "../../models/entities/Cart";

export class CreateCartSerializer {
    private cartRequest: ICart;
    constructor(req: any) {
        this.cartRequest = {} as ICart;
        this.handleCreateCart(req.headers.authorization);
    }
    public serialize(): ICart {
        return this.cartRequest;
    }

    private handleCreateCart(userAuthorization: string) {
        this.cartRequest.userId = userAuthorization;

    }

}
