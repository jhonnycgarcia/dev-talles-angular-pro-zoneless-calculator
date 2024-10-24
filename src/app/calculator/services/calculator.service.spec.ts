import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  // Antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  // antes de todas las pruebas
  beforeAll(() => {});

  // despues de cada prueba
  afterEach(() => {});

  // despues de todas las pruebas
  afterAll(() => {});


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText to "0" when "C" is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');

    service.constructNumber('3');
    expect(service.resultText()).toBe('123');
  });

  it('should handler operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('-');

    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });


  it('should calculate result correctly for addition "+"', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction "-"', () => {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for multiplication "*"', () => {
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('6');
  });

  it('should calculate result correctly for division "/"', () => {
    service.constructNumber('6');
    service.constructNumber('/');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('shoudl handler decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it('shoudl handler decimal point correctly starting with 0', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');
  });

});
