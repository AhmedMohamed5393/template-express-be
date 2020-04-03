import * as httpMocks from "node-mocks-http";
import CartEntity, { ICart } from "../../../lib/models/entities/Cart";
import { GetCartItemsCountService } from "../../../lib/services/request/GetCartItemsCountService";
import { CartService } from "../../../lib/services/shared/CartService";

const cartMock = new CartEntity({
    _id: "5e255079531e851c40182b91",
    products: [
        {
            isPackagingSelected: false,
            _id: "5e255079531e851c40182b92",
            title: "Geschenkkarte 50.–",
            price: 50,
            productId: "2",
            amount: 6,
            description: "This is an example for short description for Geschenkkarte 50.–",
            image: "https://avatars0.githubusercontent.com/u/11499388?s=460&v=4",
            packagePrice: 2,
        },
        {
            isPackagingSelected: false,
            _id: "5e2551be531e851c40182b95",
            title: "Geschenkkarte 100.–",
            price: 100,
            productId: "3",
            amount: 2,
            description: "This is an example for short description for Geschenkkarte 100.–",
            image: "https://avatars0.githubusercontent.com/u/11499388?s=460&v=4",
            packagePrice: 2,
        },
        {
            isPackagingSelected: true,
            _id: "5e255291531e851c40182b98",
            title: "Geschenkkarte 20.–",
            price: 20,
            productId: "1",
            amount: 8,
            description: "This is an example for short description for Geschenkkarte 20.–",
            image: "https://avatars0.githubusercontent.com/u/11499388?s=460&v=4",
            packagePrice: 2,
        },
    ],
    deliveryOptions: [],
    userId: "f372f70e-e78e-437c-bc45-a8b1a9a390e6",
    __v: 0,
});

export class CartServiceMock1 extends CartService {
    public async findById(id: string) { return cartMock; }
}

export class CartServiceMock2 extends CartService {
    public async findById(id: string) { return null; }
}

export class CartServiceMock3 extends CartService {
    public async findById(id: string) { throw new Error("Internal Server Error"); }
}

export class CartServiceAmountThrowErrorMock extends CartServiceMock1 {
    public getItemsAmount(cart: ICart): never {
        throw new Error("Method not implemented.");
    }
}

test("Should Create GetCartItemsCountService", () => {
    expect(new GetCartItemsCountService()).toBeInstanceOf(GetCartItemsCountService);
});

test("Should Get Items Count with status code 200", async () => {
    const getCartItemsCountService = new GetCartItemsCountService(new CartServiceMock1());
    const request = httpMocks.createRequest({
        params: {
            cartId: "5e255079531e851c40182b91",
        },
        headers: {
            authorization: "f372f70e-e78e-437c-bc45-a8b1a9a390e6",
        },
    });
    const response = httpMocks.createResponse();
    await getCartItemsCountService.getCount(request, response);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toStrictEqual({ count: 16 });
});

test("Should Get Not Found Message with status code 404", async () => {
    const getCartItemsCountService = new GetCartItemsCountService(new CartServiceMock2());
    const request = httpMocks.createRequest({
        params: {
            cartId: "5e255079531e851c40182b91",
        },
        headers: {
            authorization: "f372f70e-e78e-437c-bc45-a8b1a9a390e6",
        },
    });
    const response = httpMocks.createResponse();
    await getCartItemsCountService.getCount(request, response);
    expect(response.statusCode).toBe(404);
    expect(response._getJSONData()).toStrictEqual({ "message": "Cart Not Found", "error": "Not Found" });
});

test("Should Get UnAutorized Message with status code 401", async () => {
    const getCartItemsCountService = new GetCartItemsCountService(new CartServiceMock1());
    const request = httpMocks.createRequest({
        params: {
            cartId: "5e255079531e851c40182b91",
        },
        headers: {
            authorization: "sadjkhwqdlk",
        },
    });
    const response = httpMocks.createResponse();
    await getCartItemsCountService.getCount(request, response);
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData()).toStrictEqual({ "message": "Not Authorized User", "error": "Not Authorized" });
});

test("Should Internal server error with status code 500", async () => {
    const getCartItemsCountService = new GetCartItemsCountService(new CartServiceMock3());
    const request = httpMocks.createRequest({
        params: {
            cartId: "5e255079531e851c40182b91",
        },
        headers: {
            authorization: "f372f70e-e78e-437c-bc45-a8b1a9a390e6",
        },
    });
    const response = httpMocks.createResponse();
    await getCartItemsCountService.getCount(request, response);
    expect(response.statusCode).toBe(500);
    expect(response._getJSONData()).toStrictEqual({ "message": "couldn't get cart items count", "error": "internal server error" });
});

test("if getItemsAmount throw error it should return with status 500", async (done) => {
    const cartServiceWithCartServiceAmountThrowErrorMock = new CartServiceAmountThrowErrorMock();
    const getCartItemCount = new GetCartItemsCountService(cartServiceWithCartServiceAmountThrowErrorMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "f372f70e-e78e-437c-bc45-a8b1a9a390e6",
        },
        params: {
            cartId: "5e255079531e851c40182b91",
        },
    });
    const res = httpMocks.createResponse();
    await getCartItemCount.getCount(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});
