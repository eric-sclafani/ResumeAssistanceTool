import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import JobDto from '../../dtos/jobDto ';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
    imports: [JobCardComponent, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private readonly dataService = inject(DataService);
    jobs$: Observable<JobDto[]>;
    refreshData$: Subject<void>;

    ngOnInit(): void {
        this.jobs$ = this.dataService.jobs$;
        this.refreshData$ = this.dataService.refreshData$;
    }
}
