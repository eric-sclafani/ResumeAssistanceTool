import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    private readonly snackbar = inject(MatSnackBar);

    sucess(message: string, duration = 3000): void {
        this.showSnackbar(message, duration, 'snackbar-success');
    }

    error(message: string, duration = 3000): void {
        this.showSnackbar(message, duration, 'snackbar-error');
    }

    private showSnackbar(
        message: string,
        duration: number,
        panelClass: string,
    ): void {
        this.snackbar.open(message, 'Dismiss', {
            duration: duration,
            panelClass: panelClass,
            verticalPosition: 'top',
        });
    }
}
