import { Injectable, signal } from '@angular/core';

const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷', '⨉'];
const especialOperators = ['÷', '⨉', '%', '+/-', 'C', 'Backspace', '='];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void{
    // console.log({ value })

    // Válidar el input
    if(![...number, ...operators, ...especialOperators].includes(value)) {
      console.log('invalid input:', value);
    }

    // =
    if(value === '=') {
      console.log('Calcular resultado');
      this.calculateResult();
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

      if(
        this.resultText().includes('-')
        && this.resultText().length === 2
      ) {
        this.resultText.set('0');
        return;
      }

      if(this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((prev) => prev.slice(0, -1) );
      return;
    }

    // Aplicar operadores
    if(operators.includes(value)) {
      // this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limitar número de caracteres
    if(this.resultText().length >= 10) {
      console.log('max length reached');
      return;
    }

    // Válidar punto decimal
    if(value === '.' && !this.resultText().includes('.')) {

      if(this.resultText() === '0' || this.resultText() === ''){
        this.resultText.set(`0.`);
        return;
      }

      this.resultText.update((prev) => prev + `.`);
      return;
    }

    // Manejo de el cero inicial
    if(value === '0'
      && (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    // Cambiar signo
    if(value == '+/-'){
      if(this.resultText().includes('-')) {
        this.resultText.update((prev) => prev.replace('-', ''));
        return;
      }

      this.resultText.update((prev) => `-${prev}`);
      return;
    }

    // Número
    if(number.includes(value)) {

      if(this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if(this.resultText() === '-0') {
        this.resultText.set(`-${value}`);
        return;
      }

      this.resultText.update((prev) =>  prev + value);
      return;
    }

  }


  public calculateResult(): void {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;

      case '-':
        result = number1 - number2;
        break;

      case '*':
        result = number1 * number2;
        break;

      case '⨉':
        result = number1 * number2;
        break;

      case '/':
        result = number1 / number2;
        break;

      case '÷':
        result = number1 / number2;
        break;

      default:
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }

}
