import pino from "pino";
import { ICart } from "../../models/entities/Cart";
import { IProduct } from "../../models/entities/CartProduct";
import { CartSerializer } from "../../utils/data-serializers/CartSerializer";
import { CartService } from "../shared/CartService";
import { ProductService } from "../shared/ProductService";
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
export class UpdateProductAmountService {

    private cartService: CartService;
    private productService: ProductService;
    constructor(cartServiceMock?: CartService, productServiceMock?: ProductService) {
        this.cartService = cartServiceMock || new CartService();
        this.productService = productServiceMock || new ProductService();
    }

    public async updateProductAmount(req: any, res: any) {

        try {
            const cart: ICart = await this.cartService.findById(req.params.cartId);
            if (!cart) {
                return res.status(404).json({ "message": "Cart Not Found", "error": "Not Found" });
            }
            if (cart.userId !== req.headers.authorization) {
                return res.status(401).json({ "message": " UnAuthorized User", "error": " UnAuthorized" });
            }
            const product: IProduct = this.cartService.getProductByProductId(cart, req.params.productId);
            if (!product) {
                return res.status(404).json({ "message": "Product Not Found", "error": "Not Found" });
            }
            this.productService.updateProduct(product, req.body);
            const updatedCart = await this.cartService.updateCart(req.params.cartId, cart);
            const response = (new CartSerializer(updatedCart, `product with ${req.params.productId} updated successfully`)).serialize();
            return res.status(200).json(response);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ "message": "couldn't update product amount", "error": "internal server error" });
        }
    }

}
