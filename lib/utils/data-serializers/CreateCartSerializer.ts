import CartEntity, { ICart } from "../../models/entities/Cart";

import { ISerializable } from "./ISerializable";

export class CreateCartSerializer {
    private cartRequest: ICart;
    constructor(req: any) {
        this.cartRequest = new CartEntity();
        this.handleCreateCart(req.headers.authorization);
    }
    public serialize(): ICart {
        return this.cartRequest;
    }

    private handleCreateCart(userAuthorization: string) {
        this.cartRequest.userId = userAuthorization;

    }

}
