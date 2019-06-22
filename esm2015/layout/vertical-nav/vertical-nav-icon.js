import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive } from '@angular/core';
import { VerticalNavIconService } from './providers/vertical-nav-icon.service';
let ClrVerticalNavIcon = class ClrVerticalNavIcon {
    constructor(_verticalNavIconService) {
        this._verticalNavIconService = _verticalNavIconService;
        this._verticalNavIconService.registerIcon();
    }
    ngOnDestroy() {
        this._verticalNavIconService.unregisterIcon();
    }
};
ClrVerticalNavIcon = tslib_1.__decorate([
    Directive({ selector: '[clrVerticalNavIcon]', host: { class: 'nav-icon' } }),
    tslib_1.__metadata("design:paramtypes", [VerticalNavIconService])
], ClrVerticalNavIcon);
export { ClrVerticalNavIcon };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwtbmF2LWljb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvdmVydGljYWwtbmF2L3ZlcnRpY2FsLW5hdi1pY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUcvRSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUM3QixZQUFvQix1QkFBK0M7UUFBL0MsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUNqRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQztDQUNGLENBQUE7QUFSWSxrQkFBa0I7SUFEOUIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDOzZDQUU5QixzQkFBc0I7R0FEeEQsa0JBQWtCLENBUTlCO1NBUlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZlcnRpY2FsTmF2SWNvblNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVycy92ZXJ0aWNhbC1uYXYtaWNvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsclZlcnRpY2FsTmF2SWNvbl0nLCBob3N0OiB7IGNsYXNzOiAnbmF2LWljb24nIH0gfSlcbmV4cG9ydCBjbGFzcyBDbHJWZXJ0aWNhbE5hdkljb24gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92ZXJ0aWNhbE5hdkljb25TZXJ2aWNlOiBWZXJ0aWNhbE5hdkljb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5fdmVydGljYWxOYXZJY29uU2VydmljZS5yZWdpc3Rlckljb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3ZlcnRpY2FsTmF2SWNvblNlcnZpY2UudW5yZWdpc3Rlckljb24oKTtcbiAgfVxufVxuIl19