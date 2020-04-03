import * as httpMocks from "node-mocks-http";
import CartEntity, { ICart } from "../../../lib/models/entities/Cart";
import CartProductEntity, { IProduct } from "../../../lib/models/entities/CartProduct";
import { RemoveProductFromCartService } from "../../../lib/services/request/RemoveProductFromCartService";
import { CartService } from "../../../lib/services/shared/CartService";

const productOfCart: IProduct = new CartProductEntity();
productOfCart.title = "product number 99";
productOfCart.image = "product number 99";
productOfCart.description = "product number 99";
productOfCart.price = 50;
productOfCart.amount = 1;
productOfCart.packagePrice = 20;
productOfCart.isPackagingSelected = false;
productOfCart.productId = "4567";

const validRes1: ICart = new CartEntity();
validRes1.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validRes1.products = [productOfCart];
validRes1.deliveryOptions = [];

const validRes2: ICart = new CartEntity();
validRes2.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validRes2.products = [];
validRes2.deliveryOptions = [];

let cartServiceWithCartServiceMock: CartService;
let cartServiceWithCartServiceFindReturnUndefinedMock: CartService;
let cartServiceWithCartServiceProductUndefinedMock: CartService;
let cartWerviceWithCartServiceFindThrowErrorMock: CartService;
let cartServiceWithCartServiceGetProductThrowErrorMock: CartService;
let cartServiceWithCartServiceRemoveThrowErrorMock: CartService;
let cartServiceWithCartServiceMockUpdateThrowError: CartService;
let removeProductFromCart: RemoveProductFromCartService;

export class CartServiceMock extends CartService {
    public async findById(id: string) {
        return validRes1;
    }

    public getProductByProductId(cart: ICart, productId: string): any {
        return productOfCart;
    }

    public removeProductById(cart: ICart, productId: string) {
        return [];
    }

    public async updateCart(id: string, cart: ICart): Promise<ICart> {
        return validRes2;
    }
}

export class CartServiceFindReturnUndefinedMock extends CartService {
    public async findById(id: string) {
        return undefined;
    }
}

export class CartServiceProductUndefinedMock extends CartServiceMock {
    public getProductByProductId(cart: ICart, productId: string): any {
        return undefined;
    }
}

export class CartServiceFindThrowErrorMock extends CartServiceMock {
    public async findById(id: string) {
        return Promise.reject(new Error("Method not implemented."));
    }
}

export class CartServiceGetProductThrowErrorMock extends CartServiceMock {
    public getProductByProductId(cart: ICart, productId: string): any {
        throw new Error("Method not implemented.");
    }
}

export class CartServiceRemoveThrowErrorMock extends CartServiceMock {
    public removeProductById(cart: ICart, productId: string): never {
        throw new Error("Method not implemented.");
    }
}

export class CartServiceMockUpdateThrowError extends CartServiceMock {
    public async updateCart(id: string, cart: ICart) {
        return Promise.reject(new Error("Method not implemented."));
    }
}
beforeAll(async (done) => {
    cartServiceWithCartServiceMock = new CartServiceMock();
    cartServiceWithCartServiceFindReturnUndefinedMock = new CartServiceFindReturnUndefinedMock();
    cartServiceWithCartServiceProductUndefinedMock = new CartServiceProductUndefinedMock();
    cartWerviceWithCartServiceFindThrowErrorMock = new CartServiceFindThrowErrorMock();
    cartServiceWithCartServiceGetProductThrowErrorMock = new CartServiceGetProductThrowErrorMock();
    cartServiceWithCartServiceRemoveThrowErrorMock = new CartServiceRemoveThrowErrorMock();
    cartServiceWithCartServiceMockUpdateThrowError = new CartServiceMockUpdateThrowError();
    setTimeout(done, 2000);
});

test("should create instance successfully", () => {
    expect(new RemoveProductFromCartService()).toBeInstanceOf(RemoveProductFromCartService);
});

test("if the cart and it's product/s are exist it should be updated with the removal of the products and return with status 200", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    const data = res._getJSONData();
    expect(status).toBe(200);
    expect(data.cart).toBeTruthy();
    done();
});

test("if cart isn't exists it should return status 404", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceFindReturnUndefinedMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(404);
    done();
});

test("if user of cart is not same as authorization it should return with status 401", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09ce",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(401);
    done();
});

test("if product not exists in the cart it should return status 404", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceProductUndefinedMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(404);
    done();
});

test("if find cart throw error it should return with status 500", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartWerviceWithCartServiceFindThrowErrorMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("if getProductByID throw error it should return with status 500", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceGetProductThrowErrorMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("if removeProductById throw error it should return with status 500", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceRemoveThrowErrorMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("if updateCart throw error it should return with status 500", async (done) => {
    removeProductFromCart = new RemoveProductFromCartService(cartServiceWithCartServiceMockUpdateThrowError);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            cartId: "5e2976c1348e1e4294072b3b",
            productId: "4w1866c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await removeProductFromCart.removeProduct(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});
