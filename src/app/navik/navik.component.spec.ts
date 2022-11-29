import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavikComponent } from './navik.component';

describe('NavikComponent', () => {
  let component: NavikComponent;
  let fixture: ComponentFixture<NavikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
