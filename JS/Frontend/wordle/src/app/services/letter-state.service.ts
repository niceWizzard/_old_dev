import { Injectable } from '@angular/core';
import { LetterState } from '../components/guess-word/guess-word.component';
import { GameEventsService } from './game-events/game-events.service';


@Injectable({
  providedIn: 'root'
})
export class LetterStateService {

  readonly letterStateList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .reduce((result: any, current: string) => {
        result[current] = "empty";
        return result;
      }, {});

  constructor(private gameEvents: GameEventsService) {
    this.gameEvents.restartGameEvent.subscribe(() => {
      this.resetStates();
    })
  }

  setLetterState(letter: string, state: LetterState) {
     this.letterStateList[letter.toUpperCase()] = state;
  }

  getLetterState(letter: string) : LetterState {
    return this.letterStateList[letter.toUpperCase()];
  }

  resetStates() {
    Object.keys(this.letterStateList).forEach((key) => {
      this.letterStateList[key] = "empty"
    })
  }

}
