import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WORDS } from 'src/assets/words';
import { UrlParamsService } from './url-params.service';


@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private _wordLength = 5;

  private _currentWord = new BehaviorSubject<string | null>(null);
  
  get wordLength() {
    return this._wordLength;
  }

  readonly currentWord = this._currentWord.asObservable();

  constructor(private urlParams: UrlParamsService) {
    this.urlParams.wordIdChange.subscribe((v) => {
      console.log(v)
      this.setCurrentWord(v);
    })
    this.refreshCurrentWord();

  }

  isAWord(s: string) {
    return WORDS.find((v) => v == s);
  }

  refreshCurrentWord(newWordLength?: number) {
    if(newWordLength != undefined) {this._wordLength = newWordLength;}
    this.setCurrentWord(this.getRandomWordWithLength(this._wordLength))
    
  }


  getRandomWord() {
      const index = Math.random() * WORDS.length;
    return WORDS[Math.floor(index)]
  }

  getRandomWordWithLength(length: number) {
    let s = "";
    while(s.length != length) {
        s = this.getRandomWord();
    }
    return s;
  }

  private setCurrentWord(w: string) {
    this._currentWord.next(w);
  }

}

