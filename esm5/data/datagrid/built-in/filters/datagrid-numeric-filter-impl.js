/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { DatagridPropertyNumericFilter } from './datagrid-property-numeric-filter';
/**
 * @template T
 */
var /**
 * @template T
 */
DatagridNumericFilterImpl = /** @class */ (function () {
    function DatagridNumericFilterImpl(filterFn) {
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
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "changes", {
        // We do not want to expose the Subject itself, but the Observable which is read-only
        get: 
        // We do not want to expose the Subject itself, but the Observable which is read-only
        /**
         * @return {?}
         */
        function () {
            return this._changes.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "value", {
        /**
         * Common setters for the input values, including individual limits and
         * both at the same time.  Value is singular to make the interface similar
         * to the built-in string filter.
         */
        get: /**
         * Common setters for the input values, including individual limits and
         * both at the same time.  Value is singular to make the interface similar
         * to the built-in string filter.
         * @return {?}
         */
        function () {
            return [this._low, this._high];
        },
        set: /**
         * @param {?} vals
         * @return {?}
         */
        function (vals) {
            /** @type {?} */
            var low = vals[0];
            /** @type {?} */
            var high = vals[1];
            if (low !== this._low || high !== this._high) {
                this._low = low;
                this._high = high;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "low", {
        get: /**
         * @return {?}
         */
        function () {
            return this._low;
        },
        set: /**
         * @param {?} low
         * @return {?}
         */
        function (low) {
            if (low !== this._low) {
                this._low = low;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "high", {
        get: /**
         * @return {?}
         */
        function () {
            return this._high;
        },
        set: /**
         * @param {?} high
         * @return {?}
         */
        function (high) {
            if (high !== this._high) {
                this._high = high;
                this._changes.next([this._low, this._high]);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     */
    /**
     * Indicates if the filter is currently active, (at least one input is set)
     * @return {?}
     */
    DatagridNumericFilterImpl.prototype.isActive = /**
     * Indicates if the filter is currently active, (at least one input is set)
     * @return {?}
     */
    function () {
        return this._low !== null || this.high !== null;
    };
    /**
     * Tests if an item matches a search text
     */
    /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    DatagridNumericFilterImpl.prototype.accepts = /**
     * Tests if an item matches a search text
     * @param {?} item
     * @return {?}
     */
    function (item) {
        // We have a filter function in case someone wants to implement a numeric
        // filter that always passes nulls or similar
        return this.filterFn.accepts(item, this._low, this._high);
    };
    Object.defineProperty(DatagridNumericFilterImpl.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.filterFn instanceof DatagridPropertyNumericFilter) {
                return {
                    property: this.filterFn.prop,
                    // TODO: Should this return value: [this._low, this._high] instead?
                    low: this._low,
                    high: this._high,
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} other
     * @return {?}
     */
    DatagridNumericFilterImpl.prototype.equals = /**
     * @param {?} other
     * @return {?}
     */
    function (other) {
        if (other instanceof DatagridNumericFilterImpl) {
            if (other.filterFn instanceof DatagridPropertyNumericFilter) {
                return (this.filterFn instanceof DatagridPropertyNumericFilter &&
                    other.filterFn.prop === this.filterFn.prop &&
                    other.low === this._low &&
                    other.high === this._high);
            }
        }
    };
    return DatagridNumericFilterImpl;
}());
/**
 * @template T
 */
export { DatagridNumericFilterImpl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWdyaWQtbnVtZXJpYy1maWx0ZXItaW1wbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvYnVpbHQtaW4vZmlsdGVycy9kYXRhZ3JpZC1udW1lcmljLWZpbHRlci1pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7O0FBRW5GOzs7O0lBQ0UsbUNBQW1CLFFBQThDO1FBQTlDLGFBQVEsR0FBUixRQUFRLENBQXNDOzs7O1FBS3pELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBb0IsQ0FBQzs7OztRQVMzQyxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLFVBQUssR0FBVyxJQUFJLENBQUM7SUFmdUMsQ0FBQztJQU9yRSxzQkFBVyw4Q0FBTztRQURsQixxRkFBcUY7Ozs7OztRQUNyRjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQWNELHNCQUFXLDRDQUFLO1FBTmhCOzs7O1dBSUc7Ozs7Ozs7UUFFSDtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7OztRQUVELFVBQWlCLElBQXNCOztnQkFDL0IsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUNiLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BVkE7SUFZRCxzQkFBVywwQ0FBRzs7OztRQWNkO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBaEJELFVBQWUsR0FBVztZQUN4QixJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywyQ0FBSTs7OztRQVdmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBYkQsVUFBZ0IsSUFBWTtZQUMxQixJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1FBQ0gsQ0FBQzs7O09BQUE7SUFVRDs7T0FFRzs7Ozs7SUFDSSw0Q0FBUTs7OztJQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNJLDJDQUFPOzs7OztJQUFkLFVBQWUsSUFBTztRQUNwQix5RUFBeUU7UUFDekUsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxzQkFBVyw0Q0FBSzs7OztRQUFoQjtZQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsWUFBWSw2QkFBNkIsRUFBRTtnQkFDMUQsT0FBTztvQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOztvQkFFNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNkLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDakIsQ0FBQzthQUNIO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBRU0sMENBQU07Ozs7SUFBYixVQUFjLEtBQXlDO1FBQ3JELElBQUksS0FBSyxZQUFZLHlCQUF5QixFQUFFO1lBQzlDLElBQUksS0FBSyxDQUFDLFFBQVEsWUFBWSw2QkFBNkIsRUFBRTtnQkFDM0QsT0FBTyxDQUNMLElBQUksQ0FBQyxRQUFRLFlBQVksNkJBQTZCO29CQUN0RCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7b0JBQzFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUk7b0JBQ3ZCLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FDMUIsQ0FBQzthQUNIO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBbkdELElBbUdDOzs7Ozs7Ozs7O0lBN0ZDLDZDQUFtRDs7Ozs7SUFTbkQseUNBQTRCOztJQUM1QiwwQ0FBNkI7O0lBZmpCLDZDQUFxRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtMjAxOCBWTXdhcmUsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UuXG4gKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENsckRhdGFncmlkRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbnVtZXJpYy1maWx0ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyIH0gZnJvbSAnLi9kYXRhZ3JpZC1wcm9wZXJ0eS1udW1lcmljLWZpbHRlcic7XG5cbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE51bWVyaWNGaWx0ZXJJbXBsPFQgPSBhbnk+IGltcGxlbWVudHMgQ2xyRGF0YWdyaWRGaWx0ZXJJbnRlcmZhY2U8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyRm46IENsckRhdGFncmlkTnVtZXJpY0ZpbHRlckludGVyZmFjZTxUPikge31cblxuICAvKipcbiAgICogVGhlIE9ic2VydmFibGUgcmVxdWlyZWQgYXMgcGFydCBvZiB0aGUgRmlsdGVyIGludGVyZmFjZVxuICAgKi9cbiAgcHJpdmF0ZSBfY2hhbmdlcyA9IG5ldyBTdWJqZWN0PFtudW1iZXIsIG51bWJlcl0+KCk7XG4gIC8vIFdlIGRvIG5vdCB3YW50IHRvIGV4cG9zZSB0aGUgU3ViamVjdCBpdHNlbGYsIGJ1dCB0aGUgT2JzZXJ2YWJsZSB3aGljaCBpcyByZWFkLW9ubHlcbiAgcHVibGljIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8W251bWJlciwgbnVtYmVyXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVybmFsIHZhbHVlcyBhbmQgYWNjZXNzb3JcbiAgICovXG4gIHByaXZhdGUgX2xvdzogbnVtYmVyID0gbnVsbDtcbiAgcHJpdmF0ZSBfaGlnaDogbnVtYmVyID0gbnVsbDtcblxuICAvKipcbiAgICogQ29tbW9uIHNldHRlcnMgZm9yIHRoZSBpbnB1dCB2YWx1ZXMsIGluY2x1ZGluZyBpbmRpdmlkdWFsIGxpbWl0cyBhbmRcbiAgICogYm90aCBhdCB0aGUgc2FtZSB0aW1lLiAgVmFsdWUgaXMgc2luZ3VsYXIgdG8gbWFrZSB0aGUgaW50ZXJmYWNlIHNpbWlsYXJcbiAgICogdG8gdGhlIGJ1aWx0LWluIHN0cmluZyBmaWx0ZXIuXG4gICAqL1xuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFt0aGlzLl9sb3csIHRoaXMuX2hpZ2hdO1xuICB9XG5cbiAgcHVibGljIHNldCB2YWx1ZSh2YWxzOiBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgY29uc3QgbG93ID0gdmFsc1swXTtcbiAgICBjb25zdCBoaWdoID0gdmFsc1sxXTtcbiAgICBpZiAobG93ICE9PSB0aGlzLl9sb3cgfHwgaGlnaCAhPT0gdGhpcy5faGlnaCkge1xuICAgICAgdGhpcy5fbG93ID0gbG93O1xuICAgICAgdGhpcy5faGlnaCA9IGhpZ2g7XG4gICAgICB0aGlzLl9jaGFuZ2VzLm5leHQoW3RoaXMuX2xvdywgdGhpcy5faGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgbG93KGxvdzogbnVtYmVyKSB7XG4gICAgaWYgKGxvdyAhPT0gdGhpcy5fbG93KSB7XG4gICAgICB0aGlzLl9sb3cgPSBsb3c7XG4gICAgICB0aGlzLl9jaGFuZ2VzLm5leHQoW3RoaXMuX2xvdywgdGhpcy5faGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGlnaChoaWdoOiBudW1iZXIpIHtcbiAgICBpZiAoaGlnaCAhPT0gdGhpcy5faGlnaCkge1xuICAgICAgdGhpcy5faGlnaCA9IGhpZ2g7XG4gICAgICB0aGlzLl9jaGFuZ2VzLm5leHQoW3RoaXMuX2xvdywgdGhpcy5faGlnaF0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9sb3c7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhpZ2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZ2g7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBmaWx0ZXIgaXMgY3VycmVudGx5IGFjdGl2ZSwgKGF0IGxlYXN0IG9uZSBpbnB1dCBpcyBzZXQpXG4gICAqL1xuICBwdWJsaWMgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvdyAhPT0gbnVsbCB8fCB0aGlzLmhpZ2ggIT09IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVGVzdHMgaWYgYW4gaXRlbSBtYXRjaGVzIGEgc2VhcmNoIHRleHRcbiAgICovXG4gIHB1YmxpYyBhY2NlcHRzKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICAvLyBXZSBoYXZlIGEgZmlsdGVyIGZ1bmN0aW9uIGluIGNhc2Ugc29tZW9uZSB3YW50cyB0byBpbXBsZW1lbnQgYSBudW1lcmljXG4gICAgLy8gZmlsdGVyIHRoYXQgYWx3YXlzIHBhc3NlcyBudWxscyBvciBzaW1pbGFyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRm4uYWNjZXB0cyhpdGVtLCB0aGlzLl9sb3csIHRoaXMuX2hpZ2gpO1xuICB9XG5cbiAgcHVibGljIGdldCBzdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5maWx0ZXJGbiBpbnN0YW5jZW9mIERhdGFncmlkUHJvcGVydHlOdW1lcmljRmlsdGVyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9wZXJ0eTogdGhpcy5maWx0ZXJGbi5wcm9wLFxuICAgICAgICAvLyBUT0RPOiBTaG91bGQgdGhpcyByZXR1cm4gdmFsdWU6IFt0aGlzLl9sb3csIHRoaXMuX2hpZ2hdIGluc3RlYWQ/XG4gICAgICAgIGxvdzogdGhpcy5fbG93LFxuICAgICAgICBoaWdoOiB0aGlzLl9oaWdoLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKG90aGVyOiBDbHJEYXRhZ3JpZEZpbHRlckludGVyZmFjZTxULCBhbnk+KTogYm9vbGVhbiB7XG4gICAgaWYgKG90aGVyIGluc3RhbmNlb2YgRGF0YWdyaWROdW1lcmljRmlsdGVySW1wbCkge1xuICAgICAgaWYgKG90aGVyLmZpbHRlckZuIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0aGlzLmZpbHRlckZuIGluc3RhbmNlb2YgRGF0YWdyaWRQcm9wZXJ0eU51bWVyaWNGaWx0ZXIgJiZcbiAgICAgICAgICBvdGhlci5maWx0ZXJGbi5wcm9wID09PSB0aGlzLmZpbHRlckZuLnByb3AgJiZcbiAgICAgICAgICBvdGhlci5sb3cgPT09IHRoaXMuX2xvdyAmJlxuICAgICAgICAgIG90aGVyLmhpZ2ggPT09IHRoaXMuX2hpZ2hcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==