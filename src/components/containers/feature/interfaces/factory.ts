import { IDetail } from "./detail";
import { IDomain } from "./domain";
import { IEntityBuilder } from "./entityBuilder";
import { IValidator } from "./validator";

export interface IFactory<TDetail extends IDetail<TDomain> | IDetail<TDomain>[], TDomain extends IDomain<TDomain> | IDomain<TDomain>[]> {
    build(detail: TDetail): TDomain 
}

export abstract class AbstractFactory<TDetail extends IDetail<TDomain> | IDetail<TDomain>[], TDomain extends IDomain<TDomain> | IDomain<TDomain>[]> implements IFactory<TDetail, TDomain> {
    private validator: IValidator<TDetail, TDomain>;
    private builder : IEntityBuilder<TDetail, TDomain>;
    constructor(validator: IValidator<TDetail, TDomain>, builder: IEntityBuilder<TDetail, TDomain>) {
        if (!validator || !builder) {
            throw new Error(``);
        }
        this.validator = validator;
        this.builder = builder;
    }

    build(detail: TDetail): TDomain {
        this.validator.validate(detail);
        return this.builder.build(detail);
    }
}
