import Debug from "debug";
import dotenv from "dotenv";
import { EventEmitter } from "events";
import * as nodepath from "path";
import pino from "pino";
import { DBHandler } from "./database/DBHandler";
import { AddToCartService } from "./services/request/AddToCartService";
import { CreateCartService } from "./services/request/CreateCartService";
import { GetCartItemsCountService } from "./services/request/GetCartItemsCountService";
import { GetCartItemsService } from "./services/request/GetCartItemsService";
import { GetCartTotalPriceService } from "./services/request/GetCartTotalPriceService";
import { RemoveProductFromCartService } from "./services/request/RemoveProductFromCartService";
import { UpdateProductAmountService } from "./services/request/UpdateProductAmountService";
import { ICartService } from "./spec";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const debug = Debug("modeso:modeso-cart:CartService");

export class CartService implements ICartService {

    public static globalEvents: EventEmitter = new EventEmitter();
    private database: DBHandler;
    constructor() {
        this.database = new DBHandler();
        this.database.connect();
    }

    public async createCart(req: any, res: any) {
        try {
            (new CreateCartService()).createCart(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't Add to cart", "error": "internal server error" });
        }
    }

    public async addProductToCart(req: any, res: any) {
        try {
            (new AddToCartService()).addProductToCart(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't Add to cart", "error": "internal server error" });
        }
    }

    public async updateProductAmount(req: any, res: any) {
        try {
            (new UpdateProductAmountService()).updateProductAmount(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't update product amount", "error": "internal server error" });
        }
    }

    public async getCartItems(req: any, res: any) {
        try {
            (new GetCartItemsService()).getAll(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't get cart items", "error": "internal server error" });
        }
    }

    public async getCartItemsCount(req: any, res: any) {
        try {
            (new GetCartItemsCountService()).getCount(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't get cart items count", "error": "internal server error" });
        }
    }

    public async getCartTotalPrice(req: any, res: any) {
        try {
            (new GetCartTotalPriceService()).getTotalPrice(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't get cart total Price", "error": "internal server error" });
        }
    }

    public async removeProductFromCart(req: any, res: any) {
        try {
            (new RemoveProductFromCartService()).removeProduct(req, res);
        } catch (error) {
            return res.status(500).json({ "message": "couldn't remove product from cart", "error": "internal server error" });
        }
    }

}
