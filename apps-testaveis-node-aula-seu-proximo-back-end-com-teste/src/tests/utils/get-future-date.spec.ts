import { describe, it, expect } from "vitest";
import { getFutureDate } from "./get-future-date";

describe("", () => {
  it("increases date with one year", () => {
    const year = new Date().getFullYear();
    expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(year + 1);
  });
});
