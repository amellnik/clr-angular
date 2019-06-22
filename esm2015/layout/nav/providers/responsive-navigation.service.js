import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { ResponsiveNavCodes } from '../responsive-nav-codes';
import { ResponsiveNavControlMessage } from '../responsive-nav-control-message';
import * as i0 from "@angular/core";
let ResponsiveNavigationService = class ResponsiveNavigationService {
    constructor() {
        this.responsiveNavList = [];
        this.registerNavSubject = new ReplaySubject();
        this.controlNavSubject = new Subject();
        this.closeAllNavs(); // We start with all navs closed
    }
    get registeredNavs() {
        return this.registerNavSubject.asObservable();
    }
    get navControl() {
        return this.controlNavSubject.asObservable();
    }
    registerNav(navLevel) {
        if (!navLevel || this.isNavRegistered(navLevel)) {
            return;
        }
        this.responsiveNavList.push(navLevel);
        this.registerNavSubject.next(this.responsiveNavList);
    }
    isNavRegistered(navLevel) {
        if (this.responsiveNavList.indexOf(navLevel) > -1) {
            console.error('Multiple clr-nav-level ' + navLevel + ' attributes found. Please make sure that only one exists');
            return true;
        }
        return false;
    }
    unregisterNav(navLevel) {
        const index = this.responsiveNavList.indexOf(navLevel);
        if (index > -1) {
            this.responsiveNavList.splice(index, 1);
            this.registerNavSubject.next(this.responsiveNavList);
        }
    }
    sendControlMessage(controlCode, navLevel) {
        const message = new ResponsiveNavControlMessage(controlCode, navLevel);
        this.controlNavSubject.next(message);
    }
    closeAllNavs() {
        const message = new ResponsiveNavControlMessage(ResponsiveNavCodes.NAV_CLOSE_ALL, -999);
        this.controlNavSubject.next(message);
    }
};
ResponsiveNavigationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ResponsiveNavigationService_Factory() { return new ResponsiveNavigationService(); }, token: ResponsiveNavigationService, providedIn: "root" });
ResponsiveNavigationService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [])
], ResponsiveNavigationService);
export { ResponsiveNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJsYXlvdXQvbmF2L3Byb3ZpZGVycy9yZXNwb25zaXZlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBR2hGLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBYXRDO1FBWk8sc0JBQWlCLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLHVCQUFrQixHQUFHLElBQUksYUFBYSxFQUFZLENBQUM7UUFDbkQsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQStCLENBQUM7UUFXckUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsZ0NBQWdDO0lBQ3ZELENBQUM7SUFWRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFNRCxXQUFXLENBQUMsUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQy9DLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsZUFBZSxDQUFDLFFBQWdCO1FBQzlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqRCxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixHQUFHLFFBQVEsR0FBRywwREFBMEQsQ0FBQyxDQUFDO1lBQ2pILE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxhQUFhLENBQUMsUUFBZ0I7UUFDNUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsV0FBbUIsRUFBRSxRQUFnQjtRQUN0RCxNQUFNLE9BQU8sR0FBZ0MsSUFBSSwyQkFBMkIsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sT0FBTyxHQUFnQyxJQUFJLDJCQUEyQixDQUMxRSxrQkFBa0IsQ0FBQyxhQUFhLEVBQ2hDLENBQUMsR0FBRyxDQUNMLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRixDQUFBOztBQXJEWSwyQkFBMkI7SUFEdkMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDOztHQUN0QiwyQkFBMkIsQ0FxRHZDO1NBckRZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvZGVzIH0gZnJvbSAnLi4vcmVzcG9uc2l2ZS1uYXYtY29kZXMnO1xuaW1wb3J0IHsgUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlIH0gZnJvbSAnLi4vcmVzcG9uc2l2ZS1uYXYtY29udHJvbC1tZXNzYWdlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBSZXNwb25zaXZlTmF2aWdhdGlvblNlcnZpY2Uge1xuICBwdWJsaWMgcmVzcG9uc2l2ZU5hdkxpc3Q6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgcmVnaXN0ZXJOYXZTdWJqZWN0ID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyW10+KCk7XG4gIHByaXZhdGUgY29udHJvbE5hdlN1YmplY3QgPSBuZXcgU3ViamVjdDxSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2U+KCk7XG5cbiAgZ2V0IHJlZ2lzdGVyZWROYXZzKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3Rlck5hdlN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgbmF2Q29udHJvbCgpOiBPYnNlcnZhYmxlPFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRyb2xOYXZTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jbG9zZUFsbE5hdnMoKTsgLy8gV2Ugc3RhcnQgd2l0aCBhbGwgbmF2cyBjbG9zZWRcbiAgfVxuXG4gIHJlZ2lzdGVyTmF2KG5hdkxldmVsOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIW5hdkxldmVsIHx8IHRoaXMuaXNOYXZSZWdpc3RlcmVkKG5hdkxldmVsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LnB1c2gobmF2TGV2ZWwpO1xuICAgIHRoaXMucmVnaXN0ZXJOYXZTdWJqZWN0Lm5leHQodGhpcy5yZXNwb25zaXZlTmF2TGlzdCk7XG4gIH1cblxuICBpc05hdlJlZ2lzdGVyZWQobmF2TGV2ZWw6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LmluZGV4T2YobmF2TGV2ZWwpID4gLTEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ011bHRpcGxlIGNsci1uYXYtbGV2ZWwgJyArIG5hdkxldmVsICsgJyBhdHRyaWJ1dGVzIGZvdW5kLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgb25seSBvbmUgZXhpc3RzJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdW5yZWdpc3Rlck5hdihuYXZMZXZlbDogbnVtYmVyKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LmluZGV4T2YobmF2TGV2ZWwpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnJlc3BvbnNpdmVOYXZMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyTmF2U3ViamVjdC5uZXh0KHRoaXMucmVzcG9uc2l2ZU5hdkxpc3QpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRDb250cm9sTWVzc2FnZShjb250cm9sQ29kZTogc3RyaW5nLCBuYXZMZXZlbDogbnVtYmVyKSB7XG4gICAgY29uc3QgbWVzc2FnZTogUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlID0gbmV3IFJlc3BvbnNpdmVOYXZDb250cm9sTWVzc2FnZShjb250cm9sQ29kZSwgbmF2TGV2ZWwpO1xuICAgIHRoaXMuY29udHJvbE5hdlN1YmplY3QubmV4dChtZXNzYWdlKTtcbiAgfVxuXG4gIGNsb3NlQWxsTmF2cygpIHtcbiAgICBjb25zdCBtZXNzYWdlOiBSZXNwb25zaXZlTmF2Q29udHJvbE1lc3NhZ2UgPSBuZXcgUmVzcG9uc2l2ZU5hdkNvbnRyb2xNZXNzYWdlKFxuICAgICAgUmVzcG9uc2l2ZU5hdkNvZGVzLk5BVl9DTE9TRV9BTEwsXG4gICAgICAtOTk5XG4gICAgKTtcbiAgICB0aGlzLmNvbnRyb2xOYXZTdWJqZWN0Lm5leHQobWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==