import { Component, Input } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent {
  isEditing =false;
  animal!: Animals;

  // @Input() pets!: Animals[];
  @Input() pet!:Animals;

  

  toggleEdit(){
    this.isEditing= !this.isEditing;
  }

}
