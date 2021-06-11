// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items


const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');
// by default an empty array.
let cart = getStorageItem('cart');

// addToCart() will be imported from 3 pages(Home, Products, single Products)
export const addToCart = (id) => {
  console.log(id);

  // checking whether the intem is already in the cart or not.
  let item = cart.find((cartItem)=>{
    // if id of an item in the cart matches the id or the product being added.
    return cartItem.id === id;
  });
  // console.log(item);
  if(!item){ // if the item is not in the cart
    // we will get the product from our local storage.
    let product = findProduct(id);
    // console.log(product);
    // Add item to the cart.
    // Also adding the aount to be 1 initially.
    product = {...product, amount:1};
    // adding new product to existing cart items.
    cart = [...cart,product];

    // Now let's add item to the DOM.
    addToCartDOM(product);
    console.log(cart);
  }else{ // if the item is in the cart
    // update the count
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    // console.log(items);
    const newAmount = items.find((value)=>{
      return value.dataset.id === id;
    });
    newAmount.textContent = amount;
  }

  // add one to the item count when each item is added.
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in local storage.
  setStorageItem('cart', cart);
  openCart();
};

function displayCartItemCount(){
  const amount = cart.reduce((total,cartItem)=>{
    return (total += cartItem.amount);
  },0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal(){
  let total = cart.reduce((total,cartItem)=>{
    return total += cartItem.price * cartItem.amount;
  },0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemsDOM(){
  cart.forEach((cartItem)=>{
    addToCartDOM(cartItem);
  });
}


function increaseAmount(id){
  let newAmount;
  cart = cart.map((cartItem)=>{
    if(cartItem.id === id){
      newAmount = cartItem.amount + 1;
      // just increating the amount property value by 1.
      cartItem = {...cartItem, amount:newAmount }
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id){
  let newAmount;
  cart = cart.map((cartItem)=>{
    if(cartItem.id === id){
        newAmount = cartItem.amount - 1;
      // just decreasing the amount property value by 1.
      cartItem = {...cartItem, amount:newAmount }
    }
    return cartItem;
  });
  return newAmount;
}


function setupCartFunctionality(){
  cartItemsDOM.addEventListener('click',function(e){
    const element = e.target; // remove btn
    const parent = e.target.parentElement; // 
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    // remove
    if(element.classList.contains('cart-item-remove-btn')){
      removeItem(id); // remove from local storage
      // removing a particular article tag for cart item.
      parent.parentElement.remove();

    }
    // increase
    if(parent.classList.contains('cart-item-increase-btn')){
      const newAmount = increaseAmount(parentID);
      // The nextElementSibling property returns the element immediately following the specified element
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if(parent.classList.contains('cart-item-decrease-btn')){
      const newAmount = decreaseAmount(parentID);
      if(newAmount === 0){ // when the no of item is 0 in the cart
        removeItem(parentID); // we will autometically remove that element from the cart.
        parent.parentElement.parentElement.remove();
      }else{
      // The previousElementSibling property returns the previous element of the specified element
      parent.previousElementSibling.textContent = newAmount;
      }

    }
    displayCartItemCount();
    displayCartTotal();

    // updating the local storage while the DOM updates.
    setStorageItem('cart', cart);

  });
}

function removeItem(id){
  // filters out the item that is removed.
  cart = cart.filter((cartItem)=>{
    return cartItem.id !== id;
  });
}

// following function will run
// when we refresh the page or
// switch from page to page.
const init = ()=>{
  // console.log(cart);
  displayCartItemCount();
  displayCartTotal();
  // add all cart items to the DOM.
  displayCartItemsDOM();
  // setup cart functionality 
  setupCartFunctionality();
}
init();