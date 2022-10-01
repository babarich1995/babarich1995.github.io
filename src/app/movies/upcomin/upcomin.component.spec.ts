import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcominComponent } from './upcomin.component';

describe('UpcominComponent', () => {
  let component: UpcominComponent;
  let fixture: ComponentFixture<UpcominComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcominComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcominComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
