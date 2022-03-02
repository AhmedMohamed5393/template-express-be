import * as dotenv from "dotenv";
import * as nodepath from "path";
dotenv.config();
const basedir = nodepath.dirname(require.main.filename);
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${basedir}/../.env.test`;
    break;
  case "production":
    path = `${basedir}/../.env.production`;
    break;
  default:
    path = `${basedir}/../.env.development`;
}
dotenv.config({ path });
export const DBURI = process.env.DBURI;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const FRONTEND_HOST = process.env.FRONTEND_HOST;
