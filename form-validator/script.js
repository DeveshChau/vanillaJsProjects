const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
    const parentEle = input.parentElement;
    parentEle.className = 'form-control error';
    const small = parentEle.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
	const parentEle = input.parentElement;
	parentEle.className = 'form-control success';
}

function getElement(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(input) {
    input.forEach(element => {
        if (element.value.trim() === '') {
            showError(element, `${getElement(element)} is required`);
        } else {
            showSuccess(element)
        } 
    });    
}

function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getElement(input)} must be more than ${min}`);
	} else if (input.value.length > max) {
		showError(input, `${getElement(input)} must be less than ${max}`);		
	} else {
		showSuccess(input);
	}
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
})