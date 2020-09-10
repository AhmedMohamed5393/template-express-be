import { Document, Schema } from "mongoose";
import { IProduct, ProductSchema } from "./CartProduct";
import { DeliveryOption, IDeliveryOption } from "./DeliveryOption";

export interface ICart extends Document {
    userId: string;
    products?: IProduct[];
    deliveryOptions?: IDeliveryOption[];
}

export const Cart: Schema<ICart> = new Schema({
    userId: {type: String, required: true},
    products: [ProductSchema],
    deliveryOptions: [DeliveryOption],
});

