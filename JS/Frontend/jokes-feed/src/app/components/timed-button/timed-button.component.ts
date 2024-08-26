import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-timed-button',
  templateUrl: './timed-button.component.html',
  styleUrls: ['./timed-button.component.scss']
})
export class TimedButtonComponent implements OnInit {

  constructor() { }

  isHeld = false;

  currentTick = 0;

  @Input()
  maxMs = 500;

  @Input()
  tickAmount = 10;

  @Output()
  onFillUp = new EventEmitter();

  
  @Output()
  onTick = new EventEmitter();


  ngOnInit(): void {
  }

  onMouseUp() {
    this.isHeld = false;
    this.currentTick = 0;
  }

  onMouseDown() {
    this.isHeld = true;
    interval(this.tickAmount).pipe(takeWhile(() => this.isHeld))
    .subscribe((v) => {
      this.onTick.emit(this.currentTick);
      this.currentTick += this.tickAmount;
      if(this.currentTick >= this.maxMs) {
        this.onFillUp.emit();
        this.isHeld = false;
        this.currentTick = 0;
      }
    })
  }

}
