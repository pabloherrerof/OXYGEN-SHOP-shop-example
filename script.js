
//BURGUER MENU
const burger = document.querySelector('.burger i');
const nav = document.querySelector('.navb');


function toggleNav() {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-times');
    nav.classList.toggle('nav-active');
}

burger.addEventListener('click', function () {
    toggleNav();
});



//CURRENCY CONVERTER
//Referencia DOM de los botones de las monedas
const yen = document.getElementById('yen');
const usd = document.getElementById('usd');
const eur = document.getElementById('eur');

//Eventos click en cada boton que llaman a la funcion currencyApi con la referencia en la API de cada moneda.
yen.addEventListener('click', function () {
    currencyApi('jpy')
});

usd.addEventListener('click', function () {
    currencyApi('usd')
});
eur.addEventListener('click', function () {
    currencyApi('eur');
});

///Funcion asincrona que hace un GET en la API
//Recoge el valor de la moneda que pasamos por parametro, respecto al dolar
//Llamada a la accion de la funcion changePrice con los parametros de la moneda seleccionada y el valor de cambio.
async function currencyApi(currency) {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`);
        if (response.ok) {
            let result = await response.json();
            console.log(result)
            changePrice(result['usd'][currency], currency);
        }
    } catch (error) {
        console.log(error);
    }
}

//Función que añade mediante el DOM los distintos cambios de valores segun la moneda y tambien cambia el estilo para la que esta seleccionada
function changePrice(currentValue, currentCurrency) {
    if (currentCurrency === 'eur') {
        document.getElementById("basic-price").innerHTML = `€0`;
        document.getElementById("profesional-price").innerHTML = `€${Math.round(currentValue * 25)}`;
        document.getElementById("premium-price").innerHTML = `€${Math.round(currentValue * 60)}`;

        eur.classList.add("button-active");
        yen.classList.remove("button-active");
        usd.classList.remove("button-active");

    } else if (currentCurrency === 'jpy') {
        document.getElementById("basic-price").innerHTML = `¥0`;
        document.getElementById("profesional-price").innerHTML = `¥${Math.round(currentValue * 25)}`;
        document.getElementById("premium-price").innerHTML = `¥${Math.round(currentValue * 60)}`;

        eur.classList.remove("button-active");
        yen.classList.add("button-active");
        usd.classList.remove("button-active");
    }
    else {
        document.getElementById("basic-price").innerHTML = "$0";
        document.getElementById("profesional-price").innerHTML = "$25";
        document.getElementById("premium-price").innerHTML = "$60";

        eur.classList.remove("button-active");
        yen.classList.remove("button-active");
        usd.classList.add("button-active");
    }
}


//FORMULARIO
document.getElementById("form-button").addEventListener("click", function (event) {
    event.preventDefault();
    let nombre = document.getElementById("name");
    let email = document.getElementById("email");
    let checkbox = document.getElementById("chbx");
    let validator = formValidator(nombre.value, email.value, checkbox.checked);

    console.log(validator)
    if (validator === true) {
        //POST
        nombre.classList.remove("error-form");
        email.classList.remove("error-form");
        document.getElementById("chbx-terminos").classList.remove("error-form-text");
        document.getElementById("form-button").innerHTML="<i class='fa-solid fa-check'></i>";
        document.getElementById("form-button").classList.add("correct-button");
        document.getElementById("form-button").classList.add("jello-vertical");

        
       


        setTimeout(function(){
            document.getElementById("form-button").innerHTML="Send";
            document.getElementById("form-button").classList.remove("jello-vertical");
        },3000)

        postForm(nombre.value, email.value, checkbox.checked);
    }else {
        document.getElementById("form-button").innerHTML="<i class='fa-solid fa-x'></i>";
        document.getElementById("form-button").classList.add("bounce-top");
        document.getElementById("form-button").classList.add("error-button")

        setTimeout(function(){
            document.getElementById("form-button").innerHTML="Subscribe";
            document.getElementById("form-button").classList.remove("bounce-top");
            document.getElementById("form-button").classList.remove("error-button")
        },3000)
}})

function formValidator(nombre, email, checkbox) {
    let validator = true;
    if (nombre.length < 2 || nombre.length > 100) {
        validator = false;
        document.getElementById("name").placeholder = "Nombre incorrecto (2-100 caracteres)";
        document.getElementById("name").classList.add("error-form");
        document.getElementById("name").value = "";
        
       

    }

    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false)) {
        validator = false;
        document.getElementById("email").placeholder = "Email incorrecto";
        document.getElementById("email").classList.add("error-form");
        document.getElementById("email").value = "";
      
    
    }

    if (checkbox === false) {
        validator = false;
        document.getElementById("chbx-terminos").classList.add("error-form-text");
      


    }
    return validator;
}

async function postForm(nombre, email, checkbox) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            name: nombre,
            mail: email,
            acceptedTerms: checkbox
            
            
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}




//FUNCION SCROLL PERCENTAGE BAR

window.addEventListener('scroll', function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("bar").style.width = scrolled + "%";
})

//TOP BUTTON

window.addEventListener("scroll", function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (scrolled > 75) {
        document.getElementById("top-button").style.visibility = "visible";
    }

    if (scrolled < 75) {
        document.getElementById("top-button").style.visibility = "hidden";
    }
})

document.getElementById("top-button").addEventListener("click", function () {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 200)
})

//MODAL
window.sessionStorage.setItem("modalAlreadyShown", "false");
console.log(sessionStorage)

window.addEventListener("scroll", function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;

    if (window.sessionStorage.getItem("modalAlreadyShown") === "false") {
        if (scrolled > 25) {
            document.getElementById("modal").showModal();
            window.sessionStorage.setItem("modalAlreadyShown", "true");
        }
    }
})


setTimeout(function modalController() {
    if (window.sessionStorage.getItem("modalAlreadyShown") === "false") {
        document.getElementById("modal").showModal();
        window.sessionStorage.setItem("modalAlreadyShown", "true");
    }
}, 5000);


window.addEventListener("keypress", function(event){
    if(event.key === 'ESC'){
        document.getElementById("modal").close();
    }
})

document.getElementById("modalform-close").addEventListener('click', function(event){    
    document.getElementById("modal").close();
    }
)

window.addEventListener("click", function(event){
    let elemento = document.getElementById("modal");
    if(!elemento.contains(event.target)){
        elemento.close();
    }
})

document.getElementById("modal-post").addEventListener("click", function(event){
        event.preventDefault();
        let nombre = document.getElementById("modalName");
        let email = document.getElementById("modalEmail");
        let checkbox = document.getElementById("modal-chbx");
        let validator = modalFormValidator(nombre.value, email.value, checkbox.checked);
    
        console.log(validator)
        if (validator === true) {
            //POST
            nombre.classList.remove("error-form");
            email.classList.remove("error-form");
            document.getElementById("modal-terminos").classList.remove("error-form-text");
            document.getElementById("modal-post").innerHTML="<i class='fa-solid fa-check'></i>";
            document.getElementById("modal-post").classList.add("correct-button");
            document.getElementById("modal-post").classList.add("jello-vertical");

            setTimeout(function(){
                document.getElementById("modal-post").innerHTML="Subscribe";
                document.getElementById("modal-post").classList.remove("correct-button");
                document.getElementById("modal-post").classList.remove("jello-vertical");
            },3000)
           

    
            postForm(nombre.value, email.value, checkbox.checked);
        } else {
            document.getElementById("modal-post").innerHTML="<i class='fa-solid fa-x'></i>";
            document.getElementById("modal-post").classList.add("bounce-top");
        document.getElementById("modal-post").classList.add("error-button")

            setTimeout(function(){
                document.getElementById("modal-post").innerHTML="Subscribe";
                document.getElementById("modal-post").classList.remove("bounce-top");
        document.getElementById("modal-post").classList.remove("error-button")
            },3000)
        }


})

function modalFormValidator(nombre, email, checkbox) {
    let validator = true;
    if (nombre.length < 2 || nombre.length > 100) {
        validator = false;
        document.getElementById("modalName").placeholder = "Nombre incorrecto (2-100 caracteres)";
        document.getElementById("modalName").classList.add("error-form");
        document.getElementById("modalName").value = "";

    }

    if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false)) {
        validator = false;
        document.getElementById("modalEmail").placeholder = "Email incorrecto";
        document.getElementById("modalEmail").classList.add("error-form");
        document.getElementById("modalEmail").value = "";
    }
    if (checkbox === false) {
        validator = false;
        document.getElementById("modal-terminos").classList.add("error-form-text");
    }
    return validator;
}



