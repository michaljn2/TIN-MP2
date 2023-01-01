function validateForm () {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const indexInput = document.getElementById("index");
    const birthDateInput = document.getElementById("birthDate");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const repeatPasswordInput = document.getElementById("repeatPassword")

    const errorFirstName = document.getElementById("errorFirstName");
    const errorLastName = document.getElementById("errorLastName");
    const errorIndex = document.getElementById("errorIndex");
    const errorBirthDate = document.getElementById("errorBirthDate");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorRepeatPassword = document.getElementById("errorRepeatPassword");
    const errorsSummary = document.getElementById("errorsSummary");



    resetErrors([firstNameInput, lastNameInput, indexInput, birthDateInput, emailInput, passwordInput, repeatPasswordInput],
                [errorFirstName, errorLastName, errorIndex, errorBirthDate, errorEmail, errorPassword, errorRepeatPassword], errorsSummary);

    const requiredMessage = document.getElementById("errorMessage-required").innerText;
    const firstNameMessage = document.getElementById("errorMessage-firstName").innerText;
    let valid = true;
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = requiredMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60 )) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = firstNameMessage;
    }

    const lastNameMessage = document.getElementById("errorMessage-lastName").innerText;
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = requiredMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60 )) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = lastNameMessage;
    }


    const indexRegexMessage = document.getElementById("errorMessage-index-regex").innerText;
    if (!checkRequired(indexInput.value)) {
        valid = false;
        indexInput.classList.add("error-input");
        errorIndex.innerText = requiredMessage;
    } else if (!checkIndex(indexInput.value)) {
        valid = false;
        indexInput.classList.add("error-input");
        errorIndex.innerText = indexRegexMessage;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear() - 18;

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');


    const birthDateRegexMessage = document.getElementById("errorMessage-birthDate-regex").innerText;
    const birthDateMatureMessage = document.getElementById("errorMessage-birthDate-mature").innerText;
    if (!checkRequired(birthDateInput.value)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirthDate.innerText = requiredMessage;
    } else if (!checkDate(birthDateInput.value)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirthDate.innerText = birthDateRegexMessage;
    } else if (!checkDateBefore(birthDateInput.value, nowString)) {
        valid = false;
        birthDateInput.classList.add("error-input");
        errorBirthDate.innerText = birthDateMatureMessage;
    }


    const emailRangeMessage = document.getElementById("errorMessage-email-range").innerText;
    const emailRegexMessage = document.getElementById("errorMessage-email-regex").innerText;
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = requiredMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailRangeMessage;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailRegexMessage;
    }

    if(passwordInput != null) {
        const passwordRangeMessage = document.getElementById("errorMessage-password-range").innerText;
        if (!checkRequired(passwordInput.value)) {
            valid = false;
            passwordInput.classList.add("error-input");
            errorPassword.innerText = requiredMessage
        } else if (!checkTextLengthRange(passwordInput.value, 5, 30)) {
            valid = false;
            passwordInput.classList.add("error-input");
            errorPassword.innerText = passwordRangeMessage;
        }

        const repeatPasswordMessage = document.getElementById("errorMessage-repeatPassword").innerText;
        if (!checkRequired(repeatPasswordInput.value)) {
            valid = false;
            repeatPasswordInput.classList.add("error-input");
            errorRepeatPassword.innerText = requiredMessage
        } else if (passwordInput.value != repeatPasswordInput.value) {
            valid = false;
            repeatPasswordInput.classList.add("error-input");
            errorRepeatPassword.innerText = repeatPasswordMessage;
        }
    }
    

    const invalidFormMessage = document.getElementById("errorMessage-invalidForm").innerText;
    if (!valid) {
        errorsSummary.innerText = invalidFormMessage;
    }

    return valid;
}