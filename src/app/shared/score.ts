import { Question } from './question';

export interface Score {
  wrongQuestionsCounter: number;
  skippedQuestionsCounter: number;
  rightAnswersCounter: number;
  wrongQuestions: Question[];
  skippedQuestions: Question[];
  rightQuestions: Question[];
}
