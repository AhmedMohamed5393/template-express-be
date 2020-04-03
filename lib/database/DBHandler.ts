import mongoose from "mongoose";
import * as env from "../environment";

export class DBHandler {

    constructor() { }

    public connect() {
        mongoose.connect(`mongodb://${env.DBHOST}:${env.DBPORT}/${env.DBNAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });
        // get database connection
        const db = mongoose.connection;
        // check if there is an error connection and print the log error
        db.on("error", (error) => {
            console.log(error);
        });
        // print we are connected if we are connected to mongoDB
        db.once("open", () => {
            console.log("we are connected ;)");
        });
        return db;
    }

    public disconnect() {
        mongoose.disconnect();
    }
}
