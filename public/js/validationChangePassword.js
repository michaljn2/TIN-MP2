function validateForm (){
    const passwordInput = document.getElementById("password");
    const repeatPasswordInput = document.getElementById("repeatPassword");

    const errorPassword = document.getElementById("errorPassword");
    const errorRepeatPassword = document.getElementById("errorRepeatPassword");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([passwordInput, repeatPasswordInput],
        [errorPassword, errorRepeatPassword], errorsSummary);

    let valid = true;

    const requiredMessage = document.getElementById("errorMessage-required").innerText;
    const passwordRangeMessage = document.getElementById("errorMessage-password-range").innerText;
    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = requiredMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 5, 30)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = passwordRangeMessage;
    }

    const repeatPasswordMessage = document.getElementById("errorMessage-repeatPassword").innerText;
    if (!checkRequired(repeatPasswordInput.value)) {
        valid = false;
        repeatPasswordInput.classList.add("error-input");
        errorRepeatPassword.innerText = requiredMessage;
    } else if (passwordInput.value != repeatPasswordInput.value) {
        valid = false;
        repeatPasswordInput.classList.add("error-input");
        errorRepeatPassword.innerText = repeatPasswordMessage;
    }

    const invalidFormMessage = document.getElementById("errorMessage-invalidForm").innerText;
    if (!valid) {
        errorsSummary.innerText = invalidFormMessage;
    }

    return valid;
}