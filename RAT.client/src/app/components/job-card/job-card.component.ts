import {
    Component,
    computed,
    inject,
    input,
    model,
    OnInit,
    output,
} from '@angular/core';
import Job from '../../models/job';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { JobApiService } from '../../services/job-api.service';
import { Subject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-job-card',
    imports: [MatIconModule, MatButtonModule, RouterLink],
    templateUrl: './job-card.component.html',
    styleUrl: './job-card.component.scss',
})
export class JobCardComponent implements OnInit {
    private readonly jobApiService = inject(JobApiService);
    job = input.required<Job>();
    triggerRefresh = model(new Subject<void>());
    isAddingNew = computed<boolean>(() => this.job().jobId == undefined);

    ngOnInit(): void {}

    onEdit() {}

    onDelete() {
        this.jobApiService.deleteJob(this.job().jobId).subscribe((result) => {
            if (result.success) {
                console.log('Job successfully deleted');
                this.triggerRefresh().next();
            }
        });
    }
}
