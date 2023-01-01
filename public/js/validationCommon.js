function resetErrors (inputs, errorTexts, errorInfo) {
    for (let i=0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i=0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;

    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkIndex(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^s[1-9][0-9]{0,4}/;
    return re.test(value);
}

function checkEmail (value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

function checkShortcut (value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /20[0-9][0-9][LZ]-[A-Z]{2,3}-[1-9][0-9]c/;
    return re.test(value);
}

function checkCourse (value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const re = /[A-Z]{2,3}/;
    return re.test(value);
}

function checkNumber (value) {
    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }
    return true;
}

function checkInteger (value) {
    if (!value) {
        return false;
    }
    if(isNaN(value)){
        return false;
    }
    value = parseFloat(value);
    return Number.isInteger(value);
}

function checkNumberRange (value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}

function checkDate (value) {
    if (!value) {
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/i;
    return pattern.test(value);
}

function checkDateBefore(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/i;
    if (!pattern.test(value)) {
        return false;
    }

    if (!pattern.test(compareTo)) {
        return false;
    }

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() > compareToDate.getTime()) {
        return false;
    }

    return true;
}
