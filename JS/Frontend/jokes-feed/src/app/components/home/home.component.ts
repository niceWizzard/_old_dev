import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Joke } from '../joke/joke.component';
import { environment as env } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { JokeGetterService } from 'src/app/services/joke-getter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  noMoreJokes = false;

  private _currentCachedJokesCount : number = 0;

  private readonly subscriptionsToDestroy : Subscription[]  = [];

  constructor(public jokeGetter: JokeGetterService) {
  }
  ngOnDestroy(): void {
    this.subscriptionsToDestroy.forEach((v) => v.unsubscribe())
  }
  ngOnInit(): void {
    this.addJoke(10)
    this._currentCachedJokesCount = this.jokeGetter.cachedJokes.count();
  }

  addJoke(amount: number, recursion=0) {
    const sub = this.jokeGetter.addJoke({
      amount,
      category: "Any",
    })
    .subscribe((v) => {
      const cachedJokeCount = this.jokeGetter.cachedJokes.count();
      const hasNewJokes = (cachedJokeCount - this._currentCachedJokesCount) > 0;
      if(!hasNewJokes && 
      recursion < 10) {
        
      } else if(recursion >= 10) {
        this.noMoreJokes = true;
        return;
      } 
      this._currentCachedJokesCount = cachedJokeCount;

    })

    this.subscriptionsToDestroy.push(sub);

    
  }
  
  onScroll() {
    this.addJoke(10)
  }

  onFillup() {
    document.querySelector("#feed-top")?.scrollIntoView({behavior: 'smooth'})
  }

}
