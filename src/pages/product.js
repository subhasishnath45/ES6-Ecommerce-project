// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded',async function(){
    // The search property of the Location interface is a search string
    // also called a query string
    const urlID = window.location.search;
    // console.log(urlID);

    try{
    // fetch request
    // getting the common url with unique id.
    const response = await fetch(`${singleProductUrl}${urlID}`);
    // console.log(response);
    if(response.status >= 200 && response.status <= 299){ // successful response
        // extract the JSON object from a fetch response
        const product = await response.json();
        console.log(product);

        // extract the values from the JSON object
        // And display them inside the DOM.

        // first let's destructure the keys from the JSON object.
        const {id,fields} = product;
        productID = id;
        // extract keys from fields object.
        const {name, company, price, colors, description} = fields;
        // extracting the large image url.
        const image = fields.image[0].thumbnails.large.url;
        // console.log(image);

        // set the document title.
        document.title = `${name.toUpperCase()} | comfy`;

        pageTitleDOM.textContent = `Home / ${name}`;

        imgDOM.src = image;

        titleDOM.textContent = name;

        companyDOM.textContent = `by ${company}`;

        priceDOM.textContent = `${formatPrice(price)}`;

        descDOM.textContent = description;
        // extracting each color from colors array.
        colors.forEach((color) => {
            // creating aspan element
            const span = document.createElement('span');
            span.classList.add('product-color');
            span.style.backgroundColor = `${color}`;
            colorsDOM.appendChild(span);
        })

    }else{  // response failure.
        console.log(response.status, response.statusText);
        centerDOM.innerHTML = `
        <div>
        <h3 class="error">Sorry, something went wrong!</h3>
        <a href="index.html" class="btn">back home</a>        
        </div>
        `;
    }   
    }catch(error){
        // handling the network error.
        console.log(error);
    }

    // hiding loader element.
    loading.style.display = 'none';


});

cartBtn.addEventListener('click',function(){
    addToCart(productID);
});
