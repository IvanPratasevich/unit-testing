import { expect } from 'chai';
import { generators } from './testGenerators.js';
import {
  capitalize,
  reverseString,
  isPalindrome,
} from '../utils/stringUtils.js';

export const nonArrayInputs = {
  string: 'abcd',
  number: 1,
  null: null,
  undefined: undefined,
  boolean: true,
  object: { c: 1 },
  bigint: 20n,
  symbol: Symbol(),
};

const TEST_COUNT = 5;

describe('stringUtils', () => {
  describe('capitalize', () => {
    for (let i = 1; i <= TEST_COUNT; i++) {
      const arr = generators.string(5, false);
      const str = arr.join('');
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
      it(`should capitalize first letter of "${str}"`, () => {
        expect(capitalize(str)).to.equal(capitalized);
      });
    }

    describe('capitalize single character', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators.string(1);
        const str = arr.join('');
        const expected = str.toUpperCase();
        it(`should handle single character "${str}"`, () => {
          expect(capitalize(str)).to.equal(expected);
        });
      }
    });

    describe('should throw error for non-string inputs', () => {
      for (const type in nonArrayInputs) {
        if (typeof nonArrayInputs[type] !== 'string') {
          it(`should throw for ${type}`, () => {
            expect(() => capitalize(nonArrayInputs[type])).to.throw(
              'Input must be a string',
            );
          });
        }
      }
    });
  });

  describe('reverseString', () => {
    for (let i = 1; i <= TEST_COUNT; i++) {
      const arr = generators.string(5);
      const str = arr.join('');
      const reversed = str.split('').reverse().join('');
      it(`should reverse "${str}"`, () => {
        expect(reverseString(str)).to.equal(reversed);
      });
    }

    describe('should throw error for non-string inputs', () => {
      for (const type in nonArrayInputs) {
        if (typeof nonArrayInputs[type] !== 'string') {
          it(`should throw for ${type}`, () => {
            expect(() => reverseString(nonArrayInputs[type])).to.throw(
              'Input must be a string',
            );
          });
        }
      }
    });

    describe('reverse string with single character', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators.string(1);
        const str = arr.join('');
        it(`should reverse single character "${str}"`, () => {
          expect(reverseString(str)).to.equal(str);
        });
      }
    });
  });

  describe('isPalindrome', () => {
    it('should return true for palindromes', () => {
      expect(isPalindrome('noon')).to.be.true;
      expect(isPalindrome('level')).to.be.true;
      expect(isPalindrome('nun')).to.be.true;
    });

    it('should return false for non-palindromes', () => {
      expect(isPalindrome('hi')).to.be.false;
      expect(isPalindrome('apple')).to.be.false;
      expect(isPalindrome('tree')).to.be.false;
      expect(isPalindrome('house')).to.be.false;
    });

    it('should be case sensitive', () => {
      expect(isPalindrome('Nun')).to.be.false;
      expect(isPalindrome('Level')).to.be.false;
    });

    describe('isPalindrome works with single character', () => {
      for (let i = 1; i <= TEST_COUNT; i++) {
        const arr = generators.string(1);
        const str = arr.join('');
        it(`should return true for single character "${str}"`, () => {
          expect(isPalindrome(str)).to.equal(true);
        });
      }
    });

    describe('should throw error for non-string inputs', () => {
      for (const type in nonArrayInputs) {
        if (typeof nonArrayInputs[type] !== 'string') {
          it(`should throw for ${type}`, () => {
            expect(() => isPalindrome(nonArrayInputs[type])).to.throw(
              'Input must be a string',
            );
          });
        }
      }
    });
  });
});
