import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { interval, Observable, timer } from 'rxjs';

type RequestType = "GET" | "PUT" | "DELETE" | "POST";

interface ApiInfo {
  url: string;
  requestType?: RequestType;
  data?: any;
  json?: any;
  requestTimeout: number;
  requestBuffer: number;
  cancellationSource?: Observable<void>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  
  constructor(private httpClient: HttpClient) {
    console.log("NICE");
    this.get({
      url: "",
      requestBuffer: 10,
      requestTimeout: 2000,
    });
  }

  get(info: ApiInfo) {
    if(info.requestBuffer <= 0 || info.requestTimeout <= 0) {
      throw new Error("Request buffer and Request Timeout must be greater than 0")
    }
    const loop = interval(info.requestTimeout);

    loop.subscribe(() => {
      for(let i =0; i < info.requestBuffer; i++) {
        this.onRequestFinish.bind(this)(this.httpClient.get(info.url));
      }
    })  

  }

  onRequestFinish(o : Observable<any>) {
    o.subscribe(v => {
      console.log(v);
    })
  }

}
