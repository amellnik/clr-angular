/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/
import { FormGroup, FormControl } from '@angular/forms';
export function triggerAllFormControlValidation(formGroup) {
    Object.keys(formGroup.controls).forEach(function (field) {
        var control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched();
            control.markAsDirty();
            control.updateValueAndValidity();
        }
        else if (control instanceof FormGroup) {
            triggerAllFormControlValidation(control);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjbHIvYW5ndWxhci8iLCJzb3VyY2VzIjpbInV0aWxzL2Zvcm1zL3ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7RUFJRTtBQUVGLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsTUFBTSxVQUFVLCtCQUErQixDQUFDLFNBQW9CO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7UUFDM0MsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sWUFBWSxXQUFXLEVBQUU7WUFDbEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNsQzthQUFNLElBQUksT0FBTyxZQUFZLFNBQVMsRUFBRTtZQUN2QywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4qIENvcHlyaWdodCAoYykgMjAxNi0yMDE5IFZNd2FyZSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuKiBUaGUgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uIGNhbiBiZSBmb3VuZCBpbiBMSUNFTlNFIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHByb2plY3QuXG4qL1xuXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlckFsbEZvcm1Db250cm9sVmFsaWRhdGlvbihmb3JtR3JvdXA6IEZvcm1Hcm91cCkge1xuICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2wgPSBmb3JtR3JvdXAuZ2V0KGZpZWxkKTtcbiAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH0gZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Hcm91cCkge1xuICAgICAgdHJpZ2dlckFsbEZvcm1Db250cm9sVmFsaWRhdGlvbihjb250cm9sKTtcbiAgICB9XG4gIH0pO1xufVxuIl19