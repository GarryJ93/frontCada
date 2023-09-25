import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Animals } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-profil-animal-crud',
  templateUrl: './profil-animal-crud.component.html',
  styleUrls: ['./profil-animal-crud.component.css'],
})
export class ProfilAnimalCrudComponent {
  @Input()
  formProfilanimal!: FormGroup;
  profilAnimal!: Animals;

  constructor(
    private animalsService: AnimalsService,
    private formBulder: FormBuilder,
    private router: Router
  ) {}















































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
