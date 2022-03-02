import { ITemplateRepository } from "../models/interfaces/classes/ITemplateRepository";
import { Database } from '../../database/database';
import { getLogger } from "../../shared/getLogger";
const TAG = "template-express:template:templateRepository";
export class TemplateRepository implements ITemplateRepository {
    private database: Database;
    constructor() {
        Database.connectionEvents.once("database connected", () => console.log("Fire database-connected"));
        Database.connectionEvents.once("database disconnected", () => console.log("Fire database-disconnected"));
        this.database = new Database();
    }
}
