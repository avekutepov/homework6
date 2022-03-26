const baseUrl = `https://geektech-project.herokuapp.com`;

const endpoints = {
    products: `${baseUrl}/products/`,
}

///GET request

const state = {
    products: null
}

function deleteProduct(id) {
    fetch(`https://geektech-project.herokuapp.com/products/${id}`, {
        method: 'DELETE'})
}


function getAllProduct(){
    const products = document.querySelector('.products');
    fetch(endpoints.products, {
        method: 'GET'
    }).then((res) => {
        return res.json();
        }).then((data) => {
            state.products = data;
            for (let i = 0; i < data.length; i++){
                products.innerHTML += `
                <div class="product__block">
                    <img src="${baseUrl}${data[i].image}" alt=""/>
                    <h3>${data[i].title}</h3>
                    <p class="description">${data[i].description}</p>
                    <p class="price">${data[i].price}</p>
                    <button onclick="deleteProduct(${data[i].id})">Delete</button>
                </div>`;
            }
    })
}

getAllProduct();

const submit = document.getElementById('submit');

function addProduct(){
    const obj = {
        title: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        stock_price: document.getElementById('stock_price').value,
        category_id: document.getElementById('category_id').value,
        image: null
    }
    console.log(obj)

    fetch(endpoints.products, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then((res) => {
        console.log(`
        Status: ${res.status}
        Status Text: ${res.statusText}
        `)
    })
}

submit.addEventListener('click' , addProduct)