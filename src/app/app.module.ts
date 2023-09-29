import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { MessageComponent } from './pages/message/message.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarConnexionInscriptionComponent } from './components/nav-bar-connexion-inscription/nav-bar-connexion-inscription.component';
import { Page404Component } from './pages/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ProfileCardsComponent } from './components/profile-cards/profile-cards.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { ModalComponent } from './components/modal/modal.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { ProfilAnimalCrudComponent } from './components/profil-animal-crud/profil-animal-crud.component';
import { ProfilUserCrudComponent } from './components/profil-user-crud/profil-user-crud.component';
import { ChatModalComponent } from './components/chat-modal/chat-modal.component';
import { SocketIoModule } from 'ngx-socket-io';
import { WebSocketService } from './services/web-socket.service';
import { OpenConvComponent } from './components/open-conv/open-conv.component';
import { AddNewAnimalComponent } from './pages/add-new-animal/add-new-animal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccueilComponent,
    MessageComponent,
    ProfileComponent,
    SigninComponent,
    LoginComponent,
    NavBarComponent,
    NavBarConnexionInscriptionComponent,
    Page404Component,
    FooterComponent,
    FilterBarComponent,
    ProfileCardsComponent,
    ProfileListComponent,
    ConsultationComponent,
    ModalComponent,
    AnimalCardComponent,
    ProfilAnimalCrudComponent,
    ProfilUserCrudComponent,
    ChatModalComponent,
    OpenConvComponent,
    AddNewAnimalComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {} }),
  ],
  providers: [WebSocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
