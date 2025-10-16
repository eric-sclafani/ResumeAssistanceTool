import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { JobFilter } from '../../forms/jobFilter';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
@Component({
    selector: 'app-side-nav',
    imports: [RouterLink, DynamicInputComponent, ReactiveFormsModule],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit, OnDestroy {
    private readonly router = inject(Router);
    private readonly destroy$ = new Subject<void>();

    currentPage: string;
    fg: FormGroup<JobFilter>;

    ngOnInit(): void {
        this.initForm();
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentPage = event.urlAfterRedirects;
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initForm() {
        this.fg = new FormGroup<JobFilter>({
            title: new FormControl(null),
            description: new FormControl(null),
            skills: new FormControl(null),
        });
    }
}
