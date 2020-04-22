import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { SelectedConcertComponent } from './selected-concert/selected-concert.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';


const routes: Routes = [
 
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
    
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'home/:idd',
    component:HomeComponent,
  },
  {
    path:'about',
    component:AboutComponent,
  },
  {
    path:'selectedConcert/:id',
    component:SelectedConcertComponent,
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'signin',
    component:LoginComponent
  },
  {
    path:'confirm/:cnf',
    component:ConfirmComponent
  },
  {
    path:'mytickets',
    component:MyTicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
