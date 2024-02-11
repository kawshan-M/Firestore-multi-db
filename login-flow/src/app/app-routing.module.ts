import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandComponent } from './pages/land/land.component';
import { CardComponent } from './pages/card/card.component';
import { CheckComponent } from './pages/check/check.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'auth', component: OtpComponent },
  {path: "frist", component: AppComponent },
  {path: 'data', component: DetailComponent },
  {path: 'home', component: LandComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'land', component: LandComponent },
  {path: 'card', component: CardComponent },
  {path: 'check', component: CheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
