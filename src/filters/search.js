import { getElement } from '../utils.js';
import display from '../displayProducts.js';
// 
const setupSearch = (store) => {
    const form = getElement('.input-form');
    const nameInput = getElement('.search-input');
    form.addEventListener('keyup', function(){
        const value = nameInput.value;
        if(value){
            // console.log(value);
            // filter the products.
            const newStore = store.filter((product) => {
                let {name} = product;
                name = name.toLowerCase();
                // The startsWith() method determines whether a string begins with 
                // the characters of a specified string or not.
                if(name.startsWith(value)){
                    return product;
                }
            });
            // console.log(newStore);
            display(newStore,getElement('.products-container'));

            // if filter returned nothing
            if(newStore.length < 1){
                const products = getElement('.products-container');
                products.innerHTML = `<h3 class="filter-error">
                    Sorry No products matched your search.
                </h1>`;
            }
        }else{ // display all products
            display(store, getElement('.products-container'));
        }
    });
};

export default setupSearch;
