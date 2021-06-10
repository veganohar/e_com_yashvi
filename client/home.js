
let activeProducts = [];

window.onload = function(){
    getActiveProducts();
}


async function getActiveProducts(){
    let uri = `http://localhost:3000/api/products/getActiveProducts`;
    let response = await fetch(uri);
    let data = await response.json();
    activeProducts = data.data;
    displayProducts();
}

function displayProducts(){
    for(let p of activeProducts){
        let pid = p._id;
        let product =`<div class="col-3">
        <div class="productData">
            <div class="pimg">
                <img src="${p.image}" width="100%">
            </div>
            <div class="productDetails">
                <p class="productName">${p.name}</p>
                <div class="row priceDiv mt-3">
                    <div class="col-6 mrp">
                        &#x20B9; ${p.mrp}
                    </div>
                    <div class="col-6 price">
                        &#x20B9; ${calculatePrice(p)}
                    </div>
                </div>
                <p class="discount">${p.discount}%</p>
                <button class="btn-info cartBtn" onclick="onAddToCart('${pid}')"><i class="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
            </div>
        </div>
    </div>`;
    document.getElementById("productsDiv").insertAdjacentHTML("beforeend",product);
    }
}

function calculatePrice(p){
    let  mrp = p.mrp;
    let d = p.discount;
    let price = mrp-((mrp*d)/100);
    return price;
}

function onAddToCart(id){
console.log(id);
}