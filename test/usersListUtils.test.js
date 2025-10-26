import { expect } from "chai";
import {
    filterUsersByAge,
    findUserById,
    isEmailTaken,
    sortUsersByName,
} from "../utils/usersListUtils.js";

const sampleUsers = [
    { id: 101, name: "Zelda Quantum", age: 22, email: "zelda@quantumverse.io" },
    { id: 102, name: "Max Velocity", age: 29, email: "max@speedlabs.net" },
    { id: 103, name: "Ada Lovelens", age: 34, email: "ada@visionary.ai" },
    { id: 104, name: "Neo Matrix", age: 41, email: "neo@realityshift.org" },
    { id: 105, name: "Luna Eclipse", age: 27, email: "luna@moonlight.dev" },
];

describe("filterUsersByAge", () => {
    it("should return users whose age is between minAge and maxAge", () => {
        const result = filterUsersByAge(sampleUsers, 25, 35);
        expect(result).to.be.an("array").with.lengthOf(3);
        expect(result).to.deep.equal([
            { id: 102, name: "Max Velocity", age: 29, email: "max@speedlabs.net" },
            { id: 103, name: "Ada Lovelens", age: 34, email: "ada@visionary.ai" },
            { id: 105, name: "Luna Eclipse", age: 27, email: "luna@moonlight.dev" },
        ]);
    });

    it("should return an empty array when no users match the age range", () => {
        const result = filterUsersByAge(sampleUsers, 50, 60);
        expect(result).to.be.an("array").that.is.empty;
    });

    it("should throw an error when users is not an array", () => {
        expect(() => filterUsersByAge(null, 20, 30)).to.throw(
            "Users must be an array",
        );
    });
});

describe("sortUsersByName", () => {
    it("should return users sorted alphabetically by name", () => {
        const shuffled = [
            sampleUsers[3],
            sampleUsers[1],
            sampleUsers[4],
            sampleUsers[0],
            sampleUsers[2],
        ];
        const result = sortUsersByName(shuffled);
        const names = result.map((u) => u.name);
        expect(names).to.deep.equal([
            "Ada Lovelens",
            "Luna Eclipse",
            "Max Velocity",
            "Neo Matrix",
            "Zelda Quantum",
        ]);
    });

    it("should throw an error when users is not an array", () => {
        expect(() => sortUsersByName("not-an-array")).to.throw(
            "Users must be an array",
        );
    });
});

describe("findUserById", () => {
    it("should return the user object with the matching ID", () => {
        const result = findUserById(sampleUsers, 103);
        expect(result).to.deep.equal({
            id: 103,
            name: "Ada Lovelens",
            age: 34,
            email: "ada@visionary.ai",
        });
    });

    it("should return null when no user matches the given ID", () => {
        const result = findUserById(sampleUsers, 999);
        expect(result).to.be.null;
    });

    it("should throw an error when users is not an array", () => {
        expect(() => findUserById({}, 101)).to.throw("Users must be an array");
    });
});

describe("isEmailTaken", () => {
    it("should return true when a user with the given email exists", () => {
        const result = isEmailTaken(sampleUsers, "neo@realityshift.org");
        expect(result).to.be.true;
    });

    it("should return false when no user has the given email", () => {
        const result = isEmailTaken(sampleUsers, "ghost@phantom.io");
        expect(result).to.be.false;
    });

    it("should throw an error when users is not an array", () => {
        expect(() => isEmailTaken(undefined, "test@domain.com")).to.throw(
            "Users must be an array",
        );
    });
});
