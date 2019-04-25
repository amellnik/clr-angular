/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChild, EventEmitter, HostBinding, Input, Output, ViewContainerRef, } from '@angular/core';
import { HostWrapper } from '../../utils/host-wrapping/host-wrapper';
import { DatagridPropertyComparator } from './built-in/comparators/datagrid-property-comparator';
import { DatagridPropertyStringFilter } from './built-in/filters/datagrid-property-string-filter';
import { DatagridPropertyNumericFilter } from './built-in/filters/datagrid-property-numeric-filter';
import { DatagridStringFilterImpl } from './built-in/filters/datagrid-string-filter-impl';
import { DatagridNumericFilterImpl } from './built-in/filters/datagrid-numeric-filter-impl';
import { ClrDatagridSortOrder } from './enums/sort-order.enum';
import { CustomFilter } from './providers/custom-filter';
import { FiltersProvider } from './providers/filters';
import { Sort } from './providers/sort';
import { DatagridFilterRegistrar } from './utils/datagrid-filter-registrar';
import { WrappedColumn } from './wrapped-column';
/** @type {?} */
let nbCount = 0;
/**
 * @template T
 */
export class ClrDatagridColumn extends DatagridFilterRegistrar {
    /**
     * @param {?} _sort
     * @param {?} filters
     * @param {?} vcr
     */
    constructor(_sort, filters, vcr) {
        super(filters);
        this._sort = _sort;
        this.vcr = vcr;
        /*
             * What type is this column?  This defaults to STRING, but can also be
             * set to NUMBER.  Unsupported types default to STRING. Users can set it
             * via the [clrDgColType] input by setting it to 'string' or 'number'.
             */
        this.colType = 'string';
        // deprecated: to be removed - START
        /**
         * Indicates if the column is currently sorted
         *
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this._sorted = false;
        /**
         * @deprecated This will be removed soon, in favor of the sortOrder mechanism
         */
        this.sortedChange = new EventEmitter();
        // deprecated: to be removed - END
        /**
         * Indicates how the column is currently sorted
         */
        this._sortOrder = ClrDatagridSortOrder.UNSORTED;
        this.sortOrderChange = new EventEmitter();
        /**
         * A custom filter for this column that can be provided in the projected content
         */
        this.customFilter = false;
        this.filterValueChange = new EventEmitter();
        this._sortSubscription = _sort.change.subscribe(sort => {
            // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
            if (this.sortOrder !== ClrDatagridSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
                this._sortOrder = ClrDatagridSortOrder.UNSORTED;
                this.sortOrderChange.emit(this._sortOrder);
            }
            // deprecated: to be removed - START
            if (this.sorted && sort.comparator !== this._sortBy) {
                this._sorted = false;
                this.sortedChange.emit(false);
            }
            // deprecated: to be removed - END
        });
        this.columnId = 'dg-col-' + nbCount.toString(); // Approximate a GUID
        nbCount++;
    }
    /**
     * \@property hidden
     *
     * \@description
     * A property that allows the column to be hidden / shown with css
     * Note the default allows the ClrDatagridColumn to have an *ngIf on it. (EHCAIWC - will occur if its not
     * initialized)
     *
     * \@default false
     *
     * @return {?}
     */
    get hidden() {
        return !!this.hideable && this.hideable.hidden;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._sortSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    get field() {
        return this._field;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    set field(field) {
        if (typeof field === 'string') {
            this._field = field;
            if (!this.customFilter) {
                if (this.colType === 'number') {
                    this.setFilter(new DatagridNumericFilterImpl(new DatagridPropertyNumericFilter(field)));
                }
                else {
                    this.setFilter(new DatagridStringFilterImpl(new DatagridPropertyStringFilter(field)));
                }
            }
            if (!this._sortBy) {
                this._sortBy = new DatagridPropertyComparator(field);
            }
        }
    }
    /**
     * @return {?}
     */
    get sortBy() {
        return this._sortBy;
    }
    /**
     * @param {?} comparator
     * @return {?}
     */
    set sortBy(comparator) {
        if (typeof comparator === 'string') {
            this._sortBy = new DatagridPropertyComparator(comparator);
        }
        else {
            if (comparator) {
                this._sortBy = comparator;
            }
            else {
                if (this._field) {
                    this._sortBy = new DatagridPropertyComparator(this._field);
                }
                else {
                    delete this._sortBy;
                }
            }
        }
    }
    /**
     * Indicates if the column is sortable
     * @return {?}
     */
    get sortable() {
        return !!this._sortBy;
    }
    /**
     * @return {?}
     */
    get sorted() {
        return this._sorted;
    }
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @param {?} value
     * @return {?}
     */
    set sorted(value) {
        if (!value && this.sorted) {
            this._sorted = false;
            this._sort.clear();
        }
        else if (value && !this.sorted) {
            this.sort();
        }
    }
    /**
     * @return {?}
     */
    get sortOrder() {
        return this._sortOrder;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortOrder(value) {
        if (typeof value === 'undefined') {
            return;
        }
        // only if the incoming order is different from the current one
        if (this._sortOrder === value) {
            return;
        }
        switch (value) {
            // the Unsorted case happens when the current state is either Asc or Desc
            default:
            case ClrDatagridSortOrder.UNSORTED:
                this._sort.clear();
                break;
            case ClrDatagridSortOrder.ASC:
                this.sort(false);
                break;
            case ClrDatagridSortOrder.DESC:
                this.sort(true);
                break;
        }
    }
    /**
     * @return {?}
     */
    get ariaSort() {
        switch (this._sortOrder) {
            default:
            case ClrDatagridSortOrder.UNSORTED:
                return 'none';
            case ClrDatagridSortOrder.ASC:
                return 'ascending';
            case ClrDatagridSortOrder.DESC:
                return 'descending';
        }
    }
    /**
     * Sorts the datagrid based on this column
     * @param {?=} reverse
     * @return {?}
     */
    sort(reverse) {
        if (!this.sortable) {
            return;
        }
        this._sort.toggle(this._sortBy, reverse);
        // setting the private variable to not retrigger the setter logic
        this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        this.sortOrderChange.emit(this._sortOrder);
        // deprecated: to be removed - START
        this._sorted = true;
        this.sortedChange.emit(true);
        // deprecated: to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in ascending order
     * @return {?}
     */
    get asc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === 'undefined') {
            return this.sorted && !this._sort.reverse;
        }
        else {
            return this.sortOrder === ClrDatagridSortOrder.ASC;
        }
        // deprecated: if condition to be removed - END
    }
    /**
     * Indicates if the column is currently sorted in descending order
     * @return {?}
     */
    get desc() {
        // deprecated: if condition to be removed - START
        if (typeof this.sortOrder === 'undefined') {
            return this.sorted && this._sort.reverse;
        }
        else {
            return this.sortOrder === ClrDatagridSortOrder.DESC;
        }
        // deprecated: if condition to be removed - END
    }
    /**
     * @param {?} custom
     * @return {?}
     */
    set projectedFilter(custom) {
        if (custom) {
            this.deleteFilter();
            this.customFilter = true;
        }
    }
    /**
     * @return {?}
     */
    get filterValue() {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            return this.filter.value;
        }
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set updateFilterValue(newValue) {
        if (!this.filter) {
            return;
        }
        if (this.filter instanceof DatagridStringFilterImpl) {
            if (!newValue || typeof newValue !== 'string') {
                newValue = '';
            }
            if (newValue !== this.filter.value) {
                this.filter.value = newValue;
            }
        }
        else if (this.filter instanceof DatagridNumericFilterImpl) {
            if (!newValue || !(newValue instanceof Array)) {
                newValue = [null, null];
            }
            if (newValue.length === 2 && (newValue[0] !== this.filter.value[0] || newValue[1] !== this.filter.value[1])) {
                this.filter.value = newValue;
            }
        }
    }
    /**
     * @param {?} newValue
     * @return {?}
     */
    set filterValue(newValue) {
        if (this.filter instanceof DatagridStringFilterImpl || this.filter instanceof DatagridNumericFilterImpl) {
            this.updateFilterValue = newValue;
            this.filterValueChange.emit(this.filter.value);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.wrappedInjector = new HostWrapper(WrappedColumn, this.vcr);
    }
    /**
     * @return {?}
     */
    get _view() {
        return this.wrappedInjector.get(WrappedColumn, this.vcr).columnView;
    }
}
ClrDatagridColumn.decorators = [
    { type: Component, args: [{
                selector: 'clr-dg-column',
                template: `
        <div class="datagrid-column-flex">
            <!-- I'm really not happy with that select since it's not very scalable -->
            <ng-content select="clr-dg-filter, clr-dg-string-filter, clr-dg-numeric-filter"></ng-content>

            <clr-dg-string-filter
                    *ngIf="field && !customFilter && (colType=='string')"
                    [clrDgStringFilter]="registered"
                    [(clrFilterValue)]="filterValue"></clr-dg-string-filter>

            <clr-dg-numeric-filter
                    *ngIf="field && !customFilter && (colType=='number')"
                    [clrDgNumericFilter]="registered"
                    [(clrFilterValue)]="filterValue"></clr-dg-numeric-filter>

            <ng-template #columnTitle>
                <ng-content></ng-content>
            </ng-template>

            <button class="datagrid-column-title" *ngIf="sortable" (click)="sort()" type="button">
                <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </button>

            <span class="datagrid-column-title" *ngIf="!sortable">
               <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
            </span>

            <clr-dg-column-separator></clr-dg-column-separator>
        </div>
    `,
                host: {
                    '[class.datagrid-column]': 'true',
                    '[class.datagrid-column--hidden]': 'hidden',
                    '[attr.aria-sort]': 'ariaSort',
                    role: 'columnheader',
                }
            }] }
];
/** @nocollapse */
ClrDatagridColumn.ctorParameters = () => [
    { type: Sort },
    { type: FiltersProvider },
    { type: ViewContainerRef }
];
ClrDatagridColumn.propDecorators = {
    colType: [{ type: Input, args: ['clrDgColType',] }],
    field: [{ type: Input, args: ['clrDgField',] }],
    sortBy: [{ type: Input, args: ['clrDgSortBy',] }],
    sorted: [{ type: Input, args: ['clrDgSorted',] }],
    sortedChange: [{ type: Output, args: ['clrDgSortedChange',] }],
    sortOrder: [{ type: Input, args: ['clrDgSortOrder',] }],
    sortOrderChange: [{ type: Output, args: ['clrDgSortOrderChange',] }],
    asc: [{ type: HostBinding, args: ['class.asc',] }],
    desc: [{ type: HostBinding, args: ['class.desc',] }],
    projectedFilter: [{ type: ContentChild, args: [CustomFilter,] }],
    updateFilterValue: [{ type: Input, args: ['clrFilterValue',] }],
    filterValueChange: [{ type: Output, args: ['clrFilterValueChange',] }]
};
if (false) {
    /**
     * \@property columnId
     *
     * \@description
     * A ClrDatagridColumn class variable that holds the number of ClrDatagridColumn instances for a Datagrid.
     * It is used to generate a unique id for the ClrDatagridColumn instance.
     *
     * @type {?}
     */
    ClrDatagridColumn.prototype.columnId;
    /**
     * Subscription to the sort service changes
     * @type {?}
     */
    ClrDatagridColumn.prototype._sortSubscription;
    /** @type {?} */
    ClrDatagridColumn.prototype.colType;
    /** @type {?} */
    ClrDatagridColumn.prototype._field;
    /**
     * ClrDatagridComparatorInterface to use when sorting the column
     * @type {?}
     */
    ClrDatagridColumn.prototype._sortBy;
    /**
     * Indicates if the column is currently sorted
     *
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @type {?}
     */
    ClrDatagridColumn.prototype._sorted;
    /**
     * @deprecated This will be removed soon, in favor of the sortOrder mechanism
     * @type {?}
     */
    ClrDatagridColumn.prototype.sortedChange;
    /**
     * Indicates how the column is currently sorted
     * @type {?}
     */
    ClrDatagridColumn.prototype._sortOrder;
    /** @type {?} */
    ClrDatagridColumn.prototype.sortOrderChange;
    /**
     * A custom filter for this column that can be provided in the projected content
     * @type {?}
     */
    ClrDatagridColumn.prototype.customFilter;
    /** @type {?} */
    ClrDatagridColumn.prototype.filterValueChange;
    /**
     * ********
     *
     * \@property hideable
     *
     * \@description
     * When a column is hideable this is defined with an instance of DatagridHideableColumnModel.
     * When its not hideable should be undefined.
     *
     * @type {?}
     */
    ClrDatagridColumn.prototype.hideable;
    /** @type {?} */
    ClrDatagridColumn.prototype.wrappedInjector;
    /** @type {?} */
    ClrDatagridColumn.prototype._sort;
    /** @type {?} */
    ClrDatagridColumn.prototype.vcr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsiZGF0YS9kYXRhZ3JpZC9kYXRhZ3JpZC1jb2x1bW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsRUFFWCxLQUFLLEVBR0wsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbEcsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDcEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFFNUYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFNUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUU3QyxPQUFPLEdBQVcsQ0FBQzs7OztBQXlDdkIsTUFBTSxPQUFPLGlCQUEyQixTQUFRLHVCQUF5RDs7Ozs7O0lBRXZHLFlBQW9CLEtBQWMsRUFBRSxPQUEyQixFQUFVLEdBQXFCO1FBQzVGLEtB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QXFEbEcseUNBQTRCOztJQTZDNUIsOENBQXVFOzs7Ozs7Ozs7Ozs7SUFXdkUscUNBQTZDOztJQUU3Qyw0Q0FBa0M7O0lBdFR0QixrQ0FBc0I7O0lBQStCLGdDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEhvc3RXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9zdC13cmFwcGluZy9ob3N0LXdyYXBwZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IgfSBmcm9tICcuL2J1aWx0LWluL2NvbXBhcmF0b3JzL2RhdGFncmlkLXByb3BlcnR5LWNvbXBhcmF0b3InO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eVN0cmluZ0ZpbHRlciB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1wcm9wZXJ0eS1zdHJpbmctZmlsdGVyJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyIH0gZnJvbSAnLi9idWlsdC1pbi9maWx0ZXJzL2RhdGFncmlkLXByb3BlcnR5LW51bWVyaWMtZmlsdGVyJztcbmltcG9ydCB7IERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1zdHJpbmctZmlsdGVyLWltcGwnO1xuaW1wb3J0IHsgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCB9IGZyb20gJy4vYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsJztcbmltcG9ydCB7IERhdGFncmlkSGlkZWFibGVDb2x1bW5Nb2RlbCB9IGZyb20gJy4vZGF0YWdyaWQtaGlkZWFibGUtY29sdW1uLm1vZGVsJztcbmltcG9ydCB7IENsckRhdGFncmlkU29ydE9yZGVyIH0gZnJvbSAnLi9lbnVtcy9zb3J0LW9yZGVyLmVudW0nO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbXBhcmF0b3IuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1c3RvbUZpbHRlciB9IGZyb20gJy4vcHJvdmlkZXJzL2N1c3RvbS1maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyc1Byb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvZmlsdGVycyc7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSAnLi9wcm92aWRlcnMvc29ydCc7XG5pbXBvcnQgeyBEYXRhZ3JpZEZpbHRlclJlZ2lzdHJhciB9IGZyb20gJy4vdXRpbHMvZGF0YWdyaWQtZmlsdGVyLXJlZ2lzdHJhcic7XG5pbXBvcnQgeyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFdyYXBwZWRDb2x1bW4gfSBmcm9tICcuL3dyYXBwZWQtY29sdW1uJztcblxubGV0IG5iQ291bnQ6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nsci1kZy1jb2x1bW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YWdyaWQtY29sdW1uLWZsZXhcIj5cbiAgICAgICAgICAgIDwhLS0gSSdtIHJlYWxseSBub3QgaGFwcHkgd2l0aCB0aGF0IHNlbGVjdCBzaW5jZSBpdCdzIG5vdCB2ZXJ5IHNjYWxhYmxlIC0tPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiY2xyLWRnLWZpbHRlciwgY2xyLWRnLXN0cmluZy1maWx0ZXIsIGNsci1kZy1udW1lcmljLWZpbHRlclwiPjwvbmctY29udGVudD5cblxuICAgICAgICAgICAgPGNsci1kZy1zdHJpbmctZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmllbGQgJiYgIWN1c3RvbUZpbHRlciAmJiAoY29sVHlwZT09J3N0cmluZycpXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsckRnU3RyaW5nRmlsdGVyXT1cInJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLXN0cmluZy1maWx0ZXI+XG5cbiAgICAgICAgICAgIDxjbHItZGctbnVtZXJpYy1maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWVsZCAmJiAhY3VzdG9tRmlsdGVyICYmIChjb2xUeXBlPT0nbnVtYmVyJylcIlxuICAgICAgICAgICAgICAgICAgICBbY2xyRGdOdW1lcmljRmlsdGVyXT1cInJlZ2lzdGVyZWRcIlxuICAgICAgICAgICAgICAgICAgICBbKGNsckZpbHRlclZhbHVlKV09XCJmaWx0ZXJWYWx1ZVwiPjwvY2xyLWRnLW51bWVyaWMtZmlsdGVyPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvbHVtblRpdGxlPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkYXRhZ3JpZC1jb2x1bW4tdGl0bGVcIiAqbmdJZj1cInNvcnRhYmxlXCIgKGNsaWNrKT1cInNvcnQoKVwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sdW1uVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGFncmlkLWNvbHVtbi10aXRsZVwiICpuZ0lmPVwiIXNvcnRhYmxlXCI+XG4gICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29sdW1uVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgPGNsci1kZy1jb2x1bW4tc2VwYXJhdG9yPjwvY2xyLWRnLWNvbHVtbi1zZXBhcmF0b3I+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRhdGFncmlkLWNvbHVtbl0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5kYXRhZ3JpZC1jb2x1bW4tLWhpZGRlbl0nOiAnaGlkZGVuJyxcbiAgICAnW2F0dHIuYXJpYS1zb3J0XSc6ICdhcmlhU29ydCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsckRhdGFncmlkQ29sdW1uPFQgPSBhbnk+IGV4dGVuZHMgRGF0YWdyaWRGaWx0ZXJSZWdpc3RyYXI8VCwgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4+XG4gIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zb3J0OiBTb3J0PFQ+LCBmaWx0ZXJzOiBGaWx0ZXJzUHJvdmlkZXI8VD4sIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoZmlsdGVycyk7XG4gICAgdGhpcy5fc29ydFN1YnNjcmlwdGlvbiA9IF9zb3J0LmNoYW5nZS5zdWJzY3JpYmUoc29ydCA9PiB7XG4gICAgICAvLyBXZSdyZSBvbmx5IGxpc3RlbmluZyB0byBtYWtlIHN1cmUgd2UgZW1pdCBhbiBldmVudCB3aGVuIHRoZSBjb2x1bW4gZ29lcyBmcm9tIHNvcnRlZCB0byB1bnNvcnRlZFxuICAgICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRCAmJiBzb3J0LmNvbXBhcmF0b3IgIT09IHRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLl9zb3J0T3JkZXIpO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIFNUQVJUXG4gICAgICBpZiAodGhpcy5zb3J0ZWQgJiYgc29ydC5jb21wYXJhdG9yICE9PSB0aGlzLl9zb3J0QnkpIHtcbiAgICAgICAgdGhpcy5fc29ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICAgIH0pO1xuXG4gICAgdGhpcy5jb2x1bW5JZCA9ICdkZy1jb2wtJyArIG5iQ291bnQudG9TdHJpbmcoKTsgLy8gQXBwcm94aW1hdGUgYSBHVUlEXG4gICAgbmJDb3VudCsrO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm9wZXJ0eSBjb2x1bW5JZFxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBDbHJEYXRhZ3JpZENvbHVtbiBjbGFzcyB2YXJpYWJsZSB0aGF0IGhvbGRzIHRoZSBudW1iZXIgb2YgQ2xyRGF0YWdyaWRDb2x1bW4gaW5zdGFuY2VzIGZvciBhIERhdGFncmlkLlxuICAgKiBJdCBpcyB1c2VkIHRvIGdlbmVyYXRlIGEgdW5pcXVlIGlkIGZvciB0aGUgQ2xyRGF0YWdyaWRDb2x1bW4gaW5zdGFuY2UuXG4gICAqXG4gICAqL1xuICBwdWJsaWMgY29sdW1uSWQ6IHN0cmluZztcblxuICAvKipcbiAgICogQHByb3BlcnR5IGhpZGRlblxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBwcm9wZXJ0eSB0aGF0IGFsbG93cyB0aGUgY29sdW1uIHRvIGJlIGhpZGRlbiAvIHNob3duIHdpdGggY3NzXG4gICAqIE5vdGUgdGhlIGRlZmF1bHQgYWxsb3dzIHRoZSBDbHJEYXRhZ3JpZENvbHVtbiB0byBoYXZlIGFuICpuZ0lmIG9uIGl0LiAoRUhDQUlXQyAtIHdpbGwgb2NjdXIgaWYgaXRzIG5vdFxuICAgKiBpbml0aWFsaXplZClcbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICpcbiAgICovXG4gIHB1YmxpYyBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuaGlkZWFibGUgJiYgdGhpcy5oaWRlYWJsZS5oaWRkZW47XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzb3J0IHNlcnZpY2UgY2hhbmdlc1xuICAgKi9cbiAgcHJpdmF0ZSBfc29ydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NvcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qXG4gICAgICogV2hhdCB0eXBlIGlzIHRoaXMgY29sdW1uPyAgVGhpcyBkZWZhdWx0cyB0byBTVFJJTkcsIGJ1dCBjYW4gYWxzbyBiZVxuICAgICAqIHNldCB0byBOVU1CRVIuICBVbnN1cHBvcnRlZCB0eXBlcyBkZWZhdWx0IHRvIFNUUklORy4gVXNlcnMgY2FuIHNldCBpdFxuICAgICAqIHZpYSB0aGUgW2NsckRnQ29sVHlwZV0gaW5wdXQgYnkgc2V0dGluZyBpdCB0byAnc3RyaW5nJyBvciAnbnVtYmVyJy5cbiAgICAgKi9cblxuICBASW5wdXQoJ2NsckRnQ29sVHlwZScpIGNvbFR5cGU6ICdzdHJpbmcnIHwgJ251bWJlcicgPSAnc3RyaW5nJztcblxuICAvKlxuICAgICAqIFNpbXBsZSBvYmplY3QgcHJvcGVydHkgc2hvcnRjdXQsIGFjdGl2YXRlcyBib3RoIHNvcnRpbmcgYW5kIGZpbHRlcmluZ1xuICAgICAqIGJhc2VkIG9uIG5hdGl2ZSBjb21wYXJpc29uIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIGl0ZW1zLlxuICAgICAqL1xuICBwcml2YXRlIF9maWVsZDogc3RyaW5nO1xuICBwdWJsaWMgZ2V0IGZpZWxkKCkge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIEBJbnB1dCgnY2xyRGdGaWVsZCcpXG4gIHB1YmxpYyBzZXQgZmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbUZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy5jb2xUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKG5ldyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlcihmaWVsZCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldEZpbHRlcihuZXcgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKG5ldyBEYXRhZ3JpZFByb3BlcnR5U3RyaW5nRmlsdGVyKGZpZWxkKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX3NvcnRCeSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBuZXcgRGF0YWdyaWRQcm9wZXJ0eUNvbXBhcmF0b3IoZmllbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbHJEYXRhZ3JpZENvbXBhcmF0b3JJbnRlcmZhY2UgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgY29sdW1uXG4gICAqL1xuXG4gIHByaXZhdGUgX3NvcnRCeTogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+O1xuXG4gIHB1YmxpYyBnZXQgc29ydEJ5KCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydEJ5JylcbiAgcHVibGljIHNldCBzb3J0QnkoY29tcGFyYXRvcjogQ2xyRGF0YWdyaWRDb21wYXJhdG9ySW50ZXJmYWNlPFQ+IHwgc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBjb21wYXJhdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKGNvbXBhcmF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29tcGFyYXRvcikge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5fc29ydEJ5ID0gbmV3IERhdGFncmlkUHJvcGVydHlDb21wYXJhdG9yKHRoaXMuX2ZpZWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fc29ydEJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIHNvcnRhYmxlXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvcnRhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuX3NvcnRCeTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWQ6IHRvIGJlIHJlbW92ZWQgLSBTVEFSVFxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBjb2x1bW4gaXMgY3VycmVudGx5IHNvcnRlZFxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBzb29uLCBpbiBmYXZvciBvZiB0aGUgc29ydE9yZGVyIG1lY2hhbmlzbVxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkID0gZmFsc2U7XG4gIHB1YmxpYyBnZXQgc29ydGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIEBJbnB1dCgnY2xyRGdTb3J0ZWQnKVxuICBwdWJsaWMgc2V0IHNvcnRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdmFsdWUgJiYgdGhpcy5zb3J0ZWQpIHtcbiAgICAgIHRoaXMuX3NvcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc29ydC5jbGVhcigpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgIXRoaXMuc29ydGVkKSB7XG4gICAgICB0aGlzLnNvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVGhpcyB3aWxsIGJlIHJlbW92ZWQgc29vbiwgaW4gZmF2b3Igb2YgdGhlIHNvcnRPcmRlciBtZWNoYW5pc21cbiAgICovXG4gIEBPdXRwdXQoJ2NsckRnU29ydGVkQ2hhbmdlJykgcHVibGljIHNvcnRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gRU5EXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBob3cgdGhlIGNvbHVtbiBpcyBjdXJyZW50bHkgc29ydGVkXG4gICAqL1xuICBwcml2YXRlIF9zb3J0T3JkZXI6IENsckRhdGFncmlkU29ydE9yZGVyID0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuVU5TT1JURUQ7XG4gIHB1YmxpYyBnZXQgc29ydE9yZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3J0T3JkZXI7XG4gIH1cblxuICBASW5wdXQoJ2NsckRnU29ydE9yZGVyJylcbiAgcHVibGljIHNldCBzb3J0T3JkZXIodmFsdWU6IENsckRhdGFncmlkU29ydE9yZGVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBvbmx5IGlmIHRoZSBpbmNvbWluZyBvcmRlciBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBvbmVcbiAgICBpZiAodGhpcy5fc29ydE9yZGVyID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIC8vIHRoZSBVbnNvcnRlZCBjYXNlIGhhcHBlbnMgd2hlbiB0aGUgY3VycmVudCBzdGF0ZSBpcyBlaXRoZXIgQXNjIG9yIERlc2NcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEOlxuICAgICAgICB0aGlzLl9zb3J0LmNsZWFyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M6XG4gICAgICAgIHRoaXMuc29ydChmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDOlxuICAgICAgICB0aGlzLnNvcnQodHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgYXJpYVNvcnQoKSB7XG4gICAgc3dpdGNoICh0aGlzLl9zb3J0T3JkZXIpIHtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICBjYXNlIENsckRhdGFncmlkU29ydE9yZGVyLlVOU09SVEVEOlxuICAgICAgICByZXR1cm4gJ25vbmUnO1xuICAgICAgY2FzZSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5BU0M6XG4gICAgICAgIHJldHVybiAnYXNjZW5kaW5nJztcbiAgICAgIGNhc2UgQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQzpcbiAgICAgICAgcmV0dXJuICdkZXNjZW5kaW5nJztcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJEZ1NvcnRPcmRlckNoYW5nZScpIHB1YmxpYyBzb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsckRhdGFncmlkU29ydE9yZGVyPigpO1xuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgZGF0YWdyaWQgYmFzZWQgb24gdGhpcyBjb2x1bW5cbiAgICovXG4gIHB1YmxpYyBzb3J0KHJldmVyc2U/OiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLnNvcnRhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc29ydC50b2dnbGUodGhpcy5fc29ydEJ5LCByZXZlcnNlKTtcblxuICAgIC8vIHNldHRpbmcgdGhlIHByaXZhdGUgdmFyaWFibGUgdG8gbm90IHJldHJpZ2dlciB0aGUgc2V0dGVyIGxvZ2ljXG4gICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5fc29ydC5yZXZlcnNlID8gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuREVTQyA6IENsckRhdGFncmlkU29ydE9yZGVyLkFTQztcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZS5lbWl0KHRoaXMuX3NvcnRPcmRlcik7XG5cbiAgICAvLyBkZXByZWNhdGVkOiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICB0aGlzLl9zb3J0ZWQgPSB0cnVlO1xuICAgIHRoaXMuc29ydGVkQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgLy8gZGVwcmVjYXRlZDogdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFzYycpXG4gIHB1YmxpYyBnZXQgYXNjKCkge1xuICAgIC8vIGRlcHJlY2F0ZWQ6IGlmIGNvbmRpdGlvbiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ydE9yZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydGVkICYmICF0aGlzLl9zb3J0LnJldmVyc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNvcnRPcmRlciA9PT0gQ2xyRGF0YWdyaWRTb3J0T3JkZXIuQVNDO1xuICAgIH1cbiAgICAvLyBkZXByZWNhdGVkOiBpZiBjb25kaXRpb24gdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgY29sdW1uIGlzIGN1cnJlbnRseSBzb3J0ZWQgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kZXNjJylcbiAgcHVibGljIGdldCBkZXNjKCkge1xuICAgIC8vIGRlcHJlY2F0ZWQ6IGlmIGNvbmRpdGlvbiB0byBiZSByZW1vdmVkIC0gU1RBUlRcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ydE9yZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydGVkICYmIHRoaXMuX3NvcnQucmV2ZXJzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydE9yZGVyID09PSBDbHJEYXRhZ3JpZFNvcnRPcmRlci5ERVNDO1xuICAgIH1cbiAgICAvLyBkZXByZWNhdGVkOiBpZiBjb25kaXRpb24gdG8gYmUgcmVtb3ZlZCAtIEVORFxuICB9XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGZpbHRlciBmb3IgdGhpcyBjb2x1bW4gdGhhdCBjYW4gYmUgcHJvdmlkZWQgaW4gdGhlIHByb2plY3RlZCBjb250ZW50XG4gICAqL1xuICBwdWJsaWMgY3VzdG9tRmlsdGVyID0gZmFsc2U7XG5cbiAgQENvbnRlbnRDaGlsZChDdXN0b21GaWx0ZXIpXG4gIHB1YmxpYyBzZXQgcHJvamVjdGVkRmlsdGVyKGN1c3RvbTogYW55KSB7XG4gICAgaWYgKGN1c3RvbSkge1xuICAgICAgdGhpcy5kZWxldGVGaWx0ZXIoKTtcbiAgICAgIHRoaXMuY3VzdG9tRmlsdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZpbHRlclZhbHVlKCkge1xuICAgIGlmICh0aGlzLmZpbHRlciBpbnN0YW5jZW9mIERhdGFncmlkU3RyaW5nRmlsdGVySW1wbCB8fCB0aGlzLmZpbHRlciBpbnN0YW5jZW9mIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlci52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2NsckZpbHRlclZhbHVlJylcbiAgcHVibGljIHNldCB1cGRhdGVGaWx0ZXJWYWx1ZShuZXdWYWx1ZTogc3RyaW5nIHwgW251bWJlciwgbnVtYmVyXSkge1xuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsKSB7XG4gICAgICBpZiAoIW5ld1ZhbHVlIHx8IHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmV3VmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdGhpcy5maWx0ZXIudmFsdWUpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgaWYgKCFuZXdWYWx1ZSB8fCAhKG5ld1ZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gW251bGwsIG51bGxdO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1ZhbHVlLmxlbmd0aCA9PT0gMiAmJiAobmV3VmFsdWVbMF0gIT09IHRoaXMuZmlsdGVyLnZhbHVlWzBdIHx8IG5ld1ZhbHVlWzFdICE9PSB0aGlzLmZpbHRlci52YWx1ZVsxXSkpIHtcbiAgICAgICAgdGhpcy5maWx0ZXIudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGZpbHRlclZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcgfCBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWRTdHJpbmdGaWx0ZXJJbXBsIHx8IHRoaXMuZmlsdGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgdGhpcy51cGRhdGVGaWx0ZXJWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5maWx0ZXJWYWx1ZUNoYW5nZS5lbWl0KHRoaXMuZmlsdGVyLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdjbHJGaWx0ZXJWYWx1ZUNoYW5nZScpIGZpbHRlclZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKioqKioqKioqKlxuICAgKlxuICAgKiBAcHJvcGVydHkgaGlkZWFibGVcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFdoZW4gYSBjb2x1bW4gaXMgaGlkZWFibGUgdGhpcyBpcyBkZWZpbmVkIHdpdGggYW4gaW5zdGFuY2Ugb2YgRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsLlxuICAgKiBXaGVuIGl0cyBub3QgaGlkZWFibGUgc2hvdWxkIGJlIHVuZGVmaW5lZC5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBoaWRlYWJsZTogRGF0YWdyaWRIaWRlYWJsZUNvbHVtbk1vZGVsO1xuXG4gIHByaXZhdGUgd3JhcHBlZEluamVjdG9yOiBJbmplY3RvcjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLndyYXBwZWRJbmplY3RvciA9IG5ldyBIb3N0V3JhcHBlcihXcmFwcGVkQ29sdW1uLCB0aGlzLnZjcik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IF92aWV3KCkge1xuICAgIHJldHVybiB0aGlzLndyYXBwZWRJbmplY3Rvci5nZXQoV3JhcHBlZENvbHVtbiwgdGhpcy52Y3IpLmNvbHVtblZpZXc7XG4gIH1cbn1cbiJdfQ==