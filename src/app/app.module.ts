import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { MessageComponent } from './pages/message/message.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarConnexionInscriptionComponent } from './components/nav-bar-connexion-inscription/nav-bar-connexion-inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimalsComponent } from './components/animals/animals.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcceuilComponent,
    MessageComponent,
    ProfileComponent,
    SigninComponent,
    LoginComponent,
    NavBarComponent,
    NavBarConnexionInscriptionComponent,
    Page404Component,
    FooterComponent,
    AnimalsComponent,
  ],
  imports: [BrowserModule, NgbModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
