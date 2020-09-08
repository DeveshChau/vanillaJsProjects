const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function checkRequired(input) {
    input.forEach(element => {
        if (element.value.trim() === '') {
            showError(element, `${getElement(element)} is required`);
        } else {
            showSuccess(element)
        } 
    });    
}

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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
})