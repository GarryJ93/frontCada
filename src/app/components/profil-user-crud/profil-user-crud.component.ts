import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profil-user-crud',
  templateUrl: './profil-user-crud.component.html',
  styleUrls: ['./profil-user-crud.component.css']
})
export class ProfilUserCrudComponent implements OnInit {
  formProfilUser!: FormGroup;
  profilUser!: Users;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formProfilUser = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      departement: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let profilUser: Users = { ...this.formProfilUser.value };
    if (!this.formProfilUser.valid) {
      console.log("Le formulaire n'est pas valide");
      return;
    }
    profilUser.id_gender_user = 2; // À adapter en fonction de votre logique
    this.userService.addUser(profilUser).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.formProfilUser.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      }
    });
  }
}
