import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { filter, takeWhile } from 'rxjs';
import { GameEventsEmitterService } from 'src/app/services/game-events/game-events-emitter.service';
import { InputService } from 'src/app/services/input.service';
import { GameMessageService } from 'src/app/services/message/game-message.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { encryptWord } from 'src/app/services/url-params.service';
import { WordsService } from 'src/app/services/words.service';
import { STAGGER_DURATION } from 'src/assets/configs';
import { environment } from 'src/environments/environment';
import { GuessWordComponent } from '../guess-word/guess-word.component';

enum GameState {
  Lose,
  Win,
  Playing
}



@Component({
  selector: 'app-wordle-main',
  templateUrl: './wordle-main.component.html',
  styleUrls: ['./wordle-main.component.scss']
})
export class WordleMainComponent implements OnInit {

  constructor(private inputService : InputService, 
    private wordService : WordsService,
    private popUpService: PopupService,
    private gameEventEmitter: GameEventsEmitterService,
    ) { }

  @ViewChildren(GuessWordComponent)
  children!: QueryList<GuessWordComponent>;

  canType = true;
  requiredLetters = 5;
  _maxGuesses = 6;

  get maxGuessesArray(){return new Array(this._maxGuesses)}

  _currentGuess = "";

  private wordToGuess = ""

  wordId: string= ""

  readonly STAGGER_DURATION = STAGGER_DURATION;

  get word() {return this._currentGuess}

  currentGuessIndex = 0;
  
  isPlaying = true;

  private get currentGuessObject() {return this.children.get(this.currentGuessIndex) };

  ngOnInit(): void {
    this.wordService.currentWord.subscribe((v) => {
      if(v == null) {return}
      this.wordToGuess= v;
      this.wordId = encryptWord(v)
    });

    this.inputService.onLetterPress
    .pipe(
    filter(() => this.canType)
    ).subscribe((v) => {
      this.children.get(this.currentGuessIndex)?.addCharacter(v);
    })

    this.inputService.onDeleteButton
    .pipe(
      filter(() => this.canType)
    ).subscribe(v => {
        this.children.get(this.currentGuessIndex)?.removeCharacter();
    })

    this.inputService.onEnterBUtton.pipe(
      filter(() => {return this.canType})
    ).subscribe(this.validateCurrentGuess.bind(this))
    

  }

  validateCurrentGuess() {
    const guess = this.currentGuessObject?.toWord();

    if(guess && guess?.length < this.requiredLetters) {
      this.popUpService.timedPopup(1, {
        message: `Needs to be ${this.requiredLetters} letters.`,
        closeButtonText: "Close"
      });
      return;
    }

    const isAWOrd = this.wordService.isAWord(guess!);

    if(!isAWOrd) {
      this.popUpService.timedPopup(1, {
        message: "Invalid Word.",
        closeButtonText: "Close"
      });
      return;
    }
    this.canType = false;
    this.currentGuessObject?.lockState(this.wordToGuess)
      .subscribe(() => {
        this.canType = true
      
        if(guess?.toUpperCase() == this.wordToGuess.toUpperCase()) {
          this.canType = false;
          this.popUpService.confirmationPopup({
            confirmedText: "Play Again",
            quitButtonText: "Exit",
            content: `The word was ${this.wordToGuess}`,
            title: "You won the round!",
            config: {
              disableClose: true,
            }
          })?.afterClosed().subscribe((playAgain: boolean) => {
            if(!playAgain) {
              this.isPlaying = false;
              return;
            }
            this.restartGame();
            this.canType = true
            
          })
          return;
        }
        this.currentGuessIndex++;
        if(this.currentGuessIndex >= this._maxGuesses ) {
          this.canType = false;
          this.popUpService.confirmationPopup({
            confirmedText: "Play Again",
            quitButtonText: "Exit",
            content: `The word was ${this.wordToGuess}`,
            title: "You lost the round!",
            config: {
              disableClose: true,
            },
          })?.afterClosed().subscribe((playAgain: boolean) => {
            if(!playAgain) {
              this.isPlaying = false;
              return;
            }
            this.restartGame();
            this.canType = true
            
          })
        }

      });

    
  }

  restartGame() {
    this.isPlaying = true;
    this.canType = true;
    this.children.forEach(v => {
      v.reset();
    })
    this.wordService.refreshCurrentWord();
    this.currentGuessIndex = 0;
    this.gameEventEmitter.restartGame();
  }

  giveUp(e: MouseEvent) {
    e.preventDefault();
    this.canType = false;
    this.popUpService.confirmationPopup({
      confirmedText: "Give up!",
      quitButtonText: "Continue",
      title: "Are you sure?",
      content: "Do you want to give up?",
      config: {
        restoreFocus: false,
      }
    })?.afterClosed().subscribe((v) => {
      this.canType = true

      if(v !== true) {
        return;
      }
      this.popUpService.confirmationPopup({
        content: `Sad to see you give up! The word was ${this.wordToGuess}`,
        title: "You gave up! ",
        confirmedText: "Okay",
        quitButtonText: "",
        config: {
          width: undefined, 
          disableClose: true,
        }
      })?.afterClosed().subscribe(() => {
        this.restartGame();
      })
    })
  }
  
  onIdClick() {
    navigator.clipboard.writeText(
      `${environment.globalUrl}/?gameId=${this.wordId}`
    )
      .then(() => {
        this.popUpService.timedPopup(2.5, {
          message: "Id Copied",
        })
      })
  }


}
