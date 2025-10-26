import { expect } from "chai";
import { findMax, findMin, removeDuplicates } from "../utils/arrayUtils.js";
import { shuffle, random } from "lodash-es";

const TEST_COUNT = 5;
const nonArrayInputs = {
    string: "abcd",
    number: 1,
    null: null,
    undefined: undefined,
    boolean: true,
    object: { c: 1 },
    bigint: 20n,
    symbol: Symbol(),
};

const randomArray = (min = 1, max = 20, length = 5) => {
    const arr = Array(length).fill(0);
    for (let i = 0; i < length; i++) {
        arr[i] = random(min, max);
    }

    return arr;
};
const randomPositiveArray = (length = 5) => randomArray(1, 100, length);
const randomNegativeArray = (length = 5) => randomArray(-100, -1, length);
const randomMixedArray = () =>
    shuffle(
        randomPositiveArray().concat(randomNegativeArray(), randomDecimalArray()),
    );
const randomDecimalArray = (length = 5) => randomArray(-1.2, -5.2, length);

const randomLetter = (uppercase = false) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const index = random(0, letters.length - 1);
    return uppercase ? letters[index].toUpperCase() : letters[index];
};
const randomStringArray = (length = 5, withUppercase = false) => {
    const arr = Array(length).fill(0);
    for (let i = 0; i < length; i++) {
        arr[i] = randomLetter(withUppercase);
    }
    return arr;
};

const generators = {
    positive: randomPositiveArray,
    negative: randomNegativeArray,
    mixed: randomMixedArray,
    decimal: randomDecimalArray,
    string: randomStringArray,
};

describe("array utils", () => {
    describe("findMax", () => {
        describe("max value calculation in arrays", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    if (type === "string") break;
                    const arr = generators[type]();
                    const expected = Math.max(...arr);
                    const arrString = `[${arr.join(", ")}]`;

                    it(`should find max ${expected} in ${type} array ${arrString}`, () => {
                        expect(findMax(arr)).to.equal(expected);
                    });
                }
            }
        });

        describe("error handling for non-array inputs", () => {
            for (const input in nonArrayInputs) {
                it(`should throw error for type ${input}`, () => {
                    expect(() => findMax(nonArrayInputs[input])).to.throw(
                        "Input must be an array",
                    );
                });
            }
        });

        it("should return -Infinity for empty array", () => {
            expect(findMax([])).to.equal(-Infinity);
        });

        describe("handle single element array", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    if (type === "string") break;
                    const arr = generators[type](1).slice(0, 1);
                    const result = findMax(arr);
                    it(`should handle single element in ${type} array`, () => {
                        expect(result).to.equal(...arr);
                    });
                }
            }
        });
    });

    describe("findMin", () => {
        describe("min value calculation in arrays", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    if (type === "string") break;
                    const arr = generators[type]();
                    const expected = Math.min(...arr);
                    const arrString = `[${arr.join(", ")}]`;

                    it(`should find min ${expected} in ${type} array ${arrString}`, () => {
                        expect(findMin(arr)).to.equal(expected);
                    });
                }
            }
        });

        describe("error handling for non-array inputs", () => {
            for (const input in nonArrayInputs) {
                it(`should throw error for type ${input}`, () => {
                    expect(() => findMin(nonArrayInputs[input])).to.throw(
                        "Input must be an array",
                    );
                });
            }
        });

        it("should return Infinity for empty array", () => {
            expect(findMin([])).to.equal(Infinity);
        });

        describe("handle single element array", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    if (type === "string") break;
                    const arr = generators[type](1).slice(0, 1);
                    const result = findMin(arr);
                    it(`should handle single element in ${type} array`, () => {
                        expect(result).to.deep.equal(...arr);
                    });
                }
            }
        });
    });

    describe("removeDuplicates", () => {
        describe("duplicate removal from arrays", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    it(`should remove duplicates correctly for ${type} array №${i}`, () => {
                        let repeatedValue = 0;
                        let setUppercase = !!random(0, 1);
                        let targetArray = generators[type](7);

                        switch (type) {
                            case "positive":
                                repeatedValue = random(1, 100);
                                break;
                            case "mixed":
                                repeatedValue = random(-100, 100);
                                targetArray = shuffle(
                                    targetArray.concat(randomStringArray(5, setUppercase)),
                                );
                                break;
                            case "negative":
                                repeatedValue = random(-100, -1);
                                break;
                            case "decimal":
                                repeatedValue = random(-4.5, -1.1);
                                break;
                            case "string":
                                repeatedValue = randomLetter(setUppercase);
                                targetArray = generators[type](7, setUppercase);
                                break;

                            default:
                                break;
                        }

                        const repeatedValues = Array(5).fill(repeatedValue);
                        const insertIndex = random(0, targetArray.length - 1);
                        targetArray.splice(insertIndex, 0, ...repeatedValues);
                        const result = removeDuplicates(targetArray);
                        const expectedArray = [...new Set(targetArray)];

                        expect(result).to.deep.equal(expectedArray);
                    });
                }
            }
        });

        describe("arrays without duplicates", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    it(`should handle ${type} array with no duplicates`, () => {
                        const targetArray = generators[type](7);
                        const result = removeDuplicates(targetArray);
                        const expectedArray = [...new Set(targetArray)];
                        expect(result).to.deep.equal(expectedArray);
                    });
                }
            }
        });

        it("should return empty array when input is empty", () => {
            expect(removeDuplicates([])).to.deep.equal([]);
        });

        describe("error handling for non-array inputs", () => {
            for (const input in nonArrayInputs) {
                it(`should throw error for type ${input}`, () => {
                    expect(() => removeDuplicates(nonArrayInputs[input])).to.throw(
                        "Input must be an array",
                    );
                });
            }
        });

        describe("handle single element array", () => {
            for (const type in generators) {
                for (let i = 1; i <= TEST_COUNT; i++) {
                    if (type === "string") break;
                    const arr = generators[type](1).slice(0, 1);
                    const result = removeDuplicates(arr);
                    it(`should handle single element ${type} array`, () => {
                        expect(result).to.deep.equal(arr);
                    });
                }
            }
        });
    });
});
