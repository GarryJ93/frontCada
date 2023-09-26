import { Component, Input } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profil-user-crud',
  templateUrl: './profil-user-crud.component.html',
  styleUrls: ['./profil-user-crud.component.css'],
})
export class ProfilUserCrudComponent {
  @Input() RecupUserProfil!: Users;

  isEditing = false;
  // myAnimal!:Animals[];

  constructor(
    private userService: UsersService,
    private animalsService: AnimalsService
  ) {}

  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log('log RecupUserProfil ', this.RecupUserProfil.id_user);
    // console.log( 'mon animal ',this.myAnimal);

    if (!this.isEditing) {
      this.userService
        .modifyUsers(this.RecupUserProfil.id_user, this.RecupUserProfil)
        .subscribe({});
    }
  }
}
