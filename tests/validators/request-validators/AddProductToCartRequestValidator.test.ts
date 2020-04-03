import * as httpMocks from "node-mocks-http";
import { AddProductToCartRequestValidator } from "../../../lib/utils/validators/request-validators/AddProductToCartRequestValidator";

let addProductValidator: AddProductToCartRequestValidator;

const validReqBody = {
    "productId": "4444",
    "title": "product number 99",
    "image": "product number 99",
    "price": 50,
    "amount": 1,
    "description": "product number 99",
    "packagePrice": 100,
    "isPackagingSelected": false,
};

const invalidReqBody = {
    "productId": "4444",
    "title": "product number 99",
    "image": "product number 99",
    "price": "50.30",
    "amount": 1.5,
    "description": "product number 99",
    "packagePrice": "100",
    "isPackagingSelected": false,
};

test("should create instance successfully", () => {
    expect(new AddProductToCartRequestValidator()).toBeInstanceOf(AddProductToCartRequestValidator);
});

test("should return true if price is valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    expect(addProductValidator.isPriceValid(req.body)).toBeTruthy();
});

test("should return error if price isn't valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: invalidReqBody,
    });
    try {
        addProductValidator.isPriceValid(req.body);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});

test("should return true if Package price is valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    expect(addProductValidator.isPackagePriceValid(req.body)).toBeTruthy();
});

test("should return error if Package price isn't valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: invalidReqBody,
    });
    try {
        addProductValidator.isPackagePriceValid(req.body);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});

test("should return true if amount is valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    expect(addProductValidator.isAmountValid(req.body)).toBeTruthy();
});

test("should return error if amount isn't valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: invalidReqBody,
    });
    try {
        addProductValidator.isAmountValid(req.body);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});

test("should return true if request is valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    expect(addProductValidator.isRequestValid(req)).toBeTruthy();
});

test("should return error if request isn't valid", () => {
    addProductValidator = new AddProductToCartRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: invalidReqBody,
    });
    try {
        addProductValidator.isRequestValid(req);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});
