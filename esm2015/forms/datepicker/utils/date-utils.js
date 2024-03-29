/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * Returns the number of days in a month.
 * @param {?} year
 * @param {?} month
 * @return {?}
 */
export function getNumberOfDaysInTheMonth(year, month) {
    // If we go to the next month, but use a day of 0, it returns the last day from the previous month
    return new Date(year, month + 1, 0).getDate();
}
/**
 * Returns the day for the corresponding date where 0 represents Sunday.
 * @param {?} year
 * @param {?} month
 * @param {?} date
 * @return {?}
 */
export function getDay(year, month, date) {
    return new Date(year, month, date).getDay();
}
/**
 * Takes in a year and if it is a 2 digit year, returns the corresponding 4 digit year.
 * Window of 80 years before and 20 years after the present year.
 * Credit: https://github.com/globalizejs/globalize/blob/e1b31cd6a4f1cff75b185b68b7a32220aac5196f/src/date/parse.js
 * @param {?} year
 * @return {?}
 */
export function parseToFourDigitYear(year) {
    if (year > 9999 || (year > 100 && year < 999) || year < 10) {
        return -1;
    }
    if (year > 999) {
        return year;
    }
    /** @type {?} */
    const currYear = new Date().getFullYear();
    /** @type {?} */
    const century = Math.floor(currYear / 100) * 100;
    /** @type {?} */
    let result = year + century;
    if (result > currYear + 20) {
        result = result - 100;
    }
    return result;
}
/**
 * @param {?} date1
 * @param {?} date2
 * @return {?}
 */
export function datesAreEqual(date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    else {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImZvcm1zL2RhdGVwaWNrZXIvdXRpbHMvZGF0ZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxNQUFNLFVBQVUseUJBQXlCLENBQUMsSUFBWSxFQUFFLEtBQWE7SUFDbkUsa0dBQWtHO0lBQ2xHLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDaEQsQ0FBQzs7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsTUFBTSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBWTtJQUM5RCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUMsQ0FBQzs7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsSUFBWTtJQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFO1FBQzFELE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDtJQUNELElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtRQUNkLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O1VBQ0ssUUFBUSxHQUFXLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFOztVQUMzQyxPQUFPLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRzs7UUFDcEQsTUFBTSxHQUFXLElBQUksR0FBRyxPQUFPO0lBQ25DLElBQUksTUFBTSxHQUFHLFFBQVEsR0FBRyxFQUFFLEVBQUU7UUFDMUIsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUM7S0FDdkI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQVcsRUFBRSxLQUFXO0lBQ3BELElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxFQUFFO1FBQ2xELE9BQU8sQ0FDTCxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUMzQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNyQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUNwQyxDQUFDO0tBQ0g7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuXG5pbXBvcnQgeyBXZWVrRGF5IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIG1vbnRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtYmVyT2ZEYXlzSW5UaGVNb250aCh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIpOiBudW1iZXIge1xuICAvLyBJZiB3ZSBnbyB0byB0aGUgbmV4dCBtb250aCwgYnV0IHVzZSBhIGRheSBvZiAwLCBpdCByZXR1cm5zIHRoZSBsYXN0IGRheSBmcm9tIHRoZSBwcmV2aW91cyBtb250aFxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZGF5IGZvciB0aGUgY29ycmVzcG9uZGluZyBkYXRlIHdoZXJlIDAgcmVwcmVzZW50cyBTdW5kYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXkoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBXZWVrRGF5IHtcbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKS5nZXREYXkoKTtcbn1cblxuLyoqXG4gKiBUYWtlcyBpbiBhIHllYXIgYW5kIGlmIGl0IGlzIGEgMiBkaWdpdCB5ZWFyLCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIDQgZGlnaXQgeWVhci5cbiAqIFdpbmRvdyBvZiA4MCB5ZWFycyBiZWZvcmUgYW5kIDIwIHllYXJzIGFmdGVyIHRoZSBwcmVzZW50IHllYXIuXG4gKiBDcmVkaXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9nbG9iYWxpemVqcy9nbG9iYWxpemUvYmxvYi9lMWIzMWNkNmE0ZjFjZmY3NWIxODViNjhiN2EzMjIyMGFhYzUxOTZmL3NyYy9kYXRlL3BhcnNlLmpzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRvRm91ckRpZ2l0WWVhcih5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoeWVhciA+IDk5OTkgfHwgKHllYXIgPiAxMDAgJiYgeWVhciA8IDk5OSkgfHwgeWVhciA8IDEwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIGlmICh5ZWFyID4gOTk5KSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH1cbiAgY29uc3QgY3VyclllYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgY2VudHVyeTogbnVtYmVyID0gTWF0aC5mbG9vcihjdXJyWWVhciAvIDEwMCkgKiAxMDA7XG4gIGxldCByZXN1bHQ6IG51bWJlciA9IHllYXIgKyBjZW50dXJ5O1xuICBpZiAocmVzdWx0ID4gY3VyclllYXIgKyAyMCkge1xuICAgIHJlc3VsdCA9IHJlc3VsdCAtIDEwMDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0ZXNBcmVFcXVhbChkYXRlMTogRGF0ZSwgZGF0ZTI6IERhdGUpIHtcbiAgaWYgKGRhdGUxIGluc3RhbmNlb2YgRGF0ZSAmJiBkYXRlMiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZGF0ZTEuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZTIuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgZGF0ZTEuZ2V0TW9udGgoKSA9PT0gZGF0ZTIuZ2V0TW9udGgoKSAmJlxuICAgICAgZGF0ZTEuZ2V0RGF0ZSgpID09PSBkYXRlMi5nZXREYXRlKClcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19