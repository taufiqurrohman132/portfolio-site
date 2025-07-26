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


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      // Tampilkan loading
      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      // Opsional: sembunyikan loading setelah 1 detik
      setTimeout(() => {
        form.querySelector('.loading').classList.remove('d-block');
      }, 1000);
    });

    // Jika redirect ke #contact (berarti pesan sukses)
    if (window.location.hash === '#contact') {
      form.querySelector('.sent-message').classList.add('d-block');
    }
  }
});
