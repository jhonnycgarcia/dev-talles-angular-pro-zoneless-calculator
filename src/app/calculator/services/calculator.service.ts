import { Injectable, signal } from '@angular/core';

const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const especialOperators = ['÷', '⨉', '%', '+/-', 'C', 'Backspace', '='];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('1234.56');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void{

    // Válidar el input
    if(![...number, ...operators, ...especialOperators].includes(value)) {
      console.log('invalid input:', value);
    }

    // =
    if(value === '=') {
      console.log('Calcular resultado');
      return;
    }

    // C
    if(value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    // TODO: revisar cuando tengamos números negativos
    if(value === 'Backspace') {

      if(this.resultText() === '0') { return; }

      if(this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((prev) => value.slice(0, -1) );
      return;
    }

    // Aplicar operadores
    if(operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Válidar punto decimal
    if(value === '.' && !this.resultText().includes('.')) {

      if(this.resultText() === '0' || this.resultText() === ''){
        this.resultText.update((prev) => prev + `0.`);
      }

      this.resultText.update((prev) => prev + `.`);
      return;
    }

    this.resultText.update((prev) =>  prev + value);
  }

}
