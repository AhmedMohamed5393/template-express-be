import { RequiredKeysValidator } from "../../../lib/utils/validators/shared-validators/RequiredKeysValidator";

const validKeys = ["productId", "title", "image", "price", "amount",
    "description"];

const invalidKey = ["keyNotExists", "addressSupplement", "zipCode", "city", "country",
    "firstName", "lastName", "email", "street", "streetNumber"];

const keyValidator = new RequiredKeysValidator(validKeys);

test("should create NumericValidator instance successfully", () => {
    expect(new RequiredKeysValidator(validKeys)).toBeInstanceOf(RequiredKeysValidator);
});

test("should return true if keys are same as the ones which are used in creation of object", () => {
    expect(keyValidator.areParamsSet(validKeys)).toEqual(true);
});

test("should return false if keys aren't same as the ones which are used in creation of object", () => {
    try {
        keyValidator.areParamsSet(validKeys);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
    }
});