import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceWorkflowComponent } from './slice-workflow.component';

describe('SliceWorkflowComponent', () => {
  let component: SliceWorkflowComponent;
  let fixture: ComponentFixture<SliceWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliceWorkflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliceWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
