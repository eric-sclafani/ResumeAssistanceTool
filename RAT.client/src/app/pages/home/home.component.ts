import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Job from '../../models/job';

@Component({
    imports: [RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    jobs: Job[] = [];
}
