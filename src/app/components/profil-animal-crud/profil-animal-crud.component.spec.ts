import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAnimalCrudComponent } from './profil-animal-crud.component';

describe('ProfilAnimalCrudComponent', () => {
  let component: ProfilAnimalCrudComponent;
  let fixture: ComponentFixture<ProfilAnimalCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilAnimalCrudComponent]
    });
    fixture = TestBed.createComponent(ProfilAnimalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
