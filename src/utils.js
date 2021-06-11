//   ATTENTION!!!!!!!!!!!
//   I SWITCHED TO PERMANENT DOMAIN
//   DATA IS THE SAME JUST A DIFFERENT URL,
//   DOES NOT AFFECT PROJECT FUNCTIONALITY

const allProductsUrl = 'https://course-api.com/javascript-store-products'
// temporary single product
// 'https://course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product'

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  // The Error constructor creates an error object.
  throw new Error(`Please check "${selection}" selector, no such element exist`);
}
// following method will format the product prices.
const formatPrice = (price) => {
  // The Intl.NumberFormat object enables language-sensitive number formatting.
  // request a currency format
  let formattedPrice = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency:"USD"
  }).format((price / 100).toFixed(2));
  return formattedPrice;
}

// Following method will get item from local storage.
const getStorageItem = (item) => {
  let storateItem = localStorage.getItem(item);
  if(storateItem){
    // The JSON.parse() method parses a JSON string,
    storateItem = JSON.parse(localStorage.getItem(item));
  }else{
    storateItem = [];
  }
  return storateItem;
}
// once the products are fetched from the API,
// Those will be stored in the local storage.
// item will be an array of products.
const setStorageItem = (name, item) => {
  // Creating a localStorage name/value pair
  // JSON.stringify to convert array to string.
  localStorage.setItem(name, JSON.stringify(item));

}

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}
