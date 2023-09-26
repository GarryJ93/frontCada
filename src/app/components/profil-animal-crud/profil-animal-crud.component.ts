import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Animals } from 'src/app/models/animals';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profil-animal-crud',
  templateUrl: './profil-animal-crud.component.html',
  styleUrls: ['./profil-animal-crud.component.css'],
})
export class ProfilAnimalCrudComponent {
  @Input() RecupUserProfil!: Users;
  isEditing = false;

  constructor(
    private userService: UsersService,
    private animalsService: AnimalsService
  ) {}

  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log('log RecupUserProfil ', this.RecupUserProfil.animal);
    console.log( 'mon animal ',);

    if (!this.isEditing) {
      this.userService
        .modifyUsers(this.RecupUserProfil.id_user, this.RecupUserProfil)
        .subscribe({});
    }
  }














































  // ngOnInit(): void {
  //   this.formProfilanimal = this.formBulder.group({
  //     firstname: new FormControl('', Validators.required),
  //     age: new FormControl('', Validators.required),
  //     sex_animal: new FormControl('', Validators.required),
  //     species: new FormControl('', Validators.required),
  //     race: new FormControl('', Validators.required),
  //   });
  // }

  // onSubmit() {
  //   let profilAnimal: Animals = { ...this.formProfilanimal.value };
  //   if (!this.formProfilanimal.valid) {
  //     alert("le formulaire n'est pas valide");
  //     return;
  //   }

  //   this.animalsService.addAnimals(profilAnimal).subscribe({
  //     next: () => {
  //       alert(`modification de ${this.profilAnimal.id_animals}est validée`);
  //       this.formProfilanimal.reset();
  //       this.router.navigate(['/accueil']);
  //     },
  //     error: (error) => {
  //       console.error("erreur lors de l'ajout de l'utilisateur", error);
  //     },
  //   });
  // }
}
