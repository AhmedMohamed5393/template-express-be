import { EventEmitter } from "events";
import { IService } from "./models/interfaces/classes/IService";
import { getLogger } from "../shared/getLogger";
const TAG = "template-express:template:service";
export class Service implements IService {
    public static globalEvents: EventEmitter = new EventEmitter();
    constructor() {}
}
