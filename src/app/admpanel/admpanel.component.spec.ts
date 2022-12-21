import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmpanelComponent } from './admpanel.component';

describe('AdmpanelComponent', () => {
  let component: AdmpanelComponent;
  let fixture: ComponentFixture<AdmpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
