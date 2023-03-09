



let fetchAPI = async (productNumberToGet) =>  {
    try{
        let url = `https://fakerapi.it/api/v1/products?_quantity=${productNumberToGet}&_taxes=12&_categories_type=uuid`;
        let response = await fetch(url);
        if (response.ok) {
            var responsedata = await response.json();
            return responsedata;
        }
        else{
            alert("Error llamando a la API");
        }
    }
    catch{
        alert("Error llamando a la API");
    }
   
}


const selectProduct = document.getElementById("numberProduct");
const contentContainer = document.getElementById("productos-row");


selectProduct.addEventListener("change",async () => {
    let valueProductSelect = selectProduct.value;
    fetchAPI(valueProductSelect).then((productFromApi) => {
        console.log(productFromApi.data)
        let productContainer = document.getElementById('productos-row');
        productContainer.innerHTML = "";

        productFromApi.data.forEach(product => {
            productContainer.innerHTML += `<div class="col-md-3 productos card text-center p-4">
            <img class="card-img-top" src=${product.image} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h4 class="price">${product.net_price}</h4>
            </div>
        </div>`;
           
        });
    });
});

window.addEventListener("load", (event) => {
    fetchAPI(1).then((productFromApi) => {
        let product = productFromApi.data[0];
       
        let productContainer = document.getElementById('productos-row');
            productContainer.innerHTML = `<div class="col-md-3 productos card text-center p-4">
            <img class="card-img-top" src=${product.image} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h4 class="price">${product.net_price}</h4>
            </div>
        </div>`;
    });
  });
