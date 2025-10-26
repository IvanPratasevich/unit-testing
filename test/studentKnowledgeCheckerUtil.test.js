import { expect } from "chai";
import { checkStudentKnowledge } from "../utils/studentKnowledgeCheckerUtil.js";

describe("checkStudentKnowledge", () => {
    it("should return true when all answers are correct and keys match", () => {
        const studentAnswers = {
            question1: "A",
            question2: "B",
            question3: "C",
        };
        const correctAnswers = {
            question1: "A",
            question2: "B",
            question3: "C",
        };
        expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;
    });

    it("should return false when at least one answer is incorrect", () => {
        const studentAnswers = {
            question1: "A",
            question2: "B",
            question3: "D",
        };
        const correctAnswers = {
            question1: "A",
            question2: "B",
            question3: "C",
        };
        expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it("should return false when keys do not match", () => {
        const studentAnswers = {
            question1: "A",
            question2: "B",
            question4: "C",
        };
        const correctAnswers = {
            question1: "A",
            question2: "B",
            question3: "C",
        };
        expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it("should return false when number of questions differ", () => {
        const studentAnswers = {
            question1: "A",
            question2: "B",
        };
        const correctAnswers = {
            question1: "A",
            question2: "B",
            question3: "C",
        };
        expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });

    it("should return true for empty objects", () => {
        expect(checkStudentKnowledge({}, {})).to.be.true;
    });

    it("returns false when keys differ in order", () => {
        const studentAnswers = {
            question1: "A",
            question2: "B",
            question3: "C",
        };
        const correctAnswers = {
            question3: "C",
            question2: "B",
            question1: "A",
        };
        expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
    });
});
