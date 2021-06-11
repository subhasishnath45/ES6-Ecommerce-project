import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
    const priceInput = getElement('.price-filter');
    const priceValue = getElement('.price-value');

    let AllPrices = store.map((product)=>{
        return product.price;
    });
    // console.log(AllPrices);
    let maxPrice = Math.max(...AllPrices);
    // rounding up and converting from cents to doller.
    maxPrice = Math.ceil(maxPrice / 100);
    // console.log(maxPrice);
    // value and max attribute will have the same values.
    priceInput.value = maxPrice;
    priceInput.max = maxPrice;
    // min attribute will always have the value of 0.
    priceInput.min = 0;

    priceValue.textContent = `Value: $${maxPrice}`;

    priceInput.addEventListener('input',()=>{
        // converting the string input value to number.
        const value =  parseInt(priceInput.value);
        // console.log(typeof(value));
        priceValue.textContent = `Value: $${value}`;
        // next we will create a new store containing the products
        // whose values match the priceValue.
        const newStore = store.filter((product)=>{
            return product.price / 100 <= value;
        });
        display(newStore,getElement('.products-container'));
        // if range returned nothing
        if(newStore.length < 1){
            const products = getElement('.products-container');
            products.innerHTML = `<h3 class="filter-error">
                Sorry No products matched your search.
            </h1>`;
        }
    });
};

export default setupPrice;
