import { CartEntity, ICart } from "../models/entities/Cart";
import { IRepository } from "./IRepository";
export class CartRepository implements IRepository {
    constructor() { }

    public async findOne(queryObject: any) {
        return await CartEntity.findOne(queryObject);
    }
    public async findById(id: string) {
        return await CartEntity.findById(id);
    }
    public findAll(): any {
        throw new Error("Method not implemented.");
    }
    public async  create(requestCartObject: ICart) {
        return await CartEntity.create(requestCartObject);
    }
    public async update(id: string, requestCartObject: ICart) {
        return await CartEntity.findByIdAndUpdate(id, requestCartObject, { new: true });
    }
    public delete() {
        throw new Error("Method not implemented.");
    }

}
