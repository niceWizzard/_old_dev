import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameEventsService } from './game-events.service';

@Injectable({
  providedIn: 'root'
})
export class GameEventsEmitterService {

  constructor() { 

  }

  private restartGameSubject = new Subject<void>();

  public readonly restartGameEvent = this.restartGameSubject.asObservable();

  public restartGame(){ 
    this.restartGameSubject.next();
  }

}
