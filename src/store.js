import { getStorageItem, setStorageItem } from './utils.js';
// let store = [];
// retriving everything from local storage.
let store = getStorageItem('store');
// following method will take all of the products from products array
// and will return each product using map method.
// will only be called from index.js
const setupStore = (products) => {
    store = products.map((product)=>{
        // console.log(product);
        // destructuring data out of each product.
        const {id,fields:{featured,name,price,company,colors,image:img}} = product;
        const image = img[0].thumbnails.large.url;
        return {id,featured,name,price,company,colors,image};
    });
    setStorageItem('store', store);
};
// console.log(store);
// following method will find products from local storage and return that.
const findProduct = (id) => {
    let product = store.find((product)=>{
        return product.id === id;
    });
    return product;
};

// exporting a bunch of staff together.
// store will be imported from the index and products page.
export { store, setupStore, findProduct };
