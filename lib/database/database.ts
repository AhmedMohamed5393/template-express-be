import { EventEmitter } from "events";
import * as env from "../environment";
export class Database {
    public static connectionEvents: EventEmitter = new EventEmitter();
    public connection;
    private isConnected = false;
    private entity;
    constructor() {
        const url = env.DBURI;
    }
    public destroy() { this.connection.close(() => Database.connectionEvents.emit("disconnected")); }
}
