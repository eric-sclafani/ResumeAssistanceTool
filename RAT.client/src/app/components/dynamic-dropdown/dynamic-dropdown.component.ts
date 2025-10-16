import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-dynamic-dropdown',
    imports: [ReactiveFormsModule],
    templateUrl: './dynamic-dropdown.component.html',
    styleUrl: './dynamic-dropdown.component.scss',
})
export class DynamicDropdownComponent {
    label = input.required<string>();
    controlName = input.required<string>();
    formGroup = input.required<FormGroup<any>>();
    options = input.required<string[]>();
    dynamicWidth = input('500px');
}
