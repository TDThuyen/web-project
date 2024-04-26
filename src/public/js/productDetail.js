var url = window.location.href;

// Tìm vị trí của chuỗi "id=" trong URL
var idIndex = url.indexOf("id=");

// Nếu "id=" được tìm thấy trong URL
if (idIndex !== -1) {
    // Lấy ID từ URL
    var id = url.substring(idIndex + 3);
}

async function fetchProducts(id) {
  try {
    const response1 = await fetch(`/getProductDetail/id=${id}`);
    const productDetail1 = await response1.json();
    const response2 = await fetch(`/getProduct/id=${id}`);
    const productDetail2 = await response2.json();
    displayProducts(productDetail1);
    displayProducts(productDetail2);
  } catch (error) {
    console.log(error)
  }
}

function displayProducts(productDetail) {
productDetail.forEach(element => {
  console.log(element);
});
}
fetchProducts(id);