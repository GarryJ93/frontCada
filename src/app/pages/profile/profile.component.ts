import { Component } from '@angular/core';
import { Animals } from 'src/app/models/animals';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: Users[]=[];
  animal: Animals[]=[];

  

}
