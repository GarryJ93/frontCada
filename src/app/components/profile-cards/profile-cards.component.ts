import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animals } from 'src/app/models/animals';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.css'],
})
export class ProfileCardsComponent {
  @Input() myUser!: Users;
  userPicture!: Photos;
  userAnimal!: Animals;

  constructor(
    private photoService: PhotosService,
    private animalsService: AnimalsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.animalsService.getAnimalByUserId(this.userAnimal.id_animals).subscribe((userAnimal) => {
      this.userAnimal = userAnimal;
      console.log(this.userAnimal);
    });
    if (this.myUser.id_photo) {
      const idUser = this.myUser.id_photo;
      this.photoService.getPhotosById(idUser).subscribe((userPicture) => {
        this.userPicture = userPicture;
      });
    }
    // if (this.userAnimal.id_user === idUser) {
    //   this.animalsService.getAnimalById(idUser).subscribe((userAnimal) => {
    //     this.userAnimal = userAnimal;
    //     // console.log(this.userAnimal);
    //   })
    // }
  }
}
