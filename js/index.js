var signup = document.querySelector('.signup')
var signup__display= document.querySelector('.signup__display')
var signup__close = document.querySelector('.bx-x')
var login = document.querySelector('.login')
var login__display= document.querySelector('.login__display')
var login__close =document.querySelector('#login__close')
var signup__option = document.querySelector('.signup__option')
document.addEventListener("DOMContentLoaded", function() {

    var  navbar__items= document.querySelectorAll('.item')
    var sections = document.querySelectorAll('main section')
    navbar__items.forEach(element => {
        element.addEventListener('click', function(e){
            e.preventDefault();
            const targetId = element.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            sections.forEach(section => {
                        section.style.display = "none"; 
                    });
                    if (targetSection) {

            targetSection.style.display = "block"; // Hiển thị section tương ứng
        }
        })
        
    });})
signup.addEventListener('click', function(e){
     signup__display.classList.toggle('hide');
})
signup__close.addEventListener('click', function(e){
    signup__display.classList.toggle('hide');
})
login.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
})
login__close.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
})
signup__option.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
    signup__display.classList.toggle('hide');
})
// navbar__items.forEach(item => {
//     console.log(item);
// })



