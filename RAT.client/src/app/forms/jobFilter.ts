import { FormControl } from '@angular/forms';

export interface JobFilter {
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    skills: FormControl<string | null>;
}
