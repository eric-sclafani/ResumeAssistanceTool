import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewJobForm } from '../../models/newJobForm';
import { JobApiService } from '../../services/job-api.service';

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
        const skills = this.parseSkills();

        console.log(this.fg.getRawValue());
    }

    // TODO: when sending to backend, title case each skill
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
            title: new FormControl(''),
            description: new FormControl(''),
            skills: new FormControl(''),
            organizationName: new FormControl(''),
            jobUrl: new FormControl(''),
        });
    }
}
