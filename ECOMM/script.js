// Selecting add-btn, popupbox and overlay
var add_btn = document.querySelector(".add-btn");
var over_lay = document.querySelector('.overlay');
var popupbox = document.querySelector('.popupbox');

add_btn.addEventListener("click", function() {
    over_lay.style.display = "block";
    popupbox.style.display = "block";
});

// Selecting cancel button
var cancelpop = document.getElementById("cancel-popup");
cancelpop.addEventListener("click", function(event) {
    event.preventDefault();
    over_lay.style.display = "none";
    popupbox.style.display = "none";
});

// Selecting container,prod-container
var container = document.querySelector(".container");
var prod_name = document.getElementById("prod-name");
var prod_add = document.getElementById("add-prod");
var vname = document.getElementById("vname");
var desc = document.getElementById('desc');
var imageInput = document.getElementById('image');

function loadProducts() {
    var products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
        createProductElement(product.name, product.vendor, product.description, product.image);
    });
}

function saveProduct(name, vendor, description, image) {
    var products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ name, vendor, description, image });
    localStorage.setItem('products', JSON.stringify(products));
}

function createProductElement(name, vendor, description, image) {
    var div = document.createElement('div');
    div.setAttribute('class', 'prod-container');
    div.innerHTML = `
        <img src="${image}" alt="${name}">
        <h1>${name}</h1>
        <h5>${vendor}</h5>
        <p>${description}</p>
        <button onclick="del(event)">Delete</button>
    `;
    container.append(div);
}

prod_add.addEventListener('click', function(event) {
    event.preventDefault();

    if (!prod_name.value.trim() || !vname.value.trim() || !desc.value.trim() || !imageInput.files[0]) {
        alert("All fields must be filled out.");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var image = e.target.result;
        createProductElement(prod_name.value, vname.value, desc.value, image);
        saveProduct(prod_name.value, vname.value, desc.value, image);

        // Clear the input fields
        prod_name.value = '';
        vname.value = '';
        desc.value = '';
        imageInput.value = '';

        over_lay.style.display = "none";
        popupbox.style.display = "none";
    };
    reader.readAsDataURL(imageInput.files[0]);
});

function del(event) {
    event.preventDefault();

    // Show confirmation dialog
    var confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
        return; // If the user cancels, do nothing
    }

    var productElement = event.target.parentElement;
    var name = productElement.querySelector('h1').innerText;
    var vendor = productElement.querySelector('h5').innerText;
    var description = productElement.querySelector('p').innerText;

    // Remove the product from localStorage
    var products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => !(product.name === name && product.vendor === vendor && product.description === description));
    localStorage.setItem('products', JSON.stringify(products));

    // Remove the product element from the DOM
    productElement.remove();
}


// Load products from localStorage on page load
window.onload = loadProducts;
