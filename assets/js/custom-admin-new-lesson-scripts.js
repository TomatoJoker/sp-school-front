document.addEventListener('DOMContentLoaded', function() {
    var createLessonButton = document.getElementById('create-lesson-button');

    if (createLessonButton) {
        createLessonButton.addEventListener('click', function(e) {
            e.preventDefault();
            var lessonDate = document.getElementById('lesson-date').value;
            var lessonTime = document.getElementById('lesson-time').value;
            var lessonGroup = document.getElementById('lesson-group').value;
            var lessonRoom = document.getElementById('lesson-room').value;

            if (!lessonGroup || !lessonRoom) {
                alert('Оберіть аудиторію і групу для стоверння заняття.');
                return;
            }

            var xhr = new XMLHttpRequest();
            var url = ajaxHandler.url;
            var params = 'action=create_lesson' +
                '&lesson_date=' + encodeURIComponent(lessonDate) +
                '&lesson_time=' + encodeURIComponent(lessonTime) +
                '&lesson_group=' + encodeURIComponent(lessonGroup) +
                '&lesson_room=' + encodeURIComponent(lessonRoom);

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        window.location.href = response.data.redirect_url;
                    } else {
                        alert('Помилка при створенні заняття.');
                    }
                } else {
                    alert('Помилка ' + xhr.status);
                }
            };

            xhr.send(params);
        });
    }
});