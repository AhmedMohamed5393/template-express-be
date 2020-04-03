import * as httpMocks from "node-mocks-http";
import CartEntity, { ICart } from "../../../lib/models/entities/Cart";
import CartProductEntity, { IProduct } from "../../../lib/models/entities/CartProduct";
import { GetCartTotalPriceService } from "../../../lib/services/request/GetCartTotalPriceService";
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

let cartserviceWithCartServiceMock: CartService;
let cartServiceWithCartServiceFindReturnUndefinedMock: CartService;
let cartWerviceWithCartServiceFindThrowErrorMock: CartService;
let cartServiceWithCartServiceTotalThrowErrorMock: CartService;
let getCartItemCount: GetCartTotalPriceService;

export class CartServiceMock extends CartService {
    public async findById(id: string) {
        return validRes1;
    }

    public calculateTotalPrice(products: IProduct[]) {
        return 50;
    }
}

export class CartServiceFindReturnUndefinedMock extends CartService {
    public async findById(id: string) {
        return undefined;
    }
}

export class CartServiceFindThrowErrorMock extends CartServiceMock {
    public async findById(id: string) {
        return Promise.reject(new Error("Method not implemented."));
    }
}

export class CartServiceTotalThrowErrorMock extends CartServiceMock {
    public calculateTotalPrice(products: IProduct[]): never {
        throw new Error("Method not implemented.");
    }
}

beforeAll(async (done) => {
    cartserviceWithCartServiceMock = new CartServiceMock();
    cartServiceWithCartServiceFindReturnUndefinedMock = new CartServiceFindReturnUndefinedMock();
    cartWerviceWithCartServiceFindThrowErrorMock = new CartServiceFindThrowErrorMock();
    cartServiceWithCartServiceTotalThrowErrorMock = new CartServiceTotalThrowErrorMock();
    setTimeout(done, 2000);
});

test("should create instance successfully", () => {
    expect(new GetCartTotalPriceService()).toBeInstanceOf(GetCartTotalPriceService);
});

test("if cart is exists and it's user id same as in authorization it should return the amount with status 200", async (done) => {
    getCartItemCount = new GetCartTotalPriceService(cartserviceWithCartServiceMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            id: "5e2976c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await getCartItemCount.getTotalPrice(req, res);
    const status = res.statusCode;
    const data = res._getJSONData();
    expect(status).toBe(200);
    expect(data.total).toBeGreaterThan(0);
    done();
});

test("if cart isn't exists it should return status 404", async (done) => {
    getCartItemCount = new GetCartTotalPriceService(cartServiceWithCartServiceFindReturnUndefinedMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            id: "5e2976c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await getCartItemCount.getTotalPrice(req, res);
    const status = res.statusCode;
    expect(status).toBe(404);
    done();
});

test("if user of cart is not same as authorization it should return with status 401", async (done) => {
    getCartItemCount = new GetCartTotalPriceService(cartserviceWithCartServiceMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09ce",
        },
        params: {
            id: "5e2976c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await getCartItemCount.getTotalPrice(req, res);
    const status = res.statusCode;
    expect(status).toBe(401);
    done();
});

test("if find cart throw error it should return with status 500", async (done) => {
    getCartItemCount = new GetCartTotalPriceService(cartWerviceWithCartServiceFindThrowErrorMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            id: "5e2976c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await getCartItemCount.getTotalPrice(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});

test("if getItemsAmount throw error it should return with status 500", async (done) => {
    getCartItemCount = new GetCartTotalPriceService(cartServiceWithCartServiceTotalThrowErrorMock);
    const req = httpMocks.createRequest({
        headers: {
            Authorization: "dc894639-7a8e-48cc-9190-a27d099b09cd",
        },
        params: {
            id: "5e2976c1348e1e4294072b3b",
        },
    });
    const res = httpMocks.createResponse();
    await getCartItemCount.getTotalPrice(req, res);
    const status = res.statusCode;
    expect(status).toBe(500);
    done();
});
