import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ReviewComponent } from './components/review/review.component';
import { LoginComponent } from 'src/app/account/login/login.component';

const routes: Routes = [
  {path:'',component: AdminDashboardComponent, children:[
    {path:'personalInfo' , component: PersonalInfoComponent },
    {path:'comments' , component: CommentsComponent },
    {path:'review' , component: ReviewComponent },
    {path:'confirmation' , component: ConfirmationComponent },
    {path:'' , redirectTo:'/admin/personalInfo' , pathMatch: 'full' },
  
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
