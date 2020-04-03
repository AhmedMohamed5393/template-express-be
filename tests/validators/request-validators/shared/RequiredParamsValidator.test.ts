import { RequiredKeysValidator } from "../../../../lib/utils/validators/shared-validators/RequiredKeysValidator";

const validKeys = ["productId", "title", "image", "price", "amount",
    "description"];

const invalidKey = ["keyNotExists", "addressSupplement", "zipCode", "city", "country",
    "firstName", "lastName", "email", "street", "streetNumber"];

test("should create RequiredKeysValidator instance successfully", () => {
    expect(new RequiredKeysValidator(validKeys)).toBeInstanceOf(RequiredKeysValidator);
});

test("areParamsSet should return true if keys are coorect", () => {
    expect(new RequiredKeysValidator(validKeys).areParamsSet(validKeys)).toBeTruthy();
});

test("areParamsSet should return error if keys are not matched", () => {

    try {
        new RequiredKeysValidator(validKeys).areParamsSet(invalidKey);
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
    }
});
