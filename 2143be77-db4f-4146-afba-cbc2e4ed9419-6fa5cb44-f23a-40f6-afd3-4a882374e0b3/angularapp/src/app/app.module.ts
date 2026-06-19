import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ManagerViewRequirementComponent } from './components/manager-view-requirement/manager-view-requirement.component';
import { AnalystnavComponent } from './components/analystnav/analystnav.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ManagerAddProjectComponent } from './components/manager-add-project/manager-add-project.component';
import { ManagerViewProjectComponent } from './components/manager-view-project/manager-view-project.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AnalystaddfeedbackComponent } from './components/analystaddfeedback/analystaddfeedback.component';
import { AnalystviewfeedbackComponent } from './components/analystviewfeedback/analystviewfeedback.component';
import { ManagerEditProjectComponent } from './components/manager-edit-project/manager-edit-project.component';
import { LoginComponent } from './components/login/login.component';
import { AnalystViewRequirementComponent } from './components/analyst-view-requirement/analyst-view-requirement.component';
import { AnalystViewProjectComponent } from './components/analyst-view-project/analyst-view-project.component';
import { AnalystAddRequirementComponent } from './components/analyst-add-requirement/analyst-add-requirement.component';
import { AuthInterceptor } from './AuthInterceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NavbarComponent,
    HomeComponent,
    ManagerViewRequirementComponent,
    AnalystnavComponent,
    ManagernavComponent,
    AnalystaddfeedbackComponent,
    AnalystviewfeedbackComponent,
    ManagerviewfeedbackComponent,
    ManagerAddProjectComponent,
    ManagerViewProjectComponent,
    RegistrationComponent,
    AnalystaddfeedbackComponent,
    AnalystviewfeedbackComponent,
    ManagerEditProjectComponent,
    LoginComponent,
    AnalystViewRequirementComponent,
    AnalystViewProjectComponent,
    AnalystAddRequirementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // IMPORTANT: Allows you to define multiple interceptors
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
