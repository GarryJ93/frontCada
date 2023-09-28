import { Component, OnInit } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { GenderUser } from 'src/app/models/gender-users';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { GenderUserService } from 'src/app/services/gender-users.service';
import { PhotosService } from 'src/app/services/photos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent {
  userToDisplay!: Users[];
  allUsers: Users[] = [];
  photosToDisplay!: Photos[];
  allPhotos: Photos[] = [];
  animalsToDisplay!: Animals[];
  allAnimals: Animals[] = [];
  isImageLoading!: Boolean;
  imageToShow!: any;
  categoriesFiltered: string[] = [];
  userDepartement!: Number[];
  genderUsers!: GenderUser[];
  departementFiltered!: number;
  genderFiltered!: string;

  constructor(
    private usersService: UsersService,

    private photoService: PhotosService,

    private animalsService: AnimalsService,

    private genderService: GenderUserService
  ) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        {
          this.allUsers = [...response];
          this.userToDisplay = [...response];
          this.userDepartement = [
            ...new Set(this.userToDisplay.map((user) => user.departement)),
          ];
        }
      },
    });

    this.animalsService.getAllAnimals().subscribe({
      next: (response) => {
        {
          this.allAnimals = [...response];
          this.animalsToDisplay = [...response];
        }
      },
    });

    this.genderService.getGenderUsers().subscribe({
      next: (response) => {
        this.genderUsers = [...response];
      },
    });
  }

  categoriesReceived(categoriesSelected: string[]) {
    this.categoriesFiltered = categoriesSelected;
    this.letsFilter();
  }

  departementReceived(departementSelected: number) {
    this.departementFiltered = departementSelected;
    this.letsFilter();
  }

  genderReceived(genderSelected: string) {
    this.genderFiltered = genderSelected;
    this.letsFilter();
  }

  letsFilter() {
    this.userToDisplay = [...this.allUsers];

    if (this.categoriesFiltered.length != 0) {
      this.userToDisplay = this.userToDisplay.filter((user) =>
        user.animal.some((animal) =>
          this.categoriesFiltered.includes(animal.breed.species.species)
        )
      );
    }

    if (this.departementFiltered) {
      this.userToDisplay = this.userToDisplay.filter(
        (user) => user.departement === this.departementFiltered
      );
    }

    if (this.genderFiltered != 'Genre') {
      this.userToDisplay = this.userToDisplay.filter(
        (user) => user.gender_user.gender === this.genderFiltered
      );
    }

    //Si tous les filtres sont remis à valeur initiale
    if (
      this.categoriesFiltered.length === 0 &&
      this.departementFiltered === 0 &&
      this.genderFiltered == 'Genre'
    ) {
      this.userToDisplay = [...this.allUsers];
    }
  }

  async createImageFromBlob(image: Blob) {
    let reader = await new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    });
  }
  getImageFromService() {
    this.isImageLoading = true;
    this.photoService.getImage().subscribe({
      next: (data: Blob) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error: (error) => {
        this.isImageLoading = false;
        console.log(error);
      },
    });
  }
}
