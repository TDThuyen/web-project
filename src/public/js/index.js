
var signup = document.querySelector('.signup')
var signup2 = document.querySelector('.signup2')
var signup3 = document.querySelector('.signup3')
var signup__display= document.querySelector('.signup__display')
var signup__close = document.querySelector('.bx-x')
var login = document.querySelector('.login')
var login__display= document.querySelector('.login__display')
var login__close =document.querySelector('#login__close')
var signup__option = document.querySelector('.signup__option')
var cart = document.querySelector('.cart');
var cart__alert= document.querySelector('.cart__alert');
var heart = document.querySelector('.heart');
var heart__alert= document.querySelector('.heart__alert');
var imageslide = ['/img/slideshow_1_master.webp', '/img/slideshow_3.webp', '/img/slideshow_7.webp','/img/cvn_slideshow_2.webp','/img/cvn_slideshow_5.webp', '/img/cvn_slideshow_6.webp'];


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
    var slideshow = document.querySelector('.slideshow__image');
var leftArrow = document.querySelector('.bxs-left-arrow-circle');
var rightArrow = document.querySelector('.bxs-right-arrow-circle');

var currentIndex = 0;

function showImage(index) {
    slideshow.style.opacity = 0.7;
    setTimeout(function() {
        slideshow.style.transition = '0.5s linear';
        slideshow.src = imageslide[index];
        slideshow.style.opacity = 1;
    }, 350);
}

function nextImage() {
    currentIndex++;
    if (currentIndex === imageslide.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imageslide.length - 1;
    }
    showImage(currentIndex);
}

setInterval(nextImage, 6000);

rightArrow.addEventListener('click', nextImage);
leftArrow.addEventListener('click', prevImage);

showImage(currentIndex);
cart.addEventListener('click',function(e){
    setTimeout(function() {
        heart__alert.classList.add('hide')
        cart__alert.classList.remove('hide')
        setTimeout(function(){
            cart__alert.classList.add('hide')
        }, 3000); 
      }, 0); 
})
heart.addEventListener('click',function(e){
    setTimeout(function() {
        cart__alert.classList.add('hide')
        heart__alert.classList.remove('hide')
        setTimeout(function(){
            heart__alert.classList.add('hide')
        }, 3000); 
      }, 0); 
})


signup.addEventListener('click', function(e){
     signup__display.classList.toggle('hide');
})
signup2.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
})
signup3.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
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
// var q="";
// var submit__button =document.querySelector('#submit2')
// var username = document.querySelector('.username')
// submit__button.addEventListener('click',function(){
//     q= username.value;
// })










