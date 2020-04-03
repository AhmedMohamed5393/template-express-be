import { ICart } from "../../models/entities/Cart";
import { CartResponse } from "../../models/response/CartResponse";
import { CartService } from "../../services/shared/CartService";
import { ISerializable } from "./ISerializable";

export class CartSerializer implements ISerializable<ICart, CartResponse> {
    private cartResponse: CartResponse;
    private cartService: CartService;
    constructor(cart: ICart, message: string, cartServiceMock?: CartService) {
        this.cartResponse = new CartResponse({ cart, message });
        this.cartService = cartServiceMock || new CartService();
        this.calculateTotalPrice();
    }
    public serialize(): CartResponse {
        return this.cartResponse;
    }

    private calculateTotalPrice() {
        this.cartResponse.totalPrice = this.cartService.calculateTotalPrice(this.cartResponse.cart.products);
    }

}
