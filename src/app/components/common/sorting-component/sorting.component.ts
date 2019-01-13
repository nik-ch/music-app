import { Component, Output, EventEmitter, SimpleChanges, Input } from "@angular/core";
import { SortingOrder } from "src/app/models/common/sorting/sorting-order";
import { SortingField } from "src/app/models/common/sorting/sorting-field";
import { SortingCondition } from "src/app/models/common/sorting/sorting-condition";

@Component({
    selector: "sorting-component",
    templateUrl: "./sorting.component.html"
})
export class SortingComponent {
    
    @Input("sortingFieldItems")
    sortingFieldItems: SortingField[];

    @Output()
    sortingConditionChanged = new EventEmitter<SortingCondition>();

    sortingOrder: SortingOrder;
    sortingField: SortingField;

    private lastSortingState: SortingCondition;

    constructor() {
        this.sortingFieldItems = [{displayValue: "title", field: "title"}];
    }

    get isAscendingSortSelected(): boolean {
        return this.sortingOrder === SortingOrder.asc;
    }

    get isDescendingSortSelected(): boolean {
        return this.sortingOrder === SortingOrder.desc;
    }

    onSortingFieldChange(newVal: SortingField) {
        this.sortingField = newVal;
        this.emitSortingCondition();
    }

    onSortingOrderChange(isUp: boolean) {
        this.sortingOrder = isUp ? SortingOrder.asc : SortingOrder.desc;
        this.emitSortingCondition();
    }

    private emitSortingCondition() {
        let sortCond: SortingCondition = {
            sortingField: this.sortingField,
            sortingOrder: this.sortingOrder
        };
        if(this.isSortingStateChanged(sortCond, this.lastSortingState)) {
            this.lastSortingState = sortCond;
            this.sortingConditionChanged.emit(sortCond);
        }
    }

    private isSortingStateChanged(currentVal: SortingCondition, prevVal: SortingCondition): boolean {
        if(!currentVal && prevVal || currentVal && !prevVal) {
            return true;
        }
        
        if(currentVal && prevVal) {
            if(!currentVal.sortingField && prevVal.sortingField
                || currentVal.sortingField && !prevVal.sortingField) {
                    return true;
                }

            if(currentVal.sortingField.field != prevVal.sortingField.field
                || currentVal.sortingOrder != prevVal.sortingOrder) {
                    return true;
                }
        }

        return false;
    }
}