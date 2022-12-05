import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuytripsComponent } from './buytrips.component';

describe('BuytripsComponent', () => {
  let component: BuytripsComponent;
  let fixture: ComponentFixture<BuytripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuytripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuytripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
