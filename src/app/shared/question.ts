export interface Question {
  index: string;
  image: false;
  question: string;
  options: string[];
  correctAnswer: string;
  showAnswer: boolean;
  skipped: boolean;
  selectedAnswer: string;
}
