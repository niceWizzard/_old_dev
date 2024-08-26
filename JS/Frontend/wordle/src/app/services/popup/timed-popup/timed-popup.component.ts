import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface TimedPopupData {
  message: string;
  title?: string;
  closeButtonText?: string; 
}

@Component({
  selector: 'app-timed-popup',
  templateUrl: './timed-popup.component.html',
  styleUrls: ['./timed-popup.component.scss']
})
export class TimedPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TimedPopupData) { }

  ngOnInit(): void {
  }

}
