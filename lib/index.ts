import Debug from "debug";
import * as fs from "fs";
import * as env from "./environment";
import { CartServiceConfig } from "./config";
import { CartService } from "./service";
import MiddlewareFactory from "./utils/middleware/MiddlewareFactory";

const debug = Debug("modeso:modeso-cart:CartServiceFactory");

class CartServiceFactory {
    public static SERVICE_PORT = env.PORT_CART;

    public static getSpecifications() {
        const apidoc = __dirname + "/../docs/api.yml";
        debug("File path for Specification is: " + apidoc);
        if (fs.existsSync(apidoc)) {
            return apidoc;
        } else {
            debug("But it doesn't exisits or cannot be accessed");
            return null;
        }
    }

    public static getConfig() {
        return new CartServiceConfig();
    }

    public static createMicroservice() {
        return new CartService();
    }

    public static createMiddlewareFactory() {
        return new MiddlewareFactory();
    }
}
export { CartServiceConfig, CartService, MiddlewareFactory };
export default CartServiceFactory;
