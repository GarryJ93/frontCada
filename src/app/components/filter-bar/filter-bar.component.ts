import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenderUser } from 'src/app/models/gender-users';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  @Input() userDpt!: Number[];
  @Input() genderUser!: GenderUser[];

  @Output() categCheckedEvent = new EventEmitter<string[]>();

  categoriesChecked: string[] = [];

  onCheckCategory(e: Event) {
    const target = e.target as HTMLInputElement;
    console.log("gender",this.genderUser);

    if (target.checked) {
      this.categoriesChecked.push(target.value);
    } else {
      // Si la case est décochée, retirez la valeur du tableau
      const index = this.categoriesChecked.indexOf(target.value);
      if (index !== -1) {
        this.categoriesChecked.splice(index, 1);
      }
    }
    console.log('cat checkes', this.categoriesChecked);
    this.categCheckedEvent.emit(this.categoriesChecked);
  }
}
