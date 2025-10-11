import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import JobDto from '../dtos/jobDto ';
import Result from '../models/result';

@Injectable({
    providedIn: 'root',
})
export class JobApiService {
    private readonly apiUrl = 'http://localhost:5221/api/Job/';
    private readonly http = inject(HttpClient);

    saveJob(job: JobDto) {
        return this.http.post<Result<JobDto>>(this.apiUrl + `SaveNewJob`, job);
    }

    editJob(job: JobDto) {
        return this.http.post<Result<JobDto>>(this.apiUrl + `EditJob`, job);
    }

    getAllJobs() {
        return this.http.get<JobDto[]>(this.apiUrl + 'GetAllJobs');
    }

    getJobById(jobId: number) {
        return this.http.get<JobDto>(this.apiUrl + `GetJobByID?jobId=${jobId}`);
    }

    deleteJob(jobId: number) {
        return this.http.delete<Result<JobDto>>(
            this.apiUrl + `DeleteJob?jobId=${jobId}`,
        );
    }
}
