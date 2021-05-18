import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADMINComponent } from './admin.component';

describe('ADMINComponent', () => {
  let component: ADMINComponent;
  let fixture: ComponentFixture<ADMINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADMINComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADMINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
