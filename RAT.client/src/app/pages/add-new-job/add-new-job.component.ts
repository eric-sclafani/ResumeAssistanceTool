import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewJobForm } from '../../forms/newJob';
import { JobApiService } from '../../services/job-api.service';
import Job from '../../models/job';

@Component({
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './add-new-job.component.html',
    styleUrl: './add-new-job.component.scss',
})
export class AddNewJobComponent implements OnInit {
    fg: FormGroup<NewJobForm>;

    jobApiService = inject(JobApiService);

    // TODO: make inputs resuable component
    ngOnInit(): void {
        this.initFormGroup();
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

        this.jobApiService.saveJob(job).subscribe((result) => {});
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
            title: new FormControl(null),
            description: new FormControl(null),
            skills: new FormControl(null),
            jobUrl: new FormControl(null),
        });
    }
}
