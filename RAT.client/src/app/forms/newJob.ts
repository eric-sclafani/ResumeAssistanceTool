import { FormControl } from '@angular/forms';

export interface NewJobForm {
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    skills: FormControl<string | null>;
    jobUrl: FormControl<string | null>;
}
