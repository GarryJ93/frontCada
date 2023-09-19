import { Component, Input } from '@angular/core';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.css'],
})
export class ProfileCardsComponent {
  @Input() myUser!: Users;
  ngOnInit() {
    console.log("myUser:", this.myUser);       
  }
}
