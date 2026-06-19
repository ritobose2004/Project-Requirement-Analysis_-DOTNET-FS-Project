
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { AnalystaddfeedbackComponent } from './components/analystaddfeedback/analystaddfeedback.component';
import { AnalystviewfeedbackComponent } from './components/analystviewfeedback/analystviewfeedback.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { AnalystnavComponent } from './components/analystnav/analystnav.component';
import { AnalystAddRequirementComponent } from './components/analyst-add-requirement/analyst-add-requirement.component';
import { AnalystViewRequirementComponent } from './components/analyst-view-requirement/analyst-view-requirement.component';
import { ManagerAddProjectComponent } from './components/manager-add-project/manager-add-project.component';
import { ManagerEditProjectComponent } from './components/manager-edit-project/manager-edit-project.component';
import { ManagerViewProjectComponent } from './components/manager-view-project/manager-view-project.component';
import { ManagerViewRequirementComponent } from './components/manager-view-requirement/manager-view-requirement.component';
import { AnalystViewProjectComponent } from './components/analyst-view-project/analyst-view-project.component';
import { AuthGuard } from './components/authguard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'nav', component: NavbarComponent },
  // --- Analyst Routes (Protected) ---
  {
    path: 'requirementanalystnav',
    component: AnalystnavComponent,
    canActivate: [AuthGuard],
    data: { roles: ['RequirementAnalyst'] }
  },
  {
    path: 'analyst/add-requirement',
    component: AnalystAddRequirementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['RequirementAnalyst'] }
  },
  {
    path: 'analyst/view-requirement',
    component: AnalystViewRequirementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['RequirementAnalyst'] }
  },
  {
    path: 'analyst/view-project',
    component: AnalystViewProjectComponent,
    canActivate: [AuthGuard],
    data: { roles: ['RequirementAnalyst'] }
  },
  {
    path: 'analyst/add-feedback',
    component: AnalystaddfeedbackComponent,
    canActivate: [AuthGuard],
    data: { roles: ['RequirementAnalyst'] }
  },
  {
    path: 'analyst/view-feedback',
    component: AnalystviewfeedbackComponent,
    canActivate: [AuthGuard],
    data: { roles: ['RequirementAnalyst'] }
  },

  // --- Manager Routes (Protected) ---
  {
    path: 'projectmanagernav',
    component: ManagernavComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectManager'] }
  },
  {
    path: 'manager/add-project',
    component: ManagerAddProjectComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectManager'] }
  },
  {
    path: 'manager/edit-projectmanager/view-project/:id',
    component: ManagerEditProjectComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectManager'] }
  },
  {
    path: 'manager/view-project',
    component: ManagerViewProjectComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectManager'] }
  },
  {
    path: 'manager/view-feedback',
    component: ManagerviewfeedbackComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectManager'] }
  },
  {
    path: 'manager/view-requirement',
    component: ManagerViewRequirementComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ProjectManager'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
