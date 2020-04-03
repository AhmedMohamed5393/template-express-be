import { IProduct } from "../../models/entities/CartProduct";

export class ProductService {
    constructor() {}

    public updateProduct(product: IProduct, requestBody: any) {
        product = this.updateAmount(product, requestBody.amount);
        product = this.updateIsPackagePriceSelectedStatus(product, requestBody.isPackagingSelected);
        return product;
    }

    public updateAmount(product: IProduct, amount: number) {
        product.amount = amount;
        return product;
    }

    public incrementAmountWithRequestAmount(product: IProduct, amount: number) {
        product.amount += amount;
        return product;
    }

    public calculateProductPrice(product: IProduct) {
        return product.price * product.amount;
    }

    public calculateProductPriceWithPackagePrice(product: IProduct) {
        return (product.price + product.packagePrice) * product.amount;
    }

    public updateIsPackagePriceSelectedStatus(product: IProduct, isPackagingSelected: boolean) {
        product.isPackagingSelected = isPackagingSelected;
        return product;
    }

}
