import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundControlsComponent } from './round-controls.component';

describe('TurnControlsComponent', () => {
  let component: RoundControlsComponent;
  let fixture: ComponentFixture<RoundControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
