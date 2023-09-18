import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  addUser!: FormGroup;
  newUser!: Users;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  

  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      departement: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      id_gender_user: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    let newUser: Users = { ...this.addUser.value };
    if (!this.addUser.valid) {
      console.log("coucou");
      
      newUser = { ...this.addUser.value };
      
    }
    newUser.id_gender_user = 2;
    console.log(newUser);
    this.userService.addUser(newUser).subscribe({
      next: () => {
        alert('Utilisateur ajouté avec succès !');
        this.addUser.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur", error);
      },
    });
  }

  OnAddUser() {
    let newUser: Users = { ...this.addUser.value };
    if (!this.addUser.valid) {
      newUser = { ...this.addUser.value };
    }
    console.log(newUser);

    
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}
