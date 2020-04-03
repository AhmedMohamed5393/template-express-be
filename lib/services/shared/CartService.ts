import { CartEntity, ICart } from "../../models/entities/Cart";
import { IProduct } from "../../models/entities/CartProduct";
import { CartRepository } from "../../repositories/CartRepository";
import { RepositoriesFactory } from "../../repositories/RepositoriesFactory";
import { ProductService } from "./ProductService";

export class CartService {

    private repositoriesFactory: RepositoriesFactory;
    constructor(cartRepositoryFactory?: RepositoriesFactory) {
        this.repositoriesFactory = cartRepositoryFactory || new RepositoriesFactory();
    }

    public async findById(id: string) {
        return await this.repositoriesFactory.getRepository(CartRepository.name).findById(id);
    }

    // TODO don't allow any to be passed, parse it first to a cart object
    public async createNewCart(cart: ICart) {
        return await this.repositoriesFactory.getRepository(CartRepository.name).create(cart);
    }

    public async updateCart(id: string, cart: ICart) {
        return await this.repositoriesFactory.getRepository(CartRepository.name).update(id, cart);
    }

    public isProductExist(product: IProduct, cart: ICart): boolean {
        return cart.products.some((cartProduct) => cartProduct.productId === product.productId);
    }

    public getProductByProductId(cart: ICart, productId: string) {
        return cart.products.find((cartProduct) => cartProduct.productId === productId);
    }

    public removeProductById(cart: ICart, productId: string) {
        return cart.products.filter((product) => product.productId !== productId);
    }

    public calculateTotalPrice(products: IProduct[]): number {
        let priceSum = 0;
        const productService = new ProductService();
        products.forEach((product) => {
            priceSum += product.isPackagingSelected
                ? productService.calculateProductPriceWithPackagePrice(product)
                : productService.calculateProductPrice(product);
        });
        return priceSum;
    }

    public getItemsAmount(cart: ICart) {
        let itemsCounter = 0;
        cart.products.forEach((product) => itemsCounter += product.amount);
        return itemsCounter;
    }
}
