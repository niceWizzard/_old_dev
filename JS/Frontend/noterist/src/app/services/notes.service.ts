import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { Note } from '../components/note-preview/note-preview.component';
import {v4 as createId} from 'uuid'
import {cloneDeep} from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private _currentNotes = new BehaviorSubject<List<Note> >(List([]));

  readonly currentNotes = this._currentNotes.asObservable().pipe(
    map((v) => v.sort((a, b) => b.lastModified.valueOf() - a.lastModified.valueOf())),
  );

  constructor() { 

    window.onbeforeunload = () => this.saveNotes();

    const storedNotes = localStorage.getItem("notes");
    if(!storedNotes) {
      
      return;
    }

    let notes = JSON.parse(storedNotes) as Note[];
    if(!Array.isArray(notes)) {return;}
    notes = notes.map(v => {
      return {
        ...v,
        lastModified: new Date(v.lastModified)
      } 
    })
    this._currentNotes.next(List(notes))
    
  }

  createNote(newNote: Omit<Note, "id"> ) {
    const id = createId();
    const actualNote : Note = {
      ...newNote,
      id
    }
    this._currentNotes.next(
      this._currentNotes.value.push(actualNote)
    )
    return actualNote;
  }

  updateNote(newNote: Note) {
    const noteIndex = this._currentNotes.value.findIndex((v) => v.id == newNote.id);
    if(noteIndex < 0) {return;}
    newNote = {
      ...newNote,
      lastModified: new Date()
    }
    this._currentNotes.next(
      this._currentNotes.value.set(noteIndex, newNote)
    );
  }

  deleteNote(id: string) {
    this._currentNotes.next(
      this._currentNotes.value.filter((v) => v.id != id)
    )
  }
  
  saveNotes() {
    let currentNotes = this._currentNotes.value;
    if(!currentNotes) {return;}
    currentNotes = currentNotes.filter((v) => v.content )

    localStorage.setItem("notes", JSON.stringify(currentNotes.toArray()));
    

  }

  getNote(id: string) {
    return cloneDeep(this._currentNotes.value.find((v) => v.id == id));
  }


}
