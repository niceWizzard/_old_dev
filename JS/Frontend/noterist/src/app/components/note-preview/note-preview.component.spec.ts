import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePreviewComponent } from './note-preview.component';

function generateRandomText(length=200) {
  return [...Array(length)].map(() => Math.random().toString(36)).join('');
}

describe('NotePreviewComponent', () => {
  let component: NotePreviewComponent;
  let fixture: ComponentFixture<NotePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePreviewComponent);
    component = fixture.componentInstance;
    const noteWithLongContent = {
      content: generateRandomText(300),
      id: generateRandomText(10),
      lastModified: new Date(),
    };
    component.note = noteWithLongContent
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have content with length not > 180 ', () => {
    expect(component.note.content.length - 3).toBeLessThanOrEqual(180)
  });

});
