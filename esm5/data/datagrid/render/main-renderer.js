import * as tslib_1 from "tslib";
/*
 * Copyright (c) 2016-2018 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, PLATFORM_ID, QueryList, Renderer2, } from '@angular/core';
import { DatagridRenderStep } from '../enums/render-step.enum';
import { Items } from '../providers/items';
import { Page } from '../providers/page';
import { TableSizeService } from '../providers/table-size.service';
import { DomAdapter } from '../../../utils/dom-adapter/dom-adapter';
import { DatagridHeaderRenderer } from './header-renderer';
import { NoopDomAdapter } from './noop-dom-adapter';
import { DatagridRenderOrganizer } from './render-organizer';
import { ColumnsService } from '../providers/columns.service';
import { DatagridColumnChanges } from '../enums/column-changes.enum';
import { DatagridRowRenderer } from './row-renderer';
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
export var domAdapterFactory = function (platformId) {
    if (isPlatformBrowser(platformId)) {
        return new DomAdapter();
    }
    else {
        return new NoopDomAdapter();
    }
};
// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
var DatagridMainRenderer = /** @class */ (function () {
    function DatagridMainRenderer(organizer, items, page, domAdapter, el, renderer, tableSizeService, columnsService) {
        var _this = this;
        this.organizer = organizer;
        this.items = items;
        this.page = page;
        this.domAdapter = domAdapter;
        this.el = el;
        this.renderer = renderer;
        this.tableSizeService = tableSizeService;
        this.columnsService = columnsService;
        this._heightSet = false;
        this.subscriptions = [];
        /**
         * Indicates if we want to re-compute columns width. This should only happen:
         * 1) When headers change, with columns being added or removed
         * 2) When rows are lazily loaded for the first time
         */
        this.columnsSizesStable = false;
        this.shouldStabilizeColumns = true;
        this.subscriptions.push(this.organizer
            .filterRenderSteps(DatagridRenderStep.COMPUTE_COLUMN_WIDTHS)
            .subscribe(function () { return _this.computeHeadersWidth(); }));
        this.subscriptions.push(this.page.sizeChange.subscribe(function () {
            if (_this._heightSet) {
                _this.resetDatagridHeight();
            }
        }));
        this.subscriptions.push(this.items.change.subscribe(function () { return (_this.shouldStabilizeColumns = true); }));
    }
    DatagridMainRenderer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.setupColumns();
        this.subscriptions.push(this.headers.changes.subscribe(function () {
            // TODO: only re-stabilize if a column was added or removed. Reordering is fine.
            // Need to setup columns before stabalizing them
            _this.setupColumns();
            _this.columnsSizesStable = false;
            _this.stabilizeColumns();
        }));
    };
    // Initialize and set Table width for horizontal scrolling here.
    DatagridMainRenderer.prototype.ngAfterViewInit = function () {
        this.tableSizeService.table = this.el;
    };
    DatagridMainRenderer.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.shouldStabilizeColumns) {
            this.stabilizeColumns();
        }
        if (this.shouldComputeHeight()) {
            setTimeout(function () {
                _this.computeDatagridHeight();
            });
        }
    };
    DatagridMainRenderer.prototype.setupColumns = function () {
        this.headers.forEach(function (header, index) { return header.setColumnState(index); });
        this.columnsService.columns.splice(this.headers.length); // Trim any old columns
        this.rows.forEach(function (row) { return row.setColumnState(); });
    };
    DatagridMainRenderer.prototype.shouldComputeHeight = function () {
        if (!this._heightSet && this.page.size > 0) {
            if (this.items.displayed.length === this.page.size) {
                return true;
            }
        }
        return false;
    };
    /**
     * Computes the height of the datagrid.
     *
     * NOTE: We had to choose to set the height instead of the min-height because
     * IE 11 requires the height on the parent for the children flex grow/shrink properties to work.
     * When we used min-height, 1 1 auto doesn't used to work in IE11 :-(
     * But this doesn't affect the fix. It works in both fixed & variable height datagrids.
     *
     * Refer: http://stackoverflow.com/questions/24396205/flex-grow-not-working-in-internet-explorer-11-0
     */
    DatagridMainRenderer.prototype.computeDatagridHeight = function () {
        // IE doesn't return correct value for getComputedStyle(element).getPropertyValue("height")
        var value = this.domAdapter.clientRect(this.el.nativeElement).height;
        this.renderer.setStyle(this.el.nativeElement, 'height', value + 'px');
        this._heightSet = true;
    };
    DatagridMainRenderer.prototype.resetDatagridHeight = function () {
        this.renderer.setStyle(this.el.nativeElement, 'height', '');
        this._heightSet = false;
    };
    DatagridMainRenderer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * Makes each header compute its width.
     */
    DatagridMainRenderer.prototype.computeHeadersWidth = function () {
        var _this = this;
        var nbColumns = this.headers.length;
        var allStrict = true;
        this.headers.forEach(function (header, index) {
            // On the last header column check whether all columns have strict widths.
            // If all columns have strict widths, remove the strict width from the last column and make it the column's
            // minimum width so that when all previous columns shrink, it will get a flexible width and cover the empty
            // gap in the Datagrid.
            var state = tslib_1.__assign({ changes: [DatagridColumnChanges.WIDTH] }, header.getColumnWidthState());
            if (!state.strictWidth) {
                allStrict = false;
            }
            if (nbColumns === index + 1 && allStrict) {
                state.strictWidth = 0;
            }
            _this.columnsService.emitStateChangeAt(index, state);
        });
    };
    /**
     * Triggers a whole re-rendring cycle to set column sizes, if needed.
     */
    DatagridMainRenderer.prototype.stabilizeColumns = function () {
        this.shouldStabilizeColumns = false;
        if (this.columnsSizesStable) {
            // Nothing to do.
            return;
        }
        // Resize when the rows are loaded.
        if (this.items.displayed.length > 0) {
            this.organizer.resize();
            this.columnsSizesStable = true;
        }
    };
    tslib_1.__decorate([
        ContentChildren(DatagridHeaderRenderer),
        tslib_1.__metadata("design:type", QueryList)
    ], DatagridMainRenderer.prototype, "headers", void 0);
    tslib_1.__decorate([
        ContentChildren(DatagridRowRenderer, { descendants: true }),
        tslib_1.__metadata("design:type", QueryList)
    ], DatagridMainRenderer.prototype, "rows", void 0);
    DatagridMainRenderer = tslib_1.__decorate([
        Directive({
            selector: 'clr-datagrid',
            providers: [{ provide: DomAdapter, useFactory: domAdapterFactory, deps: [PLATFORM_ID] }],
        }),
        tslib_1.__metadata("design:paramtypes", [DatagridRenderOrganizer,
            Items,
            Page,
            DomAdapter,
            ElementRef,
            Renderer2,
            TableSizeService,
            ColumnsService])
    ], DatagridMainRenderer);
    return DatagridMainRenderer;
}());
export { DatagridMainRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbImRhdGEvZGF0YWdyaWQvcmVuZGVyL21haW4tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBSUwsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBRVYsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyRCxvQkFBb0I7QUFDcEIsb0ZBQW9GO0FBQ3BGLE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLFVBQUMsVUFBa0I7SUFDbEQsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNqQyxPQUFPLElBQUksVUFBVSxFQUFFLENBQUM7S0FDekI7U0FBTTtRQUNMLE9BQU8sSUFBSSxjQUFjLEVBQUUsQ0FBQztLQUM3QjtBQUNILENBQUMsQ0FBQztBQUVGLG9CQUFvQjtBQUNwQixvRkFBb0Y7QUFLcEY7SUFDRSw4QkFDVSxTQUFrQyxFQUNsQyxLQUFZLEVBQ1osSUFBVSxFQUNWLFVBQXNCLEVBQ3RCLEVBQWMsRUFDZCxRQUFtQixFQUNuQixnQkFBa0MsRUFDbEMsY0FBOEI7UUFSeEMsaUJBd0JDO1FBdkJTLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQ2xDLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTBEaEMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQWlDNUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBa0MzQzs7OztXQUlHO1FBQ0ssdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLElBQUksQ0FBQztRQWxJcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxTQUFTO2FBQ1gsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLENBQUM7YUFDM0QsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBMUIsQ0FBMEIsQ0FBQyxDQUMvQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUM3QixJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFNRCxpREFBa0IsR0FBbEI7UUFBQSxpQkFZQztRQVhDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzdCLGdGQUFnRjtZQUNoRixnREFBZ0Q7WUFDaEQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsOENBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsaURBQWtCLEdBQWxCO1FBQUEsaUJBU0M7UUFSQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDOUIsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU8sMkNBQVksR0FBcEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRSxLQUFLLElBQUssT0FBQSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBSU8sa0RBQW1CLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNsRCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSyxvREFBcUIsR0FBN0I7UUFDRSwyRkFBMkY7UUFDM0YsSUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU8sa0RBQW1CLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFJRCwwQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxrREFBbUIsR0FBM0I7UUFBQSxpQkF1QkM7UUF0QkMsSUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDOUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7WUFDakMsMEVBQTBFO1lBQzFFLDJHQUEyRztZQUMzRywyR0FBMkc7WUFDM0csdUJBQXVCO1lBQ3ZCLElBQU0sS0FBSyxzQkFDVCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFDbkMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQ2hDLENBQUM7WUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDdEIsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUNuQjtZQUVELElBQUksU0FBUyxLQUFLLEtBQUssR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUN4QyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUN2QjtZQUVELEtBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVdEOztPQUVHO0lBQ0ssK0NBQWdCLEdBQXhCO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixpQkFBaUI7WUFDakIsT0FBTztTQUNSO1FBQ0QsbUNBQW1DO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBbEl3QztRQUF4QyxlQUFlLENBQUMsc0JBQXNCLENBQUM7MENBQWtCLFNBQVM7eURBQXlCO0lBRTVGO1FBREMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzBDQUM5QyxTQUFTO3NEQUFzQjtJQTdCbEMsb0JBQW9CO1FBSmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztTQUN6RixDQUFDO2lEQUdxQix1QkFBdUI7WUFDM0IsS0FBSztZQUNOLElBQUk7WUFDRSxVQUFVO1lBQ2xCLFVBQVU7WUFDSixTQUFTO1lBQ0QsZ0JBQWdCO1lBQ2xCLGNBQWM7T0FUN0Isb0JBQW9CLENBOEpoQztJQUFELDJCQUFDO0NBQUEsQUE5SkQsSUE4SkM7U0E5Slksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNi0yMDE4IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZS5cbiAqIFRoZSBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24gY2FuIGJlIGZvdW5kIGluIExJQ0VOU0UgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgcHJvamVjdC5cbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBEYXRhZ3JpZFJlbmRlclN0ZXAgfSBmcm9tICcuLi9lbnVtcy9yZW5kZXItc3RlcC5lbnVtJztcbmltcG9ydCB7IEl0ZW1zIH0gZnJvbSAnLi4vcHJvdmlkZXJzL2l0ZW1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9wcm92aWRlcnMvcGFnZSc7XG5pbXBvcnQgeyBUYWJsZVNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXJzL3RhYmxlLXNpemUuc2VydmljZSc7XG5cbmltcG9ydCB7IERvbUFkYXB0ZXIgfSBmcm9tICcuLi8uLi8uLi91dGlscy9kb20tYWRhcHRlci9kb20tYWRhcHRlcic7XG5pbXBvcnQgeyBEYXRhZ3JpZEhlYWRlclJlbmRlcmVyIH0gZnJvbSAnLi9oZWFkZXItcmVuZGVyZXInO1xuaW1wb3J0IHsgTm9vcERvbUFkYXB0ZXIgfSBmcm9tICcuL25vb3AtZG9tLWFkYXB0ZXInO1xuaW1wb3J0IHsgRGF0YWdyaWRSZW5kZXJPcmdhbml6ZXIgfSBmcm9tICcuL3JlbmRlci1vcmdhbml6ZXInO1xuaW1wb3J0IHsgQ29sdW1uc1NlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlcnMvY29sdW1ucy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFncmlkQ29sdW1uQ2hhbmdlcyB9IGZyb20gJy4uL2VudW1zL2NvbHVtbi1jaGFuZ2VzLmVudW0nO1xuaW1wb3J0IHsgRGF0YWdyaWRSb3dSZW5kZXJlciB9IGZyb20gJy4vcm93LXJlbmRlcmVyJztcbmltcG9ydCB7IENvbHVtblN0YXRlRGlmZiB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29sdW1uLXN0YXRlLmludGVyZmFjZSc7XG5cbi8vIEZpeGVzIGJ1aWxkIGVycm9yXG4vLyBAZHluYW1pYyAoaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTk2OTgjaXNzdWVjb21tZW50LTMzODM0MDIxMSlcbmV4cG9ydCBjb25zdCBkb21BZGFwdGVyRmFjdG9yeSA9IChwbGF0Zm9ybUlkOiBPYmplY3QpID0+IHtcbiAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpKSB7XG4gICAgcmV0dXJuIG5ldyBEb21BZGFwdGVyKCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBOb29wRG9tQWRhcHRlcigpO1xuICB9XG59O1xuXG4vLyBGaXhlcyBidWlsZCBlcnJvclxuLy8gQGR5bmFtaWMgKGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE5Njk4I2lzc3VlY29tbWVudC0zMzgzNDAyMTEpXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdjbHItZGF0YWdyaWQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERvbUFkYXB0ZXIsIHVzZUZhY3Rvcnk6IGRvbUFkYXB0ZXJGYWN0b3J5LCBkZXBzOiBbUExBVEZPUk1fSURdIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhZ3JpZE1haW5SZW5kZXJlcjxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgb3JnYW5pemVyOiBEYXRhZ3JpZFJlbmRlck9yZ2FuaXplcixcbiAgICBwcml2YXRlIGl0ZW1zOiBJdGVtcyxcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBkb21BZGFwdGVyOiBEb21BZGFwdGVyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdGFibGVTaXplU2VydmljZTogVGFibGVTaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNvbHVtbnNTZXJ2aWNlOiBDb2x1bW5zU2VydmljZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMub3JnYW5pemVyXG4gICAgICAgIC5maWx0ZXJSZW5kZXJTdGVwcyhEYXRhZ3JpZFJlbmRlclN0ZXAuQ09NUFVURV9DT0xVTU5fV0lEVEhTKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29tcHV0ZUhlYWRlcnNXaWR0aCgpKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMucGFnZS5zaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9oZWlnaHRTZXQpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RGF0YWdyaWRIZWlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuaXRlbXMuY2hhbmdlLnN1YnNjcmliZSgoKSA9PiAodGhpcy5zaG91bGRTdGFiaWxpemVDb2x1bW5zID0gdHJ1ZSkpKTtcbiAgfVxuXG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRIZWFkZXJSZW5kZXJlcikgcHJpdmF0ZSBoZWFkZXJzOiBRdWVyeUxpc3Q8RGF0YWdyaWRIZWFkZXJSZW5kZXJlcj47XG4gIEBDb250ZW50Q2hpbGRyZW4oRGF0YWdyaWRSb3dSZW5kZXJlciwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBwcml2YXRlIHJvd3M6IFF1ZXJ5TGlzdDxEYXRhZ3JpZFJvd1JlbmRlcmVyPjsgLy8gaWYgZXhwYW5kYWJsZSByb3cgaXMgZXhwYW5kZWQgaW5pdGlhbGx5LCBxdWVyeSBpdHMgY2VsbHMgdG9vLlxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnNldHVwQ29sdW1ucygpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmhlYWRlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvLyBUT0RPOiBvbmx5IHJlLXN0YWJpbGl6ZSBpZiBhIGNvbHVtbiB3YXMgYWRkZWQgb3IgcmVtb3ZlZC4gUmVvcmRlcmluZyBpcyBmaW5lLlxuICAgICAgICAvLyBOZWVkIHRvIHNldHVwIGNvbHVtbnMgYmVmb3JlIHN0YWJhbGl6aW5nIHRoZW1cbiAgICAgICAgdGhpcy5zZXR1cENvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFiaWxpemVDb2x1bW5zKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBJbml0aWFsaXplIGFuZCBzZXQgVGFibGUgd2lkdGggZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGhlcmUuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRhYmxlU2l6ZVNlcnZpY2UudGFibGUgPSB0aGlzLmVsO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMpIHtcbiAgICAgIHRoaXMuc3RhYmlsaXplQ29sdW1ucygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRDb21wdXRlSGVpZ2h0KCkpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cENvbHVtbnMoKSB7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IGhlYWRlci5zZXRDb2x1bW5TdGF0ZShpbmRleCkpO1xuICAgIHRoaXMuY29sdW1uc1NlcnZpY2UuY29sdW1ucy5zcGxpY2UodGhpcy5oZWFkZXJzLmxlbmd0aCk7IC8vIFRyaW0gYW55IG9sZCBjb2x1bW5zXG4gICAgdGhpcy5yb3dzLmZvckVhY2gocm93ID0+IHJvdy5zZXRDb2x1bW5TdGF0ZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hlaWdodFNldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc2hvdWxkQ29tcHV0ZUhlaWdodCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX2hlaWdodFNldCAmJiB0aGlzLnBhZ2Uuc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLml0ZW1zLmRpc3BsYXllZC5sZW5ndGggPT09IHRoaXMucGFnZS5zaXplKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGF0YWdyaWQuXG4gICAqXG4gICAqIE5PVEU6IFdlIGhhZCB0byBjaG9vc2UgdG8gc2V0IHRoZSBoZWlnaHQgaW5zdGVhZCBvZiB0aGUgbWluLWhlaWdodCBiZWNhdXNlXG4gICAqIElFIDExIHJlcXVpcmVzIHRoZSBoZWlnaHQgb24gdGhlIHBhcmVudCBmb3IgdGhlIGNoaWxkcmVuIGZsZXggZ3Jvdy9zaHJpbmsgcHJvcGVydGllcyB0byB3b3JrLlxuICAgKiBXaGVuIHdlIHVzZWQgbWluLWhlaWdodCwgMSAxIGF1dG8gZG9lc24ndCB1c2VkIHRvIHdvcmsgaW4gSUUxMSA6LShcbiAgICogQnV0IHRoaXMgZG9lc24ndCBhZmZlY3QgdGhlIGZpeC4gSXQgd29ya3MgaW4gYm90aCBmaXhlZCAmIHZhcmlhYmxlIGhlaWdodCBkYXRhZ3JpZHMuXG4gICAqXG4gICAqIFJlZmVyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0Mzk2MjA1L2ZsZXgtZ3Jvdy1ub3Qtd29ya2luZy1pbi1pbnRlcm5ldC1leHBsb3Jlci0xMS0wXG4gICAqL1xuICBwcml2YXRlIGNvbXB1dGVEYXRhZ3JpZEhlaWdodCgpIHtcbiAgICAvLyBJRSBkb2Vzbid0IHJldHVybiBjb3JyZWN0IHZhbHVlIGZvciBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gdGhpcy5kb21BZGFwdGVyLmNsaWVudFJlY3QodGhpcy5lbC5uYXRpdmVFbGVtZW50KS5oZWlnaHQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCB2YWx1ZSArICdweCcpO1xuICAgIHRoaXMuX2hlaWdodFNldCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RGF0YWdyaWRIZWlnaHQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnJyk7XG4gICAgdGhpcy5faGVpZ2h0U2V0ID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlcyBlYWNoIGhlYWRlciBjb21wdXRlIGl0cyB3aWR0aC5cbiAgICovXG4gIHByaXZhdGUgY29tcHV0ZUhlYWRlcnNXaWR0aCgpIHtcbiAgICBjb25zdCBuYkNvbHVtbnM6IG51bWJlciA9IHRoaXMuaGVhZGVycy5sZW5ndGg7XG4gICAgbGV0IGFsbFN0cmljdCA9IHRydWU7XG4gICAgdGhpcy5oZWFkZXJzLmZvckVhY2goKGhlYWRlciwgaW5kZXgpID0+IHtcbiAgICAgIC8vIE9uIHRoZSBsYXN0IGhlYWRlciBjb2x1bW4gY2hlY2sgd2hldGhlciBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMuXG4gICAgICAvLyBJZiBhbGwgY29sdW1ucyBoYXZlIHN0cmljdCB3aWR0aHMsIHJlbW92ZSB0aGUgc3RyaWN0IHdpZHRoIGZyb20gdGhlIGxhc3QgY29sdW1uIGFuZCBtYWtlIGl0IHRoZSBjb2x1bW4nc1xuICAgICAgLy8gbWluaW11bSB3aWR0aCBzbyB0aGF0IHdoZW4gYWxsIHByZXZpb3VzIGNvbHVtbnMgc2hyaW5rLCBpdCB3aWxsIGdldCBhIGZsZXhpYmxlIHdpZHRoIGFuZCBjb3ZlciB0aGUgZW1wdHlcbiAgICAgIC8vIGdhcCBpbiB0aGUgRGF0YWdyaWQuXG4gICAgICBjb25zdCBzdGF0ZTogQ29sdW1uU3RhdGVEaWZmID0ge1xuICAgICAgICBjaGFuZ2VzOiBbRGF0YWdyaWRDb2x1bW5DaGFuZ2VzLldJRFRIXSxcbiAgICAgICAgLi4uaGVhZGVyLmdldENvbHVtbldpZHRoU3RhdGUoKSxcbiAgICAgIH07XG5cbiAgICAgIGlmICghc3RhdGUuc3RyaWN0V2lkdGgpIHtcbiAgICAgICAgYWxsU3RyaWN0ID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYkNvbHVtbnMgPT09IGluZGV4ICsgMSAmJiBhbGxTdHJpY3QpIHtcbiAgICAgICAgc3RhdGUuc3RyaWN0V2lkdGggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbHVtbnNTZXJ2aWNlLmVtaXRTdGF0ZUNoYW5nZUF0KGluZGV4LCBzdGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHdlIHdhbnQgdG8gcmUtY29tcHV0ZSBjb2x1bW5zIHdpZHRoLiBUaGlzIHNob3VsZCBvbmx5IGhhcHBlbjpcbiAgICogMSkgV2hlbiBoZWFkZXJzIGNoYW5nZSwgd2l0aCBjb2x1bW5zIGJlaW5nIGFkZGVkIG9yIHJlbW92ZWRcbiAgICogMikgV2hlbiByb3dzIGFyZSBsYXppbHkgbG9hZGVkIGZvciB0aGUgZmlyc3QgdGltZVxuICAgKi9cbiAgcHJpdmF0ZSBjb2x1bW5zU2l6ZXNTdGFibGUgPSBmYWxzZTtcblxuICBwcml2YXRlIHNob3VsZFN0YWJpbGl6ZUNvbHVtbnMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIHdob2xlIHJlLXJlbmRyaW5nIGN5Y2xlIHRvIHNldCBjb2x1bW4gc2l6ZXMsIGlmIG5lZWRlZC5cbiAgICovXG4gIHByaXZhdGUgc3RhYmlsaXplQ29sdW1ucygpIHtcbiAgICB0aGlzLnNob3VsZFN0YWJpbGl6ZUNvbHVtbnMgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUpIHtcbiAgICAgIC8vIE5vdGhpbmcgdG8gZG8uXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFJlc2l6ZSB3aGVuIHRoZSByb3dzIGFyZSBsb2FkZWQuXG4gICAgaWYgKHRoaXMuaXRlbXMuZGlzcGxheWVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub3JnYW5pemVyLnJlc2l6ZSgpO1xuICAgICAgdGhpcy5jb2x1bW5zU2l6ZXNTdGFibGUgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19