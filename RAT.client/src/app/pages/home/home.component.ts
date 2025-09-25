import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Job from '../../models/job';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { Observable } from 'rxjs';
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

    ngOnInit(): void {
        this.jobs$ = this.jobApiService.getAllJobs();
    }
}
