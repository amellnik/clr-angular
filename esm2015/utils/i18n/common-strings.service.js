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
}
export function commonStringsFactory(existing) {
    const defaults = new ClrCommonStringsService();
    if (existing) {
        return Object.assign({}, defaults, existing);
    }
    return defaults;
}
export const COMMON_STRINGS_PROVIDER = {
    useFactory: commonStringsFactory,
    // We have a circular dependency for now, we can address it later once these
    // tree-shakeable providers have proper documentation.
    deps: [[new Optional(), new SkipSelf(), forwardRef(() => ClrCommonStrings)]],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXN0cmluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2kxOG4vY29tbW9uLXN0cmluZ3Muc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQXNCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU5RCwyRkFBMkY7QUFDM0YsMENBQTBDO0FBQzFDLCtFQUErRTtBQUMvRSxNQUFNLE9BQU8sdUJBQXVCO0lBQXBDO1FBQ0UsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxXQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFdBQU0sR0FBRyxRQUFRLENBQUM7UUFDbEIsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLFNBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxZQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDNUIsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFlBQU8sR0FBRyxTQUFTLENBQUM7UUFDcEIsWUFBTyxHQUFHLFNBQVMsQ0FBQztRQUNwQixXQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxtQkFBbUIsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLHNCQUFzQixDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsY0FBYyxDQUFDO1FBQzdCLGVBQVUsR0FBRyxhQUFhLENBQUM7UUFDM0IsY0FBUyxHQUFHLFlBQVksQ0FBQztRQUN6QixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFDdkIsaUJBQVksR0FBRyxlQUFlLENBQUM7UUFDL0IsZ0JBQVcsR0FBRyxjQUFjLENBQUM7UUFDN0IsZUFBVSxHQUFHLGFBQWEsQ0FBQztRQUMzQixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsNEJBQTRCLENBQUM7UUFDakQsb0JBQWUsR0FBRyxzQkFBc0IsQ0FBQztJQUMzQyxDQUFDO0NBQUE7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsUUFBMkI7SUFDOUQsTUFBTSxRQUFRLEdBQUcsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO0lBQy9DLElBQUksUUFBUSxFQUFFO1FBQ1oseUJBQVksUUFBUSxFQUFLLFFBQVEsRUFBRztLQUNyQztJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBdUI7SUFDekQsVUFBVSxFQUFFLG9CQUFvQjtJQUNoQyw0RUFBNEU7SUFDNUUsc0RBQXNEO0lBQ3RELElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Q0FDN0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IFNraXBTZWxmLCBPcHRpb25hbCwgSW5qZWN0YWJsZVByb3ZpZGVyLCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENsckNvbW1vblN0cmluZ3MgfSBmcm9tICcuL2NvbW1vbi1zdHJpbmdzLmludGVyZmFjZSc7XG5cbi8vIEBUT0RPIFB1dCB0aGUgUmVxdWlyZWQgdHlwZSBiYWNrIGluIHdoZW4gb3VyIG1pbmltdW1seSBzdXBwb3J0ZWQgdmVyc2lvbiBvZiBBbmd1bGFyIHVzZXNcbi8vIFRTIDIuOCBvciBncmVhdGVyIChzaG91bGQgYmUgQW5ndWxhciA3KVxuLy8gZXhwb3J0IGNsYXNzIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIGltcGxlbWVudHMgUmVxdWlyZWQ8Q2xyQ29tbW9uU3RyaW5ncz4ge1xuZXhwb3J0IGNsYXNzIENsckNvbW1vblN0cmluZ3NTZXJ2aWNlIGltcGxlbWVudHMgQ2xyQ29tbW9uU3RyaW5ncyB7XG4gIG9wZW4gPSAnT3Blbic7XG4gIGNsb3NlID0gJ0Nsb3NlJztcbiAgc2hvdyA9ICdTaG93JztcbiAgaGlkZSA9ICdIaWRlJztcbiAgZXhwYW5kID0gJ0V4cGFuZCc7XG4gIGNvbGxhcHNlID0gJ0NvbGxhcHNlJztcbiAgbW9yZSA9ICdNb3JlJztcbiAgc2VsZWN0ID0gJ1NlbGVjdCc7XG4gIHNlbGVjdEFsbCA9ICdTZWxlY3QgQWxsJztcbiAgcHJldmlvdXMgPSAnUHJldmlvdXMnO1xuICBuZXh0ID0gJ05leHQnO1xuICBjdXJyZW50ID0gJ0p1bXAgdG8gY3VycmVudCc7XG4gIGluZm8gPSAnSW5mbyc7XG4gIHN1Y2Nlc3MgPSAnU3VjY2Vzcyc7XG4gIHdhcm5pbmcgPSAnV2FybmluZyc7XG4gIGRhbmdlciA9ICdFcnJvcic7XG4gIHJvd0FjdGlvbnMgPSAnQXZhaWxhYmxlIGFjdGlvbnMnO1xuICBwaWNrQ29sdW1ucyA9ICdTaG93IG9yIGhpZGUgY29sdW1ucyc7XG4gIHNob3dDb2x1bW5zID0gJ1Nob3cgQ29sdW1ucyc7XG4gIHNvcnRDb2x1bW4gPSAnU29ydCBDb2x1bW4nO1xuICBmaXJzdFBhZ2UgPSAnRmlyc3QgUGFnZSc7XG4gIGxhc3RQYWdlID0gJ0xhc3QgUGFnZSc7XG4gIG5leHRQYWdlID0gJ05leHQgUGFnZSc7XG4gIHByZXZpb3VzUGFnZSA9ICdQcmV2aW91cyBQYWdlJztcbiAgY3VycmVudFBhZ2UgPSAnQ3VycmVudCBQYWdlJztcbiAgdG90YWxQYWdlcyA9ICdUb3RhbCBQYWdlcyc7XG4gIG1pblZhbHVlID0gJ01pbiB2YWx1ZSc7XG4gIG1heFZhbHVlID0gJ01heCB2YWx1ZSc7XG4gIG1vZGFsQ29udGVudFN0YXJ0ID0gJ0JlZ2lubmluZyBvZiBNb2RhbCBDb250ZW50JztcbiAgbW9kYWxDb250ZW50RW5kID0gJ0VuZCBvZiBNb2RhbCBDb250ZW50Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vblN0cmluZ3NGYWN0b3J5KGV4aXN0aW5nPzogQ2xyQ29tbW9uU3RyaW5ncyk6IENsckNvbW1vblN0cmluZ3Mge1xuICBjb25zdCBkZWZhdWx0cyA9IG5ldyBDbHJDb21tb25TdHJpbmdzU2VydmljZSgpO1xuICBpZiAoZXhpc3RpbmcpIHtcbiAgICByZXR1cm4geyAuLi5kZWZhdWx0cywgLi4uZXhpc3RpbmcgfTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdHM7XG59XG5cbmV4cG9ydCBjb25zdCBDT01NT05fU1RSSU5HU19QUk9WSURFUjogSW5qZWN0YWJsZVByb3ZpZGVyID0ge1xuICB1c2VGYWN0b3J5OiBjb21tb25TdHJpbmdzRmFjdG9yeSxcbiAgLy8gV2UgaGF2ZSBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgZm9yIG5vdywgd2UgY2FuIGFkZHJlc3MgaXQgbGF0ZXIgb25jZSB0aGVzZVxuICAvLyB0cmVlLXNoYWtlYWJsZSBwcm92aWRlcnMgaGF2ZSBwcm9wZXIgZG9jdW1lbnRhdGlvbi5cbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIGZvcndhcmRSZWYoKCkgPT4gQ2xyQ29tbW9uU3RyaW5ncyldXSxcbn07XG4iXX0=