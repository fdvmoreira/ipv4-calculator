
/** @jest-environment jsdom */

import { describe, expect, test } from "@jest/globals";
import { IpClasses, validateIpOctects, validateSlashMask } from "../js/app";

/**
 * @group App
 */
describe("validateIpOctects", () => {
  /**
   * @test {App}
   */
  test("should validate validate VALID Ip address", () => {
    expect(validateIpOctects([0, 0, 0, 0])).toBeTruthy();
    expect(validateIpOctects([1, 2, 3, 4])).toBeTruthy();
    expect(validateIpOctects([255, 255, 255, 255])).toBeTruthy();
  });

  /**
   * @test {App}
   */
  test("should Invalidate Ip addresses out of range", () => {
    expect(validateIpOctects([0, 0, 0, 256])).toBeFalsy();
    expect(validateIpOctects([-1, 0, 0, 25])).toBeFalsy();
    expect(validateIpOctects([-2, 255, 255, 255])).toBeFalsy();
    expect(validateIpOctects([127, 0, 0, 0])).toBeFalsy();
  });
});

/**
 * @group App
 */
describe("validateSlashMask", () => {
  /**
   * @test {App}
   */
  test("should validate slash mask", () => {
    expect(validateSlashMask(IpClasses.A, 24)).toBeTruthy();
    expect(validateSlashMask(IpClasses.A, 7)).toBeFalsy();
    expect(validateSlashMask(IpClasses.B, 16)).toBeTruthy();
    expect(validateSlashMask(IpClasses.B, 24)).toBeTruthy();
    expect(validateSlashMask(IpClasses.B, 15)).toBeFalsy();
    expect(validateSlashMask(IpClasses.C, 23)).toBeFalsy();
    expect(validateSlashMask(IpClasses.A, 26)).toBeTruthy();
    expect(validateSlashMask(IpClasses.A, 31)).toBeFalsy();
    expect(validateSlashMask(IpClasses.D, 8)).toBeFalsy();
    expect(validateSlashMask(IpClasses.E, 8)).toBeFalsy();
  });
});
