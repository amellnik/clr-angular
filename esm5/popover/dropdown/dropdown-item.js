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
var ClrDropdownItem = /** @class */ (function () {
    function ClrDropdownItem(dropdown, el, _dropdownService, renderer, focusableItem) {
        this.dropdown = dropdown;
        this.el = el;
        this._dropdownService = _dropdownService;
        this.renderer = renderer;
        this.focusableItem = focusableItem;
    }
    Object.defineProperty(ClrDropdownItem.prototype, "disabled", {
        get: function () {
            return this.focusableItem.disabled;
        },
        set: function (value) {
            // Empty string attribute evaluates to false but should disable the item, so we need to add a special case for it.
            this.focusableItem.disabled = !!value || value === '';
        },
        enumerable: true,
        configurable: true
    });
    ClrDropdownItem.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.unlisten = this.renderer.listen(this.el.nativeElement, 'click', function () { return _this.onDropdownItemClick(); });
    };
    ClrDropdownItem.prototype.onDropdownItemClick = function () {
        if (this.dropdown.isMenuClosable && !this.el.nativeElement.classList.contains('disabled')) {
            this._dropdownService.closeMenus();
        }
    };
    ClrDropdownItem.prototype.ngOnDestroy = function () {
        this.unlisten();
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
    return ClrDropdownItem;
}());
export { ClrDropdownItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24taXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInBvcG92ZXIvZHJvcGRvd24vZHJvcGRvd24taXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekMsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDOUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBV25FO0lBQ0UseUJBQ1UsUUFBcUIsRUFDckIsRUFBMkIsRUFDM0IsZ0JBQXFDLEVBQ3JDLFFBQW1CLEVBQ25CLGFBQTRCO1FBSjVCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDckIsT0FBRSxHQUFGLEVBQUUsQ0FBeUI7UUFDM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ25DLENBQUM7SUFLSixzQkFBSSxxQ0FBUTthQUtaO1lBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxDQUFDO2FBUEQsVUFBYSxLQUF1QjtZQUNsQyxrSEFBa0g7WUFDbEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBTUQseUNBQWUsR0FBZjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELDZDQUFtQixHQUFuQjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3pGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFyQkQ7UUFEQyxLQUFLLEVBQUU7OzttREFJUDtJQWZVLGVBQWU7UUFUM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixJQUFJLEVBQUU7Z0JBQ0osdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsYUFBYSxFQUFFLFlBQVk7Z0JBQzNCLHNCQUFzQixFQUFFLFVBQVU7YUFDbkM7WUFDRCxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUMzQyxDQUFDO2lEQUdvQixXQUFXO1lBQ2pCLFVBQVU7WUFDSSxtQkFBbUI7WUFDM0IsU0FBUztZQUNKLGFBQWE7T0FOM0IsZUFBZSxDQWtDM0I7SUFBRCxzQkFBQztDQUFBLEFBbENELElBa0NDO1NBbENZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2xyRHJvcGRvd24gfSBmcm9tICcuL2Ryb3Bkb3duJztcbmltcG9ydCB7IEJBU0lDX0ZPQ1VTQUJMRV9JVEVNX1BST1ZJREVSIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMvZm9jdXNhYmxlLWl0ZW0vYmFzaWMtZm9jdXNhYmxlLWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9jdXMvZm9jdXNhYmxlLWl0ZW0vZm9jdXNhYmxlLWl0ZW0nO1xuaW1wb3J0IHsgUm9vdERyb3Bkb3duU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXJzL2Ryb3Bkb3duLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2xyRHJvcGRvd25JdGVtXScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRyb3Bkb3duLWl0ZW1dJzogJ3RydWUnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdcIm1lbnVpdGVtXCInLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW0JBU0lDX0ZPQ1VTQUJMRV9JVEVNX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xyRHJvcGRvd25JdGVtIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZHJvcGRvd246IENsckRyb3Bkb3duLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX2Ryb3Bkb3duU2VydmljZTogUm9vdERyb3Bkb3duU2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBmb2N1c2FibGVJdGVtOiBGb2N1c2FibGVJdGVtXG4gICkge31cblxuICBwcml2YXRlIHVubGlzdGVuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICAgIC8vIEVtcHR5IHN0cmluZyBhdHRyaWJ1dGUgZXZhbHVhdGVzIHRvIGZhbHNlIGJ1dCBzaG91bGQgZGlzYWJsZSB0aGUgaXRlbSwgc28gd2UgbmVlZCB0byBhZGQgYSBzcGVjaWFsIGNhc2UgZm9yIGl0LlxuICAgIHRoaXMuZm9jdXNhYmxlSXRlbS5kaXNhYmxlZCA9ICEhdmFsdWUgfHwgdmFsdWUgPT09ICcnO1xuICB9XG5cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzYWJsZUl0ZW0uZGlzYWJsZWQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy51bmxpc3RlbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkRyb3Bkb3duSXRlbUNsaWNrKCkpO1xuICB9XG5cbiAgb25Ecm9wZG93bkl0ZW1DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bi5pc01lbnVDbG9zYWJsZSAmJiAhdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkge1xuICAgICAgdGhpcy5fZHJvcGRvd25TZXJ2aWNlLmNsb3NlTWVudXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==