import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlflowComponent } from './controlflow.component';

describe('ControlflowComponent', () => {
  let component: ControlflowComponent;
  let fixture: ComponentFixture<ControlflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlflowComponent]
    });
    fixture = TestBed.createComponent(ControlflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
