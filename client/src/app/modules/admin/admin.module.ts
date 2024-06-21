import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ReviewComponent } from './components/review/review.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    PersonalInfoComponent,
    CommentsComponent,
    ReviewComponent,
    ConfirmationComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AdminModule { }
