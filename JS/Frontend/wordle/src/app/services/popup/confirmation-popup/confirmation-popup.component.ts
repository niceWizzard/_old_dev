import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ConfirmationPopupConfig {
  confirmedText: string;
  quitButtonText: string;
  content: string;
  title?: string;
}

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : ConfirmationPopupConfig) { }

  ngOnInit(): void {
  }

}
