import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from 'yup'
import Product from "../entity/product";
import Price from "../entity/price";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try{
            if(entity.prices.length === 0 || entity.prices.some(price => price instanceof Price === false)){
                entity.notification.addError({
                    context: 'product',
                    message: 'Price is required.'
                })
            }
            yup
            .object()
            .shape({
                id: yup.string().required("Id is required."),
                name: yup.string().required("Name is required."),
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                }, 
                { 
                    abortEarly: false 
                }
            )

        }catch(errors){
            const e = errors as yup.ValidationError
            e.errors.forEach(error => {
                entity.notification.addError({
                    context: 'product',
                    message: error
                })
            })
        }
    }

}