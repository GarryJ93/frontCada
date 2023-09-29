import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.css'],
})
export class ProfileCardsComponent {
  @Input() myUser!: Users;
  @Input() image!: Photos[];
  card!: HTMLElement | null;
  currentImage!: Blob;
  animalCurrentImage!: Blob;
  userImage!: any;
  animalImage!: any;
  idConnected = localStorage.getItem('user_id');
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotosService
  ) { }

  ngOnInit() {
    
    const myUserIdPhoto = this.myUser.id_photo;
    this.photoService.getImageById(myUserIdPhoto).subscribe({
      next: (data: Blob) => {
        this.currentImage = data;
        this.createImageFromBlob(this.currentImage);
      },
    });

    if (this.myUser.animal) {
      for (let animal of this.myUser.animal) {
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
    const currentAnimal = this.myUser.animal.find(
      (x) => x.id_animals === idAnimal
    );

    reader.addEventListener('load', () => {
      if (currentAnimal)
        currentAnimal.picture = reader.result;

    });
  }
  ngAfterViewInit() {
    // console.log("myUser:", this.myUser);

    const routeParam = this.route.snapshot.paramMap;
    const IdFromRoute = routeParam.get('id');

    if (IdFromRoute) {
      console.log('id: ' + IdFromRoute);
      console.log(typeof IdFromRoute);
      this.card = document.getElementById(IdFromRoute);
      console.log(this.card);
      console.log(this.myUser.id_photo);

      this.card?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
