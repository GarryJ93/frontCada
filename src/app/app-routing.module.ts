import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './pages/page404/page404.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: "full" },
  { path: 'accueil', component: AcceuilComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'signin', component: SigninComponent },
  {path:'login', component: LoginComponent},
  {path: '**', component: Page404Component }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
