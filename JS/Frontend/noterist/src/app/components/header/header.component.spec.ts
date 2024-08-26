import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should by default closed nav', () => {
    expect(component.isNavOpen).toEqual(false)
  })

  it('should toggle nav when header button is clicked', () => {
    component.openNav();
    expect(component.isNavOpen).toBeTrue()
    fixture.detectChanges()
    
    const compile = fixture.nativeElement as HTMLElement;

    expect(compile.querySelector("nav")?.classList.contains("open")).toBeTrue()
  });

  it('should toggle out the nav when clicked out or click <a> tags', () => {
    const bgHider = fixture.nativeElement.querySelector('.nav-bg-hider') as HTMLElement;
    bgHider.click()
    fixture.detectChanges()
    expect(component.isNavOpen).toBeFalse()
    
    component.openNav();

    const el = document.createElement("a");
    component.onClick(el)

    expect(component.isNavOpen).toBeFalse()


  })

  describe('Rendering & Derendering', () => {
    it('should not render when at note route', async () => {
      console.log("NAVIGTION")
      await component["router"].navigate(['note', 'ad'])
      expect(component.renderNav).toBeFalse();
    })
  
    it('should render back when at home route', async () => {
      console.log("NAVIGTION")
      await component["router"].navigate(['/'])
      expect(component.renderNav).toBeTrue();
    })
  });

});
