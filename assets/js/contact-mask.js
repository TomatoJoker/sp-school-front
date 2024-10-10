const inputsPhone = document.querySelectorAll('.js-phone-mask');
inputsPhone.forEach(input => {
    IMask(input, {
        mask: '+{380}-00-000-00-00'
    })
})