async function fetchProducts() {
    const response = await fetch(`/getMyOrders`);
    const ordered = await response.json();
    displayProducts(ordered);

}

 function displayProducts(ordered) {
    var total__ordered=0;
    var ordered__product__area = document.querySelector('.ordered__product__area')
      for(var i = ordered.length -1 ; i>=0; i--){
        var element = ordered[i];
        var ordered__element = document.createElement('div')
        ordered__element.className ="ordered__element"   
        total__ordered += 1;
        var order__icon = document.createElement('img')
        order__icon.className="order__icon "

        order__icon.src="/img/order-delivery.png";
         var ordered__number = document.createElement('p')
         ordered__number.className ="ordered__numberr"
         ordered__number.innerHTML = `${total__ordered}) `
        ordered__element.appendChild(ordered__number)
        ordered__element.appendChild(order__icon)
        var ordered__price = document.createElement('p')
        ordered__price.className="ordered__price"
        ordered__price.innerHTML = `Giá: ${parseFloat(element.total_amount).toLocaleString('en-US')}₫`
        ordered__element.appendChild(ordered__price)
        var ordered__date = document.createElement('p')
        ordered__date.className="ordered__date"
        ordered__date.innerHTML = `Ngày đặt: ${element.order_date}`
        ordered__element.appendChild(ordered__date)
        var ordered_status = document.createElement('p')
        ordered_status.className="ordered_status"
        if(element.status == "1"){
            ordered_status.innerHTML = "Chờ xác nhận"
            ordered_status.style.color="#ff9100"
        }
        if(element.status == "2"){
            ordered_status.innerHTML = "Đang vận chuyển"
            ordered_status.style.color="#0652c4"
        }
        if(element.status == "3"){
            ordered_status.innerHTML = "Giao hàng thành công"
            ordered_status.style.color="#039e39"
        }
        if(element.status == "4"){
            ordered_status.innerHTML = "Hoàn trả"
            ordered_status.style.color="red"
        }
        ordered__element.appendChild(ordered_status)
        var getOrderDetail = document.createElement('p')
        getOrderDetail.innerHTML ="Xem chi tiết"
        getOrderDetail.className="getOrderDetail"
        getOrderDetail.addEventListener('click', (function(element_id) {
            return function() {
                async function fetchDetail(element_id) {
                    const response2 = await fetch(`/ordered/orderDetail/id=${element_id}`);
                    const detail = await response2.json();
                    displayDetail(detail);
                    console.log(detail);
                }
                function displayDetail(detail){
                    document.querySelector('.product__element').innerHTML=''
                    detail.forEach(element =>{
                        var product__elementChild = document.createElement('div')
                        var product__name = document.createElement('p')
                        product__elementChild.className="product__elementChild"
                        product__name.className="product__name"
                        product__name.innerHTML=element.product_name
                        var product__image = document.createElement('img')
                        product__image.className="product__image"
                        product__image.src=element.img_top
                        var product__quantity = document.createElement('p')
                        product__quantity.className="product__quantity"
                        product__quantity.innerHTML=`Số lượng: ${element.quantity}`
                        var product__color = document.createElement('p')
                        product__color.className="product__color"
                        if(element.color == '1'){
                            product__color.innerHTML="Màu: Trắng";
                        }
                        if(element.color == '2'){
                            product__color.innerHTML="Màu: Xám";
                        }
                        if(element.color == '3'){
                            product__color.innerHTML="Màu: Hồng";
                        }
                        if(element.color == '4'){
                            product__color.innerHTML="Màu: Nâu";
                        }
                        if(element.color == '5'){
                            product__color.innerHTML="Màu: Đen";
                        }
                        console.log(product__color.innerHTML)
                        var product__price =document.createElement('p')
                        product__price.className="product__price"
                        product__price.innerHTML = `Giá: ${(parseFloat(element.total_amout)/parseFloat(element.quantity)).toLocaleString('en-US')}₫`
                        var product__total = document.createElement('p')
                        product__total.className="product__total"
                        product__total.innerHTML=`Thành tiền: ${parseFloat(element.total_amout).toLocaleString('en-US')}₫`
                        //console.log(product__total.innerHTML)
                        product__elementChild.appendChild(product__image)
                        product__elementChild.appendChild(product__name)
                        product__elementChild.appendChild(product__color)
                        product__elementChild.appendChild(product__price)
                        product__elementChild.appendChild(product__quantity)
                        product__elementChild.appendChild(product__total)
                        document.querySelector('.product__element').appendChild(product__elementChild)
                    })   
                }
                fetchDetail(element_id)
                
            };
        })(element.order_id));
        ordered__element.appendChild(getOrderDetail)
        ordered__product__area.appendChild(ordered__element)
    }
    document.querySelector('.ordered__number').innerHTML = `Tổng số đơn hàng của bạn: ${total__ordered}`
}
fetchProducts()