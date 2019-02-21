import { Routes } from "@angular/router";
import { JobsComponent } from './jobs/jobs.component';
import { JobCreatorComponent } from './jobs/job-creator/job-creator.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';


export const ROUTES: Routes = [
    {path: '', component: JobsComponent},
    {path: 'createjob', component: JobCreatorComponent},
    {path: 'editjob/:id', component:JobEditComponent}
]