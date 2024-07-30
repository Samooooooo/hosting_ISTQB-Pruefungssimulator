/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { Question } from './question';
import { Score } from './score';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  scores: Score = {
    wrongQuestionsCounter: 0,
    skippedQuestionsCounter: 0,
    wrongQuestions: [],
    skippedQuestions: [],
    rightQuestions: [],
    rightAnswersCounter: 0,
  };
  updatedScores: Score;

  constructor(private router: Router) {
    this.updatedScores = { ...this.scores };
  }

  getScores() {
    return this.scores;
  }

  updateScores(updatedScores: Score) {
    this.scores = updatedScores;
    console.table(this.scores);
  }

  isExamRoute(): boolean {
    const segments = this.router.url
      .split('/')
      .filter((segment) => segment !== '');
    return segments.length >= 1 && segments[0] === 'exam';
  }

  calculateUpdatedScores(question: Question) {
    this.updatedScores = { ...this.scores };

    const isQuestionAlreadySkipped = this.updatedScores.skippedQuestions.some(
      (q) => q.index === question.index,
    );
    const isQuestionAlreadyRight = this.updatedScores.rightQuestions.some(
      (q) => q.index === question.index,
    );
    const isQuestionAlreadyWrong = this.updatedScores.wrongQuestions.some(
      (q) => q.index === question.index,
    );
    if (question.skipped) {
      if (
        !isQuestionAlreadySkipped &&
        !isQuestionAlreadyRight &&
        !isQuestionAlreadyWrong
      ) {
        this.updatedScores.skippedQuestions.push(question);
      }
    } else if (question.selectedAnswer === undefined) {
      return;
    } else if (question.selectedAnswer === question.correctAnswer.toString()) {
      if (isQuestionAlreadyWrong) {
        this.updatedScores.wrongQuestions =
          this.updatedScores.wrongQuestions.filter(
            (q) => q.index !== question.index,
          );
      }
      if (!isQuestionAlreadyRight) {
        this.updatedScores.rightQuestions.push(question);
      }
    } else {
      if (isQuestionAlreadyRight) {
        this.updatedScores.rightQuestions =
          this.updatedScores.rightQuestions.filter(
            (q) => q.index !== question.index,
          );
      }
      if (!isQuestionAlreadyWrong) {
        this.updatedScores.wrongQuestions.push(question);
      }
    }
    if (!question.skipped && isQuestionAlreadySkipped) {
      this.updatedScores.skippedQuestions =
        this.updatedScores.skippedQuestions.filter(
          (q) => q.index !== question.index,
        );
    }
    this.updatedScores.rightAnswersCounter =
      this.updatedScores.rightQuestions.length;
    this.updatedScores.skippedQuestionsCounter =
      this.updatedScores.skippedQuestions.length;
    this.updatedScores.wrongQuestionsCounter =
      this.updatedScores.wrongQuestions.length;

    this.updateScores(this.updatedScores);
  }
}
