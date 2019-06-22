import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ClrDropdown } from './dropdown';
import { BASIC_FOCUSABLE_ITEM_PROVIDER } from '../../utils/focus/focusable-item/basic-focusable-item.service';
import { FocusableItem } from '../../utils/focus/focusable-item/focusable-item';
import { RootDropdownService } from './providers/dropdown.service';
let ClrDropdownItem = class ClrDropdownItem {
    constructor(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
    }
    set disabled(value) {
        // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
        this.focusableItem.disabled = !!value || value === '';
    }
    get disabled() {
        return this.focusableItem.disabled;
    }
    ngAfterViewInit() {
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', () => this.onDropdownItemClick());
    }
    onDropdownItemClick() {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    }
    ngOnDestroy() {
        this.unlisten();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], ClrDropdownItem.prototype, "disabled", null);
ClrDropdownItem = tslib_1.__decorate([
    Directive({
        selector: '[clrDropdownItem]',
        host: {
            '[class.dropdown-item]': 'true',
            '[attr.role]': '"menuitem"',
            '[attr.aria-disabled]': 'disabled',
        },
        providers: [BASIC_FOCUSABLE_ITEM_PROVIDER],
    }),
    tslib_1.__metadata("design:paramtypes", [ClrDropdown,
        ElementRef,
        RootDropdownService,
        Renderer2,
        FocusableItem])
], ClrDropdownItem);
export { ClrDropdownItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBV25FLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDVSxRQUFxQixFQUNyQixFQUEyQixFQUMzQixnQkFBcUMsRUFDckMsUUFBbUIsRUFDbkIsYUFBNEI7UUFKNUIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUNyQixPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXFCO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDbkMsQ0FBQztJQUtKLElBQUksUUFBUSxDQUFDLEtBQXVCO1FBQ2xDLGtIQUFrSDtRQUNsSCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDekYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGLENBQUE7QUF0QkM7SUFEQyxLQUFLLEVBQUU7OzsrQ0FJUDtBQWZVLGVBQWU7SUFUM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3QixJQUFJLEVBQUU7WUFDSix1QkFBdUIsRUFBRSxNQUFNO1lBQy9CLGFBQWEsRUFBRSxZQUFZO1lBQzNCLHNCQUFzQixFQUFFLFVBQVU7U0FDbkM7UUFDRCxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztLQUMzQyxDQUFDOzZDQUdvQixXQUFXO1FBQ2pCLFVBQVU7UUFDSSxtQkFBbUI7UUFDM0IsU0FBUztRQUNKLGFBQWE7R0FOM0IsZUFBZSxDQWtDM0I7U0FsQ1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDbHJEcm9wZG93biB9IGZyb20gJy4vZHJvcGRvd24nO1xuaW1wb3J0IHsgQkFTSUNfRk9DVVNBQkxFX0lURU1fUFJPVklERVIgfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9iYXNpYy1mb2N1c2FibGUtaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvY3VzYWJsZUl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5pbXBvcnQgeyBSb290RHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi9wcm92aWRlcnMvZHJvcGRvd24uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjbHJEcm9wZG93bkl0ZW1dJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZHJvcGRvd24taXRlbV0nOiAndHJ1ZScsXG4gICAgJ1thdHRyLnJvbGVdJzogJ1wibWVudWl0ZW1cIicsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbQkFTSUNfRk9DVVNBQkxFX0lURU1fUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBDbHJEcm9wZG93bkl0ZW0gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkcm9wZG93bjogQ2xyRHJvcGRvd24sXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfZHJvcGRvd25TZXJ2aWNlOiBSb290RHJvcGRvd25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGZvY3VzYWJsZUl0ZW06IEZvY3VzYWJsZUl0ZW1cbiAgKSB7fVxuXG4gIHByaXZhdGUgdW5saXN0ZW47XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgLy8gRW1wdHkgc3RyaW5nIGF0dHJpYnV0ZSBldmFsdWF0ZXMgdG8gZmFsc2UgYnV0IHNob3VsZCBkaXNhYmxlIHRoZSBpdGVtLCBzbyB3ZSBuZWVkIHRvIGFkZCBhIHNwZWNpYWwgY2FzZSBmb3IgaXQuXG4gICAgdGhpcy5mb2N1c2FibGVJdGVtLmRpc2FibGVkID0gISF2YWx1ZSB8fCB2YWx1ZSA9PT0gJyc7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9jdXNhYmxlSXRlbS5kaXNhYmxlZDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnVubGlzdGVuID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0aGlzLm9uRHJvcGRvd25JdGVtQ2xpY2soKSk7XG4gIH1cblxuICBvbkRyb3Bkb3duSXRlbUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRyb3Bkb3duLmlzTWVudUNsb3NhYmxlICYmICF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICB0aGlzLl9kcm9wZG93blNlcnZpY2UuY2xvc2VNZW51cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudW5saXN0ZW4oKTtcbiAgfVxufVxuIl19