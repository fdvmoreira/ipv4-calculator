//@ts-check

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
    debugger
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
export function convertBinaryToDecimal(array){
  /** @type {number} */
  let total = 0;

  for(let [index, value] of array.reverse().entries()){
    if(![0,1].includes(value)) throw (new TypeError("InvalidBinaryNumberError: the array contain invalid binary number")).name="InvalidBinaryNumberError";
    if(value === 1) total += (2**index);
  }

  return total;
}

/**
 * Convert integers to binary
 * @param {number} value - the number to be converted
 * @throws {InvalidNumberError} - throws when the number is not an integer
 * @returns {Array.<number>|null} - an array of bits 1s and 0s
 */
export function convertUnsignedIntegerToBinary(value){
  if (isNaN(value)) throw new TypeError("Not A Number");

  if(value < 0) return null;
  /** @type {Array.<number>|null} */
  let remainders = [];

  while(value > 1){
    remainders?.push(value % 2);
    value = Math.floor(value / 2);
  }
  remainders?.push(value);

  return remainders?.reverse()??null;
}
