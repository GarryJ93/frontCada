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
  @Input() animalProfilePicture!: any;
  isEditing = false;
  currentAnimalIndex = 0;
  numberOfAnimals!: number;
  

  constructor(private animalsService: AnimalsService,
    private router: Router) {}

  // Passage en mode edition
  toggleEdit(i: number) {
    this.isEditing = !this.isEditing;
    console.log(this.animalsProfil[i].id_animals);

    if (!this.isEditing) {
      const updateAnimal = {
        name: this.animalsProfil[i].name,
        age: this.animalsProfil[i].age,
      }
      this.animalsService
        .modifyAnimals(this.animalsProfil[i].id_animals, updateAnimal)
        .subscribe({
          next: (response) => {
            console.log('animal mis à jour', response)

          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour', error)
          }

        });
    }
  }

  deleteMyAniaml(i:number){
    this.animalsService.deleteAnimals(this.animalsProfil[i].id_animals).subscribe({});
    location.reload()
    console.log("mon animal ",this.animalsProfil[i].id_animals);
    
  }





  deleteMyAniaml(i:number){
    this.animalsService.deleteAnimals(this.animalsProfil[i].id_animals).subscribe({});
    location.reload()
    console.log("mon animal ",this.animalsProfil[i].id_animals);
    
  }





  

  ngOnChanges() {
    // Variable pour le modulo des fonctions next & previous
    this.numberOfAnimals = this.animalsProfil.length;
  }
  // Méthode pour afficher la carte précédente
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
}
