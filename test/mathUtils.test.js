import { expect } from 'chai';
import { generators } from './testGenerators.js';
import { add, subtract, multiply, divide } from '../utils/mathUtils.js';
import { random } from 'lodash-es';

const TEST_COUNT = 5;

describe('mathUtils', () => {
  describe('add', () => {
    describe('add positive numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['positive'](2);
        const firstNum = arr[0];
        const secondNum = arr[1];
        const sum = firstNum + secondNum;
        it(`should return ${sum}`, () => {
          expect(add(firstNum, secondNum)).to.equal(sum);
        });
      }
    });

    describe('add negative numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['negative'](2);
        const firstNum = arr[0];
        const secondNum = arr[1];
        const sum = firstNum + secondNum;
        it(`should return ${sum}`, () => {
          expect(add(firstNum, secondNum)).to.equal(sum);
        });
      }
    });

    describe('should handle decimal numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['decimal'](2);
        const firstNum = arr[0];
        const secondNum = arr[1];
        const sum = firstNum + secondNum;
        it(`should return ${sum.toFixed(2)}`, () => {
          expect(add(firstNum, secondNum)).to.equal(sum);
        });
      }
    });

    describe('should handle zero', () => {
      for (const type in generators) {
        for (let i = 1; i <= TEST_COUNT; i++) {
          if (type === 'string') {break;}
          const arr = generators[type](1);
          let firstNum = 0;
          let secondNum = 0;

          if (random(0, 1)) {
            firstNum = 0;
            secondNum = arr[0];
          } else {
            firstNum = arr[0];
            secondNum = 0;
          }

          const sum = firstNum + secondNum;
          it(`should return ${sum}`, () => {
            expect(add(firstNum, secondNum)).to.equal(sum);
          });
        }
      }

      const firstNum = 0;
      const secondNum = 0;
      const sum = firstNum + secondNum;
      it(`should return ${sum}`, () => {
        expect(add(firstNum, secondNum)).to.equal(sum);
      });
    });
  });

  describe('subtract', () => {
    describe('subtract positive numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['positive'](2);
        const firstNum = arr[0];
        const secondNum = arr[1];
        const subtractedValue = firstNum - secondNum;
        it(`should return ${subtractedValue}`, () => {
          expect(subtract(firstNum, secondNum)).to.equal(subtractedValue);
        });
      }
    });

    describe('subtract negative numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['negative'](2);
        const firstNum = arr[0];
        const secondNum = arr[1];
        const subtractedValue = firstNum - secondNum;
        it(`should return ${subtractedValue}`, () => {
          expect(subtract(firstNum, secondNum)).to.equal(subtractedValue);
        });
      }
    });

    describe('subtract decimal numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['decimal'](2);
        const firstNum = arr[0];
        const secondNum = arr[1];
        const subtractedValue = firstNum - secondNum;
        it(`should return ${subtractedValue}`, () => {
          expect(subtract(firstNum, secondNum)).to.equal(subtractedValue);
        });
      }
    });

    describe('should handle zero', () => {
      for (const type in generators) {
        for (let i = 1; i <= TEST_COUNT; i++) {
          if (type === 'string') {break;}
          const arr = generators[type](1);
          let firstNum = 0;
          let secondNum = 0;

          if (random(0, 1)) {
            firstNum = 0;
            secondNum = arr[0];
          } else {
            firstNum = arr[0];
            secondNum = 0;
          }

          const subtractedValue = firstNum - secondNum;
          it(`should return ${subtractedValue}`, () => {
            expect(subtract(firstNum, secondNum)).to.equal(subtractedValue);
          });
        }
      }

      const firstNum = 0;
      const secondNum = 0;
      const sum = firstNum + secondNum;
      it(`should return ${sum}`, () => {
        expect(add(firstNum, secondNum)).to.equal(sum);
      });
    });
  });

  describe('multiply', () => {
    describe('multiply positive numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['positive'](2);
        const a = arr[0];
        const b = arr[1];
        const product = a * b;
        it(`should return ${product}`, () => {
          expect(multiply(a, b)).to.equal(product);
        });
      }
    });

    describe('multiply negative numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['negative'](2);
        const a = arr[0];
        const b = arr[1];
        const product = a * b;
        it(`should return ${product}`, () => {
          expect(multiply(a, b)).to.equal(product);
        });
      }
    });

    describe('multiply decimal numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['decimal'](2);
        const a = arr[0];
        const b = arr[1];
        const product = a * b;
        it(`should return ${product.toFixed(2)}`, () => {
          expect(multiply(a, b)).to.equal(product);
        });
      }
    });

    describe('should handle zero', () => {
      it('0 multiplied by any number should be 0', () => {
        expect(multiply(0, 1)).to.equal(0);
        expect(multiply(-1, 0)).to.equal(0);
        expect(multiply(0, 1.2)).to.equal(0);
      });
    });
  });

  describe('divide', () => {
    describe('divide positive numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['positive'](2);
        const a = arr[0];
        const b = arr[1] || 1;
        const result = a / b;
        it(`should return ${result}`, () => {
          expect(divide(a, b)).to.equal(result);
        });
      }
    });

    describe('divide negative numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['negative'](2);
        const a = arr[0];
        const b = arr[1] || -1;
        const result = a / b;
        it(`should return ${result}`, () => {
          expect(divide(a, b)).to.equal(result);
        });
      }
    });

    describe('divide decimal numbers', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators['decimal'](2);
        const a = arr[0];
        const b = arr[1] || 1; // на случай 0
        const result = a / b;
        it(`should return ${result.toFixed(2)}`, () => {
          expect(divide(a, b)).to.equal(result);
        });
      }
    });

    describe('should handle division by zero', () => {
      it('should throw error when dividing by zero', () => {
        expect(() => divide(12, 0)).to.throw('Cannot divide by zero');
      });
    });

    describe('should handle zero', () => {
      it('0 divided by any non-zero number should be 0', () => {
        const arr = random(-100, 100);
        const num = arr[0] || 1;
        expect(divide(0, num)).to.equal(0);
      });
    });
  });
});
