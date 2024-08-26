import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, Subject } from 'rxjs';
import { WORDS } from 'src/assets/words';

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService {

  private _wordIdChange = new Subject<string>();

  readonly wordIdChange = this._wordIdChange.asObservable();

  constructor(private ar : ActivatedRoute) {
    this.ar.queryParams.subscribe(v => {
      console.log("P_ARAMS")
      const wordId = (v["gameId"] as string)?.replace("_", "=");
      console.log("TRYIN", wordId)
      if(wordId == null) {return}
      try {
        const decryptedId = decryptId(wordId);
        console.log("LSKADJFLKSDJFLK", decryptedId)
        if(WORDS.includes(decryptedId) ) {
          this._wordIdChange.next(decryptedId);
        } 
      } catch (err) {
        console.log(err);
      }

    })
  }


  


}

export function encryptWord(word: string) {
  return btoa(word).replace("=", "_");
}

export function decryptId(id: string) {
  return atob(id).toUpperCase();
}

