import * as httpMocks from "node-mocks-http";
import { UpdateProductAmountRequestValidator } from "../../../lib/utils/validators/request-validators/UpdateProductAmountRequestValidator";

const validReqBody = {
    "amount": 25,
};

const invalidReqBody = {
    "amount": 25.5,
};

let updateProductAmountValidator: UpdateProductAmountRequestValidator;

test("should create UpdateProductAmountMiddleware instance successfully", () => {
    expect(new UpdateProductAmountRequestValidator()).toBeInstanceOf(UpdateProductAmountRequestValidator);
});

test("should return true if isRequestValid is valid", () => {
    updateProductAmountValidator = new UpdateProductAmountRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    expect(updateProductAmountValidator.isRequestValid(req)).toBeTruthy();
});

test("should return error if isRequestValid isn't valid", () => {
    updateProductAmountValidator = new UpdateProductAmountRequestValidator();
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: invalidReqBody,
    });
    try {
        updateProductAmountValidator.isRequestValid(req);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});
