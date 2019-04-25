/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NestedProperty } from '../nested-property';
/**
 * @template T
 */
var /**
 * @template T
 */
DatagridPropertyNumericFilter = /** @class */ (function () {
    function DatagridPropertyNumericFilter(prop, exact) {
        if (exact === void 0) { exact = false; }
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
    DatagridPropertyNumericFilter.prototype.accepts = /**
     * @param {?} item
     * @param {?} low
     * @param {?} high
     * @return {?}
     */
    function (item, low, high) {
        /** @type {?} */
        var propValue = this.nestedProp.getPropValue(item);
        if (low !== null && propValue < low) {
            return false;
        }
        if (high !== null && propValue > high) {
            return false;
        }
        return true;
    };
    return DatagridPropertyNumericFilter;
}());
/**
 * @template T
 */
export { DatagridPropertyNumericFilter };
if (false) {
    /** @type {?} */
    DatagridPropertyNumericFilter.prototype.nestedProp;
    /** @type {?} */
    DatagridPropertyNumericFilter.prototype.prop;
    /** @type {?} */
    DatagridPropertyNumericFilter.prototype.exact;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkYXRhL2RhdGFncmlkL2J1aWx0LWluL2ZpbHRlcnMvZGF0YWdyaWQtcHJvcGVydHktbnVtZXJpYy1maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUVwRDs7OztJQUdFLHVDQUFtQixJQUFZLEVBQVMsS0FBYTtRQUFiLHNCQUFBLEVBQUEsYUFBYTtRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7Ozs7SUFFRCwrQ0FBTzs7Ozs7O0lBQVAsVUFBUSxJQUFPLEVBQUUsR0FBVyxFQUFFLElBQVk7O1lBQ2xDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDcEQsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUU7WUFDbkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxTQUFTLEdBQUcsSUFBSSxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxvQ0FBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7Ozs7Ozs7SUFoQkMsbURBQXNDOztJQUUxQiw2Q0FBbUI7O0lBQUUsOENBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9udW1lcmljLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTmVzdGVkUHJvcGVydHkgfSBmcm9tICcuLi9uZXN0ZWQtcHJvcGVydHknO1xuXG5leHBvcnQgY2xhc3MgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXI8VCA9IGFueT4gaW1wbGVtZW50cyBDbHJEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbnRlcmZhY2U8VD4ge1xuICBwcml2YXRlIG5lc3RlZFByb3A6IE5lc3RlZFByb3BlcnR5PFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wOiBzdHJpbmcsIHB1YmxpYyBleGFjdCA9IGZhbHNlKSB7XG4gICAgdGhpcy5uZXN0ZWRQcm9wID0gbmV3IE5lc3RlZFByb3BlcnR5KHByb3ApO1xuICB9XG5cbiAgYWNjZXB0cyhpdGVtOiBULCBsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcHJvcFZhbHVlID0gdGhpcy5uZXN0ZWRQcm9wLmdldFByb3BWYWx1ZShpdGVtKTtcbiAgICBpZiAobG93ICE9PSBudWxsICYmIHByb3BWYWx1ZSA8IGxvdykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaGlnaCAhPT0gbnVsbCAmJiBwcm9wVmFsdWUgPiBoaWdoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=