import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';

import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { WordleMainComponent } from './components/wordle-main/wordle-main.component';
import { GuessWordComponent } from './components/guess-word/guess-word.component';
import { GameMessageComponent } from './services/message/game-message/game-message.component';
import { TimedPopupComponent } from './services/popup/timed-popup/timed-popup.component';
import { ConfirmationPopupComponent } from './services/popup/confirmation-popup/confirmation-popup.component';
import { VirtualKeyboardComponent } from './components/virtual-keyboard/virtual-keyboard.component'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WordleMainComponent,
    GuessWordComponent,
    GameMessageComponent,
    TimedPopupComponent,
    ConfirmationPopupComponent,
    VirtualKeyboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forRoot([

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
