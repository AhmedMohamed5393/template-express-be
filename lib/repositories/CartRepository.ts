import { ICart } from "../models/entities/Cart";
import { IRepository } from "./IRepository";
import { CartDatabase } from '../database/cart.database';
export class CartRepository implements IRepository {

    private database: CartDatabase;

    constructor() {
        CartDatabase.connectionEvents.once("cart connected", () => {
            console.log("Fire address database-connected");
        });
        CartDatabase.connectionEvents.once("cart disconnected", () => {
            console.log("Fire address database-disconnected");
        });
        this.database = new CartDatabase();
    }


    public async findOne(queryObject: any) {
        return await this.database.getCartEntity().findOne(queryObject);
    }
    public async findById(id: string) {
        return await this.database.getCartEntity().findById(id);
    }
    public findAll(): any {
        throw new Error("Method not implemented.");
    }
    public async  create(requestCartObject: ICart) {
        return await this.database.getCartEntity().create(requestCartObject);
    }
    public async update(id: string, requestCartObject: ICart) {
        return await this.database.getCartEntity().findByIdAndUpdate(id, requestCartObject, { new: true });
    }
    public delete() {
        throw new Error("Method not implemented.");
    }

}
