
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
var page_left = document.querySelector('.bx-chevron-left')
var page_right = document.querySelector('.bx-chevron-right')
var imageslide = ['/img/slideshow_1_master.webp', '/img/slideshow_3.webp', '/img/slideshow_7.webp','/img/cvn_slideshow_2.webp','/img/cvn_slideshow_5.webp', '/img/cvn_slideshow_6.webp'];

    const productsContainer = document.querySelector('.product__area');
    var currentPage = 1;

    async function fetchProducts(page) {
      try {
        const response = await fetch(`/getProducts/${page});`);
        const count__response = await fetch(`/getNumberOfProducts`)
        const numberPage = await count__response.json();
        var NumberOfPage=parseInt(numberPage[0].ProductsNumber);
        const page_total = Math.ceil(NumberOfPage/16);
        const products = await response.json();
        // console.log(products)
       
        displayProducts(products);
        page_right.addEventListener('click',function(){
            if(currentPage < page_total){
            currentPage++;
            document.querySelector('.page__number__area').innerHTML='';
            fetchProducts(currentPage);
            scrollToPosition();}       
          })
          for( let i =1; i <= page_total;i++){
            // document.querySelector('.page__number__area').innerHTML='';
            var page_number = document.createElement('p');
            if(i === currentPage){
                page_number.style.color="red";
            }
            page_number.className=`page_number`;
            page_number.innerHTML = i;
            document.querySelector('.page__number__area').appendChild(page_number)
            page_number.addEventListener("click", function(){
                currentPage = i;
                document.querySelector('.page__number__area').innerHTML='';
                fetchProducts(currentPage);
                scrollToPosition();  
            })
          }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
   
    function displayProducts(products) {
        productsContainer.innerHTML='';
        products.forEach(product => {
            
          var productElement = document.createElement('a');
          productElement.className="product__item"
          productElement.addEventListener('mouseover',function(){
            productElement.style.backgroundColor="#f7f8fa"
            productElement.addEventListener('mouseout',function(){
                productElement.style.backgroundColor="#fff"})
          })
          var sale__percent = document.createElement('div')
          sale__percent.className="sale__percent"
          var sale__count =document.createElement('p')
          sale__count.innerHTML="-40%"
          var heartt =  document.createElement('i')
          heartt.className="bx bx-heart bx-flip-horizontal"
          var imageElement = document.createElement('img');
          imageElement.src = product.img_top;
          productElement.addEventListener('mouseover',function(){
            imageElement.src = product.ing_mid;
            productElement.addEventListener('mouseout',function(){
                imageElement.src = product.img_top;
                behavior='smooth'; 
            })
          })
          var product__name = document.createElement('p');
          product__name.className="product__name";
          product__name.innerHTML = product.product_name;
          var product__price = document.createElement('div');
          var product__price1 = document.createElement('p');
          var product__price2 = document.createElement('p');
          var sold = document.createElement('p');
          sold.className="sold";
          sold.innerHTML=`Đã bán ${product.price}`;
          product__price1.innerHTML = `${parseFloat(product.price).toLocaleString('en-US')}₫`;
          product__price2.innerHTML ="500,000₫";
          product__price.className="product__price";
          product__price1.className="sale__price";
          product__price2.className="unsale__price";
          product__price.appendChild(product__price1);
          product__price.appendChild(product__price2);
          sale__percent.appendChild(sale__count)
          productElement.appendChild(sale__percent)
          productElement.appendChild(heartt)
          productElement.appendChild(imageElement);
          productElement.appendChild(product__name);
          productElement.appendChild(product__price);
          productElement.appendChild(sold);
          productsContainer.appendChild(productElement);
          productElement.href=`/products/id=${product.product_id}`;
          
        });
      }
      fetchProducts(currentPage);
      function scrollToPosition() {
        const position = 500; // Vị trí muốn cuộn đến (đơn vị: pixel)
        window.scrollTo({
          top: position,
          behavior: 'smooth' // Cuộn mềm mại
        });
      }
     
        
     
     
      page_left.addEventListener('click',function(){
        if(currentPage>1){
        currentPage--;
        document.querySelector('.page__number__area').innerHTML='';
        fetchProducts(currentPage);
        scrollToPosition();}
      })
      

  
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










