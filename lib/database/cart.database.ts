import { EventEmitter } from "events";
import mongoose, { Model, model, Schema } from "mongoose";
import * as env from "../environment";
import { ICart, Cart } from '../models/entities/Cart';
import { IProduct, ProductSchema } from '../models/entities/CartProduct';
import { IDeliveryOption, DeliveryOption } from '../models/entities/DeliveryOption';

export class CartDatabase {

    public static connectionEvents: EventEmitter = new EventEmitter();
    public connection;
    private isConnected = false;
    private cartEntity: Model<ICart>;
    private productEntity: Model<IProduct>;
    private deliveryOptionEntity: Model<IDeliveryOption>;

    constructor() {
        const dbName = env.DBPORT;
        const dbHost = env.DBHOST;
        const dbPort = env.DBNAME;

        const url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

        const connection = mongoose.createConnection(url, { useNewUrlParser: true, useFindAndModify: true });
        this.connection = connection;

        mongoose.connection.on("connected", () => {
            console.log("Database is connected " + url);
            this.isConnected = true;
            CartDatabase.connectionEvents.emit("connected");
        });

        mongoose.connection.on("error", (err) => {
            console.log("Mongoose default connection has occured " + err + " error");
        });

        mongoose.connection.on("disconnected", (err) => {
            this.isConnected = false;
            console.log("Mongoose default connection is disconnected");
            CartDatabase.connectionEvents.emit("disconnected");
        });

        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                console.error("Mongoose default connection is disconnected due to application termination");
                process.exit(0);
            });
        });
    }

    distroy() {
        this.connection.close(() => {
            CartDatabase.connectionEvents.emit("disconnected");
        });
    }

    public getCartEntity(): Model<ICart> {
        if (!this.cartEntity) {
            try {
                this.cartEntity = this.connection.model("Cart");
            } catch (e) {
                this.cartEntity = this.connection.model("Cart", Cart);
            }
        }
        return this.cartEntity;
    }

    public getProductEntity(): Model<IProduct> {
        if (!this.productEntity) {
            try {
                this.productEntity = this.connection.model("Product");
            } catch (e) {
                this.productEntity = this.connection.model("Product", ProductSchema);
            }
        }
        return this.productEntity;
    }

    public getDeliveryOptionEntity(): Model<IDeliveryOption> {
        if (!this.deliveryOptionEntity) {
            try {
                this.deliveryOptionEntity = this.connection.model("DeliveryOption");
            } catch (e) {
                this.deliveryOptionEntity = this.connection.model("DeliveryOption", DeliveryOption);
            }
        }
        return this.deliveryOptionEntity;
    }
}
