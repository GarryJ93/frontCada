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
  userImage!: any;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotosService
  ) {}

  ngOnInit() {
    const myUserIdPhoto = this.myUser.id_photo;
    console.log(myUserIdPhoto);
    if (myUserIdPhoto) {
      this.photoService.getImageById(myUserIdPhoto).subscribe({
        next: (data: Blob) => {
          this.currentImage = data;
          this.createImageFromBlob(this.currentImage);
        }
      });
      console.log(this.currentImage);
      
    }
  }

  async createImageFromBlob(image: Blob) {
    let reader = await new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      this.userImage = reader.result;
      console.log(this.userImage);
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
