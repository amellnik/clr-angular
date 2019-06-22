/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID, Renderer2, SkipSelf } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IfOpenService } from '../../../utils/conditional/if-open.service';
import { customFocusableItemProvider } from '../../../utils/focus/focusable-item/custom-focusable-item-provider';
import { UNIQUE_ID } from '../../../utils/id-generator/id-generator.service';
import { ArrowKeyDirection } from '../../../utils/focus/arrow-key-direction.enum';
import { FocusService } from '../../../utils/focus/focus.service';
import { linkParent, linkVertical } from '../../../utils/focus/focusable-item/linkers';
import { wrapObservable } from '../../../utils/focus/wrap-observable';
import { take } from 'rxjs/operators';
var DropdownFocusHandler = /** @class */ (function () {
    function DropdownFocusHandler(id, renderer, parent, ifOpenService, focusService, platformId) {
        this.id = id;
        this.renderer = renderer;
        this.parent = parent;
        this.ifOpenService = ifOpenService;
        this.focusService = focusService;
        this.platformId = platformId;
        this.focusBackOnTrigger = false;
        this.resetChildren();
        this.moveToFirstItemWhenOpen();
        if (!this.parent) {
            this.handleRootFocus();
        }
    }
    /**
     * If the dropdown was opened by clicking on the trigger, we automatically move to the first item
     */
    DropdownFocusHandler.prototype.moveToFirstItemWhenOpen = function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe(function (open) {
            if (open && _this.ifOpenService.originalEvent) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to move focus to first item.
                setTimeout(function () {
                    _this.focusService.moveTo(_this);
                    if (_this.parent) {
                        _this.focusService.move(ArrowKeyDirection.RIGHT);
                    }
                    else {
                        _this.focusService.move(ArrowKeyDirection.DOWN);
                    }
                });
            }
        });
    };
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    DropdownFocusHandler.prototype.handleRootFocus = function () {
        var _this = this;
        this.ifOpenService.openChange.subscribe(function (open) {
            if (open) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to focus it.
                setTimeout(function () {
                    if (_this.container && isPlatformBrowser(_this.platformId)) {
                        _this.container.focus();
                    }
                });
            }
            if (!open) {
                // We reset the state of the focus service both on initialization and when closing.
                _this.focusService.reset(_this);
                // But we only actively focus the trigger when closing, not on initialization.
                if (_this.focusBackOnTrigger) {
                    _this.focus();
                }
            }
            _this.focusBackOnTrigger = open;
        });
    };
    Object.defineProperty(DropdownFocusHandler.prototype, "trigger", {
        get: function () {
            return this._trigger;
        },
        set: function (el) {
            var _this = this;
            this._trigger = el;
            this.renderer.setAttribute(el, 'id', this.id);
            if (this.parent) {
                // The root trigger needs to be in the tab flow, but nested ones are removed like any other dropdown item.
                this.renderer.setAttribute(el, 'tabindex', '-1');
            }
            else {
                // The root trigger is the only one outside of the menu, so it needs to its own key listeners.
                this.renderer.listen(el, 'keydown.arrowup', function (event) { return _this.ifOpenService.toggleWithEvent(event); });
                this.renderer.listen(el, 'keydown.arrowdown', function (event) { return _this.ifOpenService.toggleWithEvent(event); });
                this.focusService.listenToArrowKeys(el);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownFocusHandler.prototype, "container", {
        get: function () {
            return this._container;
        },
        set: function (el) {
            var _this = this;
            this._container = el;
            if (!this.parent) {
                // The root container is the only one we register to the focus service, others do not need focus
                this.focusService.registerContainer(el);
                // For dropdowns, the menu shouldn't actually be in the tab order. We manually focus it when opening.
                this.renderer.setAttribute(el, 'tabindex', '-1');
                // When the user moves focus outside of the menu, we close the dropdown
                this.renderer.listen(el, 'blur', function (event) {
                    // we clear out any existing focus on the items
                    _this.children.pipe(take(1)).subscribe(function (items) { return items.forEach(function (item) { return item.blur(); }); });
                    // focusout + relatedTarget because a simple blur event would trigger
                    // when the user clicks an item inside of the menu, closing the dropdown.
                    if (event.relatedTarget && isPlatformBrowser(_this.platformId)) {
                        if (el.contains(event.relatedTarget) || event.relatedTarget === _this.trigger) {
                            return;
                        }
                    }
                    // We let the user move focus to where the want, we don't force the focus back on the trigger
                    _this.focusBackOnTrigger = false;
                    _this.ifOpenService.open = false;
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    DropdownFocusHandler.prototype.focus = function () {
        if (this.trigger) {
            if (this.parent) {
                this.renderer.addClass(this.trigger, 'clr-focus');
            }
            else if (isPlatformBrowser(this.platformId)) {
                this.trigger.focus();
            }
        }
    };
    DropdownFocusHandler.prototype.blur = function () {
        if (this.trigger) {
            if (this.parent) {
                this.renderer.removeClass(this.trigger, 'clr-focus');
            }
            else if (isPlatformBrowser(this.platformId)) {
                this.trigger.blur();
            }
        }
    };
    DropdownFocusHandler.prototype.activate = function () {
        if (isPlatformBrowser(this.platformId)) {
            this.trigger.click();
        }
    };
    DropdownFocusHandler.prototype.openAndGetChildren = function () {
        var _this = this;
        return wrapObservable(this.children, function () { return (_this.ifOpenService.open = true); });
    };
    DropdownFocusHandler.prototype.closeAndGetThis = function () {
        var _this = this;
        return wrapObservable(of(this), function () { return (_this.ifOpenService.open = false); });
    };
    DropdownFocusHandler.prototype.resetChildren = function () {
        this.children = new ReplaySubject(1);
        if (this.parent) {
            this.right = this.openAndGetChildren().pipe(map(function (all) { return all[0]; }));
        }
        else {
            this.down = this.openAndGetChildren().pipe(map(function (all) { return all[0]; }));
            this.up = this.openAndGetChildren().pipe(map(function (all) { return all[all.length - 1]; }));
        }
    };
    DropdownFocusHandler.prototype.addChildren = function (children) {
        linkVertical(children);
        if (this.parent) {
            linkParent(children, this.closeAndGetThis(), ArrowKeyDirection.LEFT);
        }
        this.children.next(children);
    };
    DropdownFocusHandler = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(UNIQUE_ID)),
        tslib_1.__param(2, SkipSelf()),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(5, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [String, Renderer2,
            DropdownFocusHandler,
            IfOpenService,
            FocusService,
            Object])
    ], DropdownFocusHandler);
    return DropdownFocusHandler;
}());
export { DropdownFocusHandler };
export var DROPDOWN_FOCUS_HANDLER_PROVIDER = customFocusableItemProvider(DropdownFocusHandler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9kcm9wZG93bi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBYyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDakgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEM7SUFDRSw4QkFDNEIsRUFBVSxFQUM1QixRQUFtQixFQUduQixNQUE0QixFQUM1QixhQUE0QixFQUM1QixZQUEwQixFQUNMLFVBQWtCO1FBUHJCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFD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QUFuQixDQUFtQixDQUFDLENBQUMsQ0FBQztTQUMzRTtJQUNILENBQUM7SUFFRCwwQ0FBVyxHQUFYLFVBQVksUUFBeUI7UUFDbkMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQXZLVSxvQkFBb0I7UUFEaEMsVUFBVSxFQUFFO1FBR1IsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRWpCLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7UUFJVixtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7eURBTkYsU0FBUztZQUdYLG9CQUFvQjtZQUNiLGFBQWE7WUFDZCxZQUFZO1lBQ08sTUFBTTtPQVR0QyxvQkFBb0IsQ0F3S2hDO0lBQUQsMkJBQUM7Q0FBQSxBQXhLRCxJQXdLQztTQXhLWSxvQkFBb0I7QUEwS2pDLE1BQU0sQ0FBQyxJQUFNLCtCQUErQixHQUFHLDJCQUEyQixDQUFDLG9CQUFvQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBjdXN0b21Gb2N1c2FibGVJdGVtUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9jdXN0b20tZm9jdXNhYmxlLWl0ZW0tcHJvdmlkZXInO1xuaW1wb3J0IHsgVU5JUVVFX0lEIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IEFycm93S2V5RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZm9jdXMvYXJyb3cta2V5LWRpcmVjdGlvbi5lbnVtJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2ZvY3VzYWJsZS1pdGVtJztcbmltcG9ydCB7IGxpbmtQYXJlbnQsIGxpbmtWZXJ0aWNhbCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2xpbmtlcnMnO1xuaW1wb3J0IHsgd3JhcE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy93cmFwLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duRm9jdXNIYW5kbGVyIGltcGxlbWVudHMgRm9jdXNhYmxlSXRlbSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByaXZhdGUgcGFyZW50OiBEcm9wZG93bkZvY3VzSGFuZGxlcixcbiAgICBwcml2YXRlIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICB0aGlzLnJlc2V0Q2hpbGRyZW4oKTtcbiAgICB0aGlzLm1vdmVUb0ZpcnN0SXRlbVdoZW5PcGVuKCk7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5oYW5kbGVSb290Rm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGRyb3Bkb3duIHdhcyBvcGVuZWQgYnkgY2xpY2tpbmcgb24gdGhlIHRyaWdnZXIsIHdlIGF1dG9tYXRpY2FsbHkgbW92ZSB0byB0aGUgZmlyc3QgaXRlbVxuICAgKi9cbiAgbW92ZVRvRmlyc3RJdGVtV2hlbk9wZW4oKSB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKG9wZW4gPT4ge1xuICAgICAgaWYgKG9wZW4gJiYgdGhpcy5pZk9wZW5TZXJ2aWNlLm9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgLy8gRXZlbiBpZiB3ZSBwcm9wZXJseSB3YWl0ZWQgZm9yIG5nQWZ0ZXJWaWV3SW5pdCwgdGhlIGNvbnRhaW5lciBzdGlsbCB3b3VsZG4ndCBiZSBhdHRhY2hlZCB0byB0aGUgRE9NLlxuICAgICAgICAvLyBTbyBzZXRUaW1lb3V0IGlzIHRoZSBvbmx5IHdheSB0byB3YWl0IGZvciB0aGUgY29udGFpbmVyIHRvIGJlIHJlYWR5IHRvIG1vdmUgZm9jdXMgdG8gZmlyc3QgaXRlbS5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UubW92ZVRvKHRoaXMpO1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UubW92ZShBcnJvd0tleURpcmVjdGlvbi5SSUdIVCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uRE9XTik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNCYWNrT25UcmlnZ2VyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEZvY3VzIG9uIHRoZSBtZW51IHdoZW4gaXQgb3BlbnMsIGFuZCBmb2N1cyBiYWNrIG9uIHRoZSByb290IHRyaWdnZXIgd2hlbiB0aGUgd2hvbGUgZHJvcGRvd24gYmVjb21lcyBjbG9zZWRcbiAgICovXG4gIGhhbmRsZVJvb3RGb2N1cygpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlbiA9PiB7XG4gICAgICBpZiAob3Blbikge1xuICAgICAgICAvLyBFdmVuIGlmIHdlIHByb3Blcmx5IHdhaXRlZCBmb3IgbmdBZnRlclZpZXdJbml0LCB0aGUgY29udGFpbmVyIHN0aWxsIHdvdWxkbid0IGJlIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gICAgICAgIC8vIFNvIHNldFRpbWVvdXQgaXMgdGhlIG9ubHkgd2F5IHRvIHdhaXQgZm9yIHRoZSBjb250YWluZXIgdG8gYmUgcmVhZHkgdG8gZm9jdXMgaXQuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgLy8gV2UgcmVzZXQgdGhlIHN0YXRlIG9mIHRoZSBmb2N1cyBzZXJ2aWNlIGJvdGggb24gaW5pdGlhbGl6YXRpb24gYW5kIHdoZW4gY2xvc2luZy5cbiAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UucmVzZXQodGhpcyk7XG4gICAgICAgIC8vIEJ1dCB3ZSBvbmx5IGFjdGl2ZWx5IGZvY3VzIHRoZSB0cmlnZ2VyIHdoZW4gY2xvc2luZywgbm90IG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAgICBpZiAodGhpcy5mb2N1c0JhY2tPblRyaWdnZXIpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZm9jdXNCYWNrT25UcmlnZ2VyID0gb3BlbjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyaWdnZXI6IEhUTUxFbGVtZW50O1xuICBnZXQgdHJpZ2dlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlcjtcbiAgfVxuICBzZXQgdHJpZ2dlcihlbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl90cmlnZ2VyID0gZWw7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICdpZCcsIHRoaXMuaWQpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgLy8gVGhlIHJvb3QgdHJpZ2dlciBuZWVkcyB0byBiZSBpbiB0aGUgdGFiIGZsb3csIGJ1dCBuZXN0ZWQgb25lcyBhcmUgcmVtb3ZlZCBsaWtlIGFueSBvdGhlciBkcm9wZG93biBpdGVtLlxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICctMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgcm9vdCB0cmlnZ2VyIGlzIHRoZSBvbmx5IG9uZSBvdXRzaWRlIG9mIHRoZSBtZW51LCBzbyBpdCBuZWVkcyB0byBpdHMgb3duIGtleSBsaXN0ZW5lcnMuXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3d1cCcsIGV2ZW50ID0+IHRoaXMuaWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpKTtcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5hcnJvd2Rvd24nLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSk7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5saXN0ZW5Ub0Fycm93S2V5cyhlbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgZ2V0IGNvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICB9XG4gIHNldCBjb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZWw7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgLy8gVGhlIHJvb3QgY29udGFpbmVyIGlzIHRoZSBvbmx5IG9uZSB3ZSByZWdpc3RlciB0byB0aGUgZm9jdXMgc2VydmljZSwgb3RoZXJzIGRvIG5vdCBuZWVkIGZvY3VzXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5yZWdpc3RlckNvbnRhaW5lcihlbCk7XG4gICAgICAvLyBGb3IgZHJvcGRvd25zLCB0aGUgbWVudSBzaG91bGRuJ3QgYWN0dWFsbHkgYmUgaW4gdGhlIHRhYiBvcmRlci4gV2UgbWFudWFsbHkgZm9jdXMgaXQgd2hlbiBvcGVuaW5nLlxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICctMScpO1xuICAgICAgLy8gV2hlbiB0aGUgdXNlciBtb3ZlcyBmb2N1cyBvdXRzaWRlIG9mIHRoZSBtZW51LCB3ZSBjbG9zZSB0aGUgZHJvcGRvd25cbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnYmx1cicsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gd2UgY2xlYXIgb3V0IGFueSBleGlzdGluZyBmb2N1cyBvbiB0aGUgaXRlbXNcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5waXBlKHRha2UoMSkpLnN1YnNjcmliZShpdGVtcyA9PiBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5ibHVyKCkpKTtcblxuICAgICAgICAvLyBmb2N1c291dCArIHJlbGF0ZWRUYXJnZXQgYmVjYXVzZSBhIHNpbXBsZSBibHVyIGV2ZW50IHdvdWxkIHRyaWdnZXJcbiAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgYW4gaXRlbSBpbnNpZGUgb2YgdGhlIG1lbnUsIGNsb3NpbmcgdGhlIGRyb3Bkb3duLlxuICAgICAgICBpZiAoZXZlbnQucmVsYXRlZFRhcmdldCAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgaWYgKGVsLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpIHx8IGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IHRoaXMudHJpZ2dlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBsZXQgdGhlIHVzZXIgbW92ZSBmb2N1cyB0byB3aGVyZSB0aGUgd2FudCwgd2UgZG9uJ3QgZm9yY2UgdGhlIGZvY3VzIGJhY2sgb24gdGhlIHRyaWdnZXJcbiAgICAgICAgdGhpcy5mb2N1c0JhY2tPblRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLnRyaWdnZXIpIHtcbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudHJpZ2dlciwgJ2Nsci1mb2N1cycpO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBibHVyKCkge1xuICAgIGlmICh0aGlzLnRyaWdnZXIpIHtcbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMudHJpZ2dlciwgJ2Nsci1mb2N1cycpO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMudHJpZ2dlci5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRyZW46IFJlcGxheVN1YmplY3Q8Rm9jdXNhYmxlSXRlbVtdPjtcbiAgcmlnaHQ/OiBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xuICBkb3duPzogT2JzZXJ2YWJsZTxGb2N1c2FibGVJdGVtPjtcbiAgdXA/OiBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xuXG4gIHByaXZhdGUgb3BlbkFuZEdldENoaWxkcmVuKCkge1xuICAgIHJldHVybiB3cmFwT2JzZXJ2YWJsZSh0aGlzLmNoaWxkcmVuLCAoKSA9PiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSB0cnVlKSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUFuZEdldFRoaXMoKSB7XG4gICAgcmV0dXJuIHdyYXBPYnNlcnZhYmxlKG9mKHRoaXMpLCAoKSA9PiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZSkpO1xuICB9XG5cbiAgcmVzZXRDaGlsZHJlbigpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gbmV3IFJlcGxheVN1YmplY3Q8Rm9jdXNhYmxlSXRlbVtdPigxKTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucmlnaHQgPSB0aGlzLm9wZW5BbmRHZXRDaGlsZHJlbigpLnBpcGUobWFwKGFsbCA9PiBhbGxbMF0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb3duID0gdGhpcy5vcGVuQW5kR2V0Q2hpbGRyZW4oKS5waXBlKG1hcChhbGwgPT4gYWxsWzBdKSk7XG4gICAgICB0aGlzLnVwID0gdGhpcy5vcGVuQW5kR2V0Q2hpbGRyZW4oKS5waXBlKG1hcChhbGwgPT4gYWxsW2FsbC5sZW5ndGggLSAxXSkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENoaWxkcmVuKGNoaWxkcmVuOiBGb2N1c2FibGVJdGVtW10pIHtcbiAgICBsaW5rVmVydGljYWwoY2hpbGRyZW4pO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgbGlua1BhcmVudChjaGlsZHJlbiwgdGhpcy5jbG9zZUFuZEdldFRoaXMoKSwgQXJyb3dLZXlEaXJlY3Rpb24uTEVGVCk7XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW4ubmV4dChjaGlsZHJlbik7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IERST1BET1dOX0ZPQ1VTX0hBTkRMRVJfUFJPVklERVIgPSBjdXN0b21Gb2N1c2FibGVJdGVtUHJvdmlkZXIoRHJvcGRvd25Gb2N1c0hhbmRsZXIpO1xuIl19