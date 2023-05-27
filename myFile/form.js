
// document.querySelector('.web-form').addEventListener('submit', (e) => {
//     e.preventDefault();

//     let firstName = document.getElementById('firstname-field').value;
//     let lastName = document.getElementById('lastname-field').value;
//     let phone = document.getElementById('phone-field').value;
//     let email = document.getElementById('email').value;

//     if (firstName === '' && lastName === '' && phone === '' && email === '') {
//         alert('cannot leave field empty!')
//     } else {
//         alert('nice!!!!')
//     }



// })


// const inputField = document.querySelector('input');
// inputField.addEventListener('input', () => {
//     inputField.setCustomValidity("")
//     inputField.checkValidity();
// })

// inputField.addEventListener('invalid', () => {
//     inputField.setCustomValidity("pleaseeeee fillllll!!!!")
// })


const submit = document.getElementById('submit');
submit.addEventListener('click', validate)
function validate(e) {
    e.preventDefault();

    const firstNameFiled = document.getElementById('firstname-field');
    let valid = true;

    if (!firstNameFiled.value) {
        const nameError = document.getElementById("nameError");
        nameError.classList.add('visible');
        firstNameFiled.classList.add('invalid')
        nameError.setAttribute('aria-hidden', false);
        nameError.setAttribute('aria-invalid', true);
    
    }

    return valid;
}
