import * as httpMocks from "node-mocks-http";
import CartEntity, { ICart } from "../../../lib/models/entities/Cart";
import CartProductEntity, { IProduct } from "../../../lib/models/entities/CartProduct";
import { CartResponse } from "../../../lib/models/response/CartResponse";
import { AddToCartService } from "../../../lib/services/request/AddToCartService";
import { CartService } from "../../../lib/services/shared/CartService";
import { ProductService } from "../../../lib/services/shared/ProductService";
import { CartSerializer } from "../../../lib/utils/data-serializers/CartSerializer";

const productOfCart: IProduct = new CartProductEntity();
productOfCart.title = "product number 99";
productOfCart.image = "product number 99";
productOfCart.description = "product number 99";
productOfCart.price = 50;
productOfCart.amount = 1;
productOfCart.packagePrice = 20;
productOfCart.isPackagingSelected = false;
productOfCart.productId = "4567";

const productOfCart1: IProduct = new CartProductEntity();
productOfCart1.title = "product number 99";
productOfCart1.image = "product number 99";
productOfCart1.description = "product number 99";
productOfCart1.price = 50;
productOfCart1.amount = 1;
productOfCart1.packagePrice = 20;
productOfCart1.isPackagingSelected = true;
productOfCart1.productId = "1234";

const productOfCart2: IProduct = new CartProductEntity();
productOfCart2.title = "product number 99";
productOfCart2.image = "product number 99";
productOfCart2.description = "product number 99";
productOfCart2.price = 50;
productOfCart2.amount = 2;
productOfCart2.packagePrice = 20;
productOfCart2.isPackagingSelected = true;
productOfCart2.productId = "1234";

const validRes1: ICart = new CartEntity();
validRes1.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validRes1.products = [productOfCart, productOfCart1];
validRes1.deliveryOptions = [];

const validRes2: ICart = new CartEntity();
validRes2.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validRes2.products = [productOfCart2];
validRes2.deliveryOptions = [];

const validReqBody = {
    "productId": "1234",
    "title": "product number 99",
    "image": "product number 99",
    "price": 50,
    "amount": 1,
    "description": "product number 99",
    "packagePrice": 100,
    "isPackagingSelected": false,
};

const validReqBody1 = {
    "productId": "1234",
    "title": "product number 99",
    "image": "product number 99",
    "price": 50,
    "amount": 1,
    "description": "product number 99",
    "packagePrice": 100,
    "isPackagingSelected": false,
};
const validreqBodyArray = [validReqBody, validReqBody1];

let cartServiceWithCartServiceEmptyMock: CartService;
let cartServiceWithCartServiceMock: CartService;
let cartSerivceWithCartSerivceUndefinedCartMock: CartService;
let cartSerivceWithCartSerivceProductExistsMock: CartService;
let cartServiceWithCartSerivceUndefinedCartErrorInCreateMock: CartService;
let cartServiceWithCartServiceGetProductWithError: CartService;
let cartServiceWithCartServiceMockUpdateThrowError: CartService;
let productService: ProductService;
let ProductServiceThrowError: ProductService;
let addToCart: AddToCartService;

export class ProductServiceMock extends ProductService {
    public incrementAmountWithRequestAmount(product: IProduct, amount: number) {
        product.amount = 2;
        return product;
    }
}

export class ProductServiceThrowErrorMock extends ProductService {
    public incrementAmountWithRequestAmount(product: IProduct, amount: number): never {
        throw new Error("Method not implemented.");
    }
}

export class CartServiceEmptyMock extends CartService {

    public async findById(id: string): Promise<ICart> {
        return Promise.reject(new Error("Method not implemented."));
    }

    public isProductExist(product: IProduct, cart: ICart): boolean {
        throw new Error("Method not implemented.");
    }

    public async updateCart(id: string, cart: ICart): Promise<ICart> {
        return Promise.reject(new Error("Method not implemented."));
    }

    public getProductByProductId(cart: ICart, productId: string): any {
        throw new Error("Method not implemented.");
    }
}

export class CartServiceMock extends CartServiceEmptyMock {

    public async findById(id: string): Promise<any> {
        return validRes1;
    }

    public isProductExist(product: IProduct, cart: ICart): boolean {
        return true;
    }

    public async updateCart(id: string, cart: ICart) {
        return validRes2;
    }

    public getProductByProductId(cart: ICart, productId: string): any {
        return productOfCart;
    }
}

export class CartServiceMockUpdateThrowError extends CartServiceMock {
    public async updateCart(id: string, cart: ICart) {
        return Promise.reject(new Error("Method not implemented."));
    }
}
export class CartServiceGetProductWithError extends CartServiceMock {
    public getProductByProductId(cart: ICart, productId: string): any {
        throw new Error("Method not implemented.");
    }
}

export class CartSerivceUndefinedCartMock extends CartServiceMock {
    public async findById(id: string) {
        return undefined;
    }
}

export class CartSerivceUndefinedCartErrorInCreateMock extends CartServiceMock {
    public async findById(id: string) {
        return undefined;
    }
}

export class CartSerivceProductExistsMock extends CartServiceMock {
    public async findById(id: string) {
        return validRes1;
    }

    public isProductExist(product: IProduct, cart: ICart): boolean {
        return false;
    }
}

beforeAll(async (done) => {
    cartServiceWithCartServiceEmptyMock = new CartServiceEmptyMock();
    cartServiceWithCartServiceMock = new CartServiceMock();
    cartSerivceWithCartSerivceUndefinedCartMock = new CartSerivceUndefinedCartMock();
    cartSerivceWithCartSerivceProductExistsMock = new CartSerivceProductExistsMock();
    cartServiceWithCartSerivceUndefinedCartErrorInCreateMock = new CartSerivceUndefinedCartErrorInCreateMock();
    cartServiceWithCartServiceGetProductWithError = new CartServiceGetProductWithError();
    cartServiceWithCartServiceMockUpdateThrowError = new CartServiceMockUpdateThrowError();
    productService = new ProductServiceMock();
    ProductServiceThrowError = new ProductServiceThrowErrorMock();
    setTimeout(done, 2000);
});

test("should create instance successfully", () => {
    expect(new AddToCartService(cartServiceWithCartServiceMock, productService)).toBeInstanceOf(AddToCartService);
});

test("if cart exists with the product it should increase the amount of the product and return with status 200", async (done) => {
    addToCart = new AddToCartService(cartServiceWithCartServiceMock, productService);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
        body: validReqBody,
    });
    const res = httpMocks.createResponse();

    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    const data = res._getJSONData();
    expect(status).toBe(200);
    expect(data.cart).toBeTruthy();
    done();

});

test("if cart is exists but it is empty it should push product/s and return with status 200", async (done) => {
    addToCart = new AddToCartService(cartSerivceWithCartSerivceProductExistsMock, productService);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
        body: validreqBodyArray,
    });
    const res = httpMocks.createResponse();

    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    const data = res._getJSONData();
    // data not correct because I could mock the creation of cart serializer on the fly (i don't know how till now)
    expect(status).toBe(200);
    expect(data).toBeTruthy();
    done();
});

test("should return 500 if find cart with user id returns errors", async (done) => {
    addToCart = new AddToCartService(cartServiceWithCartServiceEmptyMock, productService);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
        body: validReqBody,
    });
    const res = httpMocks.createResponse();
    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("should return 500 if getProductByProductId returns errors", async (done) => {
    addToCart = new AddToCartService(cartServiceWithCartServiceGetProductWithError, productService);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
        body: validReqBody,
    });
    const res = httpMocks.createResponse();
    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("should return 500 if updateCart returns errors", async (done) => {
    addToCart = new AddToCartService(cartServiceWithCartServiceMockUpdateThrowError, productService);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
        body: validReqBody,
    });
    const res = httpMocks.createResponse();
    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("should return 500 if incrementAmountWithRequestAmount returns errors", async (done) => {
    addToCart = new AddToCartService(cartServiceWithCartServiceMockUpdateThrowError, ProductServiceThrowError);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
        body: validReqBody,
    });
    const res = httpMocks.createResponse();
    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("if user of cart is not same as authorization it should return with status 401", async (done) => {
    addToCart = new AddToCartService(cartServiceWithCartServiceMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09ce",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await addToCart.addProductToCart(req, res);
    const status = res.statusCode;
    expect(status).toBe(401);
    done();
});