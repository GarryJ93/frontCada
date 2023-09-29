import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenderUser } from 'src/app/models/gender-users';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() userDpt!: number[];
  @Input() genderUser!: GenderUser[];

  @Output() categCheckedEvent = new EventEmitter<string[]>();
  @Output() departementCheckedEvent = new EventEmitter<number>();
  @Output() genderCheckedEvent = new EventEmitter<string>();
  @Output() onCheckDptEvent = new EventEmitter<number>();
  categoriesChecked: string[] = [];
  departementSelected!: number;
  genderSelected!: string;

  //Filtre Espèces
  @Output() onCheckGenderEvent = new EventEmitter<string>();

  onCheckCategory(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      this.categoriesChecked.push(target.value);
    } else {
      // Si la case est décochée, retirez la valeur du tableau
      const index = this.categoriesChecked.indexOf(target.value);
      if (index !== -1) {
        this.categoriesChecked.splice(index, 1);
      }
    }
    this.categCheckedEvent.emit(this.categoriesChecked);
  }

  //Filtre Départements

  onCheckDpt(e: Event) {
    const target = e.target as HTMLInputElement;
    this.departementSelected = parseInt(target.value);
    this.departementCheckedEvent.emit(this.departementSelected);
  }

  //Filtre Genres

  onCheckGender(e: Event) {
    const target = e.target as HTMLInputElement;
    this.genderSelected = target.value;
    this.genderCheckedEvent.emit(this.genderSelected);
  }


}


