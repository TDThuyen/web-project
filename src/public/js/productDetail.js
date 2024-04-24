var url = window.location.href;

// Tìm vị trí của chuỗi "id=" trong URL
var idIndex = url.indexOf("id=");

// Nếu "id=" được tìm thấy trong URL
if (idIndex !== -1) {
    // Lấy ID từ URL
    var id = url.substring(idIndex + 3);
}
try {
    const response = await fetch(`/getProductDetail/id=`)
  } catch (error) {
    console.error('Error fetching products:', error);
  }