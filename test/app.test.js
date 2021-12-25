// let app = require("../js/app.js");
import { isInRange, getIpv4Class } from '../js/app';
import IPClass from '../js/IPClass';

describe("isInRange()", () => {
    it('expects 189 to be in range 0-255', () => {
        expect(isInRange(189, 0, 255)).toBeTruthy();
    });
});

describe("getIp4Class", () => {
    it('expects 256 to be invalid first octect', () => {
        expect(getIpv4Class(256)).toMatch("Invalid first Octect.");
    });
    it('expects -1 to be invalid first octect', () => {
        expect(getIpv4Class(-1)).toMatch("Invalid first Octect.");
    });
    it('expects function not to return undefined', () => {
        expect(getIpv4Class(0)).toBeDefined();
    });
    it("expects 10 to be class A ", () => {
        expect(String(getIpv4Class(10))).toMatch(IPClass.A.toString());
    });
});