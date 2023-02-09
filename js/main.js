const BASE_URL = "https://63da518c2af48a60a7ca9426.mockapi.io";
//..................
function fetchQLSPList() {
  axios({
    url: `${BASE_URL}/Product`,
    method: "GET",
  })
    .then(function (res) {
      renderDanhSachSP(res.data);
      data.push(...res.data);
    })

    .catch(function (err) {
      console.log(err);
    });
}
// chạy fetch lần đầu khi load trang
fetchQLSPList();
// thêm
function themSP() {
  var isValid = validation();
  let data = layThongTinTuFrom();
  if (isValid) {
    axios({
      url: `${BASE_URL}/Product`,
      method: "POST",
      data: data,
    })
      .then(function (res) {
        console.log(res);
        fetchQLSPList();
        document.querySelector("#myModal .close").click();
      })

      .catch(function (err) {
        console.log(err);
      });
  } else {
    return;
  }
}

document.getElementById("btnThemSP").addEventListener("click", function () {
  var footerEle = document.querySelector(".modal-footer");
  footerEle.innerHTML = `
        <button onclick="themSP()" class="btn btn-success">Thêm sản phẩm</button>
    `;
});
// Xóa
function xoaSP(id) {
  axios({
    url: `${BASE_URL}/Product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log(res);
      fetchQLSPList();
    })

    .catch(function (err) {
      console.log(err);
    });
}
// Sửa
function suaSP(id) {
  axios({
    url: `${BASE_URL}/Product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: script.js:72 ~ .then ~ res", res);
      showThongTinTuForm(res.data);
      $("#myModal").modal("show");
      var show = document.querySelector(".modal-footer");
      show.innerHTML = `<button onclick="capNhatSP()" class="btn btn-secondary">Update</button>`;
    })

    .catch(function (err) {
      console.log("🚀 ~ file: script.js:61 ~ xoaSP ~ err", err);
    });
}
// Update
function capNhatSP() {
  let data = layThongTinTuFrom();

  let isValid = validation();

  if (isValid) {
    axios({
      url: `${BASE_URL}/Product/${data.id}`,
      method: "PUT",
      data: data,
    })
      .then(function (res) {
        console.log(res);
        fetchQLSPList();
        document.querySelector("#myModal. close").click();
      })

      .catch(function (err) {
        console.log(err);
      });
  } else {
    return;
  }
}
// Kiểm tra Validate
function validation() {
  var SP = layThongTinTuFrom();
  console.log(SP.desc);
  var isValid = true;
  console.log(isValid);
  if (!kiemTraRong(SP.name, 0, "tbName")) {
    isValid = false;
  }

  if (!kiemTraRong(SP.price, 1, "tbGia")) {
    isValid = false;
  }

  if (!kiemTraRong(SP.screen, 2, "tbManHinh")) {
    isValid = false;
  }

  if (!kiemTraRong(SP.backCamera, 3, "tbBlackCamera")) {
    isValid = false;
  }

  if (!kiemTraRong(SP.frontCamera, 4, "tbFrontCamera")) {
    isValid = false;
  }

  if (!kiemTraRong(SP.img, 5, "tbHinhAnh")) {
    isValid = false;
  }

  if (!kiemTraRong(SP.desc, 6, "tbMoTa")) {
    isValid = false;
  }
  if (!ktrMoTa(SP.desc, "tbMoTa", 20)) {
    isValid = false;
    console.log(1);
  }
  if (!kiemTraChon(SP.type, "tbLSP")) {
    isValid = false;
  }

  if (!isValid) {
    return;
  } else {
    return SP;
  }
}
