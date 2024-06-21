import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { NotFoundComponent } from './account/not-found/not-found.component';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  

  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (m) => m.AdminModule
      ),
      
  },
  { path: '**', component: NotFoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
