import Debug from "debug";
import * as dotenv from "dotenv";
import * as nodepath from "path";

const debug = Debug("modeso:modeso-payment:Environments");

dotenv.config();
const basedir = nodepath.dirname(require.main.filename);
let path;

switch (process.env.NODE_ENV) {
  case "test":
    path = `${basedir}/../.env.test`;
    debug("Running in with Test Environement. " + path);
    break;
  case "production":
    path = `${basedir}/../.env.production`;
    debug("Running in with Production Environement. " + path);
    break;
  default:
    path = `${basedir}/../.env.development`;
    debug("Running in with Development Environement. " + path);
}

dotenv.config({ path });
export const DEFAULTLANGUAGE = process.env.DEFAULTLANGUAGE;
export const DBNAME = process.env.DBNAME;
export const DBHOST = process.env.DBHOST;
export const DBPORT = process.env.DBPORT;
export const LOG_LEVEL = process.env.LOG_LEVEL;
