import { describe, expect, it } from "vitest";
import { format, initialState, press, type Key } from "./calculator";

const run = (keys: string) => keys.split(" ").reduce((state, key) => press(state, key as Key), initialState).display;

describe("calculator", () => {
  it("does basic arithmetic", () => {
    expect(run("1 2 + 3 =")).toBe("15");
    expect(run("9 - 1 2 =")).toBe("-3");
    expect(run("6 × 7 =")).toBe("42");
    expect(run("1 ÷ 4 =")).toBe("0.25");
  });

  it("chains operators left to right", () => {
    expect(run("2 + 3 × 4 =")).toBe("20");
    expect(run("2 + 3 ×")).toBe("5");
  });

  it("swaps an operator pressed twice", () => {
    expect(run("8 + - 3 =")).toBe("5");
  });

  it("repeats the last operation on repeated =", () => {
    expect(run("2 + 3 = = =")).toBe("11");
  });

  it("uses the shown number when = follows an operator", () => {
    expect(run("5 × =")).toBe("25");
  });

  it("handles decimals without float noise", () => {
    expect(run("0 . 1 + 0 . 2 =")).toBe("0.3");
    expect(run(". 5 . 5")).toBe("0.55");
  });

  it("negates and takes percentages", () => {
    expect(run("5 ±")).toBe("-5");
    expect(run("5 ± ±")).toBe("5");
    expect(run("5 0 %")).toBe("0.5");
  });

  it("shows Error on divide by zero until cleared", () => {
    expect(run("1 ÷ 0 =")).toBe("Error");
    expect(run("1 ÷ 0 = 5")).toBe("Error");
    expect(run("1 ÷ 0 = AC 5")).toBe("5");
  });

  it("caps input length and starts fresh after a result", () => {
    expect(run("1 2 3 4 5 6 7 8 9 1")).toBe("123456789");
    expect(run("2 + 2 = 7")).toBe("7");
  });

  it("formats very large numbers in exponent form", () => {
    expect(format(123456789 * 1000)).toBe("1.2346e+11");
  });
});
