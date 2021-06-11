import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
    // creating a new set of companies.
    let companies = new Set(
        store.map((product)=>{
            return product.company;
        })
    );
    // converting object to array using spread operator.
    // And adding the All option.
    companies = ['All', ...companies];
    console.log(companies);
    // getting the element from the DOM.
    const companiesElem = getElement('.companies');
    // displaying all of the companies into the page.
    companiesElem.innerHTML = companies.map((company)=>{
        return `<button class="company-btn">${company}</button>`;
    }).join('');
    // Adding event listener to each company
    companiesElem.addEventListener('click',(e)=>{
        const element = e.target;
        // console.log(element);
        // if the company-btn is clicked upon
        if(element.classList.contains('company-btn')){
            let newStore = [];
            // conditional display of products based on
            // the company option that's clicked upon.
            if(element.textContent === 'All'){
                // assigning everything from store to newStore.
                newStore = [...store];

            }else{
                newStore = store.filter((product)=>{
                    // return the products of the company 
                    // which was clicked on.
                    return product.company === e.target.textContent;
                });
            }
            display(newStore, getElement('.products-container'));
        }
    });
};

export default setupCompanies;
