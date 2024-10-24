import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

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

  handlerClick( key: string ): void {
    console.log({ key });
  }

  // @HostListener('document:keyup', ['$event'])
  handlerKeybordEvent(event: KeyboardEvent): void {
    this.handlerClick(event.key);
  }

}
