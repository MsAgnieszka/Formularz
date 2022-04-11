const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearBtn = document.querySelector(
	'.registration-form__control-button-clear'
);
const sendBtn = document.querySelector(
	'.registration-form__control-button-send'
);
const popup = document.querySelector('.registration-form__popup');
const closeBtn = document.querySelector(
	'.registration-form__control-button-close'
);
const inputTab = [username, pass, pass2, email];

const rodoDescription = document.querySelector(
	'.registration-form__rodo--rodo-description'
);
const rodoInfoBox = document.querySelector('.registration-form__rodo-infobox');

const showRodo = () => {
	rodoInfoBox.classList.add('registration-form__rodo-infobox--show');
};

const hideRodo = () => {
	rodoInfoBox.classList.remove('registration-form__rodo-infobox--show');
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
	const allInputs = document.querySelectorAll('.registration-form__form-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		const registrationForm = document.querySelector('.registration-form');
		popup.classList.add('registration-form__popup--show');
		registrationForm.classList.add('blur');
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
