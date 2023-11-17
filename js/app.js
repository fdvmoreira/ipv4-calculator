
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

    /** @type {number} */
    const LAST_OCTECT_IDX = 3;
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


