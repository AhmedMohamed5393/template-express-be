export interface IConfig { endpoints: IEndpoint[]; middlewares: any; }
export interface IEndpoint { url: string; verb: string; middlewares?: any[]; function: string; }
