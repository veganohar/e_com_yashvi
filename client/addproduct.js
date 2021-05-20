var allProducts = [];

window.onload = function(){
    getAllProducts();
}

function onSubmit() {
    let obj = {
        name: document.getElementById("name").value,
        mrp: document.getElementById("mrp").valueAsNumber,
        ram: document.getElementById("ram").value,
        storage: document.getElementById("storage").value,
        color: document.getElementById("color").value,
        discount: document.getElementById("discount").valueAsNumber
    }
    addNewProduct(obj);
}


async function addNewProduct(data) {
    let uri = `http://localhost:3000/api/products/createProduct`;
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    let response = await fetch(uri, options);
    let result = await response.json();
    getAllProducts();
    document.getElementById("productForm").reset();
}


async function getAllProducts(){
    let uri = `http://localhost:3000/api/products/getAllProducts`;
    let response = await fetch(uri);
    let data = await response.json();
    allProducts = data.data;
    showAllProducts()
    console.log(data);
}

function showAllProducts(){
    let table = document.getElementById("pTable");
    while(table.rows.length>1){
        table.deleteRow(1);
    }
    for(let i=0; i<allProducts.length;i++){
        let obj = allProducts[i];
        let tRow = `<tr>
                <td>${i+1}</td>
                <td>${obj.name}</td>
                <td>$ ${obj.mrp}</td>
                <td>${obj.ram}</td>
                <td>${obj.storage}</td>
                <td>${obj.color}</td>
                <td>${obj.discount} %</td>
                <td></td>
                <td></td>
        </tr>`;
        table.insertAdjacentHTML("beforeend",tRow);
    }
}