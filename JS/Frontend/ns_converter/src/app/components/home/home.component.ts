import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConversionWayService } from 'src/app/services/conversion-way.service';
import { Binary } from 'src/app/utils/number_system/binary-converter';
import { Decimal } from 'src/app/utils/number_system/decimal-converter';
import { getDisplayName } from 'src/app/utils/number_system/getDisplayName';
import { Hexadecimal } from 'src/app/utils/number_system/hexadecimal-converter';
import { isAnyOther, isBinary, isHexadecimal, isOctal } from 'src/app/utils/number_system/is_util';
import { Octal } from 'src/app/utils/number_system/octal-converter';
import { ConversionInfo, ConversionWay, NumberSystemType } from './ns-selector/ns-selector.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  
  
  constructor(
    private conversionWayService : ConversionWayService, 
    ) { }
  
  shouldHideResult = true;
  isValid = true;
  conversionResult: string | undefined;

  conversionInfo: ConversionInfo | undefined;

  ngOnInit(): void {
    this.conversionWayService.conversionWayChanges.subscribe(this.onValueChanges.bind(this))
  }

  isValidChanges(v: boolean) {
    this.isValid = v;
  } 

  getDisplayName(v: NumberSystemType) {
    return getDisplayName(v);
  }

  onValueChanges(v: ConversionInfo ) {
    this.conversionInfo = v;
  }

  calculateValue(value: string) {
    const {from, to} = this.conversionInfo!;
    switch(from) {
      case 'dec':
        if(to == 'bin' ) {return Decimal.toBinary(value)}
        else if(to == 'hex' ) {return Decimal.toHexadecimal(value)}
        return Decimal.toOctal(value);
      case 'bin':
        if(to == 'dec' ) {return Binary.toDecimal(value)}
        else if(to == 'hex' ) {return Binary.toHexadecimal(value)}
        return Binary.toOctal(value);
      case 'hex':
        if(to == 'dec' ) {return Hexadecimal.toDecimal(value)}
        else if(to == 'bin' ) {return Hexadecimal.toBinary(value)}
        return Hexadecimal.toOctal(value);
      default:
        if(to == 'dec' ) {return Octal.toDecimal(value)}
        else if(to == 'bin' ) {return Octal.toBinary(value)}
        return Octal.toHexadecimal(value);
    }
  }

  onSubmit(v: ConversionInfo) {
    if(!this.isValid) {return;}
    this.conversionResult = this.calculateValue(v.input).toString();
  }

  isInConversionWay(v: NumberSystemType) {
    const {from, to} =  this.conversionInfo!;
    return from == v || v == to;
  }

  changeConversion(n: NumberSystemType) {
    this.conversionWayService.changeConversionWay( {
      ...this.conversionInfo!,
      to: n,
    })
  }

}
