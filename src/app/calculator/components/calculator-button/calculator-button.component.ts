import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
  // encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent implements OnInit {

  public isCommand = input(false,  {
    // transform: booleanAttribute,
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  public isDoubleSize = input(false,  {
    transform: booleanAttribute,
  });

  // @HostBinding('class.is-command')
  // get commandStyle() {
  //   return this.isCommand();
  // }

  @HostBinding('class.w-2/4')
  get commandStyle() {
    return this.isDoubleSize();
  }

  ngOnInit(): void {
    console.log({ isCommand: this.isCommand() });
  }
}
