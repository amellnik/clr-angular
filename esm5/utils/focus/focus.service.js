/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable, Optional, Renderer2, SkipSelf } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { ArrowKeyDirection } from './arrow-key-direction.enum';
var FocusService = /** @class */ (function () {
    function FocusService(renderer) {
        this.renderer = renderer;
    }
    Object.defineProperty(FocusService.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    FocusService.prototype.reset = function (first) {
        this._current = first;
    };
    FocusService.prototype.listenToArrowKeys = function (el) {
        var _this = this;
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this.renderer.listen(el, 'keydown.arrowup', function () { return !_this.move(ArrowKeyDirection.UP); });
        this.renderer.listen(el, 'keydown.arrowdown', function () { return !_this.move(ArrowKeyDirection.DOWN); });
        this.renderer.listen(el, 'keydown.arrowleft', function () { return !_this.move(ArrowKeyDirection.LEFT); });
        this.renderer.listen(el, 'keydown.arrowright', function () { return !_this.move(ArrowKeyDirection.RIGHT); });
    };
    FocusService.prototype.registerContainer = function (el) {
        var _this = this;
        this.container = el;
        this.renderer.setAttribute(el, 'tabindex', '0');
        this.listenToArrowKeys(el);
        // The following listeners return false when there was an action to take for the key pressed,
        // in order to prevent the default behavior of that key.
        this.renderer.listen(el, 'keydown.space', function () { return !_this.activateCurrent(); });
        this.renderer.listen(el, 'keydown.enter', function () { return !_this.activateCurrent(); });
    };
    FocusService.prototype.moveTo = function (item) {
        this.renderer.setAttribute(this.container, 'aria-activedescendant', item.id);
        if (this.current) {
            this.current.blur();
        }
        item.focus();
        this._current = item;
    };
    /**
     * The second parameter, optional, is here to allow recursion to skip disabled items.
     */
    FocusService.prototype.move = function (direction, current) {
        var _this = this;
        if (current === void 0) { current = this.current; }
        if (current) {
            var next = current[direction];
            if (next) {
                // Turning the value into an Observable isn't great, but it's the fastest way to avoid code duplication.
                // If performance ever matters for this, we can refactor using additional private methods.
                var nextObs = isObservable(next) ? next : of(next);
                nextObs.subscribe(function (item) {
                    if (item.disabled) {
                        return _this.move(direction, item);
                    }
                    else {
                        _this.moveTo(item);
                        return true;
                    }
                });
            }
        }
        return false;
    };
    FocusService.prototype.activateCurrent = function () {
        if (this.current && this.current.activate) {
            this.current.activate();
            return true;
        }
        return false;
    };
    FocusService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Renderer2])
    ], FocusService);
    return FocusService;
}());
export { FocusService };
export function clrFocusServiceFactory(existing, renderer) {
    return existing || new FocusService(renderer);
}
export var FOCUS_SERVICE_PROVIDER = {
    provide: FocusService,
    useFactory: clrFocusServiceFactory,
    deps: [[new Optional(), new SkipSelf(), FocusService], Renderer2],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2ZvY3VzL2ZvY3VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSS9EO0lBQ0Usc0JBQW9CLFFBQW1CO1FBQW5CLGFBQVEsR0FBUixRQUFRLENBQVc7SUFBRyxDQUFDO0lBSzNDLHNCQUFXLGlDQUFPO2FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsNEJBQUssR0FBTCxVQUFNLEtBQW9CO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCx3Q0FBaUIsR0FBakIsVUFBa0IsRUFBZTtRQUFqQyxpQkFPQztRQU5DLDZGQUE2RjtRQUM3Rix3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGlCQUFpQixFQUFFLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFD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QUM7Q0FBQSxBQXhFRCxJQXdFQztTQXhFWSxZQUFZO0FBMEV6QixNQUFNLFVBQVUsc0JBQXNCLENBQUMsUUFBc0IsRUFBRSxRQUFtQjtJQUNoRixPQUFPLFFBQVEsSUFBSSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQUc7SUFDcEMsT0FBTyxFQUFFLFlBQVk7SUFDckIsVUFBVSxFQUFFLHNCQUFzQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxTQUFTLENBQUM7Q0FDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOSBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwsIFJlbmRlcmVyMiwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXJyb3dLZXlEaXJlY3Rpb24gfSBmcm9tICcuL2Fycm93LWtleS1kaXJlY3Rpb24uZW51bSc7XG5pbXBvcnQgeyBGb2N1c2FibGVJdGVtIH0gZnJvbSAnLi9mb2N1c2FibGUtaXRlbS9mb2N1c2FibGUtaXRlbSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb2N1c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgX2N1cnJlbnQ6IEZvY3VzYWJsZUl0ZW07XG4gIHB1YmxpYyBnZXQgY3VycmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuXG4gIHJlc2V0KGZpcnN0OiBGb2N1c2FibGVJdGVtKSB7XG4gICAgdGhpcy5fY3VycmVudCA9IGZpcnN0O1xuICB9XG5cbiAgbGlzdGVuVG9BcnJvd0tleXMoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgcmV0dXJuIGZhbHNlIHdoZW4gdGhlcmUgd2FzIGFuIGFjdGlvbiB0byB0YWtlIGZvciB0aGUga2V5IHByZXNzZWQsXG4gICAgLy8gaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGF0IGtleS5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3d1cCcsICgpID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uVVApKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uYXJyb3dkb3duJywgKCkgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5ET1dOKSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWwsICdrZXlkb3duLmFycm93bGVmdCcsICgpID0+ICF0aGlzLm1vdmUoQXJyb3dLZXlEaXJlY3Rpb24uTEVGVCkpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5hcnJvd3JpZ2h0JywgKCkgPT4gIXRoaXMubW92ZShBcnJvd0tleURpcmVjdGlvbi5SSUdIVCkpO1xuICB9XG5cbiAgcmVnaXN0ZXJDb250YWluZXIoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBlbDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgJ3RhYmluZGV4JywgJzAnKTtcbiAgICB0aGlzLmxpc3RlblRvQXJyb3dLZXlzKGVsKTtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGxpc3RlbmVycyByZXR1cm4gZmFsc2Ugd2hlbiB0aGVyZSB3YXMgYW4gYWN0aW9uIHRvIHRha2UgZm9yIHRoZSBrZXkgcHJlc3NlZCxcbiAgICAvLyBpbiBvcmRlciB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoYXQga2V5LlxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsLCAna2V5ZG93bi5zcGFjZScsICgpID0+ICF0aGlzLmFjdGl2YXRlQ3VycmVudCgpKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihlbCwgJ2tleWRvd24uZW50ZXInLCAoKSA9PiAhdGhpcy5hY3RpdmF0ZUN1cnJlbnQoKSk7XG4gIH1cblxuICBtb3ZlVG8oaXRlbTogRm9jdXNhYmxlSXRlbSkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuY29udGFpbmVyLCAnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgaXRlbS5pZCk7XG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgdGhpcy5jdXJyZW50LmJsdXIoKTtcbiAgICB9XG4gICAgaXRlbS5mb2N1cygpO1xuICAgIHRoaXMuX2N1cnJlbnQgPSBpdGVtO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzZWNvbmQgcGFyYW1ldGVyLCBvcHRpb25hbCwgaXMgaGVyZSB0byBhbGxvdyByZWN1cnNpb24gdG8gc2tpcCBkaXNhYmxlZCBpdGVtcy5cbiAgICovXG4gIG1vdmUoZGlyZWN0aW9uOiBBcnJvd0tleURpcmVjdGlvbiwgY3VycmVudCA9IHRoaXMuY3VycmVudCkge1xuICAgIGlmIChjdXJyZW50KSB7XG4gICAgICBjb25zdCBuZXh0ID0gY3VycmVudFtkaXJlY3Rpb25dO1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgLy8gVHVybmluZyB0aGUgdmFsdWUgaW50byBhbiBPYnNlcnZhYmxlIGlzbid0IGdyZWF0LCBidXQgaXQncyB0aGUgZmFzdGVzdCB3YXkgdG8gYXZvaWQgY29kZSBkdXBsaWNhdGlvbi5cbiAgICAgICAgLy8gSWYgcGVyZm9ybWFuY2UgZXZlciBtYXR0ZXJzIGZvciB0aGlzLCB3ZSBjYW4gcmVmYWN0b3IgdXNpbmcgYWRkaXRpb25hbCBwcml2YXRlIG1ldGhvZHMuXG4gICAgICAgIGNvbnN0IG5leHRPYnMgPSBpc09ic2VydmFibGUobmV4dCkgPyBuZXh0IDogb2YobmV4dCk7XG4gICAgICAgIG5leHRPYnMuc3Vic2NyaWJlKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlKGRpcmVjdGlvbiwgaXRlbSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWN0aXZhdGVDdXJyZW50KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmFjdGl2YXRlKSB7XG4gICAgICB0aGlzLmN1cnJlbnQuYWN0aXZhdGUoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsckZvY3VzU2VydmljZUZhY3RvcnkoZXhpc3Rpbmc6IEZvY3VzU2VydmljZSwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICByZXR1cm4gZXhpc3RpbmcgfHwgbmV3IEZvY3VzU2VydmljZShyZW5kZXJlcik7XG59XG5cbmV4cG9ydCBjb25zdCBGT0NVU19TRVJWSUNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBGb2N1c1NlcnZpY2UsXG4gIHVzZUZhY3Rvcnk6IGNsckZvY3VzU2VydmljZUZhY3RvcnksXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBGb2N1c1NlcnZpY2VdLCBSZW5kZXJlcjJdLFxufTtcbiJdfQ==