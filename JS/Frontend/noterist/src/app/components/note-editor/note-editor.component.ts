import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, filter, Subject, Subscription, takeWhile } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
import { MutableNote, Note } from '../note-preview/note-preview.component';



@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private activedRoute: ActivatedRoute,
    private noteService: NotesService,
    private router: Router,

    ) { }
    private alive = true;
  ngOnDestroy(): void {
    this.alive = false;
  }
  

  @ViewChild("header") header!: ElementRef;

  note?: MutableNote;

  undoStack: string[] = [];
  redoStack: string[] = [];

  contentChange = new Subject<string>();
  
  ngAfterViewInit(): void {
    (this.header.nativeElement as HTMLElement).scrollIntoView();
  }

  ngOnInit(): void {
    
    this.contentChange.pipe(
      takeWhile(() => this.alive),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((v) => {
      this.undoStack.push(v);      
    })
    
    this.activedRoute.params.pipe(
      takeWhile(() => this.alive),
    ).subscribe(v => {
      const id = v['id'];
      this.note = this.noteService.getNote(id)
    })
    
    this.router.events
    .pipe(
      takeWhile(() => this.alive),
      filter(event => event instanceof NavigationStart)
    )
    .subscribe((event) => {
      const e = event as NavigationStart;
      const noteValue = this.getValue();
      if(noteValue == null) {return;}
      if(noteValue.content == "") {
        this.noteService.deleteNote(noteValue.id)
        return;
      }
      (this.undoStack.length || this.redoStack.length) && 
      this.noteService.updateNote(
        noteValue as Note
      ) 

    });
  }

  onChange(event: string) {
    if(!this.note) {return;}
    this.contentChange.next(event)
    this.note.content = event;
  }

  getValue() {
    return this.note;
  }

}
