import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TagCreationError, TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-quick-create-tag',
  templateUrl: './quick-create-tag.component.html',
  styleUrls: ['./quick-create-tag.component.scss'],
})
export class QuickCreateTagComponent implements OnInit {
  tagInputControl = new FormControl('', Validators.pattern(/^[^.,!@#$%\^&*()\\\/]+$/));
  tagsLeft = 0;
  closeOnCreate = true;
  constructor(
    public tagService: TagsService,
    private matDialogRef: MatDialogRef<QuickCreateTagComponent>
  ) {}

  ngOnInit(): void {
    this.tagService.tagsCountChanges.subscribe(tagsCount => {
      this.tagsLeft = this.tagService.TAGS_LIMIT - tagsCount;
    });
  }

  onSubmit() {
    if (!this.tagInputControl.valid) {
      return;
    }
    const creationResult = this.tagService.createTag(this.tagInputControl.value.trim())
    this.closeOnCreate && creationResult === true && this.matDialogRef.close();
    if(creationResult !== true) {
      if(creationResult === TagCreationError.AlreadyExists) {
        this.tagInputControl.setErrors({
          alreadyExist: true,
        })
      }
    }
    
  }
}
