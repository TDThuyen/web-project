
var imageslide = ['/img/slideshow_1_master.webp', '/img/slideshow_3.webp', '/img/slideshow_7.webp','/img/cvn_slideshow_2.webp','/img/cvn_slideshow_5.webp', '/img/cvn_slideshow_6.webp'];
var user = document.querySelector('.user')
// user.innerHTML=q;
var logout= document.querySelector('.logout')
var logout__close = document.querySelector('#logout__close')
var logout__yes = document.querySelector('.logout__yes')
var logout__no = document.querySelector('.logout__no')
var logout__display = document.querySelector('.logout__display')
var userinfor__close = document.querySelector('#userinfor__close')
var capnhat = document.querySelector('.capnhat')

document.addEventListener("DOMContentLoaded", function() {
    user.innerHTML = decodeURIComponent(document.cookie.match(/name=([^;]+)/)[1]);
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
function enableForm() {
    document.querySelector(".fullname").removeAttribute("disabled");
    document.querySelector(".birthday").removeAttribute("disabled");
    document.querySelector(".phonenumber").removeAttribute("disabled");
    document.querySelector(".address").removeAttribute("disabled");
    document.querySelector(".change").classList.add("hide");
    document.querySelector(".capnhat").classList.remove("hide");
        document.querySelector('.fileInput').classList.remove('hide')
}
user.addEventListener("click",function(){
    document.querySelector(".user__display").classList.toggle('hide');
    document.querySelector(".fullname").setAttribute("disabled", "disabled");
    document.querySelector(".birthday").setAttribute("disabled", "disabled");
    document.querySelector(".phonenumber").setAttribute("disabled", "disabled");
    document.querySelector(".address").setAttribute("disabled", "disabled");
    document.querySelector(".capnhat").classList.add("hide");
    document.querySelector(".change").classList.remove("hide")
    document.querySelector('.fileInput').classList.add('hide')

})
userinfor__close.addEventListener("click",function(){
    document.querySelector(".user__display").classList.toggle('hide');
    document.querySelector(".fullname").setAttribute("disabled", "disabled");
    document.querySelector(".birthday").setAttribute("disabled", "disabled");
    document.querySelector(".phonenumber").setAttribute("disabled", "disabled");
    document.querySelector(".address").setAttribute("disabled", "disabled");
    document.querySelector(".capnhat").classList.add("hide");
    document.querySelector(".change").classList.remove("hide")
    document.querySelector('.fileInput').classList.add('hide')
})
// capnhat.addEventListener("click",function(){
//     document.querySelector(".user__display").classList.toggle('hide');
//     document.querySelector(".fullname").setAttribute("disabled", "disabled");
//     document.querySelector(".birthday").setAttribute("disabled", "disabled");
//     document.querySelector(".phonenumber").setAttribute("disabled", "disabled");
//     document.querySelector(".address").setAttribute("disabled", "disabled");
//     document.querySelector(".capnhat").classList.add("hide");
//     document.querySelector(".change").classList.remove("hide")
//     document.querySelector('.fileInput').classList.add('hide')
// })

var fullname = document.querySelector('.fullname')
var birthday = document.querySelector('.birthday')
var phonenumber = document.querySelector('.phonenumber')
var address = document.querySelector('.address')
fullname.value=decodeURIComponent(document.cookie.match(/name=([^;]+)/)[1]);
birthday.value=decodeURIComponent(document.cookie.match(/birthday=([^;]+)/)[1]).substring(3, 13);
phonenumber.value=decodeURIComponent(document.cookie.match(/phoneNumber=([^;]+)/)[1]);
let customerAddress = decodeURIComponent(document.cookie.match(/address=([^;]+)/)[1]);
if(customerAddress === "j:null"){
    address.value= ""
}
else {
    address.value = customerAddress
}
