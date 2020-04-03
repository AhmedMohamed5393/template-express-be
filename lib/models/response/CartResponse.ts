import { ICart } from "../entities/Cart";

export class CartResponse {
    public cart: ICart;
    public totalPrice: number;
    public message: string;
    public constructor(init?: Partial<CartResponse>) {
        Object.assign(this, init);
    }
}
