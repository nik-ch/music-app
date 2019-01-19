import { SortingField } from "./sorting-field";
import { SortingOrderEnum } from "./sorting-order.enum";

export class SortingCondition {
    sortingField: SortingField;
    sortingOrder: SortingOrderEnum;
}