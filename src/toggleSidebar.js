import { getElement } from './utils.js';

// target elements from the DOM.
// And selecting them using the imported method named getElement.
const toggleNav = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const closeBtn = getElement('.sidebar-close');

// Even listeners
toggleNav.addEventListener('click',()=>{
    sidebarOverlay.classList.add('show');
});
closeBtn.addEventListener('click',()=>{
    sidebarOverlay.classList.remove('show');
});