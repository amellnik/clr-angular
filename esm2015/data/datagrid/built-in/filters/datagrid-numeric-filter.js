/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClrDatagridFilter } from '../../datagrid-filter';
import { CustomFilter } from '../../providers/custom-filter';
import { FiltersProvider, RegisteredFilter } from '../../providers/filters';
import { DomAdapter } from '../../../../utils/dom-adapter/dom-adapter';
import { DatagridFilterRegistrar } from '../../utils/datagrid-filter-registrar';
import { DatagridNumericFilterImpl } from './datagrid-numeric-filter-impl';
import { ClrCommonStrings } from '../../../../utils/i18n/common-strings.interface';
/**
 * @template T
 */
export class DatagridNumericFilter extends DatagridFilterRegistrar {
    /**
     * @param {?} filters
     * @param {?} domAdapter
     * @param {?} commonStrings
     */
    constructor(filters, domAdapter, commonStrings) {
        super(filters);
        this.domAdapter = domAdapter;
        this.commonStrings = commonStrings;
        /**
         * Indicates if the filter dropdown is open
         */
        this.open = false;
        this.filterValueChange = new EventEmitter();
    }
    /**
     * Customizable filter logic based on high and low values
     * @param {?} value
     * @return {?}
     */
    set customNumericFilter(value) {
        if (value instanceof RegisteredFilter) {
            this.setFilter(value);
        }
        else {
            this.setFilter(new DatagridNumericFilterImpl(value));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.filterContainer.openChanged.subscribe((open) => {
            if (open) {
                // We need the timeout because at the time this executes, the input isn't
                // displayed yet.
                setTimeout(() => {
                    this.domAdapter.focus(this.input.nativeElement);
                });
            }
        });
    }
    /**
     * Common setter for the input values
     * @return {?}
     */
    get value() {
        return [this.filter.low, this.filter.high];
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set value(values) {
        if (!this.filter) {
            return;
        }
        if (values && (values[0] !== this.filter.low || values[1] !== this.filter.high)) {
            if (typeof values[0] === 'number') {
                this.filter.low = values[0];
            }
            else {
                this.filter.low = null;
            }
            if (typeof values[1] === 'number') {
                this.filter.high = values[1];
            }
            else {
                this.filter.high = null;
            }
            this.filterValueChange.emit(values);
        }
    }
    /**
     * @return {?}
     */
    get low() {
        if (typeof this.filter.low === 'number' && isFinite(this.filter.low)) {
            return this.filter.low;
        }
        else {
            // There's not a low limit
            return null;
        }
    }
    /**
     * @return {?}
     */
    get high() {
        if (typeof this.filter.high === 'number' && isFinite(this.filter.high)) {
            return this.filter.high;
        }
        else {
            // There's not a high limit
            return null;
        }
    }
    /**
     * @param {?} low
     * @return {?}
     */
    set low(low) {
        if (typeof low === 'number' && low !== this.filter.low) {
            this.filter.low = low;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof low !== 'number') {
            this.filter.low = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
    /**
     * @param {?} high
     * @return {?}
     */
    set high(high) {
        if (typeof high === 'number' && high !== this.filter.high) {
            this.filter.high = high;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
        else if (typeof high !== 'number') {
            this.filter.high = null;
            this.filterValueChange.emit([this.filter.low, this.filter.high]);
        }
    }
    /**
     * @return {?}
     */
    close() {
        this.open = false;
    }
}
DatagridNumericFilter.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-numeric-filter',
                providers: [{ provide: CustomFilter, useExisting: DatagridNumericFilter }],
                template: `
        <clr-dg-filter [clrDgFilter]="registered" [(clrDgFilterOpen)]="open">
            <!--
                Even though this *ngIf looks useless because the filter container already has one,
                it prevents NgControlStatus and other directives automatically added by Angular
                on inputs with NgModel from freaking out because of their host binding changing
                mid-change detection when the input is destroyed.
            -->
            <input #input_low type="number" name="low" [(ngModel)]="low" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()" style="width: 78px"
                [placeholder]="commonStrings.min"/>
                <span class="datagrid-filter-input-spacer"></span>
            <input #input_high type="number" name="high" [(ngModel)]="high" *ngIf="open"
                (keyup.enter)="close()" (keyup.escape)="close()" style="width: 78px"
                [placeholder]="commonStrings.max"/>
        </clr-dg-filter>
    `
            }] }
];
/** @nocollapse */
DatagridNumericFilter.ctorParameters = () => [
    { type: FiltersProvider },
    { type: DomAdapter },
    { type: ClrCommonStrings }
];
DatagridNumericFilter.propDecorators = {
    customNumericFilter: [{ type: Input, args: ['clrDgNumericFilter',] }],
    input: [{ type: ViewChild, args: ['input_low',] }],
    filterContainer: [{ type: ViewChild, args: [ClrDatagridFilter,] }],
    value: [{ type: Input, args: ['clrFilterValue',] }],
    filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
};
if (false) {
    /**
     * Indicates if the filter dropdown is open
     * @type {?}
     */
    DatagridNumericFilter.prototype.open;
    /**
     * We need the actual input element to automatically focus on it
     * @type {?}
     */
    DatagridNumericFilter.prototype.input;
    /**
     * We grab the ClrDatagridFilter we wrap to register this StringFilter to it.
     * @type {?}
     */
    DatagridNumericFilter.prototype.filterContainer;
    /** @type {?} */
    DatagridNumericFilter.prototype.filterValueChange;
    /** @type {?} */
    DatagridNumericFilter.prototype.domAdapter;
    /** @type {?} */
    DatagridNumericFilter.prototype.commonStrings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNoRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7OztBQXVCbkYsTUFBTSxPQUFPLHFCQUErQixTQUFRLHVCQUF3RDs7Ozs7O0lBRTFHLFlBQVksT0FBMkIsRUFBVSxVQUFzQixFQUFTLGFBQStCO1FBQzdHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURnQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCOzs7O1FBcUJ4RyxTQUFJLEdBQVksS0FBSyxDQUFDO1FBd0ZHLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUEzR3ZFLENBQUM7Ozs7OztJQUtELElBQ0ksbUJBQW1CLENBQ3JCLEtBQStGO1FBRS9GLElBQUksS0FBSyxZQUFZLGdCQUFnQixFQUFFO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQzs7OztJQWdCRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBYSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IseUVBQXlFO2dCQUN6RSxpQkFBaUI7Z0JBQ2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFLRCxJQUFXLEtBQUs7UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVELElBQ1csS0FBSyxDQUFDLE1BQXdCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9FLElBQUksT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDekI7WUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7OztJQUVELElBQVcsR0FBRztRQUNaLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUN4QjthQUFNO1lBQ0wsMEJBQTBCO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxJQUFJO1FBQ2IsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3pCO2FBQU07WUFDTCwyQkFBMkI7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Ozs7O0lBRUQsSUFBVyxHQUFHLENBQUMsR0FBb0I7UUFDakMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDOzs7OztJQUVELElBQVcsSUFBSSxDQUFDLElBQXFCO1FBQ25DLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNsRTthQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs7OztJQUlNLEtBQUs7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7WUF4SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsQ0FBQztnQkFDMUUsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JQO2FBQ0o7Ozs7WUExQlEsZUFBZTtZQUNmLFVBQVU7WUFHVixnQkFBZ0I7OztrQ0FnQ3RCLEtBQUssU0FBQyxvQkFBb0I7b0JBbUIxQixTQUFTLFNBQUMsV0FBVzs4QkFLckIsU0FBUyxTQUFDLGlCQUFpQjtvQkFvQjNCLEtBQUssU0FBQyxnQkFBZ0I7Z0NBMER0QixNQUFNLFNBQUMsc0JBQXNCOzs7Ozs7O0lBeEY5QixxQ0FBNkI7Ozs7O0lBSzdCLHNDQUFpRDs7Ozs7SUFLakQsZ0RBQTJFOztJQThFM0Usa0RBQXVFOztJQTdHOUIsMkNBQThCOztJQUFFLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXIgfSBmcm9tICcuLi8uLi9kYXRhZ3JpZC1maWx0ZXInO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9udW1lcmljLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VzdG9tRmlsdGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyLCBSZWdpc3RlcmVkRmlsdGVyIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2ZpbHRlcnMnO1xuaW1wb3J0IHsgRG9tQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2RvbS1hZGFwdGVyL2RvbS1hZGFwdGVyJztcbmltcG9ydCB7IERhdGFncmlkRmlsdGVyUmVnaXN0cmFyIH0gZnJvbSAnLi4vLi4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsIH0gZnJvbSAnLi9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy9pMThuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1udW1lcmljLWZpbHRlcicsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogQ3VzdG9tRmlsdGVyLCB1c2VFeGlzdGluZzogRGF0YWdyaWROdW1lcmljRmlsdGVyIH1dLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8Y2xyLWRnLWZpbHRlciBbY2xyRGdGaWx0ZXJdPVwicmVnaXN0ZXJlZFwiIFsoY2xyRGdGaWx0ZXJPcGVuKV09XCJvcGVuXCI+XG4gICAgICAgICAgICA8IS0tXG4gICAgICAgICAgICAgICAgRXZlbiB0aG91Z2ggdGhpcyAqbmdJZiBsb29rcyB1c2VsZXNzIGJlY2F1c2UgdGhlIGZpbHRlciBjb250YWluZXIgYWxyZWFkeSBoYXMgb25lLFxuICAgICAgICAgICAgICAgIGl0IHByZXZlbnRzIE5nQ29udHJvbFN0YXR1cyBhbmQgb3RoZXIgZGlyZWN0aXZlcyBhdXRvbWF0aWNhbGx5IGFkZGVkIGJ5IEFuZ3VsYXJcbiAgICAgICAgICAgICAgICBvbiBpbnB1dHMgd2l0aCBOZ01vZGVsIGZyb20gZnJlYWtpbmcgb3V0IGJlY2F1c2Ugb2YgdGhlaXIgaG9zdCBiaW5kaW5nIGNoYW5naW5nXG4gICAgICAgICAgICAgICAgbWlkLWNoYW5nZSBkZXRlY3Rpb24gd2hlbiB0aGUgaW5wdXQgaXMgZGVzdHJveWVkLlxuICAgICAgICAgICAgLS0+XG4gICAgICAgICAgICA8aW5wdXQgI2lucHV0X2xvdyB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImxvd1wiIFsobmdNb2RlbCldPVwibG93XCIgKm5nSWY9XCJvcGVuXCJcbiAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiY2xvc2UoKVwiIChrZXl1cC5lc2NhcGUpPVwiY2xvc2UoKVwiIHN0eWxlPVwid2lkdGg6IDc4cHhcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb21tb25TdHJpbmdzLm1pblwiLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWZpbHRlci1pbnB1dC1zcGFjZXJcIj48L3NwYW4+XG4gICAgICAgICAgICA8aW5wdXQgI2lucHV0X2hpZ2ggdHlwZT1cIm51bWJlclwiIG5hbWU9XCJoaWdoXCIgWyhuZ01vZGVsKV09XCJoaWdoXCIgKm5nSWY9XCJvcGVuXCJcbiAgICAgICAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiY2xvc2UoKVwiIChrZXl1cC5lc2NhcGUpPVwiY2xvc2UoKVwiIHN0eWxlPVwid2lkdGg6IDc4cHhcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb21tb25TdHJpbmdzLm1heFwiLz5cbiAgICAgICAgPC9jbHItZGctZmlsdGVyPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIERhdGFncmlkTnVtZXJpY0ZpbHRlcjxUID0gYW55PiBleHRlbmRzIERhdGFncmlkRmlsdGVyUmVnaXN0cmFyPFQsIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGw8VD4+XG4gIGltcGxlbWVudHMgQ3VzdG9tRmlsdGVyLCBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoZmlsdGVyczogRmlsdGVyc1Byb3ZpZGVyPFQ+LCBwcml2YXRlIGRvbUFkYXB0ZXI6IERvbUFkYXB0ZXIsIHB1YmxpYyBjb21tb25TdHJpbmdzOiBDbHJDb21tb25TdHJpbmdzKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gIH1cblxuICAvKipcbiAgICogQ3VzdG9taXphYmxlIGZpbHRlciBsb2dpYyBiYXNlZCBvbiBoaWdoIGFuZCBsb3cgdmFsdWVzXG4gICAqL1xuICBASW5wdXQoJ2NsckRnTnVtZXJpY0ZpbHRlcicpXG4gIHNldCBjdXN0b21OdW1lcmljRmlsdGVyKFxuICAgIHZhbHVlOiBDbHJEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbnRlcmZhY2U8VD4gfCBSZWdpc3RlcmVkRmlsdGVyPFQsIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGw8VD4+XG4gICkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFJlZ2lzdGVyZWRGaWx0ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIobmV3IERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGwodmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgZHJvcGRvd24gaXMgb3BlblxuICAgKi9cbiAgcHVibGljIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogV2UgbmVlZCB0aGUgYWN0dWFsIGlucHV0IGVsZW1lbnQgdG8gYXV0b21hdGljYWxseSBmb2N1cyBvbiBpdFxuICAgKi9cbiAgQFZpZXdDaGlsZCgnaW5wdXRfbG93JykgcHVibGljIGlucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXZSBncmFiIHRoZSBDbHJEYXRhZ3JpZEZpbHRlciB3ZSB3cmFwIHRvIHJlZ2lzdGVyIHRoaXMgU3RyaW5nRmlsdGVyIHRvIGl0LlxuICAgKi9cbiAgQFZpZXdDaGlsZChDbHJEYXRhZ3JpZEZpbHRlcikgcHVibGljIGZpbHRlckNvbnRhaW5lcjogQ2xyRGF0YWdyaWRGaWx0ZXI8VD47XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZpbHRlckNvbnRhaW5lci5vcGVuQ2hhbmdlZC5zdWJzY3JpYmUoKG9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIHRpbWVvdXQgYmVjYXVzZSBhdCB0aGUgdGltZSB0aGlzIGV4ZWN1dGVzLCB0aGUgaW5wdXQgaXNuJ3RcbiAgICAgICAgLy8gZGlzcGxheWVkIHlldC5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kb21BZGFwdGVyLmZvY3VzKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbW1vbiBzZXR0ZXIgZm9yIHRoZSBpbnB1dCB2YWx1ZXNcbiAgICovXG4gIHB1YmxpYyBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdO1xuICB9XG5cbiAgQElucHV0KCdjbHJGaWx0ZXJWYWx1ZScpXG4gIHB1YmxpYyBzZXQgdmFsdWUodmFsdWVzOiBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgaWYgKCF0aGlzLmZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodmFsdWVzICYmICh2YWx1ZXNbMF0gIT09IHRoaXMuZmlsdGVyLmxvdyB8fCB2YWx1ZXNbMV0gIT09IHRoaXMuZmlsdGVyLmhpZ2gpKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlc1swXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubG93ID0gdmFsdWVzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWx0ZXIubG93ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWVzWzFdID09PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzLmZpbHRlci5oaWdoID0gdmFsdWVzWzFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maWx0ZXIuaGlnaCA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclZhbHVlQ2hhbmdlLmVtaXQodmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvdygpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVyLmxvdyA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodGhpcy5maWx0ZXIubG93KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLmxvdztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlcmUncyBub3QgYSBsb3cgbGltaXRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlnaCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZmlsdGVyLmhpZ2ggPT09ICdudW1iZXInICYmIGlzRmluaXRlKHRoaXMuZmlsdGVyLmhpZ2gpKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXIuaGlnaDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlcmUncyBub3QgYSBoaWdoIGxpbWl0XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGxvdyhsb3c6IG51bWJlciB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgbG93ID09PSAnbnVtYmVyJyAmJiBsb3cgIT09IHRoaXMuZmlsdGVyLmxvdykge1xuICAgICAgdGhpcy5maWx0ZXIubG93ID0gbG93O1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsb3cgIT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLmZpbHRlci5sb3cgPSBudWxsO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGhpZ2goaGlnaDogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBoaWdoID09PSAnbnVtYmVyJyAmJiBoaWdoICE9PSB0aGlzLmZpbHRlci5oaWdoKSB7XG4gICAgICB0aGlzLmZpbHRlci5oaWdoID0gaGlnaDtcbiAgICAgIHRoaXMuZmlsdGVyVmFsdWVDaGFuZ2UuZW1pdChbdGhpcy5maWx0ZXIubG93LCB0aGlzLmZpbHRlci5oaWdoXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaGlnaCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuZmlsdGVyLmhpZ2ggPSBudWxsO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KFt0aGlzLmZpbHRlci5sb3csIHRoaXMuZmlsdGVyLmhpZ2hdKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJGaWx0ZXJWYWx1ZUNoYW5nZScpIGZpbHRlclZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgfVxufVxuIl19