import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GameEventsEmitterService } from './game-events-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class GameEventsService {

  public readonly restartGameEvent : Observable<void>;

  constructor(private eventEmitter : GameEventsEmitterService) {
    this.restartGameEvent = this.eventEmitter.restartGameEvent;
  }




}
