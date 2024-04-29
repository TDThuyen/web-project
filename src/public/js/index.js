
var signup = document.querySelector('.signup')
var signup2 = document.querySelector('.signup2')
var signup__display= document.querySelector('.signup__display')
var signup__close = document.querySelector('.bx-x')
var login = document.querySelector('.login')
var login__display= document.querySelector('.login__display')
var login__close =document.querySelector('#login__close')
var signup__option = document.querySelector('.signup__option')
var cart = document.querySelector('.cart');
var cart__alert= document.querySelector('.cart__alert');
var page_left = document.querySelectorAll('.bx-chevron-left')
var page_right = document.querySelectorAll('.bx-chevron-right')
var imageslide = ['/img/slideshow_1_master.webp', '/img/slideshow_3.webp', '/img/slideshow_7.webp','/img/cvn_slideshow_2.webp','/img/cvn_slideshow_5.webp', '/img/cvn_slideshow_6.webp'];
var search__form = document.querySelector('.search__form');
var search = document.querySelector('.search');
var search__button = document.querySelector('.search__button');
var search__text = document.querySelector('.search__text')
var cookieMatch = document.cookie.match(/name=([^;]+)/)
search__button.addEventListener('click', function(event) {
  event.preventDefault();
  var searchValue = search.value.trim();
  if (searchValue !== "") {
    var searchURL = `/products/q=${encodeURIComponent(searchValue)}`;
    window.location.href = searchURL;
  }
});
console.log(document.cookie.session)
console.log(cookieMatch)
if(cookieMatch !== null){
    var logout= document.querySelector('.logout')
var logout__close = document.querySelector('#logout__close')
var logout__yes  = document.querySelector('.logout__yes')
var logout__no = document.querySelector('.logout__no')
var logout__display = document.querySelector('.logout__display')
var userinfor__close = document.querySelector('#userinfor__close')
var capnhat = document.querySelector('.capnhat')
cart.href="/cart";
document.querySelector('.ordered').classList.toggle('hide')
       document.querySelector('.navbar').removeChild(signup)
       document.querySelector('.navbar').removeChild(login)
       document.querySelector('.navbar').removeChild(document.querySelector('.vachngan'))
       var user = document.querySelector('.user')
       user.innerHTML = decodeURIComponent(document.cookie.match(/name=([^;]+)/)[1])
       logout.classList.remove('hide')
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
            document.querySelector('.login__fullname').removeAttribute("disabled");
            document.querySelector('.login__birthday').removeAttribute("disabled");
            document.querySelector('.login__phonenumber').removeAttribute("disabled");
            document.querySelector(".login__address").removeAttribute("disabled");
            document.querySelector(".change").classList.add("hide");
            document.querySelector(".capnhat").classList.remove("hide");
            document.querySelector('.fileInput').classList.remove('hide')
        }
        user.addEventListener("click",function(){
            document.querySelector('.user__display').classList.toggle('hide');
            document.querySelector('.login__fullname').setAttribute("disabled", "disabled");
            document.querySelector('.login__birthday').setAttribute("disabled", "disabled");
            document.querySelector('.login__phonenumber').setAttribute("disabled", "disabled");
            document.querySelector(".login__address").setAttribute("disabled", "disabled");
            document.querySelector(".capnhat").classList.add("hide");
            document.querySelector(".change").classList.remove("hide")
            document.querySelector('.fileInput').classList.add('hide')
        
        })
        userinfor__close.addEventListener("click",function(){
            document.querySelector('.user__display').classList.toggle('hide');
            document.querySelector('.login__fullname').setAttribute("disabled", "disabled");
            document.querySelector('.login__birthday').setAttribute("disabled", "disabled");
            document.querySelector('.login__phonenumber').setAttribute("disabled", "disabled");
            document.querySelector('.login__address').setAttribute("disabled", "disabled");
            document.querySelector('.capnhat').classList.add('hide');
            document.querySelector('.change').classList.remove('hide')
            document.querySelector('.fileInput').classList.add('hide')
        })
var fullname = document.querySelector('.login__fullname')
var birthday = document.querySelector('.login__birthday')
var phonenumber = document.querySelector('.login__phonenumber')
var address = document.querySelector('.login__address')
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

}
  
    const productsContainer = document.querySelector('.product__area');
    var currentPage = 1;
    var url = window.location.href;
    var qIndex = url.indexOf("q=");
    if (qIndex !== -1) {
        // Lấy ID từ URL
        var q = decodeURIComponent(url.substring(qIndex + 2));
    }
    var collectionIndex = url.indexOf("collection=");
    if (collectionIndex !== -1) {
        // Lấy ID từ URL
        var collection = url.substring(collectionIndex + 11);
       
    }
    var search__text__1=  document.createElement('p');
       
        search__text__1.className="search__text__1"
        search__text.appendChild(search__text__1)
    if(typeof q !== 'undefined'){
        search__text__1.innerHTML = `DANH MỤC TÌM KIẾM: ${q}`
        
    }
    else{
        search__text__1.innerHTML = `DANH MỤC SẢN PHẨM`
    }
    
    async function fetchProducts(page) {
      try {
        let response = null;
        if(qIndex!==-1) {
            response = await fetch(`/getProducts/q=${q}/${page})`);
        }
        else if(collectionIndex!==-1) {
            response = await fetch(`/getProducts/collection=${collection}/${page})`);
        }
        else {
            response = await fetch(`/getProducts/${page})`);
        }

        let count__response = `[{"ProductsNumber":0}]`;
        if(qIndex!==-1) {
            count__response = await fetch(`/getNumberOfProducts/q=${q}`);
        }
        else if(collectionIndex!==-1) {
            count__response = await fetch(`/getNumberOfProducts/collection=${collection}`);
        }
        else {
            count__response = await fetch(`/getNumberOfProducts`);
        }
        const numberPage = await count__response.json();
        var NumberOfPage=parseInt(numberPage[0].ProductsNumber);
        const page_total = Math.ceil(NumberOfPage/16);
        const products = await response.json();
        displayProducts(products);
        page_right[0].addEventListener('click',function(){
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
          sale__count.innerHTML=`-${product.discount}%`
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
          sold.innerHTML=`Đã bán: ${product.quantity_sold}`;
          product__price1.innerHTML = `${(parseFloat(product.price)*(1-parseFloat(product.discount)/100)).toLocaleString('en-US')}₫`;
          product__price2.innerHTML =`${parseFloat(product.price).toLocaleString('en-US')}₫`;
          product__price.className="product__price";
          product__price1.className="sale__price";
          product__price2.className="unsale__price";
          product__price.appendChild(product__price1);
          product__price.appendChild(product__price2);
          sale__percent.appendChild(sale__count)
          productElement.appendChild(sale__percent)
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
    
      page_left[0].addEventListener('click',function(){
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
    var slideshows = document.querySelectorAll('.slideshow__image');
var leftArrows = document.querySelectorAll('.bxs-left-arrow-circle');
var rightArrows = document.querySelectorAll('.bxs-right-arrow-circle');

var currentIndex = 0;

function showImage(index, slideshow) {
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
    slideshows.forEach(function(slideshow) {
        showImage(currentIndex, slideshow);
    });
}

function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imageslide.length - 1;
    }
    slideshows.forEach(function(slideshow) {
        showImage(currentIndex, slideshow);
    });
}

setInterval(nextImage, 6000);

rightArrows.forEach(function(rightArrow) {
    rightArrow.addEventListener('click', nextImage);
});

leftArrows.forEach(function(leftArrow) {
    leftArrow.addEventListener('click', prevImage);
});

slideshows.forEach(function(slideshow) {
    showImage(currentIndex, slideshow);
});





// chua dangnhap

if(cookieMatch === null){
signup.addEventListener('click', function(e){
     signup__display.classList.toggle('hide');
})
signup2.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
})
signup__close.addEventListener('click', function(e){
    signup__display.classList.toggle('hide');
})
login__close.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
})
login.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
})

signup__option.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
    signup__display.classList.toggle('hide');
})
cart.addEventListener('click',function(e){
    setTimeout(function() {
        cart__alert.classList.remove('hide')
        setTimeout(function(){
            cart__alert.classList.add('hide')
        }, 3000); 
      }, 0); 
})}

// navbar__items.forEach(item => {
//     console.log(item);
// })
// var q="";
// var submit__button =document.querySelector('#submit2')
// var username = document.querySelector('.username')
// submit__button.addEventListener('click',function(){
//     q= username.value;
// })


async function updateCartItemCount() {
    try {
        const response = await fetch('/getNumberOfProductsOfMyCart');
        const data = await response.json();
        if(data){
            const cartItemCountElement = document.getElementById('cartItemCount');
            if (cartItemCountElement && data[0]) {
                cartItemCountElement.textContent = data[0]?.itemCount?.toString();
            }
        }
    } catch (error) {
        console.error('Error updating cart item count:', error);
    }
}

// Gọi hàm cập nhật số lượng sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', updateCartItemCount);







