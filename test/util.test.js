
/** @jest-environment jsdom */

import { describe, test, expect } from "@jest/globals";
import {
  convertBinaryToDecimal,
  convertUnsignedIntegerToBinary,
} from "../js/app";

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

/**
 * @group {Util}
 */
describe("convertUnsignedIntegerToBinary", () => {
  /**
   * @test {Util}
   */
  test("should convert decimal to binary", () => {
    expect(convertUnsignedIntegerToBinary(4)).toEqual([1, 0, 0]);
    expect(convertUnsignedIntegerToBinary(128)).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
    expect(convertUnsignedIntegerToBinary(255)).toEqual([
      1, 1, 1, 1, 1, 1, 1, 1,
    ]);
    expect(convertUnsignedIntegerToBinary(1)).toEqual([1]);
    expect(convertUnsignedIntegerToBinary(0)).toEqual([0]);
  });

  /**
   * @test {Util}
   */
  test("should return NULL", () => {
    expect(convertUnsignedIntegerToBinary(-111)).toBeNull();
  });

  /**
   * @test {Util}
   */
  test("should throw TypeError", () => {
    expect(() => convertUnsignedIntegerToBinary("a234")).toThrowError(
      TypeError,
    );
  });
});
