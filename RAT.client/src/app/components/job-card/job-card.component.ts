import {
    Component,
    computed,
    inject,
    input,
    model,
    OnInit,
    output,
} from '@angular/core';
import JobDto from '../../dtos/jobDto ';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { JobApiService } from '../../services/job-api.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-job-card',
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.scss',
})
export class JobCardComponent implements OnInit {
    private readonly jobApiService = inject(JobApiService);
    private readonly router = inject(Router);
    job = input.required<JobDto>();
    triggerRefresh = model(new Subject<void>());
    isAddingNew = computed<boolean>(() => this.job().jobId == undefined);

    ngOnInit(): void {}

    onEdit() {
        this.router.navigateByUrl(`job/edit/${this.job().jobId}`);
    }

    onDelete() {
        this.jobApiService.deleteJob(this.job().jobId).subscribe((result) => {
            if (result.success) {
                console.log('Job successfully deleted');
                this.triggerRefresh().next();
            }
        });
    }
}
