
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Connexion } from 'src/app/models/connexion';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  username!: string;
  password!: string;
  connexion!: FormGroup;


  constructor(
    private userService: UsersService,
    private router: Router,
    private authService: LoginService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initialForm();
  }
  private initialForm() {
    this.connexion = this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required],
  });

  }

  OnConnect() {


    if (this.connexion.valid) {

      let username = this.connexion.value.username;
      let password = this.connexion.value.password;
  this.userService.login(username, password).subscribe({
    next: (response: any) => {
      console.log('Réponse complète du serveur :', response)
      if (response && response.accessToken) {
        // Stocker le token dans le localStorage
        localStorage.setItem('access_token', response.accessToken);
        console.log('Connexion réussie et token stocké!');
      } else {
        console.error('Token non reçu dans la réponse.');
      }
    },
    error: (error: any) => {
      console.error('Erreur lors de la connexion:', error);
    }
  });
}
};
}

