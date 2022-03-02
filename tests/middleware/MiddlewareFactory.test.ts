import { MiddlewareFactory } from "../../lib/utils/middlewares/MiddlewareFactory";
test("should create MiddlewareFactory", () => expect(new MiddlewareFactory()).toBeInstanceOf(MiddlewareFactory));
test("should return undefined", () => expect((new MiddlewareFactory()).getMiddleware("")).toBe(undefined));
