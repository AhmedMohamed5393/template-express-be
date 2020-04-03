import CartProductEntity, { IProduct } from "../../../lib/models/entities/CartProduct";
import { ProductService } from "../../../lib/services/shared/ProductService";

const productMock = {
    isPackagingSelected: false,
    _id: "5e255079531e851c40182b92",
    title: "Geschenkkarte 50.–",
    price: 50,
    productId: "2",
    amount: 6,
    description: "This is an example for short description for Geschenkkarte 50.–",
    image: "https://avatars0.githubusercontent.com/u/11499388?s=460&v=4",
    packagePrice: 2,
};

const requestBody = {
    amount: 1,
    isPackagingSelected: true,
};

const updatedProductResponse = {
    isPackagingSelected: true,
    _id: "5e255079531e851c40182b92",
    title: "Geschenkkarte 50.–",
    price: 50,
    productId: "2",
    amount: 1,
    description: "This is an example for short description for Geschenkkarte 50.–",
    image: "https://avatars0.githubusercontent.com/u/11499388?s=460&v=4",
    packagePrice: 2,
};

test("Should Create ProductService", () => {
    expect(new ProductService()).toBeInstanceOf(ProductService);
});

test("Should update Product Amount With Request Amount", () => {
    const productService = new ProductService();
    const productEntityMock: IProduct = new CartProductEntity(productMock);
    const modifiedProduct = productService.updateAmount(productEntityMock, requestBody.amount);
    expect(modifiedProduct.amount).toBe(1);

});

test("Should Increment Product Amount With Request Amount", () => {
    const productService = new ProductService();
    const productEntityMock: IProduct = new CartProductEntity(productMock);
    const modifiedProduct = productService.incrementAmountWithRequestAmount(productEntityMock, requestBody.amount);
    expect(modifiedProduct.amount).toBe(7);

});

test("Should Calculate Product Price * amount", () => {
    const productService = new ProductService();
    const productEntityMock: IProduct = new CartProductEntity(productMock);
    expect(productService.calculateProductPrice(productEntityMock)).toBe(300);
});

test("Should calculate ProductPrice With PackagePrice", () => {
    const productService = new ProductService();
    const productEntityMock: IProduct = new CartProductEntity(productMock);
    expect(productService.calculateProductPriceWithPackagePrice(productEntityMock)).toBe(312);
});

test("Should update isPackagingSelected Status", () => {
    const productService = new ProductService();
    const productEntityMock: IProduct = new CartProductEntity(productMock);
    expect(
        (
            productService.updateIsPackagePriceSelectedStatus(productEntityMock, requestBody.isPackagingSelected).isPackagingSelected
        ),
    ).toBe(true);
});

test("Should Update Product Amount And isPackagingSelected status", () => {
    const productService = new ProductService();
    const productEntityMock: IProduct = new CartProductEntity(productMock);
    const productEntityMockResponse: IProduct = new CartProductEntity(updatedProductResponse);
    expect(productService.updateProduct(productEntityMock, requestBody)).toStrictEqual(productEntityMockResponse);
});
