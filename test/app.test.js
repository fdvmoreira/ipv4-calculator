
/** @jest-environment jsdom */

import { describe, expect, test } from "@jest/globals";
import {
  IpClasses,
  generateSubnetMask,
  getIpClass,
  validateIpOctects,
  validateSlashMask,
} from "../js/app";

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

/**
 * @group App
 */
describe("generateSubnetMask", () => {
  /**
   * @test {App}
   */
  test("should generate subnet mask from slash notation", () => {
    expect(generateSubnetMask(6)).toHaveLength(0);
    expect(generateSubnetMask(31)).toHaveLength(0);
    expect(generateSubnetMask(8)).toHaveLength(4);
    expect(generateSubnetMask(9)).toEqual([255, 128, 0, 0]);
    expect(generateSubnetMask(25)).toEqual([255, 255, 255, 128]);
    expect(generateSubnetMask(26)).toEqual([255, 255, 255, 192]);
    expect(generateSubnetMask(16)).toEqual([255, 255, 0, 0]);
    expect(generateSubnetMask(10)).toEqual([255, 192, 0, 0]);
  });
});

/**
 * @group App
 */
describe("getIpClass", () => {
  /**
   * @test {App}
   */
  test("should return the IP Class", () => {
    expect(getIpClass(0, IpClasses)).toEqual(IpClasses.A);
    expect(getIpClass(127, IpClasses)).toEqual(IpClasses.A);
    expect(getIpClass(128, IpClasses)).toEqual(IpClasses.B);
    expect(getIpClass(191, IpClasses)).toEqual(IpClasses.B);
    expect(getIpClass(192, IpClasses)).toEqual(IpClasses.C);
    expect(getIpClass(223, IpClasses)).toEqual(IpClasses.C);
    expect(getIpClass(225, IpClasses)).toEqual(IpClasses.D);
    expect(getIpClass(239, IpClasses)).toEqual(IpClasses.D);
    expect(getIpClass(224, IpClasses)).toEqual(IpClasses.D);
    expect(getIpClass(240, IpClasses)).toEqual(IpClasses.E);
    expect(getIpClass(255, IpClasses)).toEqual(IpClasses.E);
    expect(getIpClass(256, IpClasses)).toEqual(IpClasses.X);
  });
});
