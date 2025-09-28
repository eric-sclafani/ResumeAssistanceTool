import {
    Component,
    computed,
    inject,
    input,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewJobForm } from '../../forms/newJob';
import { JobApiService } from '../../services/job-api.service';
import Job from '../../models/job';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { Subject, takeUntil } from 'rxjs';
import { DynamicInputComponent } from '../../components/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from '../../components/dynamic-textarea/dynamic-textarea.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
    selector: 'app-add-edit-job',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        JobCardComponent,
        DynamicInputComponent,
        DynamicTextareaComponent,
    ],
    templateUrl: './add-edit-job.component.html',
    styleUrl: './add-edit-job.component.scss',
})
export class AddEditJobComponent implements OnInit, OnDestroy {
    private readonly jobApiService = inject(JobApiService);
    private readonly snackbarService = inject(SnackbarService);
    private readonly destroy$ = new Subject<void>();

    mode = input.required<'add' | 'edit'>();
    jobId = input(0);
    headerMsg = computed<string>(() =>
        this.mode() == 'add' ? 'Adding New' : 'Editing',
    );

    fg: FormGroup<NewJobForm>;
    jobDisplay = signal<Job>(new Job());

    ngOnInit(): void {
        this.initFormGroup();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit() {
        const fgValues = this.fg.getRawValue();
        const skills = this.parseSkills();

        const job: Job = {
            jobId: 0,
            title: fgValues.title,
            description: fgValues.description,
            skills: skills,
            jobUrl: fgValues.jobUrl,
        };
        this.jobApiService.saveJob(job).subscribe((result) => {
            if (result.success) {
                this.snackbarService.sucess('Job successfully created.');
            }
        });
    }

    private parseSkills(): string[] {
        let skills: string[] = [];
        const skillString = this.fg.controls.skills.value;
        if (skillString != null) {
            skills = skillString.split(',');
        }
        return skills;
    }

    private initFormGroup(): void {
        this.fg = new FormGroup<NewJobForm>({
            title: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required]),
            skills: new FormControl(null, [Validators.required]),
            jobUrl: new FormControl(null, [Validators.required]),
        });

        this.fg.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((values) => {
                this.jobDisplay.set({
                    title: values.title,
                    description: values.description,
                    skills: values.skills,
                    jobUrl: values.jobUrl,
                } as Job);
            });
    }
}
