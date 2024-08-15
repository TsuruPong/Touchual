import { IDetail } from "./detail";
import { IDomain } from "./domain";

export interface IValidator<TDetail extends IDetail<TDomain> | IDetail<TDomain>[], TDomain extends IDomain<TDomain>> {
    validate(detail: TDetail): boolean;
}