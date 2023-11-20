
//@ts-check

/** @typedef {number} IPClass */

/** @enum {IPClass} */
export var IpClasses = Object.freeze({
  A: 0xa,
  B: 0xb,
  C: 0xc,
  D: 0xd,
  E: 0xe,
});

/** @type {HTMLFormElement | null} */
const inputForm = document.querySelector("form");

/** @param {Event} _ev */
window.onload = (_ev) => {
  inputForm?.addEventListener("submit", (submitEvent) => {
    //prevent form submission
    submitEvent.preventDefault();

    /** @type {string|null} */
    let inputIpAndMask = null;
    /** @type {HTMLFormControlsCollection} */
    const formControls = /** @type {HTMLFormControlsCollection} */ (
      /** @type {HTMLFormElement} */ (submitEvent?.target)?.elements
    );

    inputIpAndMask = /** @type {HTMLInputElement} */ (
      formControls.namedItem("ip-address")
    ).value;

    /** @type {Array.<number>} */
    let ipOctects = [];
    /** @type {number | null} */
    let slaskMask = null;

    try {
      // Extract the ip and slash mask from input
      inputIpAndMask?.split(".").map((octect) => {
        if (octect.includes("/")) {
          const [lastOctect, slash] = octect.split("/");
          ipOctects?.push(parseInt(lastOctect));
          slaskMask = parseInt(slash);
          return;
        }
        ipOctects?.push(parseInt(octect));
      });
    } catch (error) {
      console.error(error);
    }

    // validate the ip address
    // validate the slash mask
    // ip&&mask
    //
  });
};

/**
 * Invalid IP Address Error
 * @param {string} message - the message
 * @param {Object} additionalInfo - Extra information to provide
 */
export function InvalidIpAddressError(message, additionalInfo) {
  Error.call(message);
  this.name = "InvalidIpAddressError";
  this.additionalInfo = additionalInfo;
}
Object.setPrototypeOf(InvalidIpAddressError, Error.prototype);

/**
 * Convert binary number to decimal
 * @param {Array.<number>} array - the array of bit to convert
 * @throws {InvalidBinaryNumberError} - may throw Error.name = "InvalidNinaryNumberError"
 * @returns {number} - the decimal representation
 */
export function convertBinaryToDecimal(array) {
  /** @type {number} */
  let total = 0;

  for (let [index, value] of array.reverse().entries()) {
    if (![0, 1].includes(value))
      throw (new TypeError(
        "InvalidBinaryNumberError: the array contain invalid binary number",
      ).name = "InvalidBinaryNumberError");
    if (value === 1) total += 2 ** index;
  }

  return total;
}

/**
 * Convert integers to binary
 * @param {number} value - the number to be converted
 * @throws {InvalidNumberError} - throws when the number is not an integer
 * @returns {Array.<number>|null} - an array of bits 1s and 0s
 */
export function convertUnsignedIntegerToBinary(value) {
  if (isNaN(value)) throw new TypeError("Not A Number");

  if (value < 0) return null;
  /** @type {Array.<number>|null} */
  let remainders = [];

  while (value > 1) {
    remainders?.push(value % 2);
    value = Math.floor(value / 2);
  }
  remainders?.push(value);

  return remainders?.reverse() ?? null;
}

/**
 * Validate the IP address
 * @param {Array.<number>} octets - an array of octets (IP address)
 * @returns {boolean} - weather or not the IP address is valid
 */
export function validateIpOctects(octets) {
  if (octets?.length !== 4 || octets.at(0) === 127) return false;
  return octets.every((octect) => octect >= 0 && octect <= 255);
}

/**
 * Validate slash mask according based on the IP Class
 * @param {IpClasses} ipClass - ip class
 * @param {number} mask - the slash mask
 * @returns {boolean} - weather or not the mask is valid
 */
export function validateSlashMask(ipClass, mask) {
  if (mask < 8 || mask > 30) return false;

  /** @type {boolean} */
  let valid = false;

  switch (ipClass) {
    case IpClasses.A:
      valid = mask >= 8;
      break;
    case IpClasses.B:
      valid = mask >= 16;
      break;
    case IpClasses.C:
      valid = mask >= 24;
      break;
    default:
      valid = false;
  }

  return valid;
}

/**
 * Get subnet mask from slash notation
 * @param {!number} slash - the slash notation to get the subnet from
 * @returns {Array.<number>} the subnet mask octets
 */
export function generateSubnetMask(slash) {
  if (slash < 8 || slash > 30) return [];

  /** @type {Array.<number>} */
  const maskBits = new Array(32).fill(0);

  for (let i = 0; i < slash; i++) {
    maskBits[i] = 1;
  }

  /** @type {Array.<number>} */
  let subnet = [];

  for (let y = 0; y < maskBits.length; y += 8) {
    subnet.push(convertBinaryToDecimal(maskBits.slice(y, y + 8)));
  }

  return subnet;
}

/**
 * Get the IP class from first octect
 * @param {number} firstOctect - the first octect of the ip address
 * @param {Object} map - the object mapping the ip
 * @returns {string} return the ip class
 */
export function getIpClass(firstOctect, map) {
  if (firstOctect >= 0 && firstOctect <= 127) {
    return map["A"];
  } else if (firstOctect >= 128 && firstOctect <= 191) {
    return map["B"];
  } else if (firstOctect >= 192 && firstOctect <= 223) {
    return map["C"];
  } else if (firstOctect >= 224 && firstOctect < 240) {
    return map["D"];
  } else if (firstOctect >= 240 && firstOctect <= 255) {
    return map["E"];
  } else {
    return map["X"];
  }
}
