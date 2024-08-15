import { IDetail } from "./detail";
import { IDomain } from "./domain";

export interface IEntityBuilder<TDetail extends IDetail<TDomain> | IDetail<TDomain>[], TDomain extends IDomain<TDomain> | IDomain<TDomain>[]> {
    build(detail: TDetail): TDomain;
};