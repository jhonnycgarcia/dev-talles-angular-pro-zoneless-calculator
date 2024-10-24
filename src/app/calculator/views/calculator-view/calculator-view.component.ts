import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CalculatorButtonComponent } from '@/calculator/components/calculator-button/calculator-button.component';
import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';


@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [
    CalculatorButtonComponent,
    CalculatorComponent,
  ],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CalculatorViewComponent {

}
