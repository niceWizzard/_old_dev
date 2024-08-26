import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { Tag, TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags-manager',
  templateUrl: './tags-manager.component.html',
  styleUrls: ['./tags-manager.component.scss']
})
export class TagsManagerComponent implements OnInit {

  tags$!: Observable<List<Tag>>

  constructor(private tagService: TagsService) { }

  ngOnInit(): void {
    this.tags$ = this.tagService.tagChanges
  } 

  editTag(tag: Tag) {
    console.log(tag);
  }

  deleteTag(tag: Tag) {
    this.tagService.removeTag(tag.id)
  }

}
