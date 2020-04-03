import * as httpMocks from "node-mocks-http";
import { UpdateProductAmountMiddleware } from "../../lib/utils/middleware/UpdateProductAmountMiddleware";

const validReqBody = {
    "amount": 25
};

const invalidReqBody = {
    "amount": 25.5
};

test("should create UpdateProductAmountMiddleware instance successfully", () => {
    expect(new UpdateProductAmountMiddleware()).toBeInstanceOf(UpdateProductAmountMiddleware);
});

test("it should return response 400 if there is no authorization header", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = () => { };

    new UpdateProductAmountMiddleware().execute(req, res, next);
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

    new UpdateProductAmountMiddleware().execute(req, res, next);
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

    new UpdateProductAmountMiddleware().execute(req, res, next);
    expect(res.statusCode).toBe(200);
});
