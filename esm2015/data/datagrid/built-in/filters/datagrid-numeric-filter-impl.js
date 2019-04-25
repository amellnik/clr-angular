/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { DatagridPropertyNumericFilter } from './datagrid-property-numeric-filter';
/**
 * @template T
 */
export class DatagridNumericFilterImpl {
    /**
     * @param {?} filterFn
     */
    constructor(filterFn) {
        this.filterFn = filterFn;
        /**
         * The Observable required as part of the Filter interface
         */
        this._changes = new Subject();
        /**
         * Internal values and accessor
         */
        this._low = null;
        this._high = null;
    }
    // We do not want to expose the Subject itself, but the Observable which is read-only
    /**
     * @return {?}
     */
    get changes() {
        return this._changes.asObservable();
    }
    /**
     * Common setters for the input values, including individual limits and
     * both at the same time.  Value is singular to make the interface similar
     * to the built-in string filter.
     * @return {?}
     */
    get value() {
        return [this._low, this._high];
    }
    /**
     * @param {?} vals
     * @return {?}
     */
    set value(vals) {
        /** @type {?} */
        const low = vals[0];
        /** @type {?} */
        const high = vals[1];
        if (low !== this._low || high !== this._high) {
            this._low = low;
            this._high = high;
            this._changes.next([this._low, this._high]);
        }
    }
    /**
     * @param {?} low
     * @return {?}
     */
    set low(low) {
        if (low !== this._low) {
            this._low = low;
            this._changes.next([this._low, this._high]);
        }
    }
    /**
     * @param {?} high
     * @return {?}
     */
    set high(high) {
        if (high !== this._high) {
            this._high = high;
            this._changes.next([this._low, this._high]);
        }
    }
    /**
     * @return {?}
     */
    get low() {
        return this._low;
    }
    /**
     * @return {?}
     */
    get high() {
        return this._high;
    }
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     * @return {?}
     */
    isActive() {
        return this._low !== null || this.high !== null;
    }
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    accepts(item) {
        // We have a filter function in case someone wants to implement a numeric
        // filter that always passes nulls or similar
        return this.filterFn.accepts(item, this._low, this._high);
    }
    /**
     * @return {?}
     */
    get state() {
        if (this.filterFn instanceof DatagridPropertyNumericFilter) {
            return {
                property: this.filterFn.prop,
                // TODO: Should this return value: [this._low, this._high] instead?
                low: this._low,
                high: this._high,
            };
        }
    }
    /**
     * @param {?} other
     * @return {?}
     */
    equals(other) {
        if (other instanceof DatagridNumericFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyNumericFilter) {
                return (this.filterFn instanceof DatagridPropertyNumericFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.low === this._low &&
                    other.high === this._high);
            }
        }
    }
}
if (false) {
    /**
     * The Observable required as part of the Filter interface
     * @type {?}
     */
    DatagridNumericFilterImpl.prototype._changes;
    /**
     * Internal values and accessor
     * @type {?}
     */
    DatagridNumericFilterImpl.prototype._low;
    /** @type {?} */
    DatagridNumericFilterImpl.prototype._high;
    /** @type {?} */
    DatagridNumericFilterImpl.prototype.filterFn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7O0FBRW5GLE1BQU0sT0FBTyx5QkFBeUI7Ozs7SUFDcEMsWUFBbUIsUUFBOEM7UUFBOUMsYUFBUSxHQUFSLFFBQVEsQ0FBc0M7Ozs7UUFLekQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDOzs7O1FBUzNDLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsVUFBSyxHQUFXLElBQUksQ0FBQztJQWZ1QyxDQUFDOzs7OztJQU9yRSxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7Ozs7SUFjRCxJQUFXLEtBQUs7UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxJQUFXLEtBQUssQ0FBQyxJQUFzQjs7Y0FDL0IsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7O2NBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDOzs7OztJQUVELElBQVcsR0FBRyxDQUFDLEdBQVc7UUFDeEIsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDOzs7OztJQUVELElBQVcsSUFBSSxDQUFDLElBQVk7UUFDMUIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDOzs7O0lBRUQsSUFBVyxHQUFHO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFLTSxRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFLTSxPQUFPLENBQUMsSUFBTztRQUNwQix5RUFBeUU7UUFDekUsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7SUFFRCxJQUFXLEtBQUs7UUFDZCxJQUFJLElBQUksQ0FBQyxRQUFRLFlBQVksNkJBQTZCLEVBQUU7WUFDMUQsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOztnQkFFNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNkLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSzthQUNqQixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7OztJQUVNLE1BQU0sQ0FBQyxLQUF5QztRQUNyRCxJQUFJLEtBQUssWUFBWSx5QkFBeUIsRUFBRTtZQUM5QyxJQUFJLEtBQUssQ0FBQyxRQUFRLFlBQVksNkJBQTZCLEVBQUU7Z0JBQzNELE9BQU8sQ0FDTCxJQUFJLENBQUMsUUFBUSxZQUFZLDZCQUE2QjtvQkFDdEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO29CQUMxQyxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJO29CQUN2QixLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQzFCLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUE3RkMsNkNBQW1EOzs7OztJQVNuRCx5Q0FBNEI7O0lBQzVCLDBDQUE2Qjs7SUFmakIsNkNBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9udW1lcmljLWZpbHRlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIgfSBmcm9tICcuL2RhdGFncmlkLXByb3BlcnR5LW51bWVyaWMtZmlsdGVyJztcblxuZXhwb3J0IGNsYXNzIERhdGFncmlkTnVtZXJpY0ZpbHRlckltcGw8VCA9IGFueT4gaW1wbGVtZW50cyBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXJGbjogQ2xyRGF0YWdyaWROdW1lcmljRmlsdGVySW50ZXJmYWNlPFQ+KSB7fVxuXG4gIC8qKlxuICAgKiBUaGUgT2JzZXJ2YWJsZSByZXF1aXJlZCBhcyBwYXJ0IG9mIHRoZSBGaWx0ZXIgaW50ZXJmYWNlXG4gICAqL1xuICBwcml2YXRlIF9jaGFuZ2VzID0gbmV3IFN1YmplY3Q8W251bWJlciwgbnVtYmVyXT4oKTtcbiAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZXhwb3NlIHRoZSBTdWJqZWN0IGl0c2VsZiwgYnV0IHRoZSBPYnNlcnZhYmxlIHdoaWNoIGlzIHJlYWQtb25seVxuICBwdWJsaWMgZ2V0IGNoYW5nZXMoKTogT2JzZXJ2YWJsZTxbbnVtYmVyLCBudW1iZXJdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYW5nZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJuYWwgdmFsdWVzIGFuZCBhY2Nlc3NvclxuICAgKi9cbiAgcHJpdmF0ZSBfbG93OiBudW1iZXIgPSBudWxsO1xuICBwcml2YXRlIF9oaWdoOiBudW1iZXIgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBDb21tb24gc2V0dGVycyBmb3IgdGhlIGlucHV0IHZhbHVlcywgaW5jbHVkaW5nIGluZGl2aWR1YWwgbGltaXRzIGFuZFxuICAgKiBib3RoIGF0IHRoZSBzYW1lIHRpbWUuICBWYWx1ZSBpcyBzaW5ndWxhciB0byBtYWtlIHRoZSBpbnRlcmZhY2Ugc2ltaWxhclxuICAgKiB0byB0aGUgYnVpbHQtaW4gc3RyaW5nIGZpbHRlci5cbiAgICovXG5cbiAgcHVibGljIGdldCB2YWx1ZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICByZXR1cm4gW3RoaXMuX2xvdywgdGhpcy5faGlnaF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHM6IFtudW1iZXIsIG51bWJlcl0pIHtcbiAgICBjb25zdCBsb3cgPSB2YWxzWzBdO1xuICAgIGNvbnN0IGhpZ2ggPSB2YWxzWzFdO1xuICAgIGlmIChsb3cgIT09IHRoaXMuX2xvdyB8fCBoaWdoICE9PSB0aGlzLl9oaWdoKSB7XG4gICAgICB0aGlzLl9sb3cgPSBsb3c7XG4gICAgICB0aGlzLl9oaWdoID0gaGlnaDtcbiAgICAgIHRoaXMuX2NoYW5nZXMubmV4dChbdGhpcy5fbG93LCB0aGlzLl9oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBsb3cobG93OiBudW1iZXIpIHtcbiAgICBpZiAobG93ICE9PSB0aGlzLl9sb3cpIHtcbiAgICAgIHRoaXMuX2xvdyA9IGxvdztcbiAgICAgIHRoaXMuX2NoYW5nZXMubmV4dChbdGhpcy5fbG93LCB0aGlzLl9oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBoaWdoKGhpZ2g6IG51bWJlcikge1xuICAgIGlmIChoaWdoICE9PSB0aGlzLl9oaWdoKSB7XG4gICAgICB0aGlzLl9oaWdoID0gaGlnaDtcbiAgICAgIHRoaXMuX2NoYW5nZXMubmV4dChbdGhpcy5fbG93LCB0aGlzLl9oaWdoXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvdztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGlnaCgpIHtcbiAgICByZXR1cm4gdGhpcy5faGlnaDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGZpbHRlciBpcyBjdXJyZW50bHkgYWN0aXZlLCAoYXQgbGVhc3Qgb25lIGlucHV0IGlzIHNldClcbiAgICovXG4gIHB1YmxpYyBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbG93ICE9PSBudWxsIHx8IHRoaXMuaGlnaCAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0cyBpZiBhbiBpdGVtIG1hdGNoZXMgYSBzZWFyY2ggdGV4dFxuICAgKi9cbiAgcHVibGljIGFjY2VwdHMoaXRlbTogVCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGhhdmUgYSBmaWx0ZXIgZnVuY3Rpb24gaW4gY2FzZSBzb21lb25lIHdhbnRzIHRvIGltcGxlbWVudCBhIG51bWVyaWNcbiAgICAvLyBmaWx0ZXIgdGhhdCBhbHdheXMgcGFzc2VzIG51bGxzIG9yIHNpbWlsYXJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJGbi5hY2NlcHRzKGl0ZW0sIHRoaXMuX2xvdywgdGhpcy5faGlnaCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCkge1xuICAgIGlmICh0aGlzLmZpbHRlckZuIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb3BlcnR5OiB0aGlzLmZpbHRlckZuLnByb3AsXG4gICAgICAgIC8vIFRPRE86IFNob3VsZCB0aGlzIHJldHVybiB2YWx1ZTogW3RoaXMuX2xvdywgdGhpcy5faGlnaF0gaW5zdGVhZD9cbiAgICAgICAgbG93OiB0aGlzLl9sb3csXG4gICAgICAgIGhpZ2g6IHRoaXMuX2hpZ2gsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBlcXVhbHMob3RoZXI6IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlPFQsIGFueT4pOiBib29sZWFuIHtcbiAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsKSB7XG4gICAgICBpZiAob3RoZXIuZmlsdGVyRm4gaW5zdGFuY2VvZiBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlcikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHRoaXMuZmlsdGVyRm4gaW5zdGFuY2VvZiBEYXRhZ3JpZFByb3BlcnR5TnVtZXJpY0ZpbHRlciAmJlxuICAgICAgICAgIG90aGVyLmZpbHRlckZuLnByb3AgPT09IHRoaXMuZmlsdGVyRm4ucHJvcCAmJlxuICAgICAgICAgIG90aGVyLmxvdyA9PT0gdGhpcy5fbG93ICYmXG4gICAgICAgICAgb3RoZXIuaGlnaCA9PT0gdGhpcy5faGlnaFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19