import { animate, animateChild, group, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { LetterStateService } from 'src/app/services/letter-state.service';
import { STAGGER_DURATION } from 'src/assets/configs';

export type LetterState = "empty" | "wrong" | "within" | "correct";

interface Letter {
  value: string;
  state: LetterState,
  animated: boolean;
}


@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.scss'],
  animations: [
    trigger("nice", [
      transition("* => *", [
        query(".letter-box", 
          stagger(STAGGER_DURATION,
              [
                style({
                  transform: "scaleY(1)"
                }),
                animate(`${STAGGER_DURATION}ms ease-out`, 
                  style({
                    transform: "scaleY(0)"
                  })
                ), 
                style({
                  transform: "scaleY(0)"
                }),
                animate(`${STAGGER_DURATION}ms ease-out`, 
                  style({
                    transform: "scaleY(1)"
                  })
              ), 
            ]
            ), 
        {
          optional: true
        }),
        
      ])

    ]),
    
  ]
})
export class GuessWordComponent implements OnInit {

  @Input()
  maxCharacters = 6;

  currentIndex = -1;

  letterArray!: Letter[];

  isLocked = false;

  readonly staggerDuration = STAGGER_DURATION;

  addCharacter(v: string) {
    if(this.currentIndex >= this.maxCharacters - 1) {
      return;
    }
    const currentCharacter = this.letterArray[this.currentIndex + 1];
    currentCharacter.value = v.toUpperCase();
    currentCharacter.animated = true;
    this.currentIndex++;
  }

  removeCharacter() {
    if(this.currentIndex < 0) {
      return;
    }
    const currentCharacter = this.letterArray[this.currentIndex];
    currentCharacter.value = "";
    currentCharacter.animated = false;

    this.currentIndex--;
  }

  toWord(){
    return this.letterArray.map(v => v.value).join("");
  }

  lockState(correctWord: string) {
    correctWord = correctWord.toUpperCase();
    const guessWord = this.toWord();
    const animationDuration = timer(STAGGER_DURATION * this.letterArray.length);




    this.letterArray.forEach((currentLetter, currentIndex) => {
      
      let stateToSet: LetterState = "correct"
      let guessLength = indexesOf(guessWord, currentLetter.value).length;
      const currentLetterState = this.letterState.getLetterState(currentLetter.value);
      let currentLetterCount = indexesOf(correctWord, currentLetter.value).length;

      if(currentLetter.value === correctWord[currentIndex]) {
        stateToSet = "correct"
      }
      else if(correctWord.includes(currentLetter.value) && 
      currentLetterCount < guessLength) {
        const correctlyPlaced = this.letterArray
          .filter((v, i) => v.value === correctWord[i]);
        const withinlyPlaced = this.letterArray
          .filter((v, i) => v != currentLetter && v.state == "within" );
        if(correctlyPlaced?.length == 0 && 
          withinlyPlaced?.length < currentLetterCount) {
          stateToSet = "within";
        } else {
          stateToSet = "empty";
        }

      } else if(currentLetterCount >= guessLength) {
        stateToSet = "within"
      }
       else {
        stateToSet = "wrong"
      }
        
        currentLetter.state = stateToSet;


          if(currentLetterState != currentLetter.state && currentLetterState != "correct") {
            this.letterState.setLetterState(currentLetter.value, currentLetter.state)
          }
    })
    this.isLocked = true;
    return animationDuration;
  }

  reset() {
    this.letterArray.forEach(v => {
      v.state = "empty";
      v.value = ""
    })
    this.currentIndex = -1;
    this.isLocked = false;
  }

  constructor(private letterState : LetterStateService) { }

  ngOnInit(): void {
    this.letterArray = new Array<Letter>(this.maxCharacters)
          .fill({value: "", state: "empty", animated: false})
          .map((v) => { 
            return {...v}
          })
  }

}

function indexesOf(str: string , toFind: string) {
  var indices = [];
  for(var i=0; i<str.length;i++) {
    if (str[i] === toFind) indices.push(i);
  }
  return indices;
}

