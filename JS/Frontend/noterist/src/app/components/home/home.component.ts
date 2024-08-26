import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'immutable';
import { filter, Observable } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../note-preview/note-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  noteLists$!: Observable<List<Note>>

  constructor(private noteService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.noteLists$ = this.noteService.currentNotes;

  }

  create() {

    const note = this.noteService.createNote({
      content: "",
      lastModified: new Date(),
    })
    this.router.navigate(["note", note.id])
  }

}
