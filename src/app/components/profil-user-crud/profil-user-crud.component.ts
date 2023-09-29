import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Animals } from 'src/app/models/animals';
import { Photos } from 'src/app/models/photos';
import { Users } from 'src/app/models/users';
import { AnimalsService } from 'src/app/services/animals.service';
import { PhotosService } from 'src/app/services/photos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profil-user-crud',
  templateUrl: './profil-user-crud.component.html',
  styleUrls: ['./profil-user-crud.component.css'],
})
export class ProfilUserCrudComponent implements OnChanges {
  @Input() RecupUserProfil!: Users;
  @Input() profileImage!: any;
  @Input() animalPicture!: any;

  animalsUserProfil!: Animals[];
  isEditing = false;
  // myAnimal!:Animals[];

  constructor(
    private userService: UsersService,
    private photoService: PhotosService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.profileImage);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.animalsUserProfil = this.RecupUserProfil.animal;
    console.log('ds parent1', this.RecupUserProfil);
    console.log('ds parent2', this.animalsUserProfil);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    console.log('log RecupUserProfil ', this.RecupUserProfil.id_user);

    if (!this.isEditing) {
      this.userService
        .modifyUsers(this.RecupUserProfil.id_user, this.RecupUserProfil)
        .subscribe({});
      
    }
  }

  deleteMyAccount(){
    this.userService.deleteUsers(this.RecupUserProfil.id_user).subscribe({
      next: (response) => {
        alert('vous avez bien supprimé votre compte')
        localStorage.clear()
        this.router.navigate(['/home'])
      }, error:(error) => {
        console.error('erreur lors de la suppression',error)
      }
    });
    console.log("user supprimé",this.RecupUserProfil.id_user)
  }
}
