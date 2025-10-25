import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import JobDto from '../../dtos/jobDto ';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
    imports: [JobCardComponent, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
    private readonly dataService = inject(DataService);
    jobs$: Observable<JobDto[]>;
    refreshData$: Subject<void>;
    destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnInit(): void {
        this.jobs$ = this.dataService.jobs$;
        this.refreshData$ = this.dataService.refreshData$;

        this.dataService.applyFilter$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.jobs$ = this.dataService.jobs$;
            });
    }
}
