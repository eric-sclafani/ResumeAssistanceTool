import { inject, Injectable } from '@angular/core';
import { JobApiService } from './job-api.service';
import {
    filter,
    map,
    Observable,
    startWith,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import JobDto from '../dtos/jobDto ';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private readonly apiService = inject(JobApiService);

    jobs$: Observable<JobDto[]>;
    refreshData$ = new Subject<void>();
    applyFilter$ = new Subject<void>();

    constructor() {
        this.setInitData();
    }

    private setInitData() {
        this.jobs$ = this.refreshData$.pipe(
            startWith(0),
            switchMap(() => this.apiService.getAllJobs()),
            map((jobs) => jobs.sort((a, b) => a.jobId - b.jobId)),
        );
        this.refreshData$.next();
    }

    public applyFilter(skills = '', title = '') {
        this.jobs$ = this.refreshData$.pipe(
            startWith(0),
            switchMap(() => this.apiService.getAllJobs()),
            map((jobs) =>
                jobs.filter(
                    (j) =>
                        this.checkSkills(j.skills, skills) &&
                        this.checkTitle(j.title, title),
                ),
            ),
            tap((j) => console.log(`Filtered: ${j.length}`)),
        );
        this.applyFilter$.next();
    }

    private checkSkills(
        skills: string[] | null,
        searchString: string | null,
    ): boolean {
        let result = true;
        if (skills && searchString) {
            const skillString = skills.join(',').toLowerCase();
            return skillString.includes(searchString.toLowerCase());
        }
        return result;
    }

    private checkTitle(
        title: string | null,
        searchString: string | null,
    ): boolean {
        let result = true;
        if (title && searchString) {
            return title.toLowerCase().includes(searchString.toLowerCase());
        }
        return result;
    }

    public triggerRefesh() {
        this.refreshData$.next();
    }
}
