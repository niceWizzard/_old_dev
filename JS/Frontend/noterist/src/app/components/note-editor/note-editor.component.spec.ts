import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../note-preview/note-preview.component';

import { NoteEditorComponent } from './note-editor.component';

describe('NoteEditorComponent', () => {
  let component: NoteEditorComponent;
  let fixture: ComponentFixture<NoteEditorComponent>;
  const mockNoteService = jasmine.createSpyObj(["getNote"])
  mockNoteService.getNote.and.returnValue({
    id: "LSKDJF",
    content: "LSKDJF",
    lastModified: new Date(),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteEditorComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: NotesService, 
          useValue: mockNoteService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have note property', () => {
    expect(component.note).toBeTruthy();
  });

});
