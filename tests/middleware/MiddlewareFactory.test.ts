import { AddProductToCartMiddleware } from "../../lib/utils/middleware/AddProductToCartMiddleware";
import { MiddlewareFactory } from "../../lib/utils/middleware/MiddlewareFactory";
import { UpdateProductAmountMiddleware } from "../../lib/utils/middleware/UpdateProductAmountMiddleware";

test("should create MiddlewareFactory", () => {
    expect(new MiddlewareFactory()).toBeInstanceOf(MiddlewareFactory);
});

test("should return AddProductToCartMiddleware", () => {
    expect((new MiddlewareFactory()).getMiddleware(AddProductToCartMiddleware.name))
        .toBeInstanceOf(AddProductToCartMiddleware);
});

test("should return AddProductToCartMiddleware", () => {
    expect((new MiddlewareFactory()).getMiddleware(UpdateProductAmountMiddleware.name))
        .toBeInstanceOf(UpdateProductAmountMiddleware);
});

test("should return undefined", () => {
    expect((new MiddlewareFactory()).getMiddleware("")).toBe(undefined);
});
