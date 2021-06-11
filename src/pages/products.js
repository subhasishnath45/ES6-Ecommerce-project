// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

// Selecting the loader element from the products page.
const loading = getElement('.page-loading');


// displaying all of the data from local storage into the products page.
display(store, getElement('.products-container'));

// involking setupSearch() method to enable filtering.
setupSearch(store);

// involking setupCompanies() method to enable company filtering.
setupCompanies(store);

//involking setupPrice() method to enable price filtering.
setupPrice(store);
// hiding loader element.
loading.style.display = 'none';