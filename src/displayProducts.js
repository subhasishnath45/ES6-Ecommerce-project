import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
// following method will decide what and where to display.
const display = (products, element) => {
    console.log(products, element);
    element.innerHTML = products.map((product)=>{
        /*
        The destructuring assignment syntax is a JavaScript expression that makes 
        it possible to unpack values from arrays, or properties from objects, 
        into distinct variables.
        */
       // bellow we're destructuring vales from product object.
       const {id,name, image, price} = product;
        return `<article class="product">
        <div class="product-container">
          <img src="${image}" class="product-img img" alt="">
          <div class="product-icons">
            <a href="product.html?id=${id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${id}">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <footer>
          <p class="product-name">${name}</p>
          <h4 class="product-price">${formatPrice(price)}</h4>
        </footer>
      </article>`;
    }).join('');
    element.addEventListener('click',function(e){
      // Targeting parent element of the element that was clicked upon.
      const parent = e.target.parentElement;
      // console.log(parent);
      // if clicked on the cart button.
      if(parent.classList.contains('product-cart-btn')){
        // grab the data set and pass to the cart.
        // dataset is a read-only property that allows us 
        // to access custom data attributes
        addToCart(parent.dataset.id);
      }
    });
};

export default display;
