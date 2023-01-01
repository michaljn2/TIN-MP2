function validateForm () {
    const studentInput = document.getElementById("student_id");
    const groupInput = document.getElementById("group_id");
    const itnInput = document.getElementById("itn");
    const gradeInput = document.getElementById("grade");

    const errorStudent = document.getElementById("errorStudent");
    const errorGroup = document.getElementById("errorGroup");
    const errorItn = document.getElementById("errorITN");
    const errorGrade = document.getElementById("errorGrade");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([studentInput, groupInput, itnInput, gradeInput],
                        [errorStudent, errorGroup, errorItn, errorGrade], errorsSummary);

    let valid = true;
    const requiredMessage = document.getElementById("errorMessage-required").innerText;
    if (!checkRequired(studentInput.value)) {
        valid = false;
        studentInput.classList.add("error-input");
        errorStudent.innerText = requiredMessage;
    }

    if (!checkRequired(groupInput.value)) {
        valid = false;
        groupInput.classList.add("error-input");
        errorGroup.innerText = requiredMessage;
    }

    const invalidFormMessage = document.getElementById("errorMessage-invalidForm").innerText;
    // nie wiem co z ITN, bo checkbox, wiec zawsze jest wartosc
    if (!valid) {
        errorsSummary.innerText = invalidFormMessage;
    }
    return valid;


}