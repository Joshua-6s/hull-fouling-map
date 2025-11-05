import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HullHome } from './hull-home';

describe('HullHome', () => {
  let component: HullHome;
  let fixture: ComponentFixture<HullHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HullHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HullHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
