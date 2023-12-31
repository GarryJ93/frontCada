import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GenderUser } from 'src/app/models/gender-users';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';
import { GenderUserService } from 'src/app/services/gender-users.service';
import { PhotosService } from 'src/app/services/photos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  addUser!: FormGroup;
  newUser!: Users;
  id_file!: number;
  genders!: GenderUser[];
  imageToShow: any;
  myFile!: File;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotosService,
    private genderUserService: GenderUserService
  ) {}

  ngOnInit(): void {
    this.genderUserService.getGenderUsers().subscribe({
      next: (response: GenderUser[]) => {
        this.genders = [...response];
        console.log(this.genders);
      },
    });

    this.addUser = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      departement: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      description: new FormControl(''),
      id_gender_user: new FormControl(''),
      id_photo: new FormControl(''),
    });
  }

  onSubmit() {
    let newUser: Users = { ...this.addUser.value };
    newUser.id_photo = this.id_file;
    console.log(newUser.id_photo);
    if (!this.addUser.valid) {
      console.log(newUser);

      newUser = { ...this.addUser.value };
      newUser.id_photo = this.id_file;
    }
    console.log( newUser.id_gender_user);
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

  onChange(e: any) {
        
    console.log(e.target.files);
    this.myFile = e.target.files[0];
    if (this.myFile) {
      const formData = new FormData();
      formData.append('monFichier', this.myFile);
      
      this.photoService.postImage(formData).subscribe((photo: Partial<Photos>) => {
        this.id_file = photo.id_photo!
        
        alert('image postée');
      });
    }
  }
}

