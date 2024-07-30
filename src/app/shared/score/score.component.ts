import { Component } from '@angular/core';
import { Score } from '../score';
import { ScoreService } from '../score.service';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'ps-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  scores: Score;
  questionsInTotal: number;
  showWrongQuestions: boolean = false;
  showSkippedQuestions: boolean = false;

  constructor(
    private scoreService: ScoreService,
    private questionsService: QuestionsService,
  ) {
    this.scores = this.scoreService.getScores();
    this.questionsInTotal = this.questionsService.questionsLength;
  }
}
