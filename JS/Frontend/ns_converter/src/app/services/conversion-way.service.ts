import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversionInfo, ConversionWay } from '../components/home/ns-selector/ns-selector.component';

@Injectable({
  providedIn: 'root'
})
export class ConversionWayService {

  constructor() { }

  private readonly _defaultConversionWay: ConversionInfo = {
    from: 'dec', to: 'bin', 
    input: '',
  }

  private readonly _conversionWayBH = new BehaviorSubject(this._defaultConversionWay);

  public readonly conversionWayChanges = this._conversionWayBH.asObservable();

  changeConversionWay(n : ConversionInfo) {
    this._conversionWayBH.next(n);
  }

  


}
