document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('add-lesson-button');
    if (addButton) {
        addButton.addEventListener('click', function() {
            var currentUrl = window.location.href;
            var url = new URL(currentUrl);
            url.searchParams.set('page_type', 'new_lesson');
            var newUrl = url.toString();
            window.location.href = newUrl;
        });
    }

    document.querySelectorAll('.js-edit-lesson-button').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            var lessonId = this.getAttribute('data-lesson-id');
            var currentUrl = window.location.href;
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set('page_type', 'lesson');
            searchParams.set('lesson_id', lessonId);
            var newUrl = currentUrl.split('?')[0] + '?' + searchParams.toString();

            window.location.href = newUrl;
        });
    });

    document.querySelectorAll('.js-remove-lesson-button').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            var lessonId = this.getAttribute('data-lesson-id');

            if (confirm('Ви впевнені що хочете видалити заняття?')) {
                var xhr = new XMLHttpRequest();
                var url = ajaxHandler.url; // URL для обработки AJAX запроса
                var params = 'action=delete_lesson&lesson_id=' + lessonId;

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            // Удаление строки из таблицы
                            var lessonRow = document.getElementById('lesson-' + response.data.lesson_id);
                            if (lessonRow) {
                                lessonRow.parentNode.removeChild(lessonRow);
                                alert(response.data.message); // Опционально: показать сообщение об успешном удалении
                            } else {
                                alert('Попередження: Елемент не знайдено, оновіть, будь-ласка, сторінку');
                            }
                        } else {
                            alert('Помилка при видаленні заняття: ' + response.data.message);
                        }
                    } else {
                        alert('Помилка ' + xhr.status);
                    }
                };

                xhr.send(params);
            }
        });
    });
});
