function validateForm (){
    const shortcutInput = document.getElementById("shortcut");
    const courseInput = document.getElementById("course");
    const facultyInput = document.getElementById("faculty");
    const capacityInput = document.getElementById("capacity");

    const errorShortcut = document.getElementById("errorShortcut");
    const errorCourse = document.getElementById("errorCourse");
    const errorFaculty = document.getElementById("errorFaculty");
    const errorCapacity = document.getElementById("errorCapacity");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([shortcutInput, courseInput, facultyInput, capacityInput],
                        [errorShortcut, errorCourse, errorFaculty, errorCapacity], errorsSummary);

    let valid = true;

    const requiredMessage = document.getElementById("errorMessage-required").innerText;
    const shortcutMessage = document.getElementById("errorMessage-shortcut").innerText;
    if (!checkRequired(shortcutInput.value)) {
        valid = false;
        shortcutInput.classList.add("error-input");
        errorShortcut.innerText = requiredMessage;
    } else if (!checkShortcut(shortcutInput.value)) {
        valid = false;
        shortcutInput.classList.add("error-input");
        errorShortcut.innerText = shortcutMessage;
    }

    const courseMessage = document.getElementById("errorMessage-course").innerText;
    if (!checkRequired(courseInput.value)) {
        valid = false;
        courseInput.classList.add("error-input");
        errorCourse.innerText = requiredMessage;
    } else if (!checkCourse(courseInput.value)) {
        valid = false;
        courseInput.classList.add("error-input");
        errorCourse.innerText = courseMessage;
    }

    const capacityIntegerMessage = document.getElementById("errorMessage-capacity-integer").innerText;
    const capacityRangeMessage = document.getElementById("errorMessage-capacity-range").innerText;
    if (!checkRequired(capacityInput.value)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = requiredMessage;
    } else if (!checkInteger(capacityInput.value)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = capacityIntegerMessage
    } else if (!checkNumberRange(capacityInput.value, 1, 150)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = capacityRangeMessage
    }

    const invalidFormMessage = document.getElementById("errorMessage-invalidForm").innerText;
    if (!valid) {
        errorsSummary.innerText = invalidFormMessage;
    }

    return valid;
}