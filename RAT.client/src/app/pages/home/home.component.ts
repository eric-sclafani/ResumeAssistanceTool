import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Job from '../../models/job';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { concatMap, Observable, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { JobApiService } from '../../services/job-api.service';

@Component({
    imports: [RouterLink, JobCardComponent, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private readonly jobApiService = inject(JobApiService);
    jobs$: Observable<Job[]>;
    refreshData = new Subject<void>();

    ngOnInit(): void {
        this.jobs$ = this.refreshData.pipe(
            startWith(0),
            switchMap(() => this.jobApiService.getAllJobs()),
        );
        this.refreshData.next();
    }
}
