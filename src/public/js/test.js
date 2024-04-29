
console.log(document.cookie.match(/name=([^;]+)/))
var product__number = document.querySelector(".product__number")
var cart__product__area = document.querySelector('.cart__product__area')
var total__cart = document.querySelector('.total__cart')
var delete_product = document.querySelector('.delete_product')
var delete__product__name = document.querySelector('.delete__product__name')
var delete__product__color =document.querySelector('.delete__product__color')
// var cart__product__element = document.querySelector('.cart__product__element')
async function fetchProducts() {
    const response = await fetch(`/getMyCart`);
    const cart__product__list = await response.json();
    displayProducts(cart__product__list);
    console.log(cart__product__list)
}
function displayProducts(cart__product__list) {
    var total = 0;
    var total__money =0 ;
        cart__product__list.forEach(element => {
            total += element.quantity;
            total__money += parseFloat(element.total_amount);
        var cart__product__element = document.createElement('div')
        cart__product__element.className="cart__product__element";
        var cart__product__element__icon = document.createElement('i')
        cart__product__element__icon.className="bx bx-x";
        var cart__product__element__text = document.createElement('div')
        cart__product__element__text.className="cart__product__element__text"
        var cart__product__image = document.createElement('img')
        cart__product__image.className='cart__product__image'
        cart__product__image.src = element.img_top;
        var cart__product__name = document.createElement('p')
        cart__product__name.className='cart__product__name'
        cart__product__name.innerHTML = element.product_name; 
        var cart__product__price = document.createElement('p')
        cart__product__price.className='cart__product__price'
        cart__product__price.innerHTML = `Giá: ${parseFloat(element.price).toLocaleString('en-US')}₫`; 
        var cart__product__color = document.createElement('p')
        cart__product__color.className='cart__product__color'
        if(element.color == "1"){
            cart__product__color.innerHTML =  "Màu: Trắng";
        }
        if(element.color == "2"){
            cart__product__color.innerHTML = "Màu: Xám";
        }
        if(element.color == "3"){
            cart__product__color.innerHTML = "Màu: Hồng";
        }
        if(element.color == "4"){
            cart__product__color.innerHTML = "Màu: Nâu";
        }
        if(element.color == "5"){
            cart__product__color.innerHTML = "Màu: Đen";
        }
        var cart__product__quantity = document.createElement('p')
        cart__product__quantity.className='cart__product__quantity'
        cart__product__quantity.innerHTML = `Số lượng: ${element.quantity}`; 
        var cart__product__total = document.createElement('p')
        cart__product__total.className='cart__product__total'
        cart__product__total.innerHTML = `Thành tiền: ${parseFloat(element.total_amount).toLocaleString('en-US')}₫`;
        cart__product__element.appendChild(cart__product__image)
        cart__product__element__text.appendChild(cart__product__name)
        cart__product__element__text.appendChild(cart__product__price)
        cart__product__element__text.appendChild(cart__product__color)
        cart__product__element__text.appendChild(cart__product__quantity)
        cart__product__element__text.appendChild(cart__product__total)
        cart__product__element.appendChild(cart__product__element__text)
        cart__product__element.appendChild(cart__product__element__icon)
        cart__product__area.appendChild(cart__product__element)
        cart__product__element__icon.addEventListener('click', function(){
            cart__product__area.removeChild(cart__product__element)
            total -= element.quantity;
            total__money -= parseFloat(element.total_amount);
            product__number.innerHTML=`Có ${total} sản phẩm trong giỏ hàng của bạn`;
             total__cart.innerHTML = `${parseFloat(total__money).toLocaleString('en-US')}₫`;
            delete__product__name.value = cart__product__name;
            delete__product__color=cart__product__color;
            delete_product.submit();
        });
    })
    product__number.innerHTML=`Có ${total} sản phẩm trong giỏ hàng của bạn`;
    total__cart.innerHTML = `${parseFloat(total__money).toLocaleString('en-US')}₫`;
}
fetchProducts()

