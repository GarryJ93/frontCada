import { Component, Input } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profil-user-crud',
  templateUrl: './profil-user-crud.component.html',
  styleUrls: ['./profil-user-crud.component.css'],
})
export class ProfilUserCrudComponent {
  @Input() RecupUserProfil!: Users;

  isEditing = false;

  constructor(private userService: UsersService) {}

  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log(this.RecupUserProfil.id_user);

    if (!this.isEditing) {
      this.userService
        .modifyUsers(this.RecupUserProfil.id_user, this.RecupUserProfil)
        .subscribe({});
    }
  }
}
