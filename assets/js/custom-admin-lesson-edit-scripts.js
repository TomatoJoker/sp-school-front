document.addEventListener('DOMContentLoaded', function() {
    var editLessonBtn = document.getElementById('save-lesson-button');
    if (editLessonBtn) {
        jQuery('#save-lesson-button').on('click', function (e) {
            e.preventDefault();

            var formData = 'action=update_lesson' +
                '&lesson_id=' + encodeURIComponent(document.getElementById('lesson-id').value) +
                '&lesson_date=' + encodeURIComponent(document.getElementById('lesson-date').value) +
                '&lesson_time=' + encodeURIComponent(document.getElementById('lesson-time').value) +
                '&lesson_group=' + encodeURIComponent(document.getElementById('lesson-group').value) +
                '&lesson_room=' + encodeURIComponent(document.getElementById('lesson-room').value) +
                '&lesson_homework=' + encodeURIComponent(document.getElementById('lesson-homework').value) +
                '&lesson_teacher=' + encodeURIComponent(document.getElementById('lesson-teacher').value);

            // Создаем XMLHttpRequest
            var xhr = new XMLHttpRequest();
            var url = ajaxHandler.url;

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert('Заняття успішно оновлено!');
                    } else {
                        alert('Помилка при оновленні заняття: ' + response.data.message);
                    }
                } else {
                    alert('Виникла помилка ' + xhr.status);
                }
            };

            xhr.send(formData);
        });
    }
});