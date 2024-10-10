document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.js-save-feedback-button').forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            var form = this.closest('.js-student-feedback-form');
            console.log(form);
            var data = new FormData();
            data.append('action', 'save_student_feedback');
            data.append('security', ajaxHandler.nonce);
            data.append('lesson_id', form.querySelector('input[name="lesson_id"]').value);
            data.append('student_id', form.querySelector('input[name="student_id"]').value);
            data.append('feedback', form.querySelector('textarea[name="feedback"]').value);
            data.append('notes', form.querySelector('textarea[name="notes"]').value);
            data.append('lesson_date', form.querySelector('input[name="lesson_date"]').value);

            fetch(ajaxHandler.url, {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        alert(response.data);
                    } else {
                        alert('Ошибка при збережені інформації.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ошибка при збережені інформації.');
                });
        });
    });

    document.querySelectorAll('input[name="grade"]').forEach(function (input) {
        input.addEventListener('change', function () {
            var form = this.closest('.js-student-feedback-form');
            var studentId = form.querySelector('input[name="student_id"]').value;
            var statusElement = document.getElementById('grade-status-' + studentId);

            var data = new FormData();
            data.append('action', 'update_student_grade');
            data.append('security', ajaxHandler.nonce);
            data.append('lesson_id', form.querySelector('input[name="lesson_id"]').value);
            data.append('student_id', studentId);
            data.append('grade', this.value);
            data.append('lesson_date', form.querySelector('input[name="lesson_date"]').value);

            fetch(ajaxHandler.url, {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        statusElement.textContent = 'Оцінка оновлена';
                        statusElement.style.display = 'inline';
                        setTimeout(() => {
                            statusElement.style.display = 'none';
                        }, 5000);
                    } else {
                        alert('Помилка: ' + response.data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Виникла помилка при збереженні оцінки.');
                });
        });
    });

    document.querySelectorAll('input[name="attendance"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var form = this.closest('.js-student-feedback-form');
            var studentId = form.querySelector('input[name="student_id"]').value;
            var statusElement = document.getElementById('grade-status-' + studentId);

            var data = new FormData();
            data.append('action', 'update_student_attendance');
            data.append('lesson_id', form.querySelector('input[name="lesson_id"]').value);
            data.append('student_id', studentId);
            data.append('attendance', this.checked ? 1 : 0);
            data.append('lesson_date', form.querySelector('input[name="lesson_date"]').value);

            fetch(ajaxHandler.url, {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        statusElement.textContent = 'Відвідування оновлене';
                        statusElement.style.display = 'inline';
                        setTimeout(() => {
                            statusElement.style.display = 'none';
                        }, 5000);
                    } else {
                        console.error('Error updating attendance.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });

    document.querySelectorAll('.js-accordion-btn').forEach(function (accordionBtn) {
        accordionBtn.addEventListener('click', function () {
            let parentAccordion = accordionBtn.closest('.js-parent-accordion');
            let item = parentAccordion.querySelector('.js-accordion-item');
            let ariaLabelValue = accordionBtn.getAttribute('aria-label');
            if (item.classList.contains('is-open')) {
                item.classList.remove('is-open');
                item.classList.add('is-close');
                parentAccordion.classList.remove('is-open-parent');
                accordionBtn.setAttribute('aria-label', 'Зачинити вікно детальної інформації');
            } else {
                item.classList.remove('is-close');
                item.classList.add('is-open');
                parentAccordion.classList.add('is-open-parent');
                accordionBtn.setAttribute('aria-label', ariaLabelValue);
            }
        });
    });
});