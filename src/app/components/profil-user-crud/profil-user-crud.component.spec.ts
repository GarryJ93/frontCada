import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserCrudComponent } from './profil-user-crud.component';

describe('ProfilUserCrudComponent', () => {
  let component: ProfilUserCrudComponent;
  let fixture: ComponentFixture<ProfilUserCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilUserCrudComponent],
    });
    fixture = TestBed.createComponent(ProfilUserCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
