import { Component, Input } from '@angular/core';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent {
  @Input() recupUsers!: Users[];
}
