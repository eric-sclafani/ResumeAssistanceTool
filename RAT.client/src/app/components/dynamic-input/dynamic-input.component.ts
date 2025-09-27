import { Component, input } from '@angular/core';

@Component({
    selector: 'app-dynamic-input',
    imports: [],
    templateUrl: './dynamic-input.component.html',
    styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent {
    label = input.required<string>();
}
