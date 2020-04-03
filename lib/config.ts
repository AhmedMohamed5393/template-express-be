import { ModesoEndpoint, ModesoMicroserviceConfig, ModesoMiddleware } from "@modeso/modeso-core-backend-lib";
import bodyparser from "body-parser";
import { AddProductToCartMiddleware } from "./utils/middleware/AddProductToCartMiddleware";
import { UpdateProductAmountMiddleware } from "./utils/middleware/UpdateProductAmountMiddleware";

export class CartServiceConfig implements ModesoMicroserviceConfig {

    // all the endPoints of cart microservice
    // To Do Middleware for create cart
    public endpoints: ModesoEndpoint[] = [
        { "url": "/api/cart", "verb": "POST", "function": "createCart" },
        { "url": "/api/cart/:cartId", "verb": "POST", "middleware": AddProductToCartMiddleware.name, "function": "addProductToCart" },
        { "url": "/api/carts/:cartId/:productId", "verb": "PUT", "middleware": UpdateProductAmountMiddleware.name, "function": "updateProductAmount" },
        { "url": "/api/cart/:cartId", "verb": "GET", "function": "getCartItems" },
        { "url": "/api/cart/:cartId/count", "verb": "GET", "function": "getCartItemsCount" },
        { "url": "/api/cart/:cartId/total", "verb": "GET", "function": "getCartTotalPrice" },
        { "url": "/api/carts/:cartId/:productId", "verb": "DELETE", "function": "removeProductFromCart" },
    ];

    // all the used middleware of all the endPoints of cart microservice
    public middleware: ModesoMiddleware[] = [
    ];
}
