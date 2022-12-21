import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripmodComponent } from './tripmod.component';

describe('TripmodComponent', () => {
  let component: TripmodComponent;
  let fixture: ComponentFixture<TripmodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripmodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripmodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
