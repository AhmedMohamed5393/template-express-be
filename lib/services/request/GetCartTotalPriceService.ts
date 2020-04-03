import pino from "pino";
import { ICart } from "../../models/entities/Cart";
import { CartService } from "../shared/CartService";
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

export class GetCartTotalPriceService {

    private cartService: CartService;
    constructor(cartServiceMock?: CartService) {
        this.cartService = cartServiceMock || new CartService();
    }

    public async getTotalPrice(req: any, res: any) {
        try {
            const cart: ICart = await this.cartService.findById(req.params.cartId);
            if (!cart) {
                return res.status(404).json({ "message": "Cart Not Found", "error": "Not Found" });
            }
            if (cart.userId !== req.headers.authorization) {
                return res.status(401).json({ "message": "Not Authorized User", "error": "Not Authorized" });
            }
            const cartTotalPrice = this.cartService.calculateTotalPrice(cart.products);
            return res.status(200).json({ "total": cartTotalPrice });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ "message": "couldn't get cart total Price", "error": "internal server error" });
        }
    }
}
