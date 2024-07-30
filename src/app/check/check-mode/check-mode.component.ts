/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Question } from '../../shared/question';
import { Observable } from 'rxjs';
import { QuestionsService } from '../../shared/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from '../../shared/score';
import { ScoreService } from '../../shared/score.service';

@Component({
  selector: 'ps-check-mode',
  templateUrl: './check-mode.component.html',
  styleUrl: './check-mode.component.css',
})
export class CheckModeComponent {
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  score: Score | undefined;
  lastQError = 'Keine weiteren Fragen!!';
  noOptionError = 'Geben Sie einen Antwort Bitte!';
  lastQswitch = false;
  noOptionSwitch = false;
  countDown = 0;
  countDownBo = false;
  // maxWrong:  number;
  lastAnswer: string | undefined;

  constructor(
    private questionService: QuestionsService,
    private ScoreService: ScoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.questionService.getSingle(index);
    this.questions$ = this.questionService.getQuestions();
  }

  ngOnInit() {
    this.ScoreService.scores.rightQuestions = [];
    this.ScoreService.scores.wrongQuestions = [];
    this.ScoreService.scores.skippedQuestions = [];
  }

  checkAnswerAndNavigate(question: Question) {
    if (question.selectedAnswer === undefined) {
      this.noOptionSwitch = true;
      setTimeout(() => {
        this.noOptionSwitch = false;
      }, 1000);
      return;
    } else if (question.selectedAnswer === question.correctAnswer.toString()) {
      this.lastAnswer = undefined;
      this.showNextQuestion(question);
    } else {
      question.skipped = false;
      this.countDown = 3;
      this.countDownBo = true;
      this.countDownM();
      setTimeout(() => {
        this.showPreviosQuestion(question);
        this.countDownBo = false;
      }, 3000);
    }
    this.ScoreService.calculateUpdatedScores(question);
  }
  countDownM() {
    if (this.countDown > 0) {
      setTimeout(() => {
        this.countDown--;
        this.countDownM();
      }, 1000);
    }
  }
  skipQuestion(question: Question) {
    question.skipped = true;
    this.showNextQuestion(question);
    this.ScoreService.calculateUpdatedScores(question);
  }

  showNextQuestion(question: Question) {
    this.oldAnswer(question, -1);
    const nextIndex = parseInt(question.index) + 1;
    this.questions$.subscribe((questions) => {
      if (nextIndex < questions.length) {
        this.lastQswitch = false;
        this.question$ = this.questionService.getSingle(nextIndex.toString());
        this.router.navigate(['check', nextIndex]);
      } else {
        this.router.navigate(['scores']);
      }
    });
  }

  showPreviosQuestion(question: Question) {
    this.oldAnswer(question, 1);
    const prevIndex = parseInt(question.index) - 1;
    this.questions$.subscribe((questions) => {
      if (prevIndex < parseInt(questions[0].index)) {
        this.lastQswitch = true;
        setTimeout(() => {
          this.lastQswitch = false;
        }, 2000);
      } else {
        {
          this.question$ = this.questionService.getSingle(prevIndex.toString());
          this.router.navigate(['check', prevIndex]);
        }
      }
    });
  }

  oldAnswer(question: Question, lastAnswerIndex: number) {
    const rightAnswer = this.ScoreService.scores.rightQuestions
      .find(
        (q) => parseInt(q.index) === parseInt(question.index) - lastAnswerIndex,
      )
      ?.selectedAnswer.toString();

    const wrongAnswer = this.ScoreService.scores.wrongQuestions
      .find(
        (q) => parseInt(q.index) === parseInt(question.index) - lastAnswerIndex,
      )
      ?.selectedAnswer.toString();

    this.lastAnswer = rightAnswer || wrongAnswer;
  }
}
