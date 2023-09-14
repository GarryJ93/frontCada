import { Component, OnInit } from '@angular/core';
import { GenderUser } from 'src/app/models/gender-users';
import { GenderUserService } from 'src/app/services/gender-users.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  genderToDisplay!: GenderUser[];
  allGenderUser: GenderUser[] = [];
  

  constructor(private genderUserService: GenderUserService) { }

  ngOnInit() {
    this.genderUserService.getGenderUsers().subscribe({
      next: (response) => {
        {
        this.allGenderUser = [...response];
        this.genderToDisplay = [...response];
      }
      console.log(this.allGenderUser);
    }
      }
    )}
      
  }

 


