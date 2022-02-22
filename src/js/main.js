'use strict';
//Variables
const inputSearch = document.querySelector('#search-input');
const arrayProducts = document.querySelectorAll('.product');
const messageSuccess = document.querySelector('#add-successful');
const messageErrorAdd = document.querySelector('#error-amount');
const messageErrorUpdate = document.querySelector('#error-UpdateCar');
const spanAmountCar = document.querySelector('#articles-amount');
const buttonCar = document.querySelector('#shopping-car');
const divSearch = document.querySelector('#search');
const divProducts = document.querySelector('#products');
const divPageCar = document.querySelector('#pay');
const elementsCar = document.querySelector('#elements-car');
const divArticles = document.querySelector('#articles');
const spanTotalCar = document.querySelector('#total-car');
const buttonUpdate = document.querySelector('#update-products');
let listProducts = [];
//Clear search
const clearProducts = () => {
    arrayProducts.forEach(x => x.style.display = 'block');
};
//Funcion search product
const searchProducts = (text) => {
    clearProducts();
    for(let products of arrayProducts) {
        let textTitle = products.childNodes[3].innerHTML;
        if(!textTitle.toLowerCase().includes(text.toLowerCase())) {
            products.style.display = 'none';
        }        
    }
};
//Search products input
inputSearch.addEventListener('keyup', ()=> {
    if(inputSearch.value === '') {
        clearProducts();
    }
    else if( inputSearch.value !== '') {
        searchProducts(inputSearch.value);
    } 
});
// Validate if there aren't the same product
const validateCar = (id) => {
    let isAdd = false;
    for(let products of listProducts) {
        if(products.id === id) {
            isAdd = true;
        }
    }
    return isAdd;
};
//Convert text span to number
const textToNumber = (text) => {
    let arr = text.split(',');
    let number = '';
    for(let i = 0; i < arr.length; i++ ) {
        number += arr[i];
    }

    return Number(number);
};
//Message add cart
const showMessageSuccess = () => {
    messageSuccess.style = 'opacity: 1';
    setTimeout(()=> {
        messageSuccess.style = 'opacity: 0';
    },1700);
};
const showMessageError = () => {
    messageErrorAdd.style = 'opacity: 1';
    setTimeout(()=> {
        messageErrorAdd.style = 'opacity: 0';
    },1700);
};
//Update number next to car
const updateNumberCar = () => {
    let number = Number(spanAmountCar.innerHTML);
    number++;
    number = number.toString();
    spanAmountCar.innerHTML = number;
};
//Add Product to array
const addProductToCar = (id, divProduct) => {
    const nameProduct = divProduct.childNodes[3].innerHTML;
    const priceProduct = textToNumber(divProduct.childNodes[7].childNodes[1].innerHTML);
    const amountInitial = 1;
    let productToArray = {
        id: id,
        nombre: nameProduct,
        price: priceProduct,
        amount: amountInitial
    };
    listProducts.push(productToArray);   
    showMessageSuccess();
    updateNumberCar();
};
//Button Add Cart
const addCart = (idProduct) => {
    const divProduct = document.querySelector(`#${idProduct}`);
    let arraySpliceId = idProduct.split('-');
    let idProductNumber = arraySpliceId[1];    
    let isAdd = false;
    isAdd = validateCar(idProductNumber);
    if(!isAdd) {
        addProductToCar(idProductNumber, divProduct);    
    }
    else {
        showMessageError();
    }
};
//Show Main Page
const mainPage = () => {
    divPageCar.style = 'display: none';
    divProducts.style = 'display: block';
    divSearch.style = 'display: block';
};
//Create Span with ID
const createSpanID = (id) => {
    let spanID = document.createElement('span');
    spanID.setAttribute('id','id-article');
    spanID.innerHTML = id; 
    return spanID;
};
//Create Span with Name
const createSpanName = (name) => {
    let spanName = document.createElement('span');
    spanName.setAttribute('id','name-article');
    spanName.innerHTML = name; 
    return spanName;
};
// Create input of Amount
const createInput = () => {
    let inputAmount = document.createElement('input');
    inputAmount.setAttribute('type','number');
    inputAmount.setAttribute('value','1');
    inputAmount.setAttribute('min','1');
    inputAmount.setAttribute('max','5');
    inputAmount.setAttribute('id', 'amount-article');
    return inputAmount;
};
// Create parrafo Price
const createParrafoPrice = (priceProduct) => {
    let parrafoPrice = document.createElement('p');
    let price = document.createElement('span');
    price.setAttribute('id','price-article');
    price.innerHTML = priceProduct;
    parrafoPrice.classList.add('parrafo-price');
    parrafoPrice.innerHTML = '$' + Number(price.innerHTML).toLocaleString();
    return parrafoPrice;
};
// Create button Cancel
const createButtonCancel = (id) => {
    let button = document.createElement('button');
        button.setAttribute('onclick',`eliminarProduct("product-${id}")`);
        button.classList.add('btn');
        button.classList.add('btn-danger');
        let icon = document.createElement('ion-icon');
        icon.setAttribute('name','close-circle-outline');
        button.appendChild(icon);
    return button;
};
const actualizarCarro = (idDelete) => {
    listProducts = listProducts.filter(x => x.id !== idDelete);
    console.log(listProducts);
};
//Update Total Amount Car

const updateTotalAmountCar = () => {
    spanAmountCar.innerHTML = listProducts.length;
};
//Update totalShopping
const updateTotalShopping = () => {
    let total = 0.00;
    for(let products of listProducts) {
        total += (products.price * products.amount);
    }
    spanTotalCar.innerHTML = Number(total).toLocaleString();
};
//Eliminar product
const eliminarProduct = (id) => {
    let separaingID = id.split('-');
    actualizarCarro(separaingID[1]);
    updateTotalAmountCar();
    updateTotalShopping();
    const divProducto = document.querySelector(`#pay #elements-car #articles #${id}`);
    divProducto.remove();
};
const showProducts = () => {
    divArticles.innerHTML = '';
    for(let products of listProducts) {
        let spanID = createSpanID(products.id);               
        let spanName = createSpanName(products.nombre);
        let inputAmount = createInput();
        let parrafoPrice = createParrafoPrice(products.price);
        let button = createButtonCancel(products.id);
        let divContainer = document.createElement('div');
        divContainer.classList.add('article');
        divContainer.setAttribute('id', `product-${products.id}`);
        divContainer.appendChild(spanID);
        divContainer.appendChild(spanName);
        divContainer.appendChild(inputAmount);
        divContainer.appendChild(parrafoPrice);
        divContainer.appendChild(button);
        divArticles.appendChild(divContainer);
    }
    updateTotalShopping();
};
//Click in car Shopping to Pay
const buttonContinueShopping = document.querySelector('#continue-shopping');
buttonCar.addEventListener('click', ()=> {
    divProducts.style = 'display: none';
    divSearch.style = 'display: none';
    divPageCar.style = 'display: block';
    showProducts();
    buttonContinueShopping.addEventListener('click', ()=> {
        mainPage();
    });

});
const showMessageErrorUpdate = () => {
    messageErrorUpdate.style = 'opacity: 1';
    setTimeout(()=> {
        messageErrorUpdate.style = 'opacity: 0';
    },1700);
};
//Update Products Car
const updateCarProducts = () => {

};
//Update Amounts
const updateAmounts = () => {
    let isValidateAmount = true;
    for(let i = 0; i < divArticles.childNodes.length; i++) {
        let input = divArticles.childNodes[i].childNodes[2].value;
        if(input <= 0 || input.length === 0 || input > 5) {            
            isValidateAmount = false;
            break;
        }        
    }
    if(isValidateAmount === false) {
        showMessageErrorUpdate();
    }
    else {
        updateCarProducts();
    }
}
//Update Amounts
buttonUpdate.addEventListener('click', ()=> {
    updateAmounts();
});



