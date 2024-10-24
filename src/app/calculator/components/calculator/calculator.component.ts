import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // styles: `
  //   // .is-command {
  //   //   @apply bg-indigo-700 bg-opacity-20 hover:bg-opacity-20;
  //   // }
  // `
  host: {
    '(document:keyup)': 'handlerKeybordEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  private calculatorSrv = inject(CalculatorService);

  public resultText = computed(() => this.calculatorSrv.resultText());
  public subResultText = computed(() => this.calculatorSrv.subResultText());
  public lastOperator = computed(() => this.calculatorSrv.lastOperator());

  handlerClick( key: string ): void {
    // console.log({ key });
    this.calculatorSrv.constructNumber(key);
  }

  // @HostListener('document:keyup', ['$event'])
  handlerKeybordEvent(event: KeyboardEvent): void {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': '⨉',
      '/': '÷',
      Enter: '=',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handlerClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }

}
