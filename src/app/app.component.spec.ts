import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement  as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {

    // A = Arrange
    const num1 = 1;
    const num2 = 2;

    // A = Act
    const result = num1 + num2;

    // A = Assert
    // if(result !== 3) {
    //   throw new Error('Expected 3 but got ' + result);
    // }
    expect(result).toBe(3);
  })

  it(`should have the 'zonesless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zonesless-calculator');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zonesless-calculator');
  // });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render. router-outlet wrapper with css classes', () => {
    // Obtener el primer div
    const divElement = compiled.querySelector('div');

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'
      .split(' ');

    expect(divElement).not.toBeNull();

    // divElement?.classList.forEach((cssClass, index) => {
    //   expect(cssClass).toContain(mustHaveClasses[index]);
    // });

    const divClasses = divElement?.classList;
    mustHaveClasses.forEach((cssClass, index) => {
      expect(divClasses).toContain(cssClass);
    });

  });

  it('should contain the "buy me a beer" link', () => {
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).not.toBeNull(); // Verificar que el elemento existe
    expect(anchorElement?.title).toBe('Buy me a beer');
    expect(anchorElement?.href).toBe('https://www.buymeacoffee.com/scottwindon');
  });

});
