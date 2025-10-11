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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewJobForm } from '../../forms/newJob';
import { JobApiService } from '../../services/job-api.service';
import JobDto from '../../dtos/jobDto ';
import { JobCardComponent } from '../../components/job-card/job-card.component';
import { Subject, takeUntil } from 'rxjs';
import { DynamicInputComponent } from '../../components/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from '../../components/dynamic-textarea/dynamic-textarea.component';
import { SnackbarService } from '../../services/snackbar.service';
import { Job } from '../../models/job';

@Component({
    selector: 'app-add-edit-job',
    imports: [
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
    private readonly route = inject(ActivatedRoute);
    private readonly destroy$ = new Subject<void>();

    mode = input.required<'add' | 'edit'>();
    jobId = input(0);
    isEditing = computed<boolean>(
        () => this.mode() == 'edit' && this.jobId() != 0,
    );
    headerMsg = computed<string>(() =>
        this.isEditing() ? 'Editing' : 'Adding New',
    );

    fg: FormGroup<NewJobForm>;
    jobDisplay = signal<JobDto>(new JobDto());

    ngOnInit(): void {
        this.initFormGroup();
        console.log(this.jobId());

        if (this.isEditing()) {
            this.jobApiService.getJobById(this.jobId()).subscribe((j) => {
                const job: Job = {
                    jobId: j.jobId,
                    description: j.description,
                    skills: j.skills!.join(','),
                    jobUrl: j.jobUrl,
                    title: j.title,
                };
                this.fg.patchValue(job);
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit() {
        const fgValues = this.fg.getRawValue();
        const skills = this.parseSkills();

        const job: JobDto = {
            jobId: this.isEditing() ? this.jobId() : 0,
            title: fgValues.title,
            description: fgValues.description,
            skills: skills,
            jobUrl: fgValues.jobUrl,
        };

        if (this.isEditing()) {
            this.jobApiService.editJob(job).subscribe((result) => {
                if (result.success) {
                    this.snackbarService.sucess('Job successfully edited.');
                } else {
                    this.snackbarService.error(result.message);
                }
            });
        } else {
            this.jobApiService.saveJob(job).subscribe((result) => {
                if (result.success) {
                    this.snackbarService.sucess('Job successfully created.');
                } else {
                    this.snackbarService.error(result.message);
                }
            });
        }
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
                } as JobDto);
            });
    }
}
