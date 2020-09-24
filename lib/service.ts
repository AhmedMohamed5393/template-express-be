import { getLogger, ModesoRequestLog, ModesoResponseLog } from "@modeso/modeso-core-backend-lib";
import Debug from "debug";
import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";
import { AddToCartService } from "./services/request/AddToCartService";
import { CreateCartService } from "./services/request/CreateCartService";
import { GetCartItemsCountService } from "./services/request/GetCartItemsCountService";
import { GetCartItemsService } from "./services/request/GetCartItemsService";
import { GetCartTotalPriceService } from "./services/request/GetCartTotalPriceService";
import { RemoveProductFromCartService } from "./services/request/RemoveProductFromCartService";
import { UpdateProductAmountService } from "./services/request/UpdateProductAmountService";
import { ICartService } from "./spec";

const logger = getLogger();
const TAG = "modeso:modeso-cart:CartService";
const debug = Debug(TAG);

export class CartService implements ICartService {

    public static globalEvents: EventEmitter = new EventEmitter();
 
    constructor() {

    }

    public async createCart(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":createCart", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new CreateCartService()).createCart(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":createCart", modesoTraceId, {
                status: 500,
                "message": "couldn't Add to cart" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't Add to cart", "error": "internal server error" });
        }
    }

    public async addProductToCart(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":addProductToCart", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new AddToCartService()).addProductToCart(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":addProductToCart", modesoTraceId, {
                status: 500,
                "message": "couldn't Add to cart" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't Add to cart", "error": "internal server error" });
        }
    }

    public async updateProductAmount(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":updateProductAmount", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new UpdateProductAmountService()).updateProductAmount(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":updateProductAmount", modesoTraceId, {
                status: 500,
                "message": "couldn't update product amount" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't update product amount", "error": "internal server error" });
        }
    }

    public async getCartItems(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":getCartItems", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new GetCartItemsService()).getAll(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":getCartItems", modesoTraceId, {
                status: 500,
                "message": "couldn't get cart items" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't get cart items", "error": "internal server error" });
        }
    }

    public async getCartItemsCount(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":getCartItemsCount", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new GetCartItemsCountService()).getCount(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":getCartItemsCount", modesoTraceId, {
                status: 500,
                "message": "couldn't get cart items count" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't get cart items count", "error": "internal server error" });
        }
    }

    public async getCartTotalPrice(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":getCartTotalPrice", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new GetCartTotalPriceService()).getTotalPrice(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":getCartTotalPrice", modesoTraceId, {
                status: 500,
                "message": "couldn't get cart total Price" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't get cart total Price", "error": "internal server error" });
        }
    }

    public async removeProductFromCart(req: any, res: any) {
        const modesoTraceId = uuidv4();
        try {
            const log = new ModesoRequestLog(TAG + ":removeProductFromCart", modesoTraceId, {});
            logger.info(log);
        } catch (error) {
            console.log("cannot log to logger");
            console.log(error);
        }

        try {
            (new RemoveProductFromCartService()).removeProduct(req, res);
        } catch (error) {
            const responseLog = new ModesoResponseLog(TAG + ":removeProductFromCart", modesoTraceId, {
                status: 500,
                "message": "couldn't remove product from cart" });
            logger.fatal(responseLog);

            return res.status(500).json({ "message": "couldn't remove product from cart", "error": "internal server error" });
        }
    }

}
