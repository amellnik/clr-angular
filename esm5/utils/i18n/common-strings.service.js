import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { SkipSelf, Optional, forwardRef } from '@angular/core';
import { ClrCommonStrings } from './common-strings.interface';
// @TODO Put the Required type back in when our minimumly supported version of Angular uses
// TS 2.8 or greater (should be Angular 7)
// export class ClrCommonStringsService implements Required<ClrCommonStrings> {
var ClrCommonStringsService = /** @class */ (function () {
    function ClrCommonStringsService() {
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
        this.showColumns = 'Show Columns';
        this.sortColumn = 'Sort Column';
        this.firstPage = 'First Page';
        this.lastPage = 'Last Page';
        this.nextPage = 'Next Page';
        this.previousPage = 'Previous Page';
        this.currentPage = 'Current Page';
        this.totalPages = 'Total Pages';
        this.minValue = 'Min value';
        this.maxValue = 'Max value';
        this.modalContentStart = 'Beginning of Modal Content';
        this.modalContentEnd = 'End of Modal Content';
    }
    return ClrCommonStringsService;
}());
export { ClrCommonStringsService };
export function commonStringsFactory(existing) {
    var defaults = new ClrCommonStringsService();
    if (existing) {
        return tslib_1.__assign({}, defaults, existing);
    }
    return defaults;
}
export var COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef(function () { return ClrCommonStrings; })]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFzQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFOUQsMkZBQTJGO0FBQzNGLDBDQUEwQztBQUMxQywrRUFBK0U7QUFDL0U7SUFBQTtRQUNFLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxVQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ2hCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsV0FBTSxHQUFHLFFBQVEsQ0FBQztRQUNsQixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxXQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsWUFBTyxHQUFHLGlCQUFpQixDQUFDO1FBQzVCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxZQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3BCLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsV0FBTSxHQUFHLE9BQU8sQ0FBQztRQUNqQixlQUFVLEdBQUcsbUJBQW1CLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxzQkFBc0IsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLGNBQWMsQ0FBQztRQUM3QixlQUFVLEdBQUcsYUFBYSxDQUFDO1FBQzNCLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFDekIsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUN2QixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLGlCQUFZLEdBQUcsZUFBZSxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsY0FBYyxDQUFDO1FBQzdCLGVBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUN2QixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLHNCQUFpQixHQUFHLDRCQUE0QixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsc0JBQXNCLENBQUM7SUFDM0MsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQzs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsUUFBMkI7SUFDOUQsSUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO0lBQy9DLElBQUksUUFBUSxFQUFFO1FBQ1osNEJBQVksUUFBUSxFQUFLLFFBQVEsRUFBRztLQUNyQztJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FBdUI7SUFDekQsVUFBVSxFQUFFLG9CQUFvQjtJQUNoQyw0RUFBNEU7SUFDNUUsc0RBQXNEO0lBQ3RELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO0NBQzdFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBTa2lwU2VsZiwgT3B0aW9uYWwsIEluamVjdGFibGVQcm92aWRlciwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJDb21tb25TdHJpbmdzIH0gZnJvbSAnLi9jb21tb24tc3RyaW5ncy5pbnRlcmZhY2UnO1xuXG4vLyBAVE9ETyBQdXQgdGhlIFJlcXVpcmVkIHR5cGUgYmFjayBpbiB3aGVuIG91ciBtaW5pbXVtbHkgc3VwcG9ydGVkIHZlcnNpb24gb2YgQW5ndWxhciB1c2VzXG4vLyBUUyAyLjggb3IgZ3JlYXRlciAoc2hvdWxkIGJlIEFuZ3VsYXIgNylcbi8vIGV4cG9ydCBjbGFzcyBDbHJDb21tb25TdHJpbmdzU2VydmljZSBpbXBsZW1lbnRzIFJlcXVpcmVkPENsckNvbW1vblN0cmluZ3M+IHtcbmV4cG9ydCBjbGFzcyBDbHJDb21tb25TdHJpbmdzU2VydmljZSBpbXBsZW1lbnRzIENsckNvbW1vblN0cmluZ3Mge1xuICBvcGVuID0gJ09wZW4nO1xuICBjbG9zZSA9ICdDbG9zZSc7XG4gIHNob3cgPSAnU2hvdyc7XG4gIGhpZGUgPSAnSGlkZSc7XG4gIGV4cGFuZCA9ICdFeHBhbmQnO1xuICBjb2xsYXBzZSA9ICdDb2xsYXBzZSc7XG4gIG1vcmUgPSAnTW9yZSc7XG4gIHNlbGVjdCA9ICdTZWxlY3QnO1xuICBzZWxlY3RBbGwgPSAnU2VsZWN0IEFsbCc7XG4gIHByZXZpb3VzID0gJ1ByZXZpb3VzJztcbiAgbmV4dCA9ICdOZXh0JztcbiAgY3VycmVudCA9ICdKdW1wIHRvIGN1cnJlbnQnO1xuICBpbmZvID0gJ0luZm8nO1xuICBzdWNjZXNzID0gJ1N1Y2Nlc3MnO1xuICB3YXJuaW5nID0gJ1dhcm5pbmcnO1xuICBkYW5nZXIgPSAnRXJyb3InO1xuICByb3dBY3Rpb25zID0gJ0F2YWlsYWJsZSBhY3Rpb25zJztcbiAgcGlja0NvbHVtbnMgPSAnU2hvdyBvciBoaWRlIGNvbHVtbnMnO1xuICBzaG93Q29sdW1ucyA9ICdTaG93IENvbHVtbnMnO1xuICBzb3J0Q29sdW1uID0gJ1NvcnQgQ29sdW1uJztcbiAgZmlyc3RQYWdlID0gJ0ZpcnN0IFBhZ2UnO1xuICBsYXN0UGFnZSA9ICdMYXN0IFBhZ2UnO1xuICBuZXh0UGFnZSA9ICdOZXh0IFBhZ2UnO1xuICBwcmV2aW91c1BhZ2UgPSAnUHJldmlvdXMgUGFnZSc7XG4gIGN1cnJlbnRQYWdlID0gJ0N1cnJlbnQgUGFnZSc7XG4gIHRvdGFsUGFnZXMgPSAnVG90YWwgUGFnZXMnO1xuICBtaW5WYWx1ZSA9ICdNaW4gdmFsdWUnO1xuICBtYXhWYWx1ZSA9ICdNYXggdmFsdWUnO1xuICBtb2RhbENvbnRlbnRTdGFydCA9ICdCZWdpbm5pbmcgb2YgTW9kYWwgQ29udGVudCc7XG4gIG1vZGFsQ29udGVudEVuZCA9ICdFbmQgb2YgTW9kYWwgQ29udGVudCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tb25TdHJpbmdzRmFjdG9yeShleGlzdGluZz86IENsckNvbW1vblN0cmluZ3MpOiBDbHJDb21tb25TdHJpbmdzIHtcbiAgY29uc3QgZGVmYXVsdHMgPSBuZXcgQ2xyQ29tbW9uU3RyaW5nc1NlcnZpY2UoKTtcbiAgaWYgKGV4aXN0aW5nKSB7XG4gICAgcmV0dXJuIHsgLi4uZGVmYXVsdHMsIC4uLmV4aXN0aW5nIH07XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufVxuXG5leHBvcnQgY29uc3QgQ09NTU9OX1NUUklOR1NfUFJPVklERVI6IEluamVjdGFibGVQcm92aWRlciA9IHtcbiAgdXNlRmFjdG9yeTogY29tbW9uU3RyaW5nc0ZhY3RvcnksXG4gIC8vIFdlIGhhdmUgYSBjaXJjdWxhciBkZXBlbmRlbmN5IGZvciBub3csIHdlIGNhbiBhZGRyZXNzIGl0IGxhdGVyIG9uY2UgdGhlc2VcbiAgLy8gdHJlZS1zaGFrZWFibGUgcHJvdmlkZXJzIGhhdmUgcHJvcGVyIGRvY3VtZW50YXRpb24uXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBmb3J3YXJkUmVmKCgpID0+IENsckNvbW1vblN0cmluZ3MpXV0sXG59O1xuIl19