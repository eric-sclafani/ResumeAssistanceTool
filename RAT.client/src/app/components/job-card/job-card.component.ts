import { Component, input } from '@angular/core';
import Job from '../../models/job';

@Component({
    selector: 'app-job-card',
    imports: [],
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
    job = input.required<Job>();
}
