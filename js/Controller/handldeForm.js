// Render
function renderDanhSachSP(arr) {
  var contentHTML = "";

  arr.forEach(function (DS) {
    var contentTr = `
          <tr>
             <td>${DS.id}</td>
             <td>${DS.name}</td>
             <td>${DS.price}</td>
             <td>${DS.screen}</td>
             <td>${DS.backCamera}</td>
             <td>${DS.frontCamera}</td>
             <td><img style="width: 100px; height: 100px" src="${DS.img}" alt="" /></td>
             <td>${DS.desc}</td>
             <td>>${DS.type}</td>
             <td><button onclick="xoaSP(${DS.id})" class="btn btn-danger">Xóa</button> 
             <button onclick=" suaSP(${DS.id})" class="btn btn-warning">Sửa</button>
             </td>
          </tr>`;

    contentHTML += contentTr;
  });

  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

// Lấy thông tin từ Form
function layThongTinTuFrom() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  return {
    id: id,
    name: name,
    price: price,
    screen: screen,
    backCamera: backCamera,
    frontCamera: frontCamera,
    img: img,
    desc: desc,
    type: type,
  };
}
// show thông tin danh sách lên form
function showThongTinTuForm(DS) {
  document.getElementById("id").value = DS.id;
  document.getElementById("name").value = DS.name;
  document.getElementById("price").value = DS.price;
  document.getElementById("screen").value = DS.screen;
  document.getElementById("backCamera").value = DS.backCamera;
  document.getElementById("frontCamera").value = DS.frontCamera;
  document.getElementById("img").value = DS.img;
  document.getElementById("desc").value = DS.desc;
  document.getElementById("type").value = DS.type;
}
