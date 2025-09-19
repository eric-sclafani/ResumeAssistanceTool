import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddNewJobComponent } from './pages/add-new-job/add-new-job.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'newjob', component: AddNewJobComponent },
    { path: '**', redirectTo: 'home' },
];
