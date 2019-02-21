import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JobsComponent } from './jobs/jobs.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { JobComponent } from './jobs/job/job.component';
import { JobService } from './jobs/jobs.service';
import { HttpModule } from '@angular/http';
import { JobCreatorComponent } from './jobs/job-creator/job-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './shared/input/input.component';
import { RadioComponent } from './shared/radio/radio.component';
import { DatePipe } from '@angular/common';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JobsComponent,
    JobComponent,
    JobCreatorComponent,
    InputComponent,
    RadioComponent,
    JobEditComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [JobService, FormsModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
