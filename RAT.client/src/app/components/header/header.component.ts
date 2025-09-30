import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
    private readonly router = inject(Router);
    private readonly destroy$ = new Subject<void>();

    currentPage: string;

    ngOnInit(): void {
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
}
