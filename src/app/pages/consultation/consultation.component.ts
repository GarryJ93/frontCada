import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { PhotosService } from 'src/app/services/photos.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css'],
})
export class ConsultationComponent {
  currentUser!: Users;
  currentImage!: Blob;
  animalCurrentImage!: Blob;
  userImage!: any;
  animalImage!: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private photoService: PhotosService,
    private location: Location
  ) {}

  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParam.get('id'));

    this.userService.getUserById(userIdFromRoute).subscribe(async (user) => {
      this.currentUser = user;
      console.log(this.currentUser);

      const myUserIdPhoto = this.currentUser.id_photo;
      this.photoService.getImageById(myUserIdPhoto).subscribe({
        next: (data: Blob) => {
          this.currentImage = data;
          this.createImageFromBlob(this.currentImage);
        },
      });

      if (this.currentUser.animal) {
        for (let animal of this.currentUser.animal) {
          const animalIdPhoto = animal.id_photo;
          this.photoService.getImageById(animalIdPhoto).subscribe({
            next: (data: Blob) => {
              this.animalCurrentImage = data;
              this.createAnimalImageFromBlob(this.animalCurrentImage, animal.id_animals);
            },
          });
        }
      }
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
    const currentAnimal = this.currentUser.animal.find(x => x.id_animals === idAnimal);
    
    reader.addEventListener('load', () => {
      if(currentAnimal) currentAnimal.picture = reader.result;
    });
  }
}

// onGoBack() {
//   this.location.back();
// }
