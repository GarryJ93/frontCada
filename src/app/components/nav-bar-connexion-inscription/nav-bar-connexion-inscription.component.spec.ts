import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarConnexionInscriptionComponent } from './nav-bar-connexion-inscription.component';

describe('NavBarConnexionInscriptionComponent', () => {
  let component: NavBarConnexionInscriptionComponent;
  let fixture: ComponentFixture<NavBarConnexionInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarConnexionInscriptionComponent]
    });
    fixture = TestBed.createComponent(NavBarConnexionInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
