import CartEntity, { ICart } from "../../lib/models/entities/Cart";
import CartProductEntity, { IProduct } from "../../lib/models/entities/CartProduct";
import { CartService } from "../../lib/services/shared/CartService";
import { CartSerializer } from "../../lib/utils/data-serializers/CartSerializer";

const productOfCart1: IProduct = new CartProductEntity();
productOfCart1.title = "product number 99";
productOfCart1.image = "product number 99";
productOfCart1.description = "product number 99";
productOfCart1.price = 50;
productOfCart1.amount = 1;
productOfCart1.packagePrice = 20;
productOfCart1.isPackagingSelected = true;
productOfCart1.productId = "1234";

const validCart1: ICart = new CartEntity();
validCart1.userId = "dc894639-7a8e-48cc-9190-a27d099b09cd";
validCart1.products = [productOfCart1];
validCart1.deliveryOptions = [];

const validCart2: ICart = new CartEntity();
validCart2.userId = "dc894639-7a8e-48cc-9190-a27d099b09ce";
validCart2.products = [];
validCart2.deliveryOptions = [];

let cartServiceWithCartServiceMock: CartService;
let cartServiceWithCartServiceEmptyMock: CartService;
let cartSerializer: CartSerializer;

export class CartServiceMock extends CartService {
    public calculateTotalPrice(products: IProduct[]): number {
        return 50;
    }
}

export class CartServiceEmptyMock extends CartService {
    public calculateTotalPrice(products: IProduct[]): number {
        return 0;
    }
}

beforeAll(() => {
    cartServiceWithCartServiceMock = new CartServiceMock();
    cartServiceWithCartServiceEmptyMock = new CartServiceEmptyMock();
});

test("should create instance successfully", () => {
    expect(new CartSerializer(validCart1, "successfully added")).toBeInstanceOf(CartSerializer);
});

test("should return cartResponse with the cart, message and total price after calculate it", () => {
    cartSerializer = new CartSerializer(validCart1, "successfully added", cartServiceWithCartServiceMock);
    expect(cartSerializer.serialize().cart).toMatchObject(validCart1);
    expect(cartSerializer.serialize().message).toBe("successfully added");
    expect(cartSerializer.serialize().totalPrice).toBe(50);
});

test("should return cartResponse with the cart, message and total priceequal zero if no product exists", () => {
    cartSerializer = new CartSerializer(validCart2, "successfully product is removed", cartServiceWithCartServiceEmptyMock);
    expect(cartSerializer.serialize().cart).toMatchObject(validCart2);
    expect(cartSerializer.serialize().message).toBe("successfully product is removed");
    expect(cartSerializer.serialize().totalPrice).toBe(0);
});
