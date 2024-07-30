import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsService } from '../../shared/questions.service';
import { Question } from '../../shared/question';

@Component({
  selector: 'ps-questions-list-mode',
  templateUrl: './questions-list-mode.component.html',
  styleUrl: './questions-list-mode.component.css',
})
export class QuestionsListModeComponent {
  questions$: Observable<Question[]>;

  constructor(private questionService: QuestionsService) {
    this.questions$ = this.questionService.getQuestions();
  }
  showAnswer(question: Question) {
    question.showAnswer = !question.showAnswer;
  }
  currentQuestion(question: Question) {
    return question.index;
  }
}
