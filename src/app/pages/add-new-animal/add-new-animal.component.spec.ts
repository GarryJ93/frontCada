import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAnimalComponent } from './add-new-animal.component';

describe('AddNewAnimalComponent', () => {
  let component: AddNewAnimalComponent;
  let fixture: ComponentFixture<AddNewAnimalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewAnimalComponent]
    });
    fixture = TestBed.createComponent(AddNewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
