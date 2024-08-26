
class Item {
    constructor(name, price, amount, _imgLink) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.imgLink = _imgLink;
    }

}

class Product {
    constructor(name, price, _imgLink, _itemId) {
        this.name = name;
        this.price = price;
        this.imgLink = _imgLink;
        this.itemId = _itemId;
    }
}

class UI {

    static displayProducts() {

        const products = Storing.getProducts();
        products.forEach((product) => { UI.addItemToSell(product) });
    }


    static getItemInfo(name, price, amount) {
        const info = {
            itemName: name,
            itemPrice: price,
            itemAmount: amount
        }
        return info;
    }

    static getRowPrice(itemInfo) {
        return itemInfo['itemPrice'] * itemInfo['itemAmount'];
    }

    static updateTotalPrice(price, numOfRows) {
        for (var i = 0; i < numOfRows; i++) {
            if (i < numOfRows) {
                document.querySelector('.cart-total-price').innerText = `$${price}`;
            }
        }
    }

    static addItemToSell(product) {
        // create div
        const box = document.createElement('div');
        box.classList.add('box');
        box.id = product.itemId;

        box.innerHTML = `
                    <h3 class="item-name">${product.name}</h3>
                    <div class="remove-product">x</div>
                    <img src="${product.imgLink}">
                    <p class="item-price">Price: $${product.price}</p>
                    <input type="submit" value="Add to Cart" class="add-to-cart-btn btn btn-m btn-orange btn-shadow">`;
        boxes.appendChild(box);
    }


    static addRowToCart(_item, _itemId) {

        if (document.getElementById(`row-${_itemId}`) === null) {
            const cartRow = document.createElement('div');
            cartRow.classList.add('cart-row');
            cartRow.id = `row-${_itemId}`;
            cartRow.innerHTML = `
                <div class="cart-item">
                <img class="cart-item-image" src="${_item.imgLink}">
                <span class="cart-item-name">${_item.name}</span>
                </div>
                <span class="cart-row-price">$${_item.price}</span>
                <div class="cart-row-amount">
                    <input type="number" value="${_item.amount}" class="cart-item-amount">
                    <input type="submit" class="btn remove" value="Remove">
                </div>
                `;
            cartItems.appendChild(cartRow);
        } else {
            var amount = parseInt(document.getElementById(`row-${_itemId}`).children[2].children[0].value);
            document.getElementById(`row-${_itemId}`).children[2].children[0].value = amount + 1;
        }


    }

    static removeCartRow(target) {
        target.parentElement.parentElement.remove();
    }

    static clearCart() {
        document.querySelector('.cart-items').innerText = '';
    }

    static showMessage(_message, _type) {
        let message = document.createElement('div');
        message.classList.add('message');
        message.classList.add(`${_type}`);
        message.innerHTML = `
        <h3> ${_message}</h3>
        `;
        document.getElementsByTagName('body')[0].appendChild(message);
        setTimeout(function () {
            document.getElementsByTagName('body')[0].removeChild(message)
        }, 2000);
    }

}

class Storing {

    static getProducts() {
        let products;
        if (localStorage.getItem('products') === null) {
            products = [];

        } else {
            products = JSON.parse(localStorage.getItem('products'));
        }
        return products;
    }
    static addProductsToStorage(_product) {
        const products = Storing.getProducts();
        products.push(_product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    static removeItemToStorage(itemid) {
        const products = Storing.getProducts();
        products.forEach((product, index) => {
            if (product.itemId === parseInt(itemid)) {
                products.splice(index, 1);
            }
        })
        localStorage.setItem('products', JSON.stringify(products));
    }


}





var boxes = document.querySelector('.boxes');
var cartItems = document.querySelector('.cart-items');
let cart = document.querySelector('#cart');
var header = document.querySelector('header');
var popUpWindow = document.querySelector('.pop-up-window');
var prevoiusId;
let totalPrice;



window.addEventListener('click', updateTotalPriceToo);

document.addEventListener('DOMContentLoaded', updateTotalPriceToo);

document.addEventListener('DOMContentLoaded', UI.displayProducts());

header.addEventListener('click', e => {
    if (e.target.classList.contains('add-item-to-boxes')) {
        document.querySelector('.pop-up-window').style.display = 'block';
    } else if (e.target.classList.contains('remove-item-to-boxes') && e.target.value.toLowerCase() === 'remove product') {
        document.querySelectorAll('.remove-product').forEach((item) => {
            item.style.display = 'block';
            e.target.value = 'Exit';
        })
    }
    else if (e.target.classList.contains('remove-item-to-boxes') && e.target.value === 'Exit') {
        document.querySelectorAll('.remove-product').forEach((item) => {
            item.style.display = 'none';
            e.target.value = 'Remove Product';
        })
    }
});

popUpWindow.addEventListener('click', e => {

    if (e.target.classList.contains('x-button')) {
        e.target.parentElement.style.display = 'none';

    } else if (e.target.classList.contains('add-item-to-boxes')) {
        e.preventDefault();
        if (e.target.previousElementSibling.value != '' || e.target.previousElementSibling.previousElementSibling.previousElementSibling.value != '' || e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value != '') {
            let itemName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
            let itemImgLink = e.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
            let itemPrice = e.target.previousElementSibling.value;
            let itemId;
            itemId = boxes.children.length + 1;

            const newProduct = new Product(itemName, itemPrice, itemImgLink, itemId);

            UI.addItemToSell(newProduct);

            Storing.addProductsToStorage(newProduct);

            // Clear Fields 

            e.target.previousElementSibling.value = '';
            e.target.previousElementSibling.previousElementSibling.previousElementSibling.value = '';
            e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value = '';
            e.target.parentElement.parentElement.style.display = 'none'

        } else {
            UI.showMessage('Please Fill All Fields', 'error');
        }

    }


});

//  ADD ITEMS ON BOXES/SHOP 

boxes.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let name = e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        let imgLink = e.target.previousElementSibling.previousElementSibling.getAttribute('src');
        let price = parseInt(e.target.previousElementSibling.innerText.replace('Price: $', ''));
        const newItem = new Item(name, price, 1, imgLink)
        UI.addRowToCart(newItem, e.target.parentElement.id);
    } else if (e.target.classList.contains('remove-product')) {
        e.target.parentElement.remove();
        Storing.removeItemToStorage(e.target.parentElement.id);
        UI.showMessage('Removed Successfully', 'success')
    }
});



cart.addEventListener('click', e => {
    if (e.target.classList.contains('remove')) {
        UI.removeCartRow(e.target);
    } else if (e.target.classList.contains('purchase-items') && document.querySelector('.cart-items').innerText != '') {
        UI.showMessage('Purchased Succesful', 'success');
        UI.clearCart();
    }
});


function updateTotalPriceToo(e) {
    totalPrice = 0;
    var cartRow = document.querySelectorAll('.cart-row');

    let output = {};
    cartRow.forEach((row) => {
        let name = row.querySelector('.cart-item').innerText;
        let price = parseInt(row.querySelector('.cart-row-price').innerText.replace('$', ''));

        let amount;
        row.querySelector('.cart-row-amount').querySelectorAll('.cart-item-amount').forEach((item) => {
            amount = item.value;
        });
        output = {
            itemName: name,
            itemPrice: price,
            itemAmount: amount
        }
        totalPrice += UI.getRowPrice(UI.getItemInfo(output['itemName'], output['itemPrice'], output['itemAmount']))
        UI.updateTotalPrice(totalPrice, cartRow.length);

    })
}


setInterval(function () {
    if (!(document.querySelector('.cart-items').contains(document.querySelector('.cart-row')))) {
        document.querySelector('.cart-total-price').innerText = `$${0}`;
    }
}, 10);


