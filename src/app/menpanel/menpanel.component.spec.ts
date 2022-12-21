import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenpanelComponent } from './menpanel.component';

describe('MenpanelComponent', () => {
  let component: MenpanelComponent;
  let fixture: ComponentFixture<MenpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
