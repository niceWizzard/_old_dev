import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { uniqBy } from 'lodash';
import { BehaviorSubject, map } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import {v4 as createId} from 'uuid'

export interface Tag {
  name: string;
  id: string;
  isDefault?: boolean;
}

export enum TagCreationError {
  MaxTagsReached,
  AlreadyExists,
}

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly TAGS_KEY = 'tags';

  constructor(private localStorageService: LocalStorageService) {
    const tags = localStorageService.get<Tag[]>(this.TAGS_KEY);
    if (tags == null) {
      return;
    }
    const uniqueTags = uniqBy(tags, 'name');
    this._tagsChanges = new BehaviorSubject(List(uniqueTags));
    this.tagChanges = this._tagsChanges.asObservable();
    this.tagsCountChanges = this.tagChanges.pipe(
      map(v => v.count() - this.defaultTags.length)
    )
  }

  readonly defaultTags: Tag[] = [
    'Food', "Digital", "Travel", 
  ].map((v, index) => {
    return  {
      id: index.toString(),
      name: v,
      isDefault: true,
    }
  });

  private readonly UNSCALED_TAGS_LIMIT = 30 + this.defaultTags.length;

  public readonly TAGS_LIMIT = this.UNSCALED_TAGS_LIMIT - this.defaultTags.length;
  
  private readonly _tagsChanges = new BehaviorSubject(List(this.defaultTags));

  private saveToLocalStorage() {
    const tags = this._tagsChanges.value.toArray();
    this.localStorageService.set(this.TAGS_KEY, tags);
  }

  get _tags() {
    return this._tagsChanges.value;
  }

  readonly tagChanges = this._tagsChanges.asObservable();

  readonly tagsCountChanges = this.tagChanges.pipe(
    map(v => v.count() - this.defaultTags.length)
  )

  createTag(name: string): true | TagCreationError {
    if (this._tags.count() >= this.UNSCALED_TAGS_LIMIT) {
      return TagCreationError.MaxTagsReached;
    }
    if(this._tags.find(v => v.name.toLowerCase() == name.toLowerCase()) != null) {
      return TagCreationError.AlreadyExists;
    }

    let id = createId();
    while (this._tagsChanges.value.find((v) => v.id == id)) {
      id = createId();
    }
    const tag = {
      name,
      id
    } 
    const newTagList = this._tags.push(tag);
    this._tagsChanges.next(newTagList);
    this.saveToLocalStorage();
    return true;
  }

  removeTag(tagId: string) {
    if (this._tags.count() == 0) {
      return;
    }
    const newTagList = this._tags.filter((v) => v.id != tagId);
    this._tagsChanges.next(newTagList);
    this.saveToLocalStorage();
  }
  getTagById(id: string) {
    return this._tags.find(tag => tag.id == id);
  }
  getTagsById(ids: string[]) {
    const arr: Tag[] = [];
    ids.forEach(v => {
      const tag = this.getTagById(v);
      tag != null && arr.push(tag)
    })
    return arr;
  }
 
}
