
// ********************** TODOs **************************
//
// [*] get ip address
// [*] split the ip subnetmask from address
// [*] validate the ip address
// [*] get IP class
// [] validate the subnetmask
// [] construct the subnetmask
// [] AND the mask to find network and host portions
// [] count the subnet and host bits
// [] get the network and the broadcast address of each subnet
// [] print the results
// 
// 

import IPClass from './IPClass';

document.onload = () => {

    const form = document.querySelector("form");
    const ipAddressTextField = document.getElementById('ip-address-tf');



    form.onsubmit = () => {
        // alert(ipAddressTextField.value);
        let input = ipAddressTextField.value;

        if (!input.trim().length > 0) return;//show error and ruturn
        let ipAddress = input.split('.');
        if (ipAddress.length !== 4) return;// invalid ip address

        // get the subnetmask from ipAddress' last octect and convert it to into integer
        let subnetMask = parseInt(ipAddress[3].split('/')[1]);

        // convert to integer and validate ip IP Address
        ipAddress[3] = ipAddress[3].split('/')[0];
        ipAddress.forEach((value, index, array) => {
            array[index] = parseInt(value);
        });

        if (!(ipAddress.every(element => isInRange(element, 0, 255)))) {
            // log error
            return;
        }

        // get IP class
        const IPv4Class = getIpv4Class();

        // if subnet is valid go ahead and contract the full address
        // create subnet from slash-notation
        // const fullSubnetMask = getSubnetMask(subnetMask);

        //


    }
} // end loading document

/**
 * check the if a number is in range
 * @param {Integer} number - current number 
 * @param {Integer} min - lowest value
 * @param {Integer} max - highest value
 * @returns true if the is between min and max
 */
export const isInRange = (number, min, max) => (number >= min && number <= max);

/**
 * Find which network class this IP address belongs to
 * @param {Integer} firstOctect - the first octect of Ip address
 * @returns the IP class
 */
export const getIpv4Class = (firstOctect) => {
    let ipClass;
    if (isInRange(firstOctect, 0, 126))
        ipClass = IPClass.A;
    else if (isInRange(firstOctect, 128, 191))
        ipClass = IPClass.B;
    else if (isInRange(firstOctect, 192, 223))
        ipClass = IPClass.C;
    else if (isInRange(firstOctect, 224, 239))
        ipClass = IPClass.D;
    else if (isInRange(firstOctect, 240, 255))
        ipClass = IPClass.E;
    else {
        ipClass = "Invalid first Octect.";
    }
    return ipClass;
}

/**
 * Find out if the slash notation gotten from IP address is valid
 * @param {IPClass} ipClass - IP class obtained from first octect
 * @param {Integer} slash - the /number gotten from IP address
 * @returns true or false
 */
export const isSubnetValid = (ipClass, slash) => {
    if (ipClass == IPClass.A && slash < 8 ||
        ipClass == IPClass.B && slash < 16 ||
        ipClass == IPClass.C && slash < 24 ||
        ipClass == IPClass.D && slash < 27 ||
        ipClass == IPClass.E && slash < 28) {
        return false;
    }
    return true;
}

/**
 * Construct full subnetmask based on slash notaion
 * @param {Number} slashNotation  - the number of ON bits
 * @returns and array of lenght 4 octects
 */
export const getFullSubnetMask = (slashNotation) => {
    let subnetMask;

    // if the number is outside range 8-30 returns -1 
    if (!isInRange(slashNotation, 8, 30)) return -1;

    let bits = "000000000000000000000000000000";
    for (let index = 0; index < slashNotation; index++) {
        bits[index] = "1";
    }
    subnetMask.push(parseInt(bits.substring(0, 8), 2));
    subnetMask.push(parseInt(bits.substring(8, 16), 2));
    subnetMask.push(parseInt(bits.substring(16, 24), 2));
    subnetMask.push(parseInt(bits.substring(24, 30), 2));

    return subnetMask;
}
