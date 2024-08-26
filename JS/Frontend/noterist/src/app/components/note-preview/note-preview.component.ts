import { Component, Input, OnInit } from '@angular/core';

type Mutable<T> = {
  -readonly[P in keyof T]: T[P]
};
export interface Note {
  readonly content: string;
  readonly id: string;
  readonly lastModified: Date;
}

export interface MutableNote extends Mutable<Note> {};


@Component({
  selector: 'app-note-preview',
  templateUrl: './note-preview.component.html',
  styleUrls: ['./note-preview.component.scss']
})
export class NotePreviewComponent implements OnInit {

  constructor() { }

  @Input() 
  note!: Note;

  get noteDate() {
    return `
    ${this.note.lastModified.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
    ${this.note.lastModified.toDateString()}
    `
  }

  ngOnInit(): void {
    if(this.note == null) {throw new Error("Note is not filled in!")}
    this.note = {
      ...this.note, 
      content: `${this.note.content.substring(0, 180)}${
        this.note.content.length> 180 ? "..." : ""}`
    }
  }

}
