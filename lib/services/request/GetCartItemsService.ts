import pino from "pino";
import { ICart } from "../../models/entities/Cart";
import { CartSerializer } from "../../utils/data-serializers/CartSerializer";
import { CartService } from "../shared/CartService";
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

export class GetCartItemsService {

    private cartService: CartService;
    constructor(cartServiceMock?: CartService) {
        this.cartService = cartServiceMock || new CartService();
    }

    public async getAll(req: any, res: any) {
        try {
            const cart: ICart = await this.cartService.findById(req.params.cartId);
            if (!cart) {
                return res.status(404).json({ "message": "Cart Not Found", "error": "Not Found" });
            }
            if (cart.userId !== req.headers.authorization) {
                return res.status(401).json({ "message": " UnAuthorized User", "error": "UnAuthorized" });
            }
            const response = (new CartSerializer(cart, `Cart has been fetched successfully`)).serialize();
            return res.status(200).json(response);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ "message": "couldn't get cart items", "error": "internal server error" });
        }
    }
}
