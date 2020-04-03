import { UpdateProductAmountRequestKeys } from "../../enums/requests/update-product-amount/UpdateProductAmountRequestKeys";
import { IRequestValidator } from "./IRequestValidator";
import { NumericParamsValidator } from "./shared/NumericParamsValidator";
import { RequiredParamsValidator } from "./shared/RequiredParamsValidator";

export class UpdateProductAmountRequestValidator implements IRequestValidator {

    public isRequestValid(request: any): boolean {
        return this.areRequiredParamsSet(request.body) &&
               this.isAmountValid(request.body);
    }

    private isAmountValid(requestBody: any): boolean {
        (new NumericParamsValidator(requestBody.amount, UpdateProductAmountRequestKeys.AMOUNT))
        .isParamNumber()
        .isParamPositveNumber()
        .isParamNotDecimal();
        return true;
    }

    private areRequiredParamsSet(requestBody: any): boolean {
        return (new RequiredParamsValidator(UpdateProductAmountRequestKeys)).areRequiredParamsSet(requestBody);
    }

}
