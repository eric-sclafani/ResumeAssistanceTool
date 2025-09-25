import { Component, inject, input, output } from '@angular/core';
import Job from '../../models/job';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { JobApiService } from '../../services/job-api.service';

@Component({
    selector: 'app-job-card',
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
    private readonly jobApiService = inject(JobApiService);
    job = input.required<Job>();

    onDelete() {
        this.jobApiService.deleteJob(this.job().jobId).subscribe((result) => {
            if (result.success) {
                // tell parent to refetch data. I think I should use shared data storage service?
            }
        });
    }
}
