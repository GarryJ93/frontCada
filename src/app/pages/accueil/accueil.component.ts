import { Component, OnInit } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { GenderUser } from 'src/app/models/gender-users';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { PhotosService } from 'src/app/services/photos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  userToDisplay!: Users[];
  allUsers: Users[] = [];
  photosToDisplay!: Photos[];
  allPhotos: Photos[] = [];
  animalsToDisplay!: Animals[];
  allAnimals: Animals[] = [];
  

  constructor(private usersService: UsersService, private photoService: PhotosService, private animalsService: AnimalsService) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        {
        this.allUsers = [...response];
        this.userToDisplay = [...response];
      }
      console.log(this.allUsers);
    }
      }
    )
    this.photoService.getAllPhotos().subscribe({
      next: (response) => {
        {
          this.allPhotos = [...response];
          this.photosToDisplay = [...response];
        }
        console.log(this.allPhotos)
      }
    })

    this.animalsService.getAllAnimals().subscribe({
      next: (response) => {
        {
          this.allAnimals = [...response];
          this.animalsToDisplay = [...response];
        }
        console.log(this.allAnimals);
      },
    });
  }
      
  }

 


