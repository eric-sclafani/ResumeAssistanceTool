import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddEditJobComponent } from './pages/add-edit-job/add-edit-job.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'job/:mode/:jobId', component: AddEditJobComponent },
    { path: '**', redirectTo: 'home' },
];
