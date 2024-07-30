import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Question } from '../../shared/question';
import { QuestionsService } from '../../shared/questions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ps-single-question-mode',
  templateUrl: './single-question-mode.component.html',
  styleUrl: './single-question-mode.component.css',
})
export class SingleQuestionModeComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  lastQError = 'No more Questions';
  lastQswitch = false;

  constructor(
    private questionService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.questionService.getSingle(index);
    this.questions$ = this.questionService.getQuestions();
  }

  showAnswer(question: Question) {
    question.showAnswer = !question.showAnswer;
  }
  showNextQuestion(question: Question) {
    const nextIndex = (parseInt(question.index) + 1).toString();
    this.lastQswitch = false;
    this.questions$.subscribe((questions) => {
      if (parseInt(nextIndex) === questions.length) {
        this.lastQswitch = true;
        this.router.navigate(['learn', question.index]);
      } else {
        this.question$ = this.questionService.getSingle(nextIndex);
        this.router.navigate(['learn', nextIndex]);
      }
    });
  }

  showPreviosQuestion(question: Question) {
    const PreviosIndex = (parseInt(question.index) - 1).toString();
    this.lastQswitch = false;
    if (parseInt(PreviosIndex) < 0) {
      this.lastQswitch = true;
    } else {
      this.question$ = this.questionService.getSingle(PreviosIndex);
      this.router.navigate(['learn', PreviosIndex]);
    }
  }
}
