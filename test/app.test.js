// let app = require("../js/app.js");
import { isInRange, getIpv4Class } from '../js/app';

test('189 is in range 0-255', () => {
    expect(isInRange(189, 0, 255)).not.toBeFalsy();
});