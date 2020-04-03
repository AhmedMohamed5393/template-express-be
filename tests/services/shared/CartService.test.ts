import * as httpMocks from "node-mocks-http";
import CartEntity, { ICart } from "../../../lib/models/entities/Cart";
import CartProductEntity, { IProduct } from "../../../lib/models/entities/CartProduct";
import { CartRepository } from "../../../lib/repositories/CartRepository";
import { RepositoriesFactory } from "../../../lib/repositories/RepositoriesFactory";
import { CartService } from "../../../lib/services/shared/CartService";

const productOfCart: IProduct = new CartProductEntity();
productOfCart.title = "product number 99";
productOfCart.image = "product number 99";
productOfCart.description = "product number 99";
productOfCart.price = 50;
productOfCart.amount = 1;
productOfCart.packagePrice = 20;
productOfCart.isPackagingSelected = false;
productOfCart.productId = "4444";

const productOfCart1: IProduct = new CartProductEntity();
productOfCart1.title = "product number 99";
productOfCart1.image = "product number 99";
productOfCart1.description = "product number 99";
productOfCart1.price = 50;
productOfCart1.amount = 1;
productOfCart1.packagePrice = 20;
productOfCart1.isPackagingSelected = true;
productOfCart1.productId = "4444";

const validRes1: ICart = new CartEntity();
validRes1.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validRes1.products = [productOfCart, productOfCart1];
validRes1.deliveryOptions = [];

const validRes2: ICart = new CartEntity();

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

let cartServiceWithCartRepositoryEmptyMock: CartService;
let cartSerivceWithCartRepositoryWithReturnMock: CartService;

export class CartRepositoryEmptyMock extends CartRepository {
    public async  create(requestCartObject: ICart) {
        return Promise.reject(new Error("Method not implemented."));
    }
}

export class CartRepositoryWithReturnMock extends CartRepository {
    public async  create(requestCartObject: ICart) {
        return validRes1;
    }
}

export class CartRepositoryFactoryEmptyMock extends RepositoriesFactory {
    private CartRepositoryEmptyMock = new CartRepositoryEmptyMock();
    public getRepository(repositoryName: string) {
        return this.CartRepositoryEmptyMock;
    }
}

export class CartRepositoryFactoryReturnMock extends RepositoriesFactory {
    private CartRepositoryWithReturnMock = new CartRepositoryWithReturnMock();
    public getRepository(repositoryName: string) {
        return this.CartRepositoryWithReturnMock;
    }
}
beforeAll(async (done) => {
    cartServiceWithCartRepositoryEmptyMock = new CartService(new CartRepositoryFactoryEmptyMock());
    cartSerivceWithCartRepositoryWithReturnMock = new CartService(new CartRepositoryFactoryReturnMock());
    setTimeout(done, 2000);
});

test("should create instance successfully", () => {
    expect(new CartService()).toBeInstanceOf(CartService);
});

test("should return the created object if create is successed", async (done) => {
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    const data = await cartSerivceWithCartRepositoryWithReturnMock.createNewCart(req);
    expect(data).toBeTruthy();
    expect(data).toEqual(validRes1);
    done();
});

test("should return error if the create of cart is failed", async (done) => {
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        body: validReqBody,
    });
    try {
        await cartServiceWithCartRepositoryEmptyMock.createNewCart(req);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
        done();
    }
});

test("should return how many products in the cart", () => {
    const numberOfItems = cartSerivceWithCartRepositoryWithReturnMock.getItemsAmount(validRes1);
    expect(numberOfItems).toEqual(2);
});

test("getItemAmount should return zerp if cart if empty", () => {
    const numberOfItems = cartSerivceWithCartRepositoryWithReturnMock.getItemsAmount(validRes2);
    expect(numberOfItems).toEqual(0);
});

test("calculateTotalPrice should return total of products' price", () => {
    const sum = cartSerivceWithCartRepositoryWithReturnMock.calculateTotalPrice(validRes1.products);
    expect(sum).toBeTruthy();
});

test("calculateTotalPrice should return zero if there is no products", () => {
    const sum = cartSerivceWithCartRepositoryWithReturnMock.calculateTotalPrice(validRes2.products);
    expect(sum).toEqual(0);
});
