import { Component, Input, OnInit } from '@angular/core';

export type JokeType = "single" | "twopart";

export type JokeCategory = "Programming" | "Misc" | "Any" | "Dark";

export interface Joke {
  readonly type: JokeType,
  readonly content: string | string[]
  readonly flags: {
    readonly nsfw: boolean;
    readonly religious: boolean;
    readonly political: boolean;
    readonly racist: boolean;
    readonly sexist: boolean;
    readonly explicit: boolean;
  },
  readonly id: number;
  readonly safe: boolean;
  readonly category: JokeCategory
}

export interface SingleJoke extends Joke {
  readonly content: string;
}

export interface TwoPartJoke extends Joke {
  readonly content: string[];
}

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  constructor() { }

  @Input() 
  joke!: Joke;

  arr: string[] = [];

  ngOnInit(): void {
    if(this.joke == null) {
      throw new Error("Joke does not exists!")
    }
    Object.keys(this.joke.flags).forEach((v) => {
      const obj = this.joke.flags as any;
      const isTrue = obj[v] === true;
      if(isTrue) {
        this.arr.push(v)
      }
    })
  }

}
