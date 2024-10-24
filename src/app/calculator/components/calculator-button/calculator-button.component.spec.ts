import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button (onClick)="handlerClick($event)">
      <span class="projected-content underline">1</span>
    </calculator-button>
  `,
})
class TestHostComponent { }

describe('CalculatorButtonComponent', () => {

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement  as HTMLElement;
    fixture.detectChanges();
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 class when isDoubleSize is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 class when isDoubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostCssClasses: string[] = compiled.classList.value.split(' ');
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit "onClick" when handlerClick is called', () => {
    // Espías
    const spy = spyOn(component.onClick, 'emit');

    // Arrange
    component.handlerClick();

    // Assert
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and the false when keyboardPressedStyle is called with a matching key', (done) => {
    // Arrange
    component.contentValue()!.nativeElement.innerText = '1';

    // Act
    component.keyboardPressedStyle('1');

    // Assert
    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });

  it('should not set isPressed to true if key is not matching', () => {
    // Arrange
    component.contentValue()!.nativeElement.innerText = '1';

    // Act
    component.keyboardPressedStyle('2');

    // Assert
    expect(component.isPressed()).toBeFalse();
  });
  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLElement;
    const projectedContent = compiled.querySelector('.projected-content') as HTMLElement;

    expect(projectedContent).not.toBeNull();
    expect(projectedContent.classList.contains('underline')).toBeTrue();
    expect(projectedContent.innerText).toBe('1');
  });

});
