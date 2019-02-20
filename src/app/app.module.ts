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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JobsComponent,
    JobComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
