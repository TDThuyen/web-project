var url = window.location.href;

// Tìm vị trí của chuỗi "id=" trong URL
var idIndex = url.indexOf("id=");

// Nếu "id=" được tìm thấy trong URL
if (idIndex !== -1) {
    // Lấy ID từ URL
    var id = url.substring(idIndex + 3);
}
var product__color = document.querySelector('.product__color')

async function fetchProducts(id) {
  try {
    const response1 = await fetch(`/getProductDetail/id=${id}`);
    const productDetail1 = await response1.json();
    const response2 = await fetch(`/getProduct/id=${id}`);
    const productDetail2 = await response2.json();

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
        // Loại bỏ lớp 'color__picker' khỏi các phần tử màu khác
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
    displayProducts(productDetail2);
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
     var rate__text = document.querySelector('.rate__text')
     var ratenumber = 3.4;
     var rage__star = document.querySelector('.rate__star')

     product__name1.innerHTML = productDetail[0].product_name;
     product__name2.innerHTML = productDetail[0].product_name;
     product_image1.src = productDetail[0].img_top
     product_image1.classList.add('click')
     product_image2.src = productDetail[0].ing_mid
     main__img.src =  productDetail[0].img_top;
     sale.innerHTML = `-${productDetail[0].discount}%`
     sale.style.backgroundColor="#EDEDED"
     sold.innerHTML =`Số lượng: ${productDetail[0].quantity_sold}`;
     sale__price.innerHTML = `${(parseFloat(productDetail[0].price)*(1-parseFloat(productDetail[0].discount)/100)).toLocaleString('en-US')}₫`
     unsale__price.innerHTML = `${parseFloat(productDetail[0].price).toLocaleString('en-US')}₫`
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
     if(ratenumber <1 && ratenumber>0){rage__star.src="/img/0,5sao.png"}

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

console.log(unsale__price)
    console.log(productDetail)
};

fetchProducts(id);
var diep =1
var plus =document.querySelector('.plus')
var mainasu = document.querySelector('.mainasu')
var quantity__number = document.querySelector('.quantity__number')
quantity__number.innerHTML =diep;
plus.addEventListener('click',function(){
  diep++;
  quantity__number.innerHTML =diep;
})
mainasu.addEventListener('click',function(){
  if(diep>=2){
    diep--;
  quantity__number.innerHTML =diep;
  }
  
})



