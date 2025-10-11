import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import JobDto from '../../dtos/jobDto ';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import {
    concatMap,
    map,
    Observable,
    startWith,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { JobApiService } from '../../services/job-api.service';

@Component({
    imports: [RouterLink, JobCardComponent, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private readonly jobApiService = inject(JobApiService);
    jobs$: Observable<JobDto[]>;
    refreshData = new Subject<void>();

    ngOnInit(): void {
        this.jobs$ = this.refreshData.pipe(
            startWith(0),
            switchMap(() => this.jobApiService.getAllJobs()),
            map((jobs) => jobs.sort((a, b) => a.jobId - b.jobId)),
        );
        this.refreshData.next();
    }
}
