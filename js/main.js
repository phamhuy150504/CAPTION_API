import { renderProducts, changProduct } from "./Controller/controller.js";
import {
  renderCart,
  amountProduct,
  introMoney,
  totalProducts,
} from "./Controller/Cart.js";
import { WantRemove } from "./Controller/Modal.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Base_URL = `https://63da518c2af48a60a7ca9426.mockapi.io/Product`;
let products = [];
let iphone = [];
let samsung = [];
let arrCart = [];

// set localStorge
let SetJson = (data) => {
  let JsonDSSV = JSON.stringify(data);
  localStorage.setItem("CartLocal", JsonDSSV);
};
let jsonDanhSachNhanVien = localStorage.getItem("CartLocal");
if (jsonDanhSachNhanVien != null) {
  arrCart = JSON.parse(jsonDanhSachNhanVien);
}

// fetch API
const fetAPI = () => {
  axios({
    url: Base_URL,
    method: "GET",
  })
    .then((res) => {
      renderProducts(res.data);
      changProduct(res.data, iphone, samsung);
      products.push(...res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
fetAPI();

// Change Product
const onChangeProduct = () => {
  let idSelectProduct = $("#changeProduct").value;
  idSelectProduct === "1"
    ? renderProducts(iphone)
    : idSelectProduct === "2"
      ? renderProducts(samsung)
      : renderProducts(products);
};
window.onChangeProduct = onChangeProduct;

// See Detail
const seeDetails = (id) => {
  let render_details = $("#render_detail");
  let content = ``;
  products.forEach((product) => {
    let { img, name, price, screen, backCamera, frontCamera, desc } = product;
    if (product.id == id) {
      return (content = `
                <div class='col-6'>
                   <div class='img_detail p-3 bg-white rounded text-center mx-5 mb-5'>
                        <img src="${img}" class='photos-detail' />
                    </div>
                </div>
                <div class='col-6'>
                    <table class="table text-white">
                        <tr>
                            <th>Name</th>
                            <th>${name}</th>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <th>${price}</th>
                        </tr>
                        <tr>
                            <th>Screen</th>
                            <th>${screen}</th>
                        </tr>
                        <tr>
                            <th>Back-Camara</th>
                            <th>${backCamera}</th>
                         </tr>
                        <tr>
                            <th>Front-Camara</th>
                            <th>${frontCamera}</th>
                        </tr>
                        <tr>
                        <th>Desc</th>
                        <th>${desc}</th>
                    </tr>
                    </table>
                </div>
            `);
    };
  });
  render_details.innerHTML = content;
};
window.seeDetails = seeDetails;

// Add to Cart
const addToCart = (id) => {
  let arrTest = [];
  products.forEach((product) => {
    if (product.id == id) {
      let productCart = {
        id: product.id,
        img: product.img,
        name: product.name,
        price: product.price,
        amount: 1,
      };
      arrTest.push(productCart);
    }
  });
  if (arrCart.length > 0) {
    let index = arrCart.findIndex((product) => product.id == id);
    if (index != -1) {
      if (arrCart[index].amount === 10) {
        alert("Sorry! You added enough product amount to cart");
        return;
      };
      arrCart[index].amount++;
    } else {
      arrCart.push(arrTest[0]);
    };
  } else {
    arrCart.push(arrTest[0]);
  };
  SetJson(arrCart);
  renderCart(arrCart);
  amountProduct(arrCart);
};
window.addToCart = addToCart;

// Clear Products In Cart
let clearCart = () => {
  if (arrCart.length > 0) {
    WantRemove();
    Yes();
    wantNo();
    renderCart(arrCart);
    amountProduct(arrCart);
    SetJson(arrCart);
  } else {
    alert("Sorry, You not added products to Cart !!");
  };
};
// Sum AmountProduct
window.amountProduct = amountProduct;

window.clearCart = clearCart;
window.renderCart = renderCart;
renderCart(arrCart);
amountProduct(arrCart);

// clear when done
let clearDone = () => {
  arrCart = [];
  renderCart(arrCart);
  amountProduct(arrCart);
  SetJson(arrCart);
};

// Increase AmountProduct
let increase = (id) => {
  let index = arrCart.findIndex((product) => product.id * 1 === id);
  if (arrCart[index].amount === 1) {
    WantRemove(id, arrCart);
    wantYes(index);
    wantNo();
    return;
  };
  arrCart[index].amount--;
  renderCart(arrCart);
  amountProduct(arrCart);
  SetJson(arrCart);
};
window.WantRemove = WantRemove;

// onclick yes => remove product
let wantYes = (index) => {
  const modalId = $("#modelId");
  const want_remove = $("#want__remove");
  const backdrop = $(".modal-backdrop");
  const btn_yes = $("#btn__remove-yes");
  btn_yes.onclick = () => {
    if (index !== -1) {
      arrCart.splice(index, 1);
      want_remove.style = `display: none`;
      modalId.style = `display: block`;
      backdrop.style = `position: fixed`;
      renderCart(arrCart);
      amountProduct(arrCart);
      SetJson(arrCart);
    };
  };
};

// click yes => remove all products
let Yes = () => {
  const modalId = $("#modelId");
  const want_remove = $("#want__remove");
  const backdrop = $(".modal-backdrop");
  const btn_yes = $("#btn__remove-yes");
  btn_yes.onclick = () => {
    arrCart = [];
    want_remove.style = `display: none`;
    modalId.style = `display: block`;
    backdrop.style = `position: fixed`;
    renderCart(arrCart);
    amountProduct(arrCart);
    SetJson(arrCart);
  };
};

//  click no => return
let wantNo = () => {
  const modalId = $("#modelId");
  const want_remove = $("#want__remove");
  const backdrop = $(".modal-backdrop");
  const btn_no = $("#btn__remove-no");
  btn_no.onclick = () => {
    want_remove.style = `display: none`;
    modalId.style = `display: block`;
    backdrop.style = `position: fixed`;
  };
};
window.wantYes = wantYes;
window.wantNo = wantNo;

// reuduced products
let reduced = (id) => {
  let index = arrCart.findIndex((product) => product.id * 1 === id);
  if (arrCart[index].amount === 10) {
    alert("Sorry!. Did you buy maximum product");
    return;
  }
  arrCart[index].amount++;
  renderCart(arrCart);
  amountProduct(arrCart);
  SetJson(arrCart);
};
window.increase = increase;
window.reduced = reduced;

// Intro money
introMoney(arrCart);
window.introMoney = introMoney;

//totalProducts
let showResultTotal = () => {
  const pay = $("#fa-pager");
  const resultTotal = $("#result__total");
  const bannerTotal = $("#total__Products");
  const done = $("#btn__banner-total");
  pay.onclick = () => {
    if (arrCart.length > 0) {
      bannerTotal.style = `display: block;`;
      resultTotal.innerHTML = `Total: ${totalProducts(arrCart)}`;
      clearDone();
    } else {
      alert("Sorry, You not added products to Cart !!");
    };
  };
  done.onclick = () => {
    bannerTotal.style = `display: none;`;
  };
};
showResultTotal();
window.totalProducts = totalProducts;
window.showResultTotal = showResultTotal;

// remove Products from
let removeProduct = (id) => {
  arrCart.forEach((item, index) => {
    if (item.id == id) {
      WantRemove();
      wantYes(index);
      wantNo();
      renderCart(arrCart);
      amountProduct(arrCart);
      SetJson(arrCart);
    };
  });
};
window.removeProduct = removeProduct;

