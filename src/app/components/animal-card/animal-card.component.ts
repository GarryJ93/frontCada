import { Component, Input } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent {
   @Input() myUser!:Users

  currentCardIndex = 0;
  numberOfCards!: number;

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
  }
}
