import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class ProfilAnimalCrudComponent implements OnChanges {
  @Input() animalsProfil!: Animals[];
  isEditing = false;
  currentAnimalIndex = 0;
  numberOfAnimals!: number;

  constructor(private animalsService: AnimalsService) {}

  toggleEdit(i: number) {
    this.isEditing = !this.isEditing;
    console.log(this.animalsProfil[i].id_animals);

    if (!this.isEditing) {
      this.animalsService
        .modifyAnimals(this.animalsProfil[i].id_animals, this.animalsProfil[i])
        .subscribe({});
    }
  }

  previousAnimal() {
    this.currentAnimalIndex =
      (this.currentAnimalIndex - 1 + this.numberOfAnimals) %
      this.numberOfAnimals;
  }

  // Méthode pour afficher la carte suivante
  nextAnimal() {
    this.currentAnimalIndex =
      (this.currentAnimalIndex + 1) % this.numberOfAnimals;
    console.log('ca tourne1', this.currentAnimalIndex);
    console.log('ca tourne2', this.numberOfAnimals);
  }

  ngOnChanges() {
    this.numberOfAnimals = this.animalsProfil.length;
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
