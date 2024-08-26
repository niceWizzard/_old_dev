import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { HeaderComponent } from '../../shared/header/header.component';

import { ConversionWay, NsSelectorComponent } from './ns-selector.component';

describe('NsSelectorComponent', () => {
  let component: NsSelectorComponent;
  let fixture: ComponentFixture<NsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NsSelectorComponent,],
      imports: [
        AppModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  async function  getMatOption(matSelectName: string, matOptionInnerText: string) {
    const debugElement = fixture.debugElement;
    const matSelect = debugElement.query(By.css(`mat-select[name="${matSelectName}"]`));
    matSelect?.nativeElement.click();  

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const matOptions = matSelect.queryAll(By.css('mat-option'))
    const matOption = matOptions.find(v => v.properties['innerText'].toLowerCase() == matOptionInnerText.toLowerCase())
    if(matOption == null) {
      throw new Error(`The MatSelect: '${matSelectName}' has no option with named: '${matOptionInnerText}'. Check for typos in the arguments.`)
    }
    return matOption;
  }

  async function clickMatOption(matSelectName: string, matOptionInnerText: string) {
    const matOption = await getMatOption(matSelectName, matOptionInnerText)
    matOption.nativeElement.click();
    fixture.detectChanges()
    await fixture.whenStable();
    return matOption;

  }


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should flip the choices', async () => {
    const initial = component.controlGroup.value as ConversionWay;
    const debugElement = fixture.debugElement;

    const switchButton = debugElement.query(By.css('button'));
    switchButton?.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    
    const after = component.controlGroup.value as ConversionWay;
    expect(initial.from).toEqual(after.to);
    expect(initial.to).toEqual(after.from);
  });

  describe('Default options are disabled', () => {
    it("'binary' at from should be disabled", async () => {
      const option = await getMatOption('from', 'binary')
      expect(option?.properties['ariaDisabled']).toEqual('true')
    })
    it("'decimal' at to should be disabled", async () => {
      const option = await getMatOption('to', 'decimal')
      expect(option?.properties['ariaDisabled']).toEqual('true')
    })
  });

  describe('Change to hex', () => {
    it("'from' should change to hex ", async () => {
      
      await clickMatOption('from', 'hexadecimal');
      const h = component.controlGroup.value.from;
      expect(h).toEqual('hex');

      // Is disabled at the other select
      const option = await getMatOption('to', 'hexadecimal');
      expect(Boolean(option?.properties['ariaDisabled'])).toBeTrue();

    });

    it("'to' should change to hex", async () => {
      await clickMatOption('to', 'hexadecimal') 
      const h = component.controlGroup.value.to;
      expect(h).toEqual('hex');

      // Is disabled at the other select
      const option = await getMatOption('from', 'hexadecimal');
      expect(Boolean(option?.properties['ariaDisabled'])).toBeTrue();
  
    });
  });

  describe('Change to oct', () => {
  
    it("'from' should change to octal", async () => {
      await clickMatOption('from', 'octal');
      const h = component.controlGroup.value.from;
      expect(h).toEqual('oct');

      // Is disabled at the other select
      const option = await getMatOption('to', 'octal');
      expect(Boolean(option?.properties['ariaDisabled'])).toBeTrue();


    });
  
    it("'to' should change to octal", async () => {
      await clickMatOption('to', 'octal') 
      const h = component.controlGroup.value.to;
      expect(h).toEqual('oct');

      // Is disabled at the other select
      const otherOption = await getMatOption('to', 'octal');
      expect(Boolean(otherOption?.properties['ariaDisabled'])).toBeTrue();
    });
  });

  it('should emit the output event', async () => {
    spyOn(component.conversion, 'emit')
    await clickMatOption('from', 'hexadecimal');
    expect(component.conversion.emit).toHaveBeenCalled();

  })


  

});


