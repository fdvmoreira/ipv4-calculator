
/** @jest-environment jsdom */

import { describe, test, expect } from "@jest/globals";
import { convertBinaryToDecimal } from "../js/app";

/**
 * Binary to Decimal Coverter
 * @group Util
 */
describe("convertBinaryToDecimal", () => {
  /**
   * @test {Util}
   */
  test("should return ZERO", () => {
    const array = [];
    expect(convertBinaryToDecimal(array)).toEqual(0);
  });

  /**
   * @test {Util}
   */
  test("should convert binary (0001) to decimal", () => {
    const array = [1];
    expect(convertBinaryToDecimal(array)).toEqual(1);
  });

  /**
   * @test {Util}
   */
  test("should convert binary to decimal", () => {
    const array = [1, 1, 1, 1, 1, 1, 1, 1];
    expect(convertBinaryToDecimal(array)).toEqual(255);
  });

  /**
   * @test {Util}
   */
  test("should throw an InvalidBinaryNumberError", () => {
    expect(() => convertBinaryToDecimal([2, 0, 0, 1, 0])).toThrowError();
  });

  /**
   * @test {Util}
   */
  test("should throw an InvalidBinaryNumberError", () => {
    expect(() => convertBinaryToDecimal([2, 0, 0, 1, 0])).toThrowError(
      "InvalidBinaryNumberError",
    );
  });
});
