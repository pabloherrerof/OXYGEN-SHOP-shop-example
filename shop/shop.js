//API
let fetchAPI = async (productNumberToGet) => {
  try {
    let url = `https://fakerapi.it/api/v1/products?_quantity=${productNumberToGet}&_taxes=12&_categories_type=string`;
    let response = await fetch(url);
    if (response.ok) {
      var responseData = await response.json();
      return responseData;
    } else {
      alert("Error llamando a la API");
    }
  } catch {
    alert("Error llamando a la API");
  }
};

function getCategoryList(rawApiResponseData) {
  // Creamos un objeto para poder tener la categoria como nombre y la relacion de la cantidad de productos que tiene esda categoria
  let categoriesWithNumberOfProductsInCategory = {};
  // Para el array que me da la api de productos. Del tipo [product1,prodct2,...] Itero para acceder a alas proiedades de productn
  rawApiResponseData.forEach((productInfo) => {
    //Aqui estaria dentro de 1 producto, ej: product1. Que sabemos que tiene una lista de categorias
    // para poder coger cada una de las categorias, tiero sobreproductInfo.categories
    productInfo.categories.forEach((categoryName) => {
      // Comprobamos si una categoria. EJ: CategoriaX; Esta dentro del objeto categoriesWithNumberOfProductsInCategory.
      // PAra eso usamos Object.keys(objeto) que nos da un resultado de todas las categorias que existen dentro de ese objeto.
      // si no existe, agregamos una nueva con el valor 1 puesto que la hemos encontrado por primera vez
      /*
            -- Object.keys(categoriesWithNumberOfProductsInCategory) 
                Lista de categorias de los productos
            */

      if (
        !Object.keys(categoriesWithNumberOfProductsInCategory).includes(
          categoryName
        )
      ) {
        //definimos un array para poder guardar los objetos enteros
        categoriesWithNumberOfProductsInCategory[categoryName] = [];
        categoriesWithNumberOfProductsInCategory[categoryName].push(
          productInfo
        );
      } else {
        // SI la encontramos, es decir, si la categoria existe dentro del objeto, agregamos 1 unidad mas, porque hemos encontramos otro objeto mas
        //Hacemos push a la lista de productos de la categoria
        categoriesWithNumberOfProductsInCategory[categoryName].push(
          productInfo
        );
      }
    });
  });
  return categoriesWithNumberOfProductsInCategory;
}

//DOM
const selectProduct = document.getElementById("numberProduct");
const contentContainer = document.getElementById("productos-row");
const listContainer = document.getElementById("filter");


if(window.sessionStorage.getItem("visit") == null){
    let quantity = 0;
    window.sessionStorage.setItem("visit", true);
    window.sessionStorage.setItem("quantity", `${quantity}`)
} else{
    document.getElementById("quantity").innerHTML = Number(window.sessionStorage.getItem("quantity"))
}




//CARGA DE UN PRODUCTO AL CARGAR LA WEB CON SUS CATEGORIAS
window.addEventListener("load", (event) => {
  fetchAPI(1).then((product) => {
    let productContainer = document.getElementById("productos-row");
    productContainer.innerHTML = `<div class="col-md-3 productos card text-center p-4 w-50">
            <img class="card-img-top" src=${
              product.data[0].image
            } alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.data[0].name}</h5>
                <h4 class="price">${Math.round(product.data[0].net_price)}$</h4>
                <button id="addToCart">Añadir al carrito</button>
            </div>
        </div>`;

    let category_object = getCategoryList(product.data);
    // Msotramos en la web las categorias de forma dinámicas
    let listCategory = document.createElement("ul");
    listCategory.classList.add("filter-list-ul");
    listContainer.appendChild(listCategory);
    Object.keys(category_object).forEach((category) => {
      let productLine = document.createElement("li");
      productLine.innerText = `${category} (${category_object[category].length})`;
      productLine.addEventListener("click", function () {
        console.log(this);
      });
      listCategory.appendChild(productLine);
    });

    //add to Cart
    console.log(window.sessionStorage.getItem("quantity"))
    let addButton = document.getElementById("addToCart");
    addButton.addEventListener("click", function (event) {
        quantity = Number(window.sessionStorage.getItem("quantity"));
        quantity += 1;
        console.log(quantity)
      document.getElementById("quantity").innerHTML = quantity;
      window.sessionStorage.setItem("quantity", `${quantity}`);
    });
  });
});

selectProduct.addEventListener("change", async () => {
  let valueProductSelect = selectProduct.value;
  fetchAPI(valueProductSelect).then((productFromApi) => {
    let productContainer = document.getElementById("productos-row");
    productContainer.innerHTML = "";
    listContainer.innerHTML = "";

    productFromApi.data.forEach((product) => {
      productContainer.innerHTML += `<div class="col-md-3 productos card text-center p-4 w-50">
            <img class="card-img-top" src=${product.image} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <h4 class="price">${Math.round(product.net_price)}$</h4>
                <button class="addToCart">Añadir al carrito</button>
            </div>
        </div>`;

      let category_object = getCategoryList(productFromApi.data);

      let listCategory = document.createElement("ul");
      listCategory.classList.add("filter-list-ul");

      listContainer.appendChild(listCategory);

      Object.keys(category_object).forEach((categoryNameInList) => {
        let productLine = document.createElement("li");
        productLine.innerText = `${categoryNameInList} (${category_object[categoryNameInList].length})`;
        listCategory.appendChild(productLine);
      });
    });


    let addButton = document.querySelectorAll(".addToCart");
    console.log(addButton);

    addButton.forEach(boton =>{
        boton.addEventListener("click", function (event) {
            quantity = Number(window.sessionStorage.getItem("quantity"));
            quantity += 1;
          document.getElementById("quantity").innerHTML = quantity;
          window.sessionStorage.setItem("quantity", `${quantity}`);
          });
    })
  });
});

