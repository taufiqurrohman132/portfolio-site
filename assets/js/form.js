document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const subjectInput = document.getElementById("subject-input");
  const dynamicSubject = document.getElementById("dynamic-subject");

  if (form && subjectInput && dynamicSubject) {
    form.addEventListener("submit", function () {
      dynamicSubject.value = subjectInput.value;
    });
  }
});