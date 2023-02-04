const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ---- render Cart -----
export let renderCart = (arrCart) => {
    let tbody_cart = $('#tbody_cartProduct');
    if (arrCart.length > 0) {
        let contentHTML = arrCart.reduce((init, item) => {
            return init += `
                <tr>
                    <td><img class='img__cart-product' src="${item.img}"/></td>
                    <td>${item.name}</td>
                    <td class="change_amount"
                    ><button onclick='increase(${item.id})' class='btn'><i class="fa fa-angle-left"></i></button> 
                    <p>${item.amount}</p>
                    <button onclick='reduced(${item.id})' class='btn'><i class="fa fa-angle-right"></i></button>
                    </td>
                    <td>${item.price}</td>
                    <td>${item.amount * item.price}</td>
                    <td onclick='removeProduct(${item.id})'><i class="fa fa-trash"></i></td>
                </tr>
            `
        }, ``)
        tbody_cart.innerHTML = contentHTML;
    } else {
        return tbody_cart.innerHTML = ``
    };
}

// export 


// ----- Amount products in cart ------
export let amountProduct = (data) => {
    const spanAmount = $('#span_amount');
    let amountSum = data.reduce((init, item) => {
        return init += item.amount;
    }, 0);
    spanAmount.innerHTML = `(${amountSum})`;
}

// intro money products
export let introMoney = (data) => {
    let result = $('#fa-pager')
    result.onclick = () => {
        let total = data.reduce((totalSum, item) => {
            return totalSum += item.amount * item.price;
        }, 0)
        return total
    }
}

// total  products
export let totalProducts = (data) => {
    console.log(data)
    let sum = data.reduce((sumSum, item) => {
        return sumSum += item.amount * item.price;
    }, 0);
    return sum
}


// remove removeProduct 
