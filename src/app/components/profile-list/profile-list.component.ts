import { Component, Input } from '@angular/core';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {
  @Input() recupUsers!: Users[];
  
}
