const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const inputTab = [username, pass, pass2, email];

const rodoDescription = document.querySelector('.rodo-description');
const rodoInfoBox = document.querySelector('.rodo-infobox');

const showRodo = () => {
	rodoInfoBox.classList.add('show-rodo-infobox');
};

const hideRodo = () => {
	rodoInfoBox.classList.remove('show-rodo-infobox');
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} składa się z min. ${min} znaków`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, `Hasła nie są takie same`);
	}
};

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'Twój adres e-mail jest nieprawidłowy');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		const wrapper = document.querySelector('.wrapper');
		popup.classList.add('show-popup');
		wrapper.classList.add('blur');
	}
};

rodoDescription.addEventListener('mouseenter', showRodo);
rodoDescription.addEventListener('mouseleave', hideRodo);

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm(inputTab);
	checkLength(username, 3);
	checkLength(pass, 8);
	checkPassword(pass, pass2);
	checkMail(email);
	checkErrors();
});

clearBtn.addEventListener('click', (e) => {
	e.preventDefault();

	inputTab.forEach((el) => {
		el.value = '';
		clearError(el);
	});
});
