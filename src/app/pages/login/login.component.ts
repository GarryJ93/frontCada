
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private userService: UsersService,
    private router: Router,
    private authService: LoginService
  ) {}

  OnConnect() {
    console.log('Tentative de connexion');
    console.log('Username: ', this.username);
    console.log('MDP : ', this.password);

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem(('acess_token'), response.accessToken)
        console.log(response);
        
        console.log('Réponse complète du serveur :', response.accessToken);
      },
    });
  }
}
    
