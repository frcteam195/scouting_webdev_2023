import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotGraphicComponent } from './robot-graphic.component';

describe('RobotGraphicComponent', () => {
  let component: RobotGraphicComponent;
  let fixture: ComponentFixture<RobotGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
