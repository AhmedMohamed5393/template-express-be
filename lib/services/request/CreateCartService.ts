import pino from "pino";
import { CartSerializer } from "../../utils/data-serializers/CartSerializer";
import { CreateCartSerializer } from "../../utils/data-serializers/CreateCartSerializer";
import { CartService } from "../shared/CartService";
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

export class CreateCartService {

    private cartService: CartService;
    constructor(cartServiceMock?: CartService) {
        this.cartService = cartServiceMock || new CartService();

    }

    public async createCart(req: any, res: any) {
        try {
            const newCart = await this.cartService.createNewCart(new CreateCartSerializer(req).serialize());
            const response = (new CartSerializer(newCart, "Cart has been created successfully")).serialize();
            return res.status(200).json(response);

        } catch (error) {
            logger.error(error);
            return res.status(500).json({ "message": "couldn't create new cart", "error": "internal server error" });
        }
    }

}
