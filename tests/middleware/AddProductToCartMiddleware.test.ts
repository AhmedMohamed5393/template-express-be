import * as httpMocks from "node-mocks-http";
import { AddProductToCartMiddleware } from "../../lib/utils/middleware/AddProductToCartMiddleware";

const validReqBody = {
    "productId": "4444",
    "title": "product number 99",
    "image": "product number 99",
    "price": 50,
    "amount": 1,
    "description": "product number 99",
    "packagePrice": 100,
    "isPackagingSelected": false
};

const invalidReqBody = {
    "title": "product number 99",
    "image": "product number 99",
    "price": "50.30",
    "amount": "1",
    "description": "product number 99"
};

test("should create AddProductToCartMiddleware instance successfully", () => {
    expect(new AddProductToCartMiddleware()).toBeInstanceOf(AddProductToCartMiddleware);
});

test("it should return response 400 if there is no authorization header", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = () => { };

    new AddProductToCartMiddleware().execute(req, res, next);
    const status = res.statusCode;
    expect(status).toBe(400);

});

test("it should return response 400 if request body if not correct", () => {
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: invalidReqBody,
    });
    const res = httpMocks.createResponse();
    const next = () => { };

    new AddProductToCartMiddleware().execute(req, res, next);
    const status = res.statusCode;
    expect(status).toBe(400);
});

test("it should call next if authorization header and body of request are correct", () => {
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    const res = httpMocks.createResponse();
    const next = () => { };

    new AddProductToCartMiddleware().execute(req, res, next);
    expect(res.statusCode).toBe(200);
});
