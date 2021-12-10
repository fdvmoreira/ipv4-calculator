
// ********************** TODOs **************************
//
// [] get ip address
// [] split the ip address from subnetmask
// [] validate the ip address
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
    alert(ipAddressTextField.value);
}