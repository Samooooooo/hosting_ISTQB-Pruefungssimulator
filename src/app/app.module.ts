import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { LearnModule } from './learn/learn.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ScoreComponent } from './shared/score/score.component';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        HomepageComponent,
        HeaderComponent,
        ScoreComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        LearnModule,
        FormsModule], providers: [provideClientHydration(), provideHttpClient(), provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
