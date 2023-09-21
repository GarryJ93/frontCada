import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent {
  currentUser!: Users;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private location: Location,
  ) { }
  
  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParam.get('id'));

    this.userService.getUserById(userIdFromRoute).subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    })
  }

  // onGoBack() {
  //   this.location.back();
  // }
}
