export interface IMiddleware { execute(req: any, res: any, next: any): void; }
