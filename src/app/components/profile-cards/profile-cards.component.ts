import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-profile-cards',
  templateUrl: './profile-cards.component.html',
  styleUrls: ['./profile-cards.component.css'],
})
export class ProfileCardsComponent {
  @Input() myUser!: Users;
  card!: HTMLElement | null;

  constructor(
    private route: ActivatedRoute,
  ) { }
  ngAfterViewInit() {
    // console.log("myUser:", this.myUser);
    // let card = document.getElementById('60');
    // card?.scrollIntoView();
    const routeParam = this.route.snapshot.paramMap;
    const IdFromRoute = routeParam.get('id');
    console.log('id: ' + IdFromRoute);
    console.log(typeof IdFromRoute);
    if (IdFromRoute) {
      this.card = document.getElementById(IdFromRoute);
      console.log(this.card);

      this.card?.scrollIntoView({ behavior: 'smooth'});
    }
  }

}
