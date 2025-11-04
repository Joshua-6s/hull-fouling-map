import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HullhealthDashboard } from './hullhealth-dashboard';

describe('HullhealthDashboard', () => {
  let component: HullhealthDashboard;
  let fixture: ComponentFixture<HullhealthDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HullhealthDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HullhealthDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
