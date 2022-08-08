import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpTotalComponent } from './xp-total.component';

describe('XpTotalComponent', () => {
  let component: XpTotalComponent;
  let fixture: ComponentFixture<XpTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XpTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
