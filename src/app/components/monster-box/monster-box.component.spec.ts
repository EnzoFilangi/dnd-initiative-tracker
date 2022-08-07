import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterBoxComponent } from './monster-box.component';

describe('MonsterBoxComponent', () => {
  let component: MonsterBoxComponent;
  let fixture: ComponentFixture<MonsterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
