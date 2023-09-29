import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
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
  userDepartement!: number[];
  genderUsers!: GenderUser[];
  departementFiltered: number | undefined;
  departementSelected!: number;
  genderFiltered: string | undefined;

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
        console.log(this.allAnimals);
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
    console.log('cat dans accueil', this.categoriesFiltered);

    // this.userToDisplay = this.userToDisplay.filter((user) =>
    //   this.categoriesFiltered.includes(user.animal[0].breed.species.species)
    // );
    // console.log(this.userToDisplay);
    this.letsFilter();
  }
  departementReceived(departement: number)

  {
this.departementFiltered = departement;

    console.log(departement,"ok");


    // ajouter la logique de filtre pour :
    // filtrer la liste (this.userToDisplay)
    // fonction du departement récuperer en paramètre
    // réassigner le resultat du filtre dans (this.userToDisplay)
  }
  genderReceived(gender : string)
{

  this.genderFiltered = this.genderFiltered;


  console.log("coucou",gender);
 this.letsFilter();
}

  letsFilter() {
    this.userToDisplay = [...this.allUsers];
    this.userToDisplay = this.userToDisplay.filter((user) =>
      this.categoriesFiltered.includes(user.animal[0].breed.species.species)
     
    );
    if (this.categoriesFiltered.length === 0) {
      this.userToDisplay = [...this.allUsers];
    }
    console.log('this.userToDisplay', this.userToDisplay);
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
