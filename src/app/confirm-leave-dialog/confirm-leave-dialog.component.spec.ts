import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeaveDialogComponent } from './confirm-leave-dialog.component';

describe('ConfirmLeaveDialogComponent', () => {
  let component: ConfirmLeaveDialogComponent;
  let fixture: ComponentFixture<ConfirmLeaveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmLeaveDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
