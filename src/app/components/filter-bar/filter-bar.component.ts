import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  categoriesChecked: string[] = [];
  @Output() categCheckedEvent = new EventEmitter<string[]>();

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
    console.log('cat checkes', this.categoriesChecked);
    this.categCheckedEvent.emit(this.categoriesChecked);
  }
}
