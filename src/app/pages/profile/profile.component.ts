import { Component } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  animalsToDisplay!: Animals[];
  allAnimals: Animals[] = [];
  animals!: Animals;



  constructor(private animalsService: AnimalsService) { }


  ngOnInit() {
    this.
    this.animalsService.getAllAnimals().subscribe(animalData =>{
      this.animalsToDisplay = animalData;
      console.log(animalData);
      }
    )
  }

  
}

// this.animalsService.getAllAnimals().subscribe(animalData => {

//   this.animal = animalData;

// },



