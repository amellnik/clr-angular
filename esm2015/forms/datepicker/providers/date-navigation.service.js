/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarModel } from '../model/calendar.model';
import { DayModel } from '../model/day.model';
/**
 * This service is responsible for:
 * 1. Initializing the displayed calendar.
 * 2. Moving the calendar to the next, previous or current months
 * 3. Managing the focused and selected day models.
 */
let DateNavigationService = class DateNavigationService {
    /**
     * This service is responsible for:
     * 1. Initializing the displayed calendar.
     * 2. Moving the calendar to the next, previous or current months
     * 3. Managing the focused and selected day models.
     */
    constructor() {
        /**
         * Variable to store today's date.
         */
        this._todaysFullDate = new Date();
        this._selectedDayChange = new Subject();
        this._displayedCalendarChange = new Subject();
        this._focusOnCalendarChange = new Subject();
        this._focusedDayChange = new Subject();
    }
    get displayedCalendar() {
        return this._displayedCalendar;
    }
    // not a setter because i want this to remain private
    setDisplayedCalendar(value) {
        if (!this._displayedCalendar.isEqual(value)) {
            this._displayedCalendar = value;
            this._displayedCalendarChange.next();
        }
    }
    initializeTodaysDate() {
        this._todaysFullDate = new Date();
        this._today = new DayModel(this._todaysFullDate.getFullYear(), this._todaysFullDate.getMonth(), this._todaysFullDate.getDate());
    }
    get today() {
        return this._today;
    }
    get selectedDayChange() {
        return this._selectedDayChange.asObservable();
    }
    /**
     * Notifies that the selected day has changed so that the date can be emitted to the user.
     * Note: Only to be called from day.ts
     */
    notifySelectedDayChanged(dayModel) {
        this.selectedDay = dayModel;
        this._selectedDayChange.next(dayModel);
    }
    /**
     * Initializes the calendar based on the selected day.
     */
    initializeCalendar() {
        this.focusedDay = null; // Can be removed later on the store focus
        this.initializeTodaysDate();
        if (this.selectedDay) {
            this._displayedCalendar = new CalendarModel(this.selectedDay.year, this.selectedDay.month);
        }
        else {
            this._displayedCalendar = new CalendarModel(this.today.year, this.today.month);
        }
    }
    changeMonth(month) {
        this.setDisplayedCalendar(new CalendarModel(this._displayedCalendar.year, month));
    }
    changeYear(year) {
        this.setDisplayedCalendar(new CalendarModel(year, this._displayedCalendar.month));
    }
    /**
     * Moves the displayed calendar to the next month.
     */
    moveToNextMonth() {
        this.setDisplayedCalendar(this._displayedCalendar.nextMonth());
    }
    /**
     * Moves the displayed calendar to the previous month.
     */
    moveToPreviousMonth() {
        this.setDisplayedCalendar(this._displayedCalendar.previousMonth());
    }
    /**
     * Moves the displayed calendar to the current month and year.
     */
    moveToCurrentMonth() {
        if (!this.displayedCalendar.isDayInCalendar(this.today)) {
            this.setDisplayedCalendar(new CalendarModel(this.today.year, this.today.month));
        }
        this._focusOnCalendarChange.next();
    }
    incrementFocusDay(value) {
        this.focusedDay = this.focusedDay.incrementBy(value);
        if (this._displayedCalendar.isDayInCalendar(this.focusedDay)) {
            this._focusedDayChange.next(this.focusedDay);
        }
        else {
            this.setDisplayedCalendar(this.focusedDay.calendar);
        }
        this._focusOnCalendarChange.next();
    }
    /**
     * This observable lets the subscriber know that the displayed calendar has changed.
     */
    get displayedCalendarChange() {
        return this._displayedCalendarChange.asObservable();
    }
    /**
     * This observable lets the subscriber know that the focus should be applied on the calendar.
     */
    get focusOnCalendarChange() {
        return this._focusOnCalendarChange.asObservable();
    }
    /**
     * This observable lets the subscriber know that the focused day in the displayed calendar has changed.
     */
    get focusedDayChange() {
        return this._focusedDayChange.asObservable();
    }
};
DateNavigationService = tslib_1.__decorate([
    Injectable()
], DateNavigationService);
export { DateNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1uYXZpZ2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2xyL2FuZ3VsYXIvIiwic291cmNlcyI6WyJmb3Jtcy9kYXRlcGlja2VyL3Byb3ZpZGVycy9kYXRlLW5hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHOztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDOzs7OztHQUtHO0FBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFQbEM7Ozs7O09BS0c7SUFDSDtRQWdCRTs7V0FFRztRQUNLLG9CQUFlLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQWtCbkMsdUJBQWtCLEdBQXNCLElBQUksT0FBTyxFQUFZLENBQUM7UUF3RWhFLDZCQUF3QixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzlELDJCQUFzQixHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBUzVELHNCQUFpQixHQUFzQixJQUFJLE9BQU8sRUFBWSxDQUFDO0lBUXpFLENBQUM7SUFuSUMsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQztJQUVELHFEQUFxRDtJQUM3QyxvQkFBb0IsQ0FBQyxLQUFvQjtRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7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LFVBQVUsQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBSUQ7O09BRUc7SUFDSCxJQUFJLHVCQUF1QjtRQUN6QixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBSUQ7O09BRUc7SUFDSCxJQUFJLHFCQUFxQjtRQUN2QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBSUQ7O09BRUc7SUFDSCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0NBQ0YsQ0FBQTtBQXRJWSxxQkFBcUI7SUFEakMsVUFBVSxFQUFFO0dBQ0EscUJBQXFCLENBc0lqQztTQXRJWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuICogVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENhbGVuZGFyTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9jYWxlbmRhci5tb2RlbCc7XG5pbXBvcnQgeyBEYXlNb2RlbCB9IGZyb20gJy4uL21vZGVsL2RheS5tb2RlbCc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvcjpcbiAqIDEuIEluaXRpYWxpemluZyB0aGUgZGlzcGxheWVkIGNhbGVuZGFyLlxuICogMi4gTW92aW5nIHRoZSBjYWxlbmRhciB0byB0aGUgbmV4dCwgcHJldmlvdXMgb3IgY3VycmVudCBtb250aHNcbiAqIDMuIE1hbmFnaW5nIHRoZSBmb2N1c2VkIGFuZCBzZWxlY3RlZCBkYXkgbW9kZWxzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0ZU5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZGlzcGxheWVkQ2FsZW5kYXI6IENhbGVuZGFyTW9kZWw7XG5cbiAgZ2V0IGRpc3BsYXllZENhbGVuZGFyKCk6IENhbGVuZGFyTW9kZWwge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhcjtcbiAgfVxuXG4gIC8vIG5vdCBhIHNldHRlciBiZWNhdXNlIGkgd2FudCB0aGlzIHRvIHJlbWFpbiBwcml2YXRlXG4gIHByaXZhdGUgc2V0RGlzcGxheWVkQ2FsZW5kYXIodmFsdWU6IENhbGVuZGFyTW9kZWwpIHtcbiAgICBpZiAoIXRoaXMuX2Rpc3BsYXllZENhbGVuZGFyLmlzRXF1YWwodmFsdWUpKSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhciA9IHZhbHVlO1xuICAgICAgdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXJDaGFuZ2UubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWYXJpYWJsZSB0byBzdG9yZSB0b2RheSdzIGRhdGUuXG4gICAqL1xuICBwcml2YXRlIF90b2RheXNGdWxsRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHByaXZhdGUgX3RvZGF5OiBEYXlNb2RlbDtcblxuICBwcml2YXRlIGluaXRpYWxpemVUb2RheXNEYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3RvZGF5c0Z1bGxEYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLl90b2RheSA9IG5ldyBEYXlNb2RlbChcbiAgICAgIHRoaXMuX3RvZGF5c0Z1bGxEYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICB0aGlzLl90b2RheXNGdWxsRGF0ZS5nZXRNb250aCgpLFxuICAgICAgdGhpcy5fdG9kYXlzRnVsbERhdGUuZ2V0RGF0ZSgpXG4gICAgKTtcbiAgfVxuXG4gIGdldCB0b2RheSgpOiBEYXlNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZGF5O1xuICB9XG5cbiAgcHVibGljIHNlbGVjdGVkRGF5OiBEYXlNb2RlbDtcblxuICBwcml2YXRlIF9zZWxlY3RlZERheUNoYW5nZTogU3ViamVjdDxEYXlNb2RlbD4gPSBuZXcgU3ViamVjdDxEYXlNb2RlbD4oKTtcblxuICBnZXQgc2VsZWN0ZWREYXlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxEYXlNb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZERheUNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGF0IHRoZSBzZWxlY3RlZCBkYXkgaGFzIGNoYW5nZWQgc28gdGhhdCB0aGUgZGF0ZSBjYW4gYmUgZW1pdHRlZCB0byB0aGUgdXNlci5cbiAgICogTm90ZTogT25seSB0byBiZSBjYWxsZWQgZnJvbSBkYXkudHNcbiAgICovXG4gIG5vdGlmeVNlbGVjdGVkRGF5Q2hhbmdlZChkYXlNb2RlbDogRGF5TW9kZWwpIHtcbiAgICB0aGlzLnNlbGVjdGVkRGF5ID0gZGF5TW9kZWw7XG4gICAgdGhpcy5fc2VsZWN0ZWREYXlDaGFuZ2UubmV4dChkYXlNb2RlbCk7XG4gIH1cblxuICBwdWJsaWMgZm9jdXNlZERheTogRGF5TW9kZWw7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjYWxlbmRhciBiYXNlZCBvbiB0aGUgc2VsZWN0ZWQgZGF5LlxuICAgKi9cbiAgaW5pdGlhbGl6ZUNhbGVuZGFyKCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNlZERheSA9IG51bGw7IC8vIENhbiBiZSByZW1vdmVkIGxhdGVyIG9uIHRoZSBzdG9yZSBmb2N1c1xuICAgIHRoaXMuaW5pdGlhbGl6ZVRvZGF5c0RhdGUoKTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZERheSkge1xuICAgICAgdGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXJNb2RlbCh0aGlzLnNlbGVjdGVkRGF5LnllYXIsIHRoaXMuc2VsZWN0ZWREYXkubW9udGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhciA9IG5ldyBDYWxlbmRhck1vZGVsKHRoaXMudG9kYXkueWVhciwgdGhpcy50b2RheS5tb250aCk7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIobmV3IENhbGVuZGFyTW9kZWwodGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIueWVhciwgbW9udGgpKTtcbiAgfVxuXG4gIGNoYW5nZVllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcihuZXcgQ2FsZW5kYXJNb2RlbCh5ZWFyLCB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5tb250aCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIHRoZSBkaXNwbGF5ZWQgY2FsZW5kYXIgdG8gdGhlIG5leHQgbW9udGguXG4gICAqL1xuICBtb3ZlVG9OZXh0TW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREaXNwbGF5ZWRDYWxlbmRhcih0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhci5uZXh0TW9udGgoKSk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgdGhlIGRpc3BsYXllZCBjYWxlbmRhciB0byB0aGUgcHJldmlvdXMgbW9udGguXG4gICAqL1xuICBtb3ZlVG9QcmV2aW91c01vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIodGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIucHJldmlvdXNNb250aCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIHRvIHRoZSBjdXJyZW50IG1vbnRoIGFuZCB5ZWFyLlxuICAgKi9cbiAgbW92ZVRvQ3VycmVudE1vbnRoKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNwbGF5ZWRDYWxlbmRhci5pc0RheUluQ2FsZW5kYXIodGhpcy50b2RheSkpIHtcbiAgICAgIHRoaXMuc2V0RGlzcGxheWVkQ2FsZW5kYXIobmV3IENhbGVuZGFyTW9kZWwodGhpcy50b2RheS55ZWFyLCB0aGlzLnRvZGF5Lm1vbnRoKSk7XG4gICAgfVxuICAgIHRoaXMuX2ZvY3VzT25DYWxlbmRhckNoYW5nZS5uZXh0KCk7XG4gIH1cblxuICBpbmNyZW1lbnRGb2N1c0RheSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkRGF5ID0gdGhpcy5mb2N1c2VkRGF5LmluY3JlbWVudEJ5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZGlzcGxheWVkQ2FsZW5kYXIuaXNEYXlJbkNhbGVuZGFyKHRoaXMuZm9jdXNlZERheSkpIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWREYXlDaGFuZ2UubmV4dCh0aGlzLmZvY3VzZWREYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERpc3BsYXllZENhbGVuZGFyKHRoaXMuZm9jdXNlZERheS5jYWxlbmRhcik7XG4gICAgfVxuICAgIHRoaXMuX2ZvY3VzT25DYWxlbmRhckNoYW5nZS5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSBsZXRzIHRoZSBzdWJzY3JpYmVyIGtub3cgdGhhdCB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgZ2V0IGRpc3BsYXllZENhbGVuZGFyQ2hhbmdlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDYWxlbmRhckNoYW5nZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZvY3VzT25DYWxlbmRhckNoYW5nZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JzZXJ2YWJsZSBsZXRzIHRoZSBzdWJzY3JpYmVyIGtub3cgdGhhdCB0aGUgZm9jdXMgc2hvdWxkIGJlIGFwcGxpZWQgb24gdGhlIGNhbGVuZGFyLlxuICAgKi9cbiAgZ2V0IGZvY3VzT25DYWxlbmRhckNoYW5nZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9jdXNPbkNhbGVuZGFyQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9jdXNlZERheUNoYW5nZTogU3ViamVjdDxEYXlNb2RlbD4gPSBuZXcgU3ViamVjdDxEYXlNb2RlbD4oKTtcblxuICAvKipcbiAgICogVGhpcyBvYnNlcnZhYmxlIGxldHMgdGhlIHN1YnNjcmliZXIga25vdyB0aGF0IHRoZSBmb2N1c2VkIGRheSBpbiB0aGUgZGlzcGxheWVkIGNhbGVuZGFyIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgZ2V0IGZvY3VzZWREYXlDaGFuZ2UoKTogT2JzZXJ2YWJsZTxEYXlNb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c2VkRGF5Q2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG59XG4iXX0=