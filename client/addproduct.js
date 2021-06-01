var allProducts = [];
var isEdit = false;
var selId;
var base64String;
window.onload = function () {
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
   isEdit?updateProduct(obj):addNewProduct(obj);
}


async function addNewProduct(data) {
    data.image = base64String;
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
    base64String = null;
}

async function updateProduct(data){
    data.id= selId;
    base64String?data.image = base64String:'';
    let uri = `http://localhost:3000/api/products/updateProduct`;
    let options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    let response = await fetch(uri, options);
    getAllProducts();
    document.getElementById("productForm").reset();
    onReset();
}

async function getAllProducts() {
    let uri = `http://localhost:3000/api/products/getAllProducts`;
    let response = await fetch(uri);
    let data = await response.json();
    allProducts = data.data;
    console.log(allProducts);
    showAllProducts()
}

function showAllProducts() {
    let table = document.getElementById("pTable");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (let i = 0; i < allProducts.length; i++) {
        let obj = allProducts[i];
        let cb = obj.isActive?"checked":'';
        let tRow = `<tr>
                <td>${i + 1}</td>
                <td>${obj.name}</td>
                <td>$ ${obj.mrp}</td>
                <td>${obj.ram}</td>
                <td>${obj.storage}</td>
                <td>${obj.color}</td>
                <td>${obj.discount} %</td>
                <td><img src="${obj.image}" height="50"></td>
                <td>
                    <button class="btn btn-info" onclick="onEdit('${obj._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="onDelete('${obj._id}')">Delete</button>
                </td>
                <td>
                    <input type="checkbox" ${cb} onchange="onStatus('${obj._id}',event)">
                </td>
        </tr>`;
        table.insertAdjacentHTML("beforeend", tRow);
    }
}

function onReset(){
    document.getElementById("sbtn").innerHTML = "Add";
    document.getElementById("sbtn").className = "btn btn-primary";
    isEdit = false;
    selId = null;
    base64String = null;
}

async function onEdit(id){
    selId = id;
    let uri = `http://localhost:3000/api/products/getProductById/${id}`;
    let response = await fetch(uri);
    let data = await response.json();
    let product = data.data;
    document.getElementById("name").value = product.name;
    document.getElementById("mrp").value = product.mrp;
    document.getElementById("ram").value = product.ram;
    document.getElementById("storage").value = product.storage;
    document.getElementById("color").value = product.color;
    document.getElementById("discount").value = product.discount;
    document.getElementById("sbtn").innerHTML = "Update";
    document.getElementById("sbtn").className = "btn btn-success";
    isEdit = true;
}

async function onDelete(id){
    if (confirm('Are you sure you want to Delete this Product?')) {
        let uri = `http://localhost:3000/api/products/deleteProduct/${id}`;
        let options = {
            method: 'DELTE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        let response = await fetch(uri, options);
        getAllProducts();
      } 
}
 
async function onStatus(id,e){
    let data = {
        isActive:e.target.checked,
        id:id
    }
    let uri = `http://localhost:3000/api/products/updateProduct`;
    let options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    let response = await fetch(uri, options);
    getAllProducts();
}

function onUplaod(e){
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
        base64String = reader.result;
      }
      reader.readAsDataURL(file);
}