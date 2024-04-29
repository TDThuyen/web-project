var url = window.location.href;
// Tìm vị trí của chuỗi "id=" trong URL
var idIndex = url.indexOf("id=");
var urlId = url.substring(idIndex + 3);
var diep =1
var plus = document.querySelector('.plus')
var mainasu = document.querySelector('.mainasu')
var quantity__number = document.querySelector('.quantity__number')
var cart = document.querySelector('.cart')
var product__color = document.querySelector('.product__color')
var picked__color;
var pricee ;
var discountt;
var img__top;
var namee;
var signup__display= document.querySelector('.signup__display')
var signup__close = document.querySelector('.bx-x')
var login__display= document.querySelector('.login__display')
var login__close =document.querySelector('#login__close')
var signup__option = document.querySelector('.signup__option')
var addCard = document.querySelector('.addCart');
      var buy = document.querySelector('.buy')
var evaluate__display = document.querySelector('.evaluate__display')
var evaluate= document.querySelector('.evaluate')
var comment = document.querySelector('.comment')
quantity__number.innerHTML =diep;
if( document.cookie.match(/name=([^;]+)/) === null){
  var alert__login = document.querySelector('.alert__login')
  var close__button = document.querySelector('.bx-x-circle')
  var alert__login__box__text = document.querySelector('.alert__login__box__text')
  addCard.addEventListener('click', function(){
    alert__login.classList.toggle('hide')
  })
 buy.addEventListener('click', function(){
    alert__login.classList.toggle('hide')
  })
  close__button.addEventListener('click', function(){
    alert__login.classList.toggle('hide')
  })
  alert__login__box__text.addEventListener('click', function(){
    login__display.classList.toggle('hide')
    alert__login.classList.toggle('hide')
  })
  signup__option.addEventListener('click', function(e){
    login__display.classList.toggle('hide');
    signup__display.classList.toggle('hide');
})
signup__close.addEventListener('click',function(){
  signup__display.classList.toggle('hide')
})
login__close.addEventListener('click',function(){
  login__display.classList.toggle('hide')
})


  mainasu.addEventListener('click',function(){
    if(diep>=2){
      diep--;
    quantity__number.innerHTML =diep;}})
    plus.addEventListener('click',function(){
      diep++;
      quantity__number.innerHTML =diep;
    })
    // addCard.addEventListener('click', function(){

    // })
    // buy.addEventListener('click', function(){

    // })

} 

// Nếu "id=" được tìm thấy trong URL
if (idIndex !== -1) {
    // Lấy ID từ URL
    var id = url.substring(idIndex + 3);
}

var cart__circle = document.createElement('div')

async function fetchProducts(id) {
  try {
    const response1 = await fetch(`/getProductDetail/id=${id}`);
    const productDetail1 = await response1.json();
    const response2 = await fetch(`/getProduct/id=${id}`);
    const productDetail2 = await response2.json();
    const response3 = await fetch(`/getRate/id=${id}`);
    const productDetail3 = await response3.json();
    console.log(productDetail3)
    var rate__text = document.querySelector('.rate__text')
    var rage__star = document.querySelector('.rate__star')
    if(productDetail3){
    var ratenumber = parseFloat(productDetail3)
     rate__text.innerHTML=  `Đánh giá: ${ratenumber} / 5`;
     if(ratenumber == 0){rage__star.src="/img/0sao.png"}
     if(ratenumber == 1){rage__star.src="/img/1sao.png"}
     if(ratenumber == 2){rage__star.src="/img/2sao.png"}
     if(ratenumber == 3){rage__star.src="/img/3sao.png"}
     if(ratenumber == 4){rage__star.src="/img/4sao.png"}
     if(ratenumber == 5){rage__star.src="/img/5sao.png"}
     if(ratenumber < 5 && ratenumber > 4){rage__star.src="/img/4,5sao.png"}
     if(ratenumber <4 && ratenumber>3){rage__star.src="/img/3,5sao.png"}
     if(ratenumber <3 && ratenumber>2){rage__star.src="/img/2,5sao.png"}
     if(ratenumber <2 && ratenumber>1){rage__star.src="/img/1,5sao.png"}
     if(ratenumber <1 && ratenumber>0){rage__star.src="/img/0,5sao.png"}}
     else{
      rage__star.style.display="none"
      rate__text.innerHTML= `Sản phẩm chưa được đánh giá`
     }

    
    if( document.cookie.match(/name=([^;]+)/) === null){
      productDetail1.forEach(element => {
        var color = document.createElement('div');
        color.className = "productDetail__color";
        if (element.color == "1") {
          color.style.backgroundColor = "#fff";
        } else if (element.color == "2") {
          color.style.backgroundColor = "#a3a3a3";
        } else if (element.color == "3") {
          color.style.backgroundColor = "#f23def";
        } else if (element.color == "4") {
          color.style.backgroundColor = "#a1572d";
        } else if (element.color == "5") {
          color.style.backgroundColor = "#000";
        }
         
        color.addEventListener('click', function() {
          const otherColors = document.querySelectorAll('.productDetail__color');
          otherColors.forEach(otherColor => {
            if (otherColor !== color && otherColor.classList.contains('color__picker')) {
              otherColor.classList.remove('color__picker');
            }
          });
          color.classList.add('color__picker');
        });
        product__color.appendChild(color);
      });
    }
    
    displayProducts(productDetail2);
    pricee =productDetail2[0].price;
    discountt = productDetail2[0].discount;
    img__top = productDetail2[0].img_top;
    namee = productDetail2[0].product_name;
    if( document.cookie.match(/name=([^;]+)/) !== null){
      var cart__icon = document.createElement('i')
      cart__icon.className='bx bx-cart-alt';
      cart__circle.className='cart__circle'
      cart__circle.id = "cart__circle"
      var cart__circle__text = document.createElement('p')
      cart__circle__text.innerHTML = 'Giỏ hàng'
      cart.appendChild(cart__icon);
      cart.appendChild(cart__circle);
      cart.appendChild(cart__circle__text);
      document.querySelector('.bx').classList.remove('hide')
      plus.addEventListener('click',function(){
        diep++;
        quantity__number.innerHTML =diep;
        total__amount.value = (parseFloat(pricee)*(1-parseFloat(discountt)/100))*diep
        quantity.value = diep;
      })
      
      mainasu.addEventListener('click',function(){
        if(diep>=2){
          diep--;
        quantity__number.innerHTML =diep;
        total__amount.value = (parseFloat(pricee)*(1-parseFloat(discountt)/100))*diep
        quantity.value = diep;
        }
      })
      productDetail1.forEach(element => {
        var color = document.createElement('div');
        color.className = "productDetail__color";
        if (element.color == "1") {
          color.style.backgroundColor = "#fff";
        } else if (element.color == "2") {
          color.style.backgroundColor = "#a3a3a3";
        } else if (element.color == "3") {
          color.style.backgroundColor = "#f23def";
        } else if (element.color == "4") {
          color.style.backgroundColor = "#a1572d";
        } else if (element.color == "5") {
          color.style.backgroundColor = "#000";
        }
  
        color.addEventListener('click', function() {
          picked__color = element.color;
          
          picked__product__color.value = picked__color;
          const otherColors = document.querySelectorAll('.productDetail__color');
          otherColors.forEach(otherColor => {
            if (otherColor !== color && otherColor.classList.contains('color__picker')) {
              otherColor.classList.remove('color__picker');
            }
          });
  
          // Thêm lớp 'color__picker' vào màu được chọn
          color.classList.add('color__picker');
        });
  
        product__color.appendChild(color);
      });
      
      
      var form = document.querySelector('.form');  
      var picked__product__name = form.querySelector('.picked__product__name');
      picked__product__name.value = namee
      var picked__product__img = form.querySelector('.picked__product__img');
      picked__product__img.value = img__top
      var picked__product__color = form.querySelector('.picked__product__color');
      picked__product__color.value = picked__color
      var total__amount = form.querySelector('.total__amount');
      total__amount.value = (parseFloat(pricee)*(1-parseFloat(discountt)/100))*diep
      var quantity = form.querySelector('.quantity')
      quantity.value = diep;
      // buy.action="/cart"
      buy.addEventListener('click', function() {
        if(typeof picked__color === 'undefined'){
          alert("Vui long chon mau")
        }
        else{form.submit(); }//  Gửi form khi nút được nhấn
      });
      addCard.addEventListener('click', function() {
        if(typeof picked__color === 'undefined'){
          alert("Vui long chon mau")
        }
        else{form.submit(); }//  Gửi form khi nút được nhấn
      });
      
    }
  } catch (error) {
    console.log(error)
  }
}

function displayProducts(productDetail) {
     var product__name1 = document.querySelector(".product__name1");
     var product_image1 = document.querySelector('.product_image1');
     var product_image2 = document.querySelector('.product_image2');
     var main__img = document.querySelector('.main__img');
     var product__name2 =document.querySelector('.product__name2');
     var sale = document.querySelector('.sale')
     var sold = document.querySelector('.sold')
     var sale__price = document.querySelector('.sale__price')
     var unsale__price=document.querySelector('.unsale__price')
     
     var product__description =document.querySelector('.product__description')
     product__description.innerHTML= productDetail[0].description
     product__name1.innerHTML = productDetail[0].product_name;
     product__name2.innerHTML = productDetail[0].product_name;
     product_image1.src = productDetail[0].img_top
     product_image1.classList.add('click')
     product_image2.src = productDetail[0].ing_mid
     main__img.src =  productDetail[0].img_top;
     sale.innerHTML = `-${productDetail[0].discount}%`
     sale.style.backgroundColor="#EDEDED"
     sold.innerHTML =`Đã bán: ${productDetail[0].quantity_sold}`;
     sale__price.innerHTML = `${(parseFloat(productDetail[0].price)*(1-parseFloat(productDetail[0].discount)/100)).toLocaleString('en-US')}₫`
     unsale__price.innerHTML = `${parseFloat(productDetail[0].price).toLocaleString('en-US')}₫`
  

     product_image2.addEventListener('click',function(){
      main__img.src=productDetail[0].ing_mid;
      product_image2.classList.add('click');
      product_image1.classList.remove('click');
     })
     product_image1.addEventListener('click',function(){
      main__img.src=productDetail[0].img_top;
      product_image2.classList.remove('click');
      product_image1.classList.add('click');
     })

};

fetchProducts(id);

async function updateCartItemCount() {
  try {
      const response = await fetch('/getNumberOfProductsOfMyCart');
      const data = await response.json();
      if(data){
        if (data[0]) {
            cart__circle.innerHTML = data[0]?.itemCount?.toString();
            console.log(data[0]?.itemCount?.toString())
        }
        else {
          cart__circle.innerHTML = "0";
        }
      }
  } catch (error) {
      console.error('Error updating cart item count:', error);
  }
}

// Gọi hàm cập nhật số lượng sản phẩm ngay sau khi tải xong DOM
document.addEventListener('DOMContentLoaded', updateCartItemCount);
if(document.cookie.match(/name=([^;]+)/)){
evaluate__display.addEventListener('click',function(){
  evaluate.classList.toggle('hide')
  comment.classList.toggle('hide')
  evaluate__display.classList.add('hide')
})
}








  


  


  







