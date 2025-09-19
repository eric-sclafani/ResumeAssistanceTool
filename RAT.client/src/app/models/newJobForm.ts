import { FormControl } from '@angular/forms';
import Job from './job';

export interface NewJobForm {
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    skills: FormControl<string | null>;
    organizationName: FormControl<string | null>;
    jobUrl: FormControl<string | null>;
}
