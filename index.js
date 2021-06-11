// global imports - importing an entire module
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports - importing specific function, variable, constant from a module
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

// Async functions always return a promise.
//  If the return value of an async function is not explicitly a promise, 
// it will be implicitly wrapped in a promise.
const init = async () => {
    // The await operator is used to wait for a Promise
    // products will hold an array of products.
    const products = await fetchProducts();
    // console.log(products);
    // if products are there...
    if(products){
        // Add products to the store.
        setupStore(products);
        // console.log(store);

        // getting the featured products to be displayed into the front page.
        // The filter() method creates a new array with all elements that pass 
        // the test implemented by the provided function.
        const featured = store.filter((product)=>{
            return product.featured === true;
        });
        // console.log(featured);

        // displaying the featured products.
        display(featured,getElement('.featured-center'));
    }
}
// set up a function that runs as soon as the page loads.
window.addEventListener('DOMContentLoaded', init);