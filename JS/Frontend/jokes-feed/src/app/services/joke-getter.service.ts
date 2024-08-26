import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { Subject, take, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Joke, JokeCategory, JokeType } from '../components/joke/joke.component';

export interface JokeRequestConfig {
  readonly type?: JokeType,
  readonly flags?: {
    readonly nsfw?: boolean;
    readonly religious?: boolean;
    readonly political?: boolean;
    readonly racist?: boolean;
    readonly sexist?: boolean;
    readonly explicit?: boolean;
  },
  readonly id?: number;
  readonly safe?: boolean;
  readonly category?: JokeCategory
  readonly amount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JokeGetterService {

  private _cachedJokes : List<Joke> = List();
  private _onJokeUpdate = new Subject<Joke>();

  get cachedJokes() {return this._cachedJokes;}
  readonly onJokeUpdate = this._onJokeUpdate.asObservable();

  constructor(private http: HttpClient) { }

  public addJoke(config: JokeRequestConfig) {
    return this.getJoke(config).pipe(
      tap((v) => this._onJokeUpdate.next(v)),
    );
  }
  
  private getJoke(config: JokeRequestConfig ) {
    if(config.flags == undefined) {
      config = {...config, flags: {
        explicit: config.flags!?.explicit || false,
        nsfw: config.flags!?.nsfw || false,
        political: config.flags!?.political || false,
        racist: config.flags!?.racist || false,
        religious: config.flags!?.religious || false,
        sexist: config.flags!?.sexist || false,}}
    }


    const actualRequest = config as any;
    

    actualRequest.flags = Object.keys(config.flags!).reduce((result: any[], key: string) => {

      actualRequest.flags[key] && result.push(key);
      return result;
    }, []).join(" ")

    const params = Object.keys(actualRequest).reduce((result: HttpParams, key: string) => {
      const valueOfKey = actualRequest[key];
      if(valueOfKey) {
        result = result.set(key, valueOfKey);
      }
      return result;
    }, new HttpParams()); 
    

    return this.http.get<any>(`${env.jokesUrl}${actualRequest.category || "any"}`, {
      params
    }).pipe(
      tap((v) => {
        if(v.jokes != null) {
          v.jokes.forEach((j: any) => {
            const isDup = this._cachedJokes.find((_v) => _v.id == j.id) != null;
            if(isDup) {return;}

            this._cachedJokes = this._cachedJokes.push(
              {
                content: j.joke || j.setup + '\n' + j.delivery,
                ...j,
              }
            )
          })
        } else {
            const isDup = this._cachedJokes.find((_v) => _v.id == v.id) != null;
            if(isDup) {
              return;
            }
            this._cachedJokes = this._cachedJokes.push(
              {
                content: v.joke || v.setup + '\n || ' + v.delivery ,
                ...v
              }
            )
        }
      })
    );
     

  }


}
