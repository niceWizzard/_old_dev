import { Injectable } from '@angular/core';
import { Subject,} from 'rxjs';
import { Message, MessageStyle } from './game-message/game-message.component';


@Injectable({
  providedIn: 'root'
})
export class GameMessageService {

  private _onMessage = new Subject<Message>();

  get onMessage() {return this._onMessage.asObservable()}

  constructor() { }

  showMessage(s: string, style?: MessageStyle) {
    this._onMessage.next({
      content: s,
      isActive: false,
      style: style,
    });
  }

  warnMessage(s: string) {
    this.showMessage(s, "warn")
  }

  



}
