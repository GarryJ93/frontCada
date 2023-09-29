import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './pages/page404/page404.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { MessageComponent } from './pages/message/message.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { authGuard } from './auth.guard';
import { connectedGuard } from './connected.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  {path: 'accueil', component: AccueilComponent, canActivate:[authGuard] },
  { path: 'accueil/:id', component: AccueilComponent, canActivate: [authGuard] },
  {path: 'home', component: HomeComponent, canActivate:[connectedGuard]},
  { path: 'message', component: MessageComponent, canActivate: [authGuard] },
  { path: 'profil', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [connectedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [connectedGuard] },
  { path: 'consultation/:id', component: ConsultationComponent, canActivate: [authGuard] },
  {path: '**', component: Page404Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
