import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './question';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private apiUrl = 'assets/ISTQB_v3,1.json';

  questions: Question[] = [];
  questionsLength = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.getLength();
  }
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  getSingle(index: string): Observable<Question> {
    return this.http.get<Question[]>(this.apiUrl).pipe(
      map((questions: Question[]) => {
        const foundQuestion = questions.find((q) => q.index == index);
        if (foundQuestion) {
          return foundQuestion;
        } else {
          throw new Error('Question not found');
        }
      }),
    );
  }

  isExamRoute(): boolean {
    const segments = this.router.url
      .split('/')
      .filter((segment) => segment !== '');
    return segments.length >= 1 && segments[0] === 'exam';
  }

  getLength() {
    return this.http.get<Question[]>(this.apiUrl).subscribe((questions) => {
      this.questionsLength = questions.length;
    });
  }
}
