import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animals } from 'src/app/models/animals';
import { Breed } from 'src/app/models/breed';
import { Photos } from 'src/app/models/photos';
import { SexAnimals } from 'src/app/models/sex-animals';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { BreedService } from 'src/app/services/breed.service';
import { PhotosService } from 'src/app/services/photos.service';
import { SexAnimalsService } from 'src/app/services/sex-animals.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-new-animal',
  templateUrl: './add-new-animal.component.html',
  styleUrls: ['./add-new-animal.component.css'],
})
export class AddNewAnimalComponent {
  addAnimal!: FormGroup;
  breeds!: Breed[];
  sex_Animals!: SexAnimals[];
  id_file!: number;
  currentUser!: number;
  myFile!: File;

  constructor(
    private animalService: AnimalsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotosService,
    private breedService: BreedService,
    private sexAnimalService: SexAnimalsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUserConnected();
    console.log('useriddd', this.currentUser);
    this.breedService.getBreed().subscribe({
      next: (response: Breed[]) => {
        this.breeds = [...response];
      },
    });

    this.sexAnimalService.getAllSexAnimals().subscribe({
      next: (response: SexAnimals[]) => {
        this.sex_Animals = [...response];
      },
    });

    this.addAnimal = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      id_breed: new FormControl('', Validators.required),
      id_sex_animal: new FormControl('', Validators.required),
      id_photo: new FormControl('', Validators.required),
      
    });
  }
  onChange(e: any) {
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);

      this.photoService
        .postImage(formData)
        .subscribe((photo: Partial<Photos>) => {
          this.id_file = photo.id_photo!;

          alert('image postée');
        });
    }
  }

  onSubmit() {
    console.log("----------------");
    
    let newAnimal: Animals = { ...this.addAnimal.value };
    console.log("newAnimal l1", newAnimal );
    
    newAnimal.id_photo = this.id_file;
    console.log('newAnimal l2', newAnimal);
    newAnimal.id_user = this.currentUser; 
    console.log('newAnimal l3', newAnimal);
    console.log("----------------");
    
    console.log(newAnimal.id_photo);
    if (!this.addAnimal.valid) {
      console.log(newAnimal);

      newAnimal = { ...this.addAnimal.value };
      newAnimal.id_photo = this.id_file;
    }
    this.animalService.addAnimals(newAnimal).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.addAnimal.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      },
    });
  }
}
