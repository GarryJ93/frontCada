import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenConvComponent } from './open-conv.component';

describe('OpenConvComponent', () => {
  let component: OpenConvComponent;
  let fixture: ComponentFixture<OpenConvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenConvComponent]
    });
    fixture = TestBed.createComponent(OpenConvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
