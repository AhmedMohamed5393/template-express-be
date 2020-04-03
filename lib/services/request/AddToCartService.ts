import pino from "pino";
import { ICart } from "../../models/entities/Cart";
import { CartSerializer } from "../../utils/data-serializers/CartSerializer";
import { CartService } from "../shared/CartService";
import { ProductService } from "../shared/ProductService";
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

export class AddToCartService {

    private cartService: CartService;
    private productService: ProductService;
    constructor(cartServiceMock?: CartService, productServiceMock?: ProductService) {
        this.cartService = cartServiceMock || new CartService();
        this.productService = productServiceMock || new ProductService();
    }

    public async addProductToCart(req: any, res: any) {
        try {
            const cart = await this.cartService.findById(req.params.cartId);
            if (!cart) {
                return res.status(404).json({ "message": "Cart Not Found", "error": "Not Found" });
            }
            if (cart.userId !== req.headers.authorization) {
                return res.status(401).json({ "message": " UnAuthorized User", "error": "UnAuthorized" });
            }
            if (!this.cartService.isProductExist(req.body, cart)) {
                cart.products.push(req.body);
            } else {
                this.incrementExistProductAmount(cart, req.body.productId, req.body.amount);
            }
            const updatedCart: ICart = await this.cartService.updateCart(req.params.cartId, cart);
            const response = (new CartSerializer(updatedCart, "Product has been added successfully")).serialize();
            return res.status(200).json(response);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ "message": "couldn't Add to cart", "error": "internal server error" });
        }
    }

    private incrementExistProductAmount(cart: ICart, productId: string, amount: number) {
        const product = this.cartService.getProductByProductId(cart, productId);
        this.productService.incrementAmountWithRequestAmount(product, amount);
    }

}
