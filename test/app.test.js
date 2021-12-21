import { isInRange, getIpv4Class } from '../js/app.js';

test('189 is in range 0-255', () => {
    expect(app.isInRange(189, 0, 255)).not.toBeFalsy();
});