import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userConnect!: Users;
  constructor(
    private userService: UsersService,
    private animalSaervce: AnimalsService
  ) {}
  currentUser = this.userService.getUserConnected()!;

  ngOnInit(): void {
    this.userService.getUserById(this.currentUser).subscribe({
      next: (response) => {
        this.userConnect = response;
        console.log('tableau ou pas ??', this.userConnect);
      },
      error: (error) => {
        console.error('Erreur lors de la récuperation des données', error);
      },
    });
  }
}
