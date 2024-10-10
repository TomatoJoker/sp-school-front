document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('add-lesson-button');
    if (addButton) {
        addButton.addEventListener('click', function() {
            var currentUrl = window.location.href;
            var url = new URL(currentUrl);
            url.searchParams.set('page_type', 'new_lessons');
            var newUrl = url.toString();
            window.location.href = newUrl;
        });
    }
});