import * as express from "express";

// this interface contains all methods in service.ts which gets request and sends response
export interface ICartService {
    createCart(req: express.Request, res: express.Response): void;
    addProductToCart(req: express.Request, res: express.Response): void;
    updateProductAmount(req: express.Request, res: express.Response): void;
    getCartItems(req: express.Request, res: express.Response): void;
    getCartItemsCount(req: express.Request, res: express.Response): void;
    getCartTotalPrice(req: express.Request, res: express.Response): void;
    removeProductFromCart(req: express.Request, res: express.Response): void;

}
