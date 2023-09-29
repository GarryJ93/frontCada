import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { PhotosService } from 'src/app/services/photos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userConnect!: Users;
  currentImage!: Blob;
  animalCurrentImage!: Blob;
  userImage!: any;
  animalPhoto!: any;
  constructor(
    private userService: UsersService,
    private animalService: AnimalsService,
    private photoService: PhotosService
  ) {}
  currentUserId = this.userService.getUserConnected()!;

  ngOnInit(): void {
    this.userService.getUserById(this.currentUserId).subscribe({
      next: (response) => {
        this.userConnect = response;
        console.log('tableau ou pas ??', this.userConnect);
        const myUserIdPhoto = this.userConnect.id_photo;
        console.log(myUserIdPhoto);
        if (myUserIdPhoto) {
          this.photoService.getImageById(myUserIdPhoto).subscribe({
            next: (data: Blob) => {
              this.currentImage = data;
              console.log(this.currentImage);
              this.createImageFromBlob(this.currentImage);
              if (this.userConnect.animal) {
                for (let animal of this.userConnect.animal) {
                  const animalIdPhoto = animal.id_photo;
                  console.log('id animal: ', animalIdPhoto);
                  this.photoService.getImageById(animalIdPhoto).subscribe({
                    next: (data: Blob) => {
                      this.animalCurrentImage = data;
                      this.createAnimalImageFromBlob(
                        this.animalCurrentImage,
                        animal.id_animals
                      );
                    },
                  });
                }
              }
            },
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récuperation des données', error);
      },
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.userImage = reader.result;
    });
  }

  createAnimalImageFromBlob(image: Blob, idAnimal: number) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    const currentAnimal = this.userConnect.animal.find(
      (x) => x.id_animals === idAnimal
    );

    reader.addEventListener('load', () => {
      if (currentAnimal) {
        currentAnimal.picture = reader.result;
        this.animalPhoto = currentAnimal.picture;
      }
    });
  }
}
