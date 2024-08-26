import { Injectable } from '@angular/core';
import { filter, fromEvent, map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private readonly allowedLetters = "abcdefghijklmnopqrstuvwxyz";

  private _onKeyPress = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    filter((v) => this.allowedLetters.includes(v.key.toLowerCase()) && (!v.shiftKey && !v.ctrlKey && !v.altKey)),
    map(v => v.key)
  );

  private _onDeleteButton = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    filter(v => v.key.toLowerCase() == "backspace"),
    map(v => v.key)
  )

  private _onEnterButton = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    filter(v => v.key.toLowerCase() == "enter"),
    map(v => v.key)
  )

  get onLetterPress() {
    return this._onKeyPress;
  }

  get onDeleteButton() {return this._onDeleteButton}

  get onEnterBUtton() {return this._onEnterButton}

  constructor() {
   }
}
