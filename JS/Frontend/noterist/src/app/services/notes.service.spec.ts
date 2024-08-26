import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MutableNote, Note } from '../components/note-preview/note-preview.component';

import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have onbeforeunload', () => {
    expect(window.onbeforeunload).toBeTruthy()
  });

  describe('Methods', () => {
    const newNote = { content: "CONTENT", lastModified: new Date()}

      it('it should create a new note', () => {
        let noteReturned =  service.createNote(newNote); 
        expect(noteReturned).toBeTruthy();
        expect(noteReturned.content).toBe(newNote.content)
        expect(noteReturned.lastModified).toBe(newNote.lastModified)
        expect(service["_currentNotes"].value.find((v) => v.id == noteReturned.id)).toBeTruthy()     
      });
      it('should get a note', () => {
        const noteReturned = service.createNote(newNote);
        const note = service.getNote(noteReturned.id);
        expect(note).toBeTruthy();
        expect(note?.content).toBe(newNote.content)
      });

      it("should delete a note", () => {
        const noteReturned = service.createNote(newNote);
        
        let noteList = service["_currentNotes"].value;
        expect(noteReturned).toBeTruthy();
        

        expect(noteList.find((v) => v.id == noteReturned.id)).toBeTruthy();
        service.deleteNote(noteReturned.id)
        noteList = service["_currentNotes"].value;
        expect(noteList.find((v) => v.id == noteReturned.id)).toBeFalsy();

      })
      it('should update a note', () => {
        let noteReturned =  service.createNote(newNote) as MutableNote; 
        expect(noteReturned).toBeTruthy();
        const content = "thisiscontent";
        noteReturned.content = content
        service.updateNote(noteReturned)
        
        const updatedNote = service.getNote(noteReturned.id);

        expect(updatedNote).toBeTruthy();
        expect(updatedNote?.content).toBe(content);
        

      });

  });
    
});
