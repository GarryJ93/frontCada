import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profil-user-crud',
  templateUrl: './profil-user-crud.component.html',
  styleUrls: ['./profil-user-crud.component.css']
})
export class ProfilUserCrudComponent {
  FormProfilUser!:FormGroup;
  profilUser!: Users;


  constructor(
    private
  )

}
