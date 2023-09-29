import { Component, Input } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { Users } from 'src/app/models/users';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent {
  @Input() myUser!: Users

  currentCardIndex = 0;
  numberOfCards!: number;
  animalCurrentImage!: Blob;
  currentAnimalImage!: any;

  constructor(private photoService: PhotosService,) { }

  // Méthode pour afficher la carte précédente
  previousCard() {
    this.currentCardIndex =
      (this.currentCardIndex - 1 + this.numberOfCards) % this.numberOfCards;
  }

  // Méthode pour afficher la carte suivante
  nextCard() {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.numberOfCards;
    console.log("ca tourne");
  }

  ngOnInit() {
    console.log('cardanimal', this.myUser.animal);
    this.numberOfCards = this.myUser.animal.length;
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
}
