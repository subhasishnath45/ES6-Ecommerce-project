import { allProductsUrl } from './utils.js';
// async before a function makes the function return a promise:
const fetchProducts = async () => {
    // we will perform a fetch request from a URL.
    // The await expression causes async function execution to pause until a Promise is returned.
    const response = await fetch(allProductsUrl).catch((err)=>{
        console.log(err);
    });
    //console.log(response);
    // if the response is successful, we will turn it into a JSON object.
    if(response){
        return response.json();
    }
    // So the response is a promise.
    return response;
};

export default fetchProducts;
