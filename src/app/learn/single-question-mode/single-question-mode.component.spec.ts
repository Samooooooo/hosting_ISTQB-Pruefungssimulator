import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuestionModeComponent } from './single-question-mode.component';

describe('SingleQuestionModeComponent', () => {
  let component: SingleQuestionModeComponent;
  let fixture: ComponentFixture<SingleQuestionModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleQuestionModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleQuestionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
