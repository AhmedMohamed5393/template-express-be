import { ILogger } from "./ILogger";
export function getLogger(log: ILogger) { log.status >= 400 ? console.error(log) : console.log(log); }
