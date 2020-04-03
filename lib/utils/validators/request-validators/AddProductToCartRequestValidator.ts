import { AddToCartRequestKeys } from "../../enums/requests/add-to-cart/AddToCartRequestKeys";
import { IRequestValidator } from "./IRequestValidator";
import { NumericParamsValidator } from "./shared/NumericParamsValidator";
import { RequiredParamsValidator } from "./shared/RequiredParamsValidator";
export class AddProductToCartRequestValidator implements IRequestValidator {

    constructor() { }

    public isRequestValid(request: any): boolean {
        return this.areRequiredParamsSet(request.body) &&
            this.isAmountValid(request.body) &&
            this.isPriceValid(request.body) &&
            this.isPackagePriceValid(request.body);
    }

    public isAmountValid(requestBody: any): boolean {
        (new NumericParamsValidator(requestBody.amount, AddToCartRequestKeys.AMOUNT))
            .isParamNumber()
            .isParamPositveNumber()
            .isParamNotDecimal();
        return true;
    }

    public isPriceValid(requestBody: any): boolean {
        (new NumericParamsValidator(requestBody.price, AddToCartRequestKeys.PRICE))
            .isParamNumber()
            .isParamPositveNumber();
        return true;
    }

    public isPackagePriceValid(requestBody: any): boolean {
        (new NumericParamsValidator(requestBody.packagePrice, AddToCartRequestKeys.PACKAGE_PRICE))
            .isParamNumber()
            .isParamPositveNumber();
        return true;
    }

    private areRequiredParamsSet(requestBody: any): boolean {
        return (new RequiredParamsValidator(AddToCartRequestKeys)).areRequiredParamsSet(requestBody);
    }

}
