import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Job from '../models/job';
import Result from '../models/result';

@Injectable({
    providedIn: 'root',
})
export class JobApiService {
    private readonly jobApiUrl = 'http://localhost:5221/api/Job/';
    private readonly http = inject(HttpClient);

    saveJob(job: Job) {
        return this.http.post<Result<Job>>(this.jobApiUrl + `SaveNewJob`, job);
    }
}
