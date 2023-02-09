let error = [
  "Vui lòng nhập tên Sản Phẩm",
  "Vui lòng nhập giá",
  "Vui lòng nhập Màn hình",
  "Vui lòng nhập màu Camera",
  "Vui lòng nhập front Camera",
  "Vui lòng dán hình ảnh",
  "Vui lòng nhập mô tả",
];
// kiểm tra rỗng
function kiemTraRong(el, message, idNotify) {
  if (el == "") {
    return (
      (document.getElementById(idNotify).innerHTML = error[message]),
      (document.getElementById(idNotify).style.display = `block`),
      false
    );
  } else {
    return (
      (document.getElementById(idNotify).innerHTML = ""),
      (document.getElementById(idNotify).style.display = "none"),
      true
    );
  }
}
// kiểm tra chọn
function kiemTraChon(value, idErr) {
  var value = value.trim();
  var a = document.getElementById(idErr);
  if (value == "0") {
    return (a.innerHTML = `Phải chọn`), (a.style.display = "block"), false;
  } else {
    return (a.innerHTML = ``), true;
  }
}
// kiểm tra mô tả
function ktrMoTa(moTa, span, max) {
  if (moTa.length > max) {
    document.getElementById(
      span
    ).innerHTML = `Mô tả không vượt quá ${max} ký tự`;
    return false;
  } else {
    document.getElementById(span).innerHTML = ``;
    return true;
  }
}
