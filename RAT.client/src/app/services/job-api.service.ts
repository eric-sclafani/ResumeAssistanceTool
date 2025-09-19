import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class JobApiService {
    private readonly jobApiUrl = ' http://localhost:5221/api/Job/';
    private readonly http = inject(HttpClient);
}
