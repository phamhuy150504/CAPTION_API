const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// render product 
export let renderProducts = (data) => {
    let mainHTML = $('#main');
    let content = data.reduce((init, item) => {
        return init += `
            <div class='col-3' >
                <div class="card bg-dark text-white">
                    <div class='anhManh'><img class="card-img-top img__Products" src=${item.img} ></div>
                    <div class="card-body">
                        <h4 class="card-title">${item.name.length > 14 ? item.name.substr(0, 14) + '...' : item.name}</h4>
                        <p class="card-text">${item.desc.length > 25 ? item.desc.substr(0, 25) + '...' : item.desc}</p>
                        <button  onclick='seeDetails(${item.id})' class='btn btn-primary'>See Detail</button>
                        <button onclick='addToCart(${item.id})' class='btn btn-success'>Add To Cart</button>
                    </div>
                </div>
            </div>
        `
    }, '');
    mainHTML.innerHTML = content;
}


// ---- push type products ----- 
export let changProduct = (products, iphone, samsung) => {
    products.filter(product =>{ 
        if (product.type=="Samsung"){
            samsung.push(product);
        } else{
            iphone.push(product);
        };
    });
;}




