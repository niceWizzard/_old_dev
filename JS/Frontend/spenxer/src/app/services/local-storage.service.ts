import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get<T = unknown>(key: string) {
    const v = localStorage.getItem(key);
    if (v == null) {
      return null;
    }
    return JSON.parse(v) as T;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
