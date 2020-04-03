import { Document, model, Model, Schema } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    amount: number;
    image: string;
    productId: string; // product id of the product in product service
    packagePrice: number;
    isPackagingSelected: boolean;
}

export const ProductSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number, required: true, min: 0},
    image: {type: String, required: true},
    productId: {type: String, required: true},
    packagePrice: {type: Number, required: true },
    isPackagingSelected: {type: Boolean, default: false},
});
const CartProductEntity: Model<IProduct> = model<IProduct>("Product", ProductSchema);
export default CartProductEntity;
