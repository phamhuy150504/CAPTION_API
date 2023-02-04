import { renderProducts, changProduct } from "./Controller/controller.js";
import { renderCart, amountProduct, introMoney, totalProducts } from "./Controller/Cart.js";
import { WantRemove } from "./Controller/Modal.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let arrCart = [];



let jsonDanhSachNhanVien = localStorage.getItem('CartLocal')
if (jsonDanhSachNhanVien != null) {
    arrCart = JSON.parse(jsonDanhSachNhanVien)
}

function SetJson(data) {
    let JsonDSSV = JSON.stringify(data)
    localStorage.setItem('CartLocal', JsonDSSV)
}
const Base_URL = `https://63da518c2af48a60a7ca9426.mockapi.io/Product`
let products = [];
let iphone = [];
let samsung = [];


// fetch API 
const fetAPI = () => {
    axios({
        url: Base_URL,
        method: 'GET'
    }).then(res => {
        renderProducts(res.data)
        changProduct(res.data, iphone, samsung)

        products.push(...res.data);
    }).catch(err => {
        console.log(err);
    })
}
fetAPI();
// --- change product --- 
const onChangeProduct = () => {
    let idSelectProduct = $('#changeProduct').value;
    idSelectProduct === '1' ? renderProducts(iphone) : idSelectProduct === '2' ? renderProducts(samsung) : renderProducts(products)
}
window.onChangeProduct = onChangeProduct;

// see detail 
const seeDetails = (id) => {
    let render_details = $('#render_detail')
    let content = ``
    products.forEach(product => {
        let { img, name, price, screen, backCamera, frontCamera, desc } = product
        if (product.id == id) {
            return (content = `
                <div class='col-6'>
                   <div class=' '>
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
                        <th>Desg</th>
                        <th>${desc}</th>
                    </tr>
                    </table>
                </div>
            `)
        }
    }, ``)

    render_details.innerHTML = content
}
window.seeDetails = seeDetails;

// Add to Cart 
const addToCart = (id) => {
    let arrTest = [];
    products.forEach(product => {
        if (product.id == id) {
            let productCart = {
                id: product.id,
                img: product.img,
                name: product.name,
                price: product.price,
                amount: 1,
            }
            arrTest.push(productCart)
        }
    });
    if (arrCart.length > 0) {
        let index = arrCart.findIndex(product => product.id == id)
        // index != -1 ? arrCart[index].amount++ : arrCart.push(arrTest[0]);
        if (index != -1) {
            if (arrCart[index].amount === 10) {
                alert('Sorry! You added enough product amount to cart');
                return;
            };
            arrCart[index].amount++;
        } else {
            arrCart.push(arrTest[0]);
        }
    } else {
        arrCart.push(arrTest[0]);
    };
    SetJson(arrCart);
    renderCart(arrCart);
    amountProduct(arrCart);
}
window.addToCart = addToCart;


// ---- CLEAR CART -----
let clearCart = () => {
    arrCart = [];
    renderCart(arrCart);
    amountProduct(arrCart);
    SetJson(arrCart);
}
window.clearCart = clearCart;
window.renderCart = renderCart;
renderCart(arrCart);
amountProduct(arrCart)
// ------ SumAmount Product add to cart ----------
window.amountProduct = amountProduct;


// ----- increase amountProduct and reduced amountProduct ------
let increase = (id) => {
    let index = arrCart.findIndex(product => product.id * 1 === id);
    if (arrCart[index].amount === 1) {
        WantRemove(id, arrCart);
        wantYes(index);
        wantNo();
        return;
    }
    arrCart[index].amount--;
    renderCart(arrCart);
    amountProduct(arrCart);
    SetJson(arrCart);
};
window.WantRemove = WantRemove;

// onclick yes => remove product
let wantYes = (index) => {
    const modalId = $('#modelId');
    const want_remove = $('#want__remove');
    const backdrop = $('.modal-backdrop');
    const btn_yes = $('#btn__remove-yes');
    btn_yes.onclick = () => {
        if (index !== -1) {
            console.log(index)
            arrCart.splice(index, 1)
            console.log(arrCart)
            want_remove.style = `display: none`;
            modalId.style = `display: block`;
            backdrop.style = `position: fixed`;
            renderCart(arrCart);
            amountProduct(arrCart);
            SetJson(arrCart);
        }
    }
}

let wantNo = () => {
    const modalId = $('#modelId');
    const want_remove = $('#want__remove');
    const backdrop = $('.modal-backdrop');
    const btn_no = $('#btn__remove-no');
    btn_no.onclick = () => { 
        want_remove.style = `display: none`;
        modalId.style = `display: block`;
        backdrop.style = `position: fixed`;
    }
            
}
window.wantYes = wantYes;
window.wantNo = wantNo;


let reduced = (id) => {
    let index = arrCart.findIndex(product => product.id * 1 === id);
    if (arrCart[index].amount === 10) {
        alert('Sorry!. Did you buy maxinmum product');
        return;
    }
    arrCart[index].amount++;
    renderCart(arrCart);
    amountProduct(arrCart);
    SetJson(arrCart);
}
window.increase = increase;
window.reduced = reduced;

// Intro money
introMoney(arrCart);
window.introMoney = introMoney;

//totalProducts 
let showResultTotal = () => {
    ;
    const pay = $('.fa-pager')
    const resultTotal = $('#result__total');
    const bannerTotal = $('#total__Products');
    const done = $('#btn__banner-total');
    pay.onclick = () => {
        if (arrCart.length > 0) {
            bannerTotal.style = `display: block;`
            resultTotal.innerHTML = `Total: ${totalProducts(arrCart)}`
            clearCart();
        } else {
            alert('Sorry, You not added products to Cart !!')
        };
    }
    done.onclick = () => {
        bannerTotal.style = `display: none;`;
    };
}
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
            renderCart(arrCart)
            amountProduct(arrCart);
            SetJson(arrCart);
        };
    });
}
window.removeProduct = removeProduct;