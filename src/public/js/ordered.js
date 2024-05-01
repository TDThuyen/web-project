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
            //  document.querySelector('.getOrderId').value=`${element_id}`
            //  console.log(document.querySelector('.getOrderId').value)
            };
        })(element.order_id));
        ordered__element.appendChild(getOrderDetail)
        ordered__product__area.appendChild(ordered__element)
    }
    document.querySelector('.ordered__number').innerHTML = `Tổng số đơn hàng của bạn: ${total__ordered}`
}
fetchProducts()