import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { List } from 'immutable';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConversionWayService } from 'src/app/services/conversion-way.service';
import { Binary } from 'src/app/utils/number_system/binary-converter';
import { Decimal } from 'src/app/utils/number_system/decimal-converter';
import { getDisplayName } from 'src/app/utils/number_system/getDisplayName';
import { Hexadecimal } from 'src/app/utils/number_system/hexadecimal-converter';
import { isAnyOther, isHexadecimal, isBinary, isOctal } from 'src/app/utils/number_system/is_util';
import { Octal } from 'src/app/utils/number_system/octal-converter';


export type NumberSystemType = 'oct' | 'hex' | 'bin' | 'dec';

interface NumberSystemInfo {
  readonly value: NumberSystemType;
  readonly displayName: string;
}

export interface ConversionWay {
  from: NumberSystemType;
  to: NumberSystemType;
}

export interface ConversionInfo extends ConversionWay {
  input: string;
}

@Component({
  selector: 'app-ns-selector',
  templateUrl: './ns-selector.component.html',
  styleUrls: ['./ns-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NsSelectorComponent implements OnInit {

  constructor(
    private conversionWayService : ConversionWayService,
     ) {
    this.conversionWayChanges = conversionWayService.conversionWayChanges;
   }
  readonly conversionWayChanges : Observable<ConversionWay>

  get fromControl() {
    return this.controlGroup.controls['from']
  }
  get toControl() {
    return this.controlGroup.controls['to']
  }
  get inputControl() {
    return this.controlGroup.controls['input']
  }

  @Output()
  valueSubmit = new EventEmitter<ConversionInfo>();
  @Output()
  readonly isValidChanges = new EventEmitter(true);

  showChild = false;


  ngOnInit(): void {
    this.controlGroup.valueChanges.subscribe(v => {
      this.conversionWayService.changeConversionWay(v)

      this.isValidChanges.emit(this.controlGroup.valid);
    })
    
    this.fromControl.valueChanges.subscribe(from => {
      const decimalValidator = (v: AbstractControl) => {
        if (!isAnyOther(v.value)) {
          return { nsError: `The value is not a valid ${getDisplayName(from)} number.` };
        }
        return null;
      };
      const hexValidator = (v: AbstractControl) => {
        if (!isHexadecimal(v.value)) {
          return { nsError: 'The value is not a valid hexadecimal.' };
        }
        return null;
      };
      const binaryValidator = (v: AbstractControl) => {
        if(!isBinary(v.value)) {
          return { nsError: `The value is not a valid ${getDisplayName(from)} number.` };
        }
        return null;
      }
      const octalValidator = (v: AbstractControl) => {
        if(!isOctal(v.value)) {
          return { nsError: `The value is not a valid ${getDisplayName(from)} number.` };
        }
        return null;
      }
  
      let validator = from == 'hex' ? hexValidator : decimalValidator;
      if(from == 'bin') {validator = binaryValidator }
      else if(from == 'oct') {validator = octalValidator }
      
      this.inputControl.setValidators(
        [ Validators.required, validator]);
      this.inputControl.updateValueAndValidity();

    })

    this.fromControl.patchValue(this.fromControl.value)

    this.conversionWayService.conversionWayChanges.subscribe(v => {
      this.controlGroup.patchValue(v, {emitEvent: false,})
      if(v.input != '') {
        this.onSubmit();
      }
    })

  }

  readonly defaultChoices= List<NumberSystemInfo>([
    {value: 'bin', displayName: 'Binary'},
    {value: 'dec', displayName: 'Decimal'},
    {value: 'hex', displayName: 'Hexadecimal'},
    {value: 'oct', displayName: 'Octal'},

  ]);
  controlGroup = new FormGroup(
    {
      from: new FormControl('dec'),
      to: new FormControl('bin'),
      input: new FormControl(''),
    }
  );


  flipChoices() {
    const from = this.fromControl.value;
    const to = this.toControl.value;
    this.controlGroup.patchValue({
      from: to,
      to: from,
    })
  }

  onSubmit() {
    if(this.controlGroup.invalid) { return }
    const value = this.controlGroup.value;
    this.valueSubmit.emit(value)
    this.showChild = true;
  }


}
