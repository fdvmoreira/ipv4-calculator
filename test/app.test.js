// let app = require("../js/app.js");
import { isInRange, getIpv4Class, isSubnetValid, getFullSubnetMask, getNetworkAddress } from '../js/app';
import IPClass from '../js/IPClass';

describe("isInRange()", () => {
    it('expects isInRange(189, 0, 255) to be in range 0-255', () => {
        expect(isInRange(189, 0, 255)).toBeTruthy();
    });
});

describe("getIp4Class()", () => {
    it('expects getIpv4Class(256) to be invalid first octect', () => {
        expect(getIpv4Class(256)).toMatch("Invalid first Octect.");
    });
    it('expects getIpv4Class(-1) to be invalid first octect', () => {
        expect(getIpv4Class(-1)).toMatch("Invalid first Octect.");
    });
    it('expects getIpv4Class(0) to be defined', () => {
        expect(getIpv4Class(0)).toBeDefined();
    });
    it("expects getIpv4Class(10) to be class A ", () => {
        expect(String(getIpv4Class(10))).toMatch(IPClass.A.toString());
    });
});

describe("isSubnetValid()", () => {
    it("expect isSubnetValid(IPClass.A, 7) to be False", () => {
        expect(isSubnetValid(IPClass.A, 7)).toBeFalsy();
    });
    it("expect isSubnetValid(IPClass.A, 9) to be True", () => {
        expect(isSubnetValid(IPClass.A, 9)).toBeTruthy();
    });

    it("expect isSubnetValid(IPClass.B, 18) to be True", () => {
        expect(isSubnetValid(IPClass.B, 18)).toBeTruthy();
    });
    it("expect isSubnetValid(IPClass.B, 15) to be False", () => {
        expect(isSubnetValid(IPClass.B, 15)).toBeFalsy();
    });

    it("expect isSubnetValid(IPClass.C, 20) to be False", () => {
        expect(isSubnetValid(IPClass.C, 20)).toBeFalsy();
    });
    it("expect isSubnetValid(IPClass.C, 24) to be True", () => {
        expect(isSubnetValid(IPClass.C, 24)).toBeTruthy();
    });

    it("expect isSubnetValid(IPClass.D, 26) to be False", () => {
        expect(isSubnetValid(IPClass.D, 26)).toBeFalsy();
    });
    it("expect isSubnetValid(IPClass.D, 27) to be True", () => {
        expect(isSubnetValid(IPClass.D, 27)).toBeTruthy();
    });

    it("expect isSubnetValid(IPClass.E, 27) to be False", () => {
        expect(isSubnetValid(IPClass.E, 27)).toBeFalsy();
    });
    it("expect isSubnetValid(IPClass.E, 28) to be True", () => {
        expect(isSubnetValid(IPClass.E, 28)).toBeTruthy();
    });
});

describe("getFullSubnetMask()", () => {
    it("getFullSubnetMask(4) should return -1", () => {
        expect(getFullSubnetMask(4)).toBe(-1);
    });
    it("getFullSubnetMask(31) should return -1", () => {
        expect(getFullSubnetMask(31)).toBe(-1);
    });
    it("getFullSubnetMask(9) should return [255,128,0,0]", () => {
        expect(JSON.stringify(getFullSubnetMask(9))).toMatch(JSON.stringify([255, 128, 0, 0]));
    });
    it("getFullSubnetMask(10) should return [255,192,0,0]", () => {
        expect(getFullSubnetMask(10)).toEqual([255, 192, 0, 0]);
    });
    it("getFullSubnetMask(19) should return [255,255,224,0]", () => {
        expect(getFullSubnetMask(19)).toEqual([255, 255, 224, 0]);
    });
    it("getFullSubnetMask(24) should return [255,255,255,0]", () => {
        expect(getFullSubnetMask(24)).toEqual([255, 255, 255, 0]);
    });
    it("getFullSubnetMask(27) should return [255,255,255,224]", () => {
        expect(getFullSubnetMask(27)).toEqual([255, 255, 255, 224]);
    });
    it("getFullSubnetMask(28) should return [255,255,255,240]", () => {
        expect(JSON.stringify(getFullSubnetMask(28))).toMatch(JSON.stringify([255, 255, 255, 240]));
    });
    it("getFullSubnetMask(30) should return [255,255,255,252]", () => {
        expect(JSON.stringify(getFullSubnetMask(30))).toMatch(JSON.stringify([255, 255, 255, 252]));
    });
});
//   ^7  ^6  ^5  ^4 ^3 ^2 ^1 ^0
// 128  64  32  16  8  4  2  1

describe("getNetworkAddress()", () => {
    it("getNetworkAddress([15,45,89,78], [255,255,255,128]) should return [15, 45, 89,0]", () => {
        expect(getNetworkAddress([15, 45, 89, 78], [255, 255, 255, 128])).toEqual([15, 45, 89, 0]);
    });
    it("getNetworkAddress([199,78,99,18], [255,255,255,240]) should return [199,78,99,16]", () => {
        expect(getNetworkAddress([199, 78, 99, 18], [255, 255, 255, 240])).toEqual([199, 78, 99, 16]);
    });
});