/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { SkipSelf, Optional, forwardRef } from '@angular/core';
import { ClrCommonStrings } from './common-strings.interface';
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
export class ClrCommonStringsService {
    constructor() {
        this.open = 'Open';
        this.close = 'Close';
        this.show = 'Show';
        this.hide = 'Hide';
        this.expand = 'Expand';
        this.collapse = 'Collapse';
        this.more = 'More';
        this.select = 'Select';
        this.selectAll = 'Select All';
        this.previous = 'Previous';
        this.next = 'Next';
        this.current = 'Jump to current';
        this.info = 'Info';
        this.success = 'Success';
        this.warning = 'Warning';
        this.danger = 'Error';
        this.rowActions = 'Available actions';
        this.pickColumns = 'Show or hide columns';
        this.min = 'Min';
        this.max = 'Max';
    }
}
if (false) {
    /** @type {?} */
    ClrCommonStringsService.prototype.open;
    /** @type {?} */
    ClrCommonStringsService.prototype.close;
    /** @type {?} */
    ClrCommonStringsService.prototype.show;
    /** @type {?} */
    ClrCommonStringsService.prototype.hide;
    /** @type {?} */
    ClrCommonStringsService.prototype.expand;
    /** @type {?} */
    ClrCommonStringsService.prototype.collapse;
    /** @type {?} */
    ClrCommonStringsService.prototype.more;
    /** @type {?} */
    ClrCommonStringsService.prototype.select;
    /** @type {?} */
    ClrCommonStringsService.prototype.selectAll;
    /** @type {?} */
    ClrCommonStringsService.prototype.previous;
    /** @type {?} */
    ClrCommonStringsService.prototype.next;
    /** @type {?} */
    ClrCommonStringsService.prototype.current;
    /** @type {?} */
    ClrCommonStringsService.prototype.info;
    /** @type {?} */
    ClrCommonStringsService.prototype.success;
    /** @type {?} */
    ClrCommonStringsService.prototype.warning;
    /** @type {?} */
    ClrCommonStringsService.prototype.danger;
    /** @type {?} */
    ClrCommonStringsService.prototype.rowActions;
    /** @type {?} */
    ClrCommonStringsService.prototype.pickColumns;
    /** @type {?} */
    ClrCommonStringsService.prototype.min;
    /** @type {?} */
    ClrCommonStringsService.prototype.max;
}
/**
 * @param {?=} existing
 * @return {?}
 */
export function commonStringsFactory(existing) {
    /** @type {?} */
    const defaults = new ClrCommonStringsService();
    if (existing) {
        return Object.assign({}, defaults, existing);
    }
    return defaults;
}
/** @type {?} */
export const COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef(() => ClrCommonStrings)]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFLQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBc0IsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBSzlELE1BQU0sT0FBTyx1QkFBdUI7SUFBcEM7UUFDRSxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFDbEIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixjQUFTLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFlBQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUM1QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUNwQixZQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLFdBQU0sR0FBRyxPQUFPLENBQUM7UUFDakIsZUFBVSxHQUFHLG1CQUFtQixDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsc0JBQXNCLENBQUM7UUFDckMsUUFBRyxHQUFHLEtBQUssQ0FBQztRQUNaLFFBQUcsR0FBRyxLQUFLLENBQUM7SUFDZCxDQUFDO0NBQUE7OztJQXBCQyx1Q0FBYzs7SUFDZCx3Q0FBZ0I7O0lBQ2hCLHVDQUFjOztJQUNkLHVDQUFjOztJQUNkLHlDQUFrQjs7SUFDbEIsMkNBQXNCOztJQUN0Qix1Q0FBYzs7SUFDZCx5Q0FBa0I7O0lBQ2xCLDRDQUF5Qjs7SUFDekIsMkNBQXNCOztJQUN0Qix1Q0FBYzs7SUFDZCwwQ0FBNEI7O0lBQzVCLHVDQUFjOztJQUNkLDBDQUFvQjs7SUFDcEIsMENBQW9COztJQUNwQix5Q0FBaUI7O0lBQ2pCLDZDQUFpQzs7SUFDakMsOENBQXFDOztJQUNyQyxzQ0FBWTs7SUFDWixzQ0FBWTs7Ozs7O0FBR2QsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFFBQTJCOztVQUN4RCxRQUFRLEdBQUcsSUFBSSx1QkFBdUIsRUFBRTtJQUM5QyxJQUFJLFFBQVEsRUFBRTtRQUNaLHlCQUFZLFFBQVEsRUFBSyxRQUFRLEVBQUc7S0FDckM7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOztBQUVELE1BQU0sT0FBTyx1QkFBdUIsR0FBdUI7SUFDekQsVUFBVSxFQUFFLG9CQUFvQjs7O0lBR2hDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Q0FDN0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTggVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBTa2lwU2VsZiwgT3B0aW9uYWwsIEluamVjdGFibGVQcm92aWRlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG4vLyBAVE9ETyBQdXQgdGhlIFJlcXVpcmVkIHR5cGUgYmFjayBpbiB3aGVuIG91ciBtaW5pbXVtbHkgc3VwcG9ydGVkIHZlcnNpb24gb2YgQW5ndWxhciB1c2VzXG4vLyBUUyAyLjggb3IgZ3JlYXRlciAoc2hvdWxkIGJlIEFuZ3VsYXIgNylcbi8vIGV4cG9ydCBjbGFzcyBDbHJDb21tb25TdHJpbmdzU2VydmljZSBpbXBsZW1lbnRzIFJlcXVpcmVkPENsckNvbW1vblN0cmluZ3M+IHtcbmV4cG9ydCBjbGFzcyBDbHJDb21tb25TdHJpbmdzU2VydmljZSBpbXBsZW1lbnRzIENsckNvbW1vblN0cmluZ3Mge1xuICBvcGVuID0gJ09wZW4nO1xuICBjbG9zZSA9ICdDbG9zZSc7XG4gIHNob3cgPSAnU2hvdyc7XG4gIGhpZGUgPSAnSGlkZSc7XG4gIGV4cGFuZCA9ICdFeHBhbmQnO1xuICBjb2xsYXBzZSA9ICdDb2xsYXBzZSc7XG4gIG1vcmUgPSAnTW9yZSc7XG4gIHNlbGVjdCA9ICdTZWxlY3QnO1xuICBzZWxlY3RBbGwgPSAnU2VsZWN0IEFsbCc7XG4gIHByZXZpb3VzID0gJ1ByZXZpb3VzJztcbiAgbmV4dCA9ICdOZXh0JztcbiAgY3VycmVudCA9ICdKdW1wIHRvIGN1cnJlbnQnO1xuICBpbmZvID0gJ0luZm8nO1xuICBzdWNjZXNzID0gJ1N1Y2Nlc3MnO1xuICB3YXJuaW5nID0gJ1dhcm5pbmcnO1xuICBkYW5nZXIgPSAnRXJyb3InO1xuICByb3dBY3Rpb25zID0gJ0F2YWlsYWJsZSBhY3Rpb25zJztcbiAgcGlja0NvbHVtbnMgPSAnU2hvdyBvciBoaWRlIGNvbHVtbnMnO1xuICBtaW4gPSAnTWluJztcbiAgbWF4ID0gJ01heCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25TdHJpbmdzRmFjdG9yeShleGlzdGluZz86IENsckNvbW1vblN0cmluZ3MpOiBDbHJDb21tb25TdHJpbmdzIHtcbiAgY29uc3QgZGVmYXVsdHMgPSBuZXcgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UoKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgcmV0dXJuIHsgLi4uZGVmYXVsdHMsIC4uLmV4aXN0aW5nIH07XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufVxuXG5leHBvcnQgY29uc3QgQ09NTU9OX1NUUklOR1NfUFJPVklERVI6IEluamVjdGFibGVQcm92aWRlciA9IHtcbiAgdXNlRmFjdG9yeTogY29tbW9uU3RyaW5nc0ZhY3RvcnksXG4gIC8vIFdlIGhhdmUgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGZvciBub3csIHdlIGNhbiBhZGRyZXNzIGl0IGxhdGVyIG9uY2UgdGhlc2VcbiAgLy8gdHJlZS1zaGFrZWFibGUgcHJvdmlkZXJzIGhhdmUgcHJvcGVyIGRvY3VtZW50YXRpb24uXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBmb3J3YXJkUmVmKCgpID0+IENsckNvbW1vblN0cmluZ3MpXV0sXG59O1xuIl19