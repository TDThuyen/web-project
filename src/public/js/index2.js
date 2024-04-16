
var imageslide = ['/img/slideshow_1_master.webp', '/img/slideshow_3.webp', '/img/slideshow_7.webp','/img/cvn_slideshow_2.webp','/img/cvn_slideshow_5.webp', '/img/cvn_slideshow_6.webp'];
var user = document.querySelector('.user')
// user.innerHTML=q;
var logout= document.querySelector('.logout')
var logout__close = document.querySelector('#logout__close')
var logout__yes = document.querySelector('.logout__yes')
var logout__no = document.querySelector('.logout__no')
var logout__display = document.querySelector('.logout__display')

document.addEventListener("DOMContentLoaded", function() {
<<<<<<< HEAD
    user.innerHTML = document.cookie.match(/user_name=([^;]+)/)[1];
=======
    // user.innerHTML = q;
>>>>>>> 2fed92e0bfc5edc46d8ec2e202a6d1d3f4f4710d
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
// navbar__items.forEach(item => {
//     console.log(item);
// })
logout.addEventListener('click', function(){
logout__display.classList.toggle('hide')
})
logout__close.addEventListener('click', function(){
    logout__display.classList.toggle('hide')
})
logout__no.addEventListener('click', function(){
        logout__display.classList.toggle('hide')
 })

<<<<<<< HEAD
    
=======
    

>>>>>>> 2fed92e0bfc5edc46d8ec2e202a6d1d3f4f4710d
