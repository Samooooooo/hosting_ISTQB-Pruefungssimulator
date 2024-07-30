/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../shared/question';
import { QuestionsService } from '../../shared/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from '../../shared/score';
import { ScoreService } from '../../shared/score.service';

@Component({
  selector: 'ps-exam-mode',
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css',
})
export class ExamModeComponent {
  timerDuration: number = 3600; // 60 minutes * 60 seconds
  timerId: any = null;
  question$: Observable<Question>;
  questions$: Observable<Question[]>;
  score: Score | undefined;
  lastQError = 'Keine weiteren Fragen!!';
  noOptionError = 'Geben Sie einen Antwort Bitte!';
  countDownBo = false;
  countDown = 0;
  lastQswitch = false;
  noOptionSwitch = false;
  lastAnswer: string | undefined;
  randomizedIndexes: number[] = [];
  currentQuestionIndex = 0;

  constructor(
    private questionService: QuestionsService,
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const index = this.route.snapshot.paramMap.get('index')!;
    this.question$ = this.questionService.getSingle(index);
    this.questions$ = this.questionService.getQuestions();
  }

  ngOnInit() {
    this.scoreService.scores.rightQuestions = [];
    this.scoreService.scores.wrongQuestions = [];
    this.scoreService.scores.skippedQuestions = [];
    this.questions$.subscribe((questions) => {
      const totalQuestions = questions.length;
      const maxQuestions = Math.min(40, totalQuestions);
      this.randomizedIndexes = this.generateRandomIndexes(totalQuestions).slice(
        0,
        maxQuestions,
      );
      this.navigateToQuestion(
        this.randomizedIndexes[this.currentQuestionIndex],
      );
    });
  }

  generateRandomIndexes(length: number): number[] {
    const indexes = Array.from({ length }, (_, i) => i);
    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes;
  }

  navigateToQuestion(index: number) {
    this.question$ = this.questionService.getSingle(index.toString());
    this.router.navigate(['exam', index.toString()]);
  }

  startTimer() {
    if (this.timerId) {
      return;
    }
    this.timerId = setInterval(() => {
      if (this.timerDuration > 0) {
        this.timerDuration--;
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
        this.router.navigate(['/scores']); // Navigate als Zeit am ende ist
      }
    }, 1000);
  }

  get timerDisplay(): string {
    const minutes = Math.floor(this.timerDuration / 60);
    const seconds = this.timerDuration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  showNextQuestion(question: Question) {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.randomizedIndexes.length) {
      const nextIndex = this.randomizedIndexes[this.currentQuestionIndex];
      this.oldAnswer(question, nextIndex);
      this.lastQswitch = false;
      this.noOptionSwitch = false;
      this.navigateToQuestion(nextIndex);
    } else {
      this.router.navigate(['scores']);
    }
  }

  showPreviousQuestion(question: Question) {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      const prevIndex = this.randomizedIndexes[this.currentQuestionIndex];
      this.oldAnswer(question, prevIndex);
      this.lastQswitch = false;
      this.noOptionSwitch = false;
      this.navigateToQuestion(prevIndex);
    } else {
      this.lastQswitch = true;
      setTimeout(() => {
        this.lastQswitch = false;
      }, 2000);
    }
  }

  checkAnswerAndNavigate(question: Question) {
    if (question.selectedAnswer === undefined) {
      this.noOptionSwitch = true;
      setTimeout(() => {
        this.noOptionSwitch = false;
      }, 1000);
    } else {
      this.showNextQuestion(question);
    }
    this.scoreService.calculateUpdatedScores(question);
  }

  skipQuestion(question: Question) {
    question.skipped = true;
    this.showNextQuestion(question);
    this.scoreService.calculateUpdatedScores(question);
  }

  countDownM() {
    if (this.countDown > 0) {
      setTimeout(() => {
        this.countDown--;
        this.countDownM();
      }, 1000);
    }
  }

  oldAnswer(question: Question, lastAnswerIndex: number) {
    const rightAnswer = this.scoreService.scores.rightQuestions
      .find((q) => parseInt(q.index) === lastAnswerIndex)
      ?.selectedAnswer.toString();

    const wrongAnswer = this.scoreService.scores.wrongQuestions
      .find((q) => parseInt(q.index) === lastAnswerIndex)
      ?.selectedAnswer.toString();

    this.lastAnswer = rightAnswer || wrongAnswer;
  }
  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}
