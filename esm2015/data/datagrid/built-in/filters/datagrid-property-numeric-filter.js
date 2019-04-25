/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NestedProperty } from '../nested-property';
/**
 * @template T
 */
export class DatagridPropertyNumericFilter {
    /**
     * @param {?} prop
     * @param {?=} exact
     */
    constructor(prop, exact = false) {
        this.prop = prop;
        this.exact = exact;
        this.nestedProp = new NestedProperty(prop);
    }
    /**
     * @param {?} item
     * @param {?} low
     * @param {?} high
     * @return {?}
     */
    accepts(item, low, high) {
        /** @type {?} */
        const propValue = this.nestedProp.getPropValue(item);
        if (low !== null && propValue < low) {
            return false;
        }
        if (high !== null && propValue > high) {
            return false;
        }
        return true;
    }
}
if (false) {
    /** @type {?} */
    DatagridPropertyNumericFilter.prototype.nestedProp;
    /** @type {?} */
    DatagridPropertyNumericFilter.prototype.prop;
    /** @type {?} */
    DatagridPropertyNumericFilter.prototype.exact;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUVwRCxNQUFNLE9BQU8sNkJBQTZCOzs7OztJQUd4QyxZQUFtQixJQUFZLEVBQVMsUUFBUSxLQUFLO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7OztJQUVELE9BQU8sQ0FBQyxJQUFPLEVBQUUsR0FBVyxFQUFFLElBQVk7O2NBQ2xDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDcEQsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjs7O0lBaEJDLG1EQUFzQzs7SUFFMUIsNkNBQW1COztJQUFFLDhDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbnVtZXJpYy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IE5lc3RlZFByb3BlcnR5IH0gZnJvbSAnLi4vbmVzdGVkLXByb3BlcnR5JztcblxuZXhwb3J0IGNsYXNzIERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyPFQgPSBhbnk+IGltcGxlbWVudHMgQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlPFQ+IHtcbiAgcHJpdmF0ZSBuZXN0ZWRQcm9wOiBOZXN0ZWRQcm9wZXJ0eTxUPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcDogc3RyaW5nLCBwdWJsaWMgZXhhY3QgPSBmYWxzZSkge1xuICAgIHRoaXMubmVzdGVkUHJvcCA9IG5ldyBOZXN0ZWRQcm9wZXJ0eShwcm9wKTtcbiAgfVxuXG4gIGFjY2VwdHMoaXRlbTogVCwgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByb3BWYWx1ZSA9IHRoaXMubmVzdGVkUHJvcC5nZXRQcm9wVmFsdWUoaXRlbSk7XG4gICAgaWYgKGxvdyAhPT0gbnVsbCAmJiBwcm9wVmFsdWUgPCBsb3cpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGhpZ2ggIT09IG51bGwgJiYgcHJvcFZhbHVlID4gaGlnaCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19