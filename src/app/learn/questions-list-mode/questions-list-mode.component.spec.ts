import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListModeComponent } from './questions-list-mode.component';

describe('QuestionsListModeComponent', () => {
  let component: QuestionsListModeComponent;
  let fixture: ComponentFixture<QuestionsListModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsListModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsListModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
