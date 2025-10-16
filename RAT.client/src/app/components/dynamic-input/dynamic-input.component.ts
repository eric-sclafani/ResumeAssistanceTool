import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-dynamic-input',
    imports: [ReactiveFormsModule],
    templateUrl: './dynamic-input.component.html',
    styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent {
    label = input.required<string>();
    controlName = input.required<string>();
    formGroup = input.required<FormGroup<any>>();
    dynamicWidth = input('500px');
}
