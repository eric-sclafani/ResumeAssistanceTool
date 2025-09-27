import { Component, input } from '@angular/core';

@Component({
    selector: 'app-dynamic-textarea',
    imports: [],
    templateUrl: './dynamic-textarea.component.html',
    styleUrl: './dynamic-textarea.component.scss',
})
export class DynamicTextareaComponent {
    label = input.required<string>();
}
