import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Nav Functionality', () => {
    it('should open the nav', () => {
      component.openNav();
      expect(component.isNavHidden).toBeFalse();
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;

      const hasHiddenClass = compiled.querySelector(".nav-container")?.classList.contains("hidden");
      expect(hasHiddenClass).toBeFalse();

    });
    it('should close the nav', () => {
      component.closeNav();
      expect(component.isNavHidden).toBeTrue();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const hasHiddenClass = compiled.querySelector(".nav-container")?.classList.contains("hidden");
      expect(hasHiddenClass).toBeTrue();
    });
  });

});
