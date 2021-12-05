
const form = document.querySelector("form");
const ipAddressTextField = document.getElementById('ip-address-tf');
form.onsubmit = () => {
    alert(ipAddressTextField.value);
}