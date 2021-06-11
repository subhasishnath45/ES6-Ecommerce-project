import { getElement } from '../utils.js';

const cartOverlay = getElement('.cart-overlay');
const closeCartBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');

toggleCartBtn.addEventListener('click', ()=>{
    cartOverlay.classList.add('show');
});

closeCartBtn.addEventListener('click',()=>{
    cartOverlay.classList.remove('show');
});

// openCart function is being exported
// so that it can be imported from other file and used.
// This method can be used from anywhere to open the shopping cart
export const openCart = () => {
    cartOverlay.classList.add('show');
};
