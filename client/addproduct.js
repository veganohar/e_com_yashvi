
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
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    // let response = await fetch(uri, options);
    // console.log(response);
    // let result = await response.json();
    // console.log(result);
    fetch(uri, options).then(response => { console.log(response); response.json()}).
    then(res => {
        console.log(res);
    })
    document.getElementById("productForm").reset();
}