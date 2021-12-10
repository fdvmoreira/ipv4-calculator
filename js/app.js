
// ********************** TODOs **************************
//
// [*] get ip address
// [*] split the ip subnetmask from address
// [*] validate the ip address
// [] construct the subnetmask
// [] validate the subnetmask
// [] AND the mask to find network and host portions
// [] count the subnet and host bits
// [] get the network and the broadcast address of each subnet
// [] print the results
// 
// 


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

}

/**
 * check the if a number is in range
 * @param {Integer} number - current number 
 * @param {Integer} min - lowest value
 * @param {Integer} max - highest value
 * @returns true if the is between min and max
 */
const isInRange = (number, min, max) => (number >= min && number <= max);
