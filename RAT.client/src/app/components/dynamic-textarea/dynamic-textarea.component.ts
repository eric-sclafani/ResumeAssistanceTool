import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewJobForm } from '../../forms/newJob';

@Component({
    selector: 'app-dynamic-textarea',
    imports: [ReactiveFormsModule],
    templateUrl: './dynamic-textarea.component.html',
    styleUrl: './dynamic-textarea.component.scss',
})
export class DynamicTextareaComponent {
    label = input.required<string>();
    controlName = input.required<string>();
    formGroup = input.required<FormGroup<NewJobForm>>();
}
