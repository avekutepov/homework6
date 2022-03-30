const baseUrl = `https://geektech-project.herokuapp.com`;

const endpoints = {
    products: `${baseUrl}/products/`,
}

const form = document.querySelector('.popup');

///GET request

const state = {
    products: null
}

function editProduct(id){
    const obj = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        price: document.getElementById('editPrice').value,
        stock_price: document.getElementById('editStockPrice').value,
        category_id: document.getElementById('editCategory_id').value,
        image: null
    }
    fetch(`https://geektech-project.herokuapp.com/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    });
    form.innerHTML = ``;
}

function closeForm(){
    form.innerHTML =``
}

function openForm(id){
    fetch(`https://geektech-project.herokuapp.com/products/${id}`, {
        method: 'GET'
    }).then((res)=>{
        return res.json();
    }).then((data) => {
        state.products = data;
        form.innerHTML = `
        <div class="popup__container">
            <div class="popup__body">
                <p>Редактируйте выбраный товар</p>
                <p>Edit title</p>
                <input type="text" value="${data.title}"  placeholder="name" id="editTitle">
                <p>Edit description</p>
                <textarea cols="30" rows="10" placeholder="description" id="editDescription">${data.description}</textarea>
                <p>Edit price</p>
                <input type="number" value="${data.price}" placeholder="price" id="editPrice">
                <p>Edit stock Price</p>
                <input type="number" value="${data.stock_price}" id="editStockPrice">
                <p>Edit category</p>
                <input type="number" value="${data.category_id}" placeholder="category ID" id="editCategory_id">
                <button onclick="editProduct(${data.id})">Edit!</button>
                <button onclick="closeForm()">Cancel editing</button>
            </div>
        </div>`
    })
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
                    <button onclick="openForm(${data[i].id})">Edit</button>
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