import { Component, OnInit } from '@angular/core';
import { LetterStateService } from 'src/app/services/letter-state.service';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent implements OnInit {

  constructor(private letterService: LetterStateService) { }

  ngOnInit(): void {

  }
  
  onKeyClick(e: MouseEvent) {
    const el = e.target as HTMLElement;
    console.log(el.classList.contains("game-keyboard-button"))
    const event = new KeyboardEvent("keydown", {
      key: getKeyString(el)
    });
    window.dispatchEvent(event);
    function getKeyString(el : HTMLElement) {
      const text = el.textContent;
      if(text == "⌫") {
        return "Backspace"
      } 
      return text || "ERROR";
    }
  }

  getClassName(letter: string) {
    return `game-keyboard-button ${this.letterService.getLetterState(letter)}`
  }

}
