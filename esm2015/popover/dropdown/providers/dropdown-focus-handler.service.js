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
let DropdownFocusHandler = class DropdownFocusHandler {
    constructor(id, renderer, parent, ifOpenService, focusService, platformId) {
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
    moveToFirstItemWhenOpen() {
        this.ifOpenService.openChange.subscribe(open => {
            if (open && this.ifOpenService.originalEvent) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to move focus to first item.
                setTimeout(() => {
                    this.focusService.moveTo(this);
                    if (this.parent) {
                        this.focusService.move(ArrowKeyDirection.RIGHT);
                    }
                    else {
                        this.focusService.move(ArrowKeyDirection.DOWN);
                    }
                });
            }
        });
    }
    /**
     * Focus on the menu when it opens, and focus back on the root trigger when the whole dropdown becomes closed
     */
    handleRootFocus() {
        this.ifOpenService.openChange.subscribe(open => {
            if (open) {
                // Even if we properly waited for ngAfterViewInit, the container still wouldn't be attached to the DOM.
                // So setTimeout is the only way to wait for the container to be ready to focus it.
                setTimeout(() => {
                    if (this.container && isPlatformBrowser(this.platformId)) {
                        this.container.focus();
                    }
                });
            }
            if (!open) {
                // We reset the state of the focus service both on initialization and when closing.
                this.focusService.reset(this);
                // But we only actively focus the trigger when closing, not on initialization.
                if (this.focusBackOnTrigger) {
                    this.focus();
                }
            }
            this.focusBackOnTrigger = open;
        });
    }
    get trigger() {
        return this._trigger;
    }
    set trigger(el) {
        this._trigger = el;
        this.renderer.setAttribute(el, 'id', this.id);
        if (this.parent) {
            // The root trigger needs to be in the tab flow, but nested ones are removed like any other dropdown item.
            this.renderer.setAttribute(el, 'tabindex', '-1');
        }
        else {
            // The root trigger is the only one outside of the menu, so it needs to its own key listeners.
            this.renderer.listen(el, 'keydown.arrowup', event => this.ifOpenService.toggleWithEvent(event));
            this.renderer.listen(el, 'keydown.arrowdown', event => this.ifOpenService.toggleWithEvent(event));
            this.focusService.listenToArrowKeys(el);
        }
    }
    get container() {
        return this._container;
    }
    set container(el) {
        this._container = el;
        if (!this.parent) {
            // The root container is the only one we register to the focus service, others do not need focus
            this.focusService.registerContainer(el);
            // For dropdowns, the menu shouldn't actually be in the tab order. We manually focus it when opening.
            this.renderer.setAttribute(el, 'tabindex', '-1');
            // When the user moves focus outside of the menu, we close the dropdown
            this.renderer.listen(el, 'blur', event => {
                // we clear out any existing focus on the items
                this.children.pipe(take(1)).subscribe(items => items.forEach(item => item.blur()));
                // focusout + relatedTarget because a simple blur event would trigger
                // when the user clicks an item inside of the menu, closing the dropdown.
                if (event.relatedTarget && isPlatformBrowser(this.platformId)) {
                    if (el.contains(event.relatedTarget) || event.relatedTarget === this.trigger) {
                        return;
                    }
                }
                // We let the user move focus to where the want, we don't force the focus back on the trigger
                this.focusBackOnTrigger = false;
                this.ifOpenService.open = false;
            });
        }
    }
    focus() {
        if (this.trigger) {
            if (this.parent) {
                this.renderer.addClass(this.trigger, 'clr-focus');
            }
            else if (isPlatformBrowser(this.platformId)) {
                this.trigger.focus();
            }
        }
    }
    blur() {
        if (this.trigger) {
            if (this.parent) {
                this.renderer.removeClass(this.trigger, 'clr-focus');
            }
            else if (isPlatformBrowser(this.platformId)) {
                this.trigger.blur();
            }
        }
    }
    activate() {
        if (isPlatformBrowser(this.platformId)) {
            this.trigger.click();
        }
    }
    openAndGetChildren() {
        return wrapObservable(this.children, () => (this.ifOpenService.open = true));
    }
    closeAndGetThis() {
        return wrapObservable(of(this), () => (this.ifOpenService.open = false));
    }
    resetChildren() {
        this.children = new ReplaySubject(1);
        if (this.parent) {
            this.right = this.openAndGetChildren().pipe(map(all => all[0]));
        }
        else {
            this.down = this.openAndGetChildren().pipe(map(all => all[0]));
            this.up = this.openAndGetChildren().pipe(map(all => all[all.length - 1]));
        }
    }
    addChildren(children) {
        linkVertical(children);
        if (this.parent) {
            linkParent(children, this.closeAndGetThis(), ArrowKeyDirection.LEFT);
        }
        this.children.next(children);
    }
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
export { DropdownFocusHandler };
export const DROPDOWN_FOCUS_HANDLER_PROVIDER = customFocusableItemProvider(DropdownFocusHandler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNsci9hbmd1bGFyLyIsInNvdXJjZXMiOlsicG9wb3Zlci9kcm9wZG93bi9wcm92aWRlcnMvZHJvcGRvd24tZm9jdXMtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBYyxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDakgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEMsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFDL0IsWUFDNEIsRUFBVSxFQUM1QixRQUFtQixFQUduQixNQUE0QixFQUM1QixhQUE0QixFQUM1QixZQUEwQixFQUNMLFVBQWtC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RSxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGLENBQUE7QUF4S1ksb0JBQW9CO0lBRGhDLFVBQVUsRUFBRTtJQUdSLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVqQixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0lBSVYsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3FEQU5GLFNBQVM7UUFHWCxvQkFBb0I7UUFDYixhQUFhO1FBQ2QsWUFBWTtRQUNPLE1BQU07R0FUdEMsb0JBQW9CLENBd0toQztTQXhLWSxvQkFBb0I7QUEwS2pDLE1BQU0sQ0FBQyxNQUFNLCtCQUErQixHQUFHLDJCQUEyQixDQUFDLG9CQUFvQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSWZPcGVuU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmRpdGlvbmFsL2lmLW9wZW4uc2VydmljZSc7XG5pbXBvcnQgeyBjdXN0b21Gb2N1c2FibGVJdGVtUHJvdmlkZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy9mb2N1c2FibGUtaXRlbS9jdXN0b20tZm9jdXNhYmxlLWl0ZW0tcHJvdmlkZXInO1xuaW1wb3J0IHsgVU5JUVVFX0lEIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaWQtZ2VuZXJhdG9yL2lkLWdlbmVyYXRvci5zZXJ2aWNlJztcbmltcG9ydCB7IEFycm93S2V5RGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZm9jdXMvYXJyb3cta2V5LWRpcmVjdGlvbi5lbnVtJztcbmltcG9ydCB7IEZvY3VzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9jdXNhYmxlSXRlbSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2ZvY3VzYWJsZS1pdGVtJztcbmltcG9ydCB7IGxpbmtQYXJlbnQsIGxpbmtWZXJ0aWNhbCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZvY3VzL2ZvY3VzYWJsZS1pdGVtL2xpbmtlcnMnO1xuaW1wb3J0IHsgd3JhcE9ic2VydmFibGUgfSBmcm9tICcuLi8uLi8uLi91dGlscy9mb2N1cy93cmFwLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duRm9jdXNIYW5kbGVyIGltcGxlbWVudHMgRm9jdXNhYmxlSXRlbSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVU5JUVVFX0lEKSBwdWJsaWMgaWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQFNraXBTZWxmKClcbiAgICBAT3B0aW9uYWwoKVxuICAgIHByaXZhdGUgcGFyZW50OiBEcm9wZG93bkZvY3VzSGFuZGxlcixcbiAgICBwcml2YXRlIGlmT3BlblNlcnZpY2U6IElmT3BlblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb2N1c1NlcnZpY2U6IEZvY3VzU2VydmljZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICB0aGlzLnJlc2V0Q2hpbGRyZW4oKTtcbiAgICB0aGlzLm1vdmVUb0ZpcnN0SXRlbVdoZW5PcGVuKCk7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5oYW5kbGVSb290Rm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIGRyb3Bkb3duIHdhcyBvcGVuZWQgYnkgY2xpY2tpbmcgb24gdGhlIHRyaWdnZXIsIHdlIGF1dG9tYXRpY2FsbHkgbW92ZSB0byB0aGUgZmlyc3QgaXRlbVxuICAgKi9cbiAgbW92ZVRvRmlyc3RJdGVtV2hlbk9wZW4oKSB7XG4gICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW5DaGFuZ2Uuc3Vic2NyaWJlKG9wZW4gPT4ge1xuICAgICAgaWYgKG9wZW4gJiYgdGhpcy5pZk9wZW5TZXJ2aWNlLm9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgLy8gRXZlbiBpZiB3ZSBwcm9wZXJseSB3YWl0ZWQgZm9yIG5nQWZ0ZXJWaWV3SW5pdCwgdGhlIGNvbnRhaW5lciBzdGlsbCB3b3VsZG4ndCBiZSBhdHRhY2hlZCB0byB0aGUgRE9NLlxuICAgICAgICAvLyBTbyBzZXRUaW1lb3V0IGlzIHRoZSBvbmx5IHdheSB0byB3YWl0IGZvciB0aGUgY29udGFpbmVyIHRvIGJlIHJlYWR5IHRvIG1vdmUgZm9jdXMgdG8gZmlyc3QgaXRlbS5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UubW92ZVRvKHRoaXMpO1xuICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UubW92ZShBcnJvd0tleURpcmVjdGlvbi5SSUdIVCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNTZXJ2aWNlLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uRE9XTik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNCYWNrT25UcmlnZ2VyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEZvY3VzIG9uIHRoZSBtZW51IHdoZW4gaXQgb3BlbnMsIGFuZCBmb2N1cyBiYWNrIG9uIHRoZSByb290IHRyaWdnZXIgd2hlbiB0aGUgd2hvbGUgZHJvcGRvd24gYmVjb21lcyBjbG9zZWRcbiAgICovXG4gIGhhbmRsZVJvb3RGb2N1cygpIHtcbiAgICB0aGlzLmlmT3BlblNlcnZpY2Uub3BlbkNoYW5nZS5zdWJzY3JpYmUob3BlbiA9PiB7XG4gICAgICBpZiAob3Blbikge1xuICAgICAgICAvLyBFdmVuIGlmIHdlIHByb3Blcmx5IHdhaXRlZCBmb3IgbmdBZnRlclZpZXdJbml0LCB0aGUgY29udGFpbmVyIHN0aWxsIHdvdWxkbid0IGJlIGF0dGFjaGVkIHRvIHRoZSBET00uXG4gICAgICAgIC8vIFNvIHNldFRpbWVvdXQgaXMgdGhlIG9ubHkgd2F5IHRvIHdhaXQgZm9yIHRoZSBjb250YWluZXIgdG8gYmUgcmVhZHkgdG8gZm9jdXMgaXQuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgLy8gV2UgcmVzZXQgdGhlIHN0YXRlIG9mIHRoZSBmb2N1cyBzZXJ2aWNlIGJvdGggb24gaW5pdGlhbGl6YXRpb24gYW5kIHdoZW4gY2xvc2luZy5cbiAgICAgICAgdGhpcy5mb2N1c1NlcnZpY2UucmVzZXQodGhpcyk7XG4gICAgICAgIC8vIEJ1dCB3ZSBvbmx5IGFjdGl2ZWx5IGZvY3VzIHRoZSB0cmlnZ2VyIHdoZW4gY2xvc2luZywgbm90IG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAgICBpZiAodGhpcy5mb2N1c0JhY2tPblRyaWdnZXIpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZm9jdXNCYWNrT25UcmlnZ2VyID0gb3BlbjtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyaWdnZXI6IEhUTUxFbGVtZW50O1xuICBnZXQgdHJpZ2dlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlcjtcbiAgfVxuICBzZXQgdHJpZ2dlcihlbDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl90cmlnZ2VyID0gZWw7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICdpZCcsIHRoaXMuaWQpO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgLy8gVGhlIHJvb3QgdHJpZ2dlciBuZWVkcyB0byBiZSBpbiB0aGUgdGFiIGZsb3csIGJ1dCBuZXN0ZWQgb25lcyBhcmUgcmVtb3ZlZCBsaWtlIGFueSBvdGhlciBkcm9wZG93biBpdGVtLlxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICctMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgcm9vdCB0cmlnZ2VyIGlzIHRoZSBvbmx5IG9uZSBvdXRzaWRlIG9mIHRoZSBtZW51LCBzbyBpdCBuZWVkcyB0byBpdHMgb3duIGtleSBsaXN0ZW5lcnMuXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3d1cCcsIGV2ZW50ID0+IHRoaXMuaWZPcGVuU2VydmljZS50b2dnbGVXaXRoRXZlbnQoZXZlbnQpKTtcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5hcnJvd2Rvd24nLCBldmVudCA9PiB0aGlzLmlmT3BlblNlcnZpY2UudG9nZ2xlV2l0aEV2ZW50KGV2ZW50KSk7XG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5saXN0ZW5Ub0Fycm93S2V5cyhlbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgZ2V0IGNvbnRhaW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICB9XG4gIHNldCBjb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZWw7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgLy8gVGhlIHJvb3QgY29udGFpbmVyIGlzIHRoZSBvbmx5IG9uZSB3ZSByZWdpc3RlciB0byB0aGUgZm9jdXMgc2VydmljZSwgb3RoZXJzIGRvIG5vdCBuZWVkIGZvY3VzXG4gICAgICB0aGlzLmZvY3VzU2VydmljZS5yZWdpc3RlckNvbnRhaW5lcihlbCk7XG4gICAgICAvLyBGb3IgZHJvcGRvd25zLCB0aGUgbWVudSBzaG91bGRuJ3QgYWN0dWFsbHkgYmUgaW4gdGhlIHRhYiBvcmRlci4gV2UgbWFudWFsbHkgZm9jdXMgaXQgd2hlbiBvcGVuaW5nLlxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWwsICd0YWJpbmRleCcsICctMScpO1xuICAgICAgLy8gV2hlbiB0aGUgdXNlciBtb3ZlcyBmb2N1cyBvdXRzaWRlIG9mIHRoZSBtZW51LCB3ZSBjbG9zZSB0aGUgZHJvcGRvd25cbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAnYmx1cicsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gd2UgY2xlYXIgb3V0IGFueSBleGlzdGluZyBmb2N1cyBvbiB0aGUgaXRlbXNcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5waXBlKHRha2UoMSkpLnN1YnNjcmliZShpdGVtcyA9PiBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5ibHVyKCkpKTtcblxuICAgICAgICAvLyBmb2N1c291dCArIHJlbGF0ZWRUYXJnZXQgYmVjYXVzZSBhIHNpbXBsZSBibHVyIGV2ZW50IHdvdWxkIHRyaWdnZXJcbiAgICAgICAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgYW4gaXRlbSBpbnNpZGUgb2YgdGhlIG1lbnUsIGNsb3NpbmcgdGhlIGRyb3Bkb3duLlxuICAgICAgICBpZiAoZXZlbnQucmVsYXRlZFRhcmdldCAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgaWYgKGVsLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpIHx8IGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IHRoaXMudHJpZ2dlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBsZXQgdGhlIHVzZXIgbW92ZSBmb2N1cyB0byB3aGVyZSB0aGUgd2FudCwgd2UgZG9uJ3QgZm9yY2UgdGhlIGZvY3VzIGJhY2sgb24gdGhlIHRyaWdnZXJcbiAgICAgICAgdGhpcy5mb2N1c0JhY2tPblRyaWdnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLnRyaWdnZXIpIHtcbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudHJpZ2dlciwgJ2Nsci1mb2N1cycpO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBibHVyKCkge1xuICAgIGlmICh0aGlzLnRyaWdnZXIpIHtcbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMudHJpZ2dlciwgJ2Nsci1mb2N1cycpO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMudHJpZ2dlci5jbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRyZW46IFJlcGxheVN1YmplY3Q8Rm9jdXNhYmxlSXRlbVtdPjtcbiAgcmlnaHQ/OiBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xuICBkb3duPzogT2JzZXJ2YWJsZTxGb2N1c2FibGVJdGVtPjtcbiAgdXA/OiBPYnNlcnZhYmxlPEZvY3VzYWJsZUl0ZW0+O1xuXG4gIHByaXZhdGUgb3BlbkFuZEdldENoaWxkcmVuKCkge1xuICAgIHJldHVybiB3cmFwT2JzZXJ2YWJsZSh0aGlzLmNoaWxkcmVuLCAoKSA9PiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSB0cnVlKSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUFuZEdldFRoaXMoKSB7XG4gICAgcmV0dXJuIHdyYXBPYnNlcnZhYmxlKG9mKHRoaXMpLCAoKSA9PiAodGhpcy5pZk9wZW5TZXJ2aWNlLm9wZW4gPSBmYWxzZSkpO1xuICB9XG5cbiAgcmVzZXRDaGlsZHJlbigpIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gbmV3IFJlcGxheVN1YmplY3Q8Rm9jdXNhYmxlSXRlbVtdPigxKTtcbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucmlnaHQgPSB0aGlzLm9wZW5BbmRHZXRDaGlsZHJlbigpLnBpcGUobWFwKGFsbCA9PiBhbGxbMF0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb3duID0gdGhpcy5vcGVuQW5kR2V0Q2hpbGRyZW4oKS5waXBlKG1hcChhbGwgPT4gYWxsWzBdKSk7XG4gICAgICB0aGlzLnVwID0gdGhpcy5vcGVuQW5kR2V0Q2hpbGRyZW4oKS5waXBlKG1hcChhbGwgPT4gYWxsW2FsbC5sZW5ndGggLSAxXSkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENoaWxkcmVuKGNoaWxkcmVuOiBGb2N1c2FibGVJdGVtW10pIHtcbiAgICBsaW5rVmVydGljYWwoY2hpbGRyZW4pO1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgbGlua1BhcmVudChjaGlsZHJlbiwgdGhpcy5jbG9zZUFuZEdldFRoaXMoKSwgQXJyb3dLZXlEaXJlY3Rpb24uTEVGVCk7XG4gICAgfVxuICAgIHRoaXMuY2hpbGRyZW4ubmV4dChjaGlsZHJlbik7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IERST1BET1dOX0ZPQ1VTX0hBTkRMRVJfUFJPVklERVIgPSBjdXN0b21Gb2N1c2FibGVJdGVtUHJvdmlkZXIoRHJvcGRvd25Gb2N1c0hhbmRsZXIpO1xuIl19