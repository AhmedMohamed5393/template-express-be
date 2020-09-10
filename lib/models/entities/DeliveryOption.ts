import { Document, model, Model, Schema } from "mongoose";

export interface IDeliveryOption extends Document {
    name: string;
    description: string;
    price: number;
}

export const DeliveryOption: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
});


