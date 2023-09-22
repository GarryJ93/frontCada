import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{
  user!:Users[];

  constructor(private userService: UsersService,){}
  currentUser = this.userService.getUserConnected()!
  ngOnInit(): void {
    this.userService.getUserById(this.currentUser).subscribe({
      next:response => {
        console.log(response);
        
        // this.user = [...response['']];
      },
      error:error => {
        console.error('Erreur lors de la récuperation des données', error);
      }
    });
  }
}
