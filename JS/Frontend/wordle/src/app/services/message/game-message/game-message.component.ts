import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { timer } from 'rxjs';
import { GameMessageService } from '../game-message.service';

export type MessageStyle = "warn" | "default" | "success";

export interface Message {
  content: string;
  isActive: boolean;
  style?: MessageStyle;
}

@Component({
  selector: 'app-game-message',
  templateUrl: './game-message.component.html',
  styleUrls: ['./game-message.component.scss']
})
export class GameMessageComponent implements OnInit {

  constructor(private msg: GameMessageService) { }

  message: Message = {
    content: "DEFAULT TEXT",
    isActive: false,
  }

  ngOnInit(): void {
    this.msg.onMessage.subscribe((v: Message) => {
      this.setMessage(v);
    })
  }

  private setMessage(v: Message) {
    this.message.isActive = true;
    this.message.content = v.content;
    this.message.style = v.style;
    timer(1000).subscribe(() => this.message.isActive = false)
  }


}
