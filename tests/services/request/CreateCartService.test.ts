import * as httpMocks from "node-mocks-http";
import CartEntity, { ICart } from "../../../lib/models/entities/Cart";
import { CreateCartService } from "../../../lib/services/request/CreateCartService";
import { CartService } from "../../../lib/services/shared/CartService";

let cartServiceWithCartServiceMock: CartService;
let cartServiceWithCartServiceThrowError: CartService;
let createCart: CreateCartService;
const validRes1: ICart = new CartEntity();
validRes1.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validRes1.products = [];
validRes1.deliveryOptions = [];

export class CartServiceMock extends CartService {
    public async createNewCart(cart: ICart) {
        return validRes1;
    }
}

export class CartServiceThrowError extends CartService {
    public async createNewCart(cart: ICart) {
        return Promise.reject(new Error("Method is not implemented"));
    }
}

beforeAll(async (done) => {
    cartServiceWithCartServiceMock = new CartServiceMock();
    cartServiceWithCartServiceThrowError = new CartServiceThrowError();

    setTimeout(done, 2000);
});

test("should create instance successfully", () => {
    expect(new CreateCartService(cartServiceWithCartServiceMock)).toBeInstanceOf(CreateCartService);
});

test("Should create cart with status 200", async (done) => {
    createCart = new CreateCartService(cartServiceWithCartServiceMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
    });
    const res = httpMocks.createResponse();

    await createCart.createCart(req, res);
    const status = res.statusCode;
    const data = res._getJSONData();
    expect(status).toBe(200);
    expect(data.cart).toBeTruthy();
    done();
});

test("Should return 500 if error occurs while creating cart", async (done) => {
    createCart = new CreateCartService(cartServiceWithCartServiceThrowError);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
    });
    const res = httpMocks.createResponse();

    await createCart.createCart(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});
