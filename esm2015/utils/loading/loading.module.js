import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrLoading } from './loading';
export const CLR_LOADING_DIRECTIVES = [ClrLoading];
let ClrLoadingModule = class ClrLoadingModule {
};
ClrLoadingModule = tslib_1.__decorate([
    NgModule({ imports: [CommonModule], declarations: [CLR_LOADING_DIRECTIVES], exports: [CLR_LOADING_DIRECTIVES] })
], ClrLoadingModule);
export { ClrLoadingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJ1dGlscy9sb2FkaW5nL2xvYWRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV2QyxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUdoRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUFHLENBQUE7QUFBbkIsZ0JBQWdCO0lBRDVCLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDO0dBQ3BHLGdCQUFnQixDQUFHO1NBQW5CLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJMb2FkaW5nIH0gZnJvbSAnLi9sb2FkaW5nJztcblxuZXhwb3J0IGNvbnN0IENMUl9MT0FESU5HX0RJUkVDVElWRVM6IFR5cGU8YW55PltdID0gW0NsckxvYWRpbmddO1xuXG5ATmdNb2R1bGUoeyBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSwgZGVjbGFyYXRpb25zOiBbQ0xSX0xPQURJTkdfRElSRUNUSVZFU10sIGV4cG9ydHM6IFtDTFJfTE9BRElOR19ESVJFQ1RJVkVTXSB9KVxuZXhwb3J0IGNsYXNzIENsckxvYWRpbmdNb2R1bGUge31cbiJdfQ==