const pizzas = [

    {
        id: 1,
        nombre: "Muzzarela",
        ingredientes: ["Masa de Pizza", "Salsa de Tomate", "Muzzarela", "Aceitunas"],
        precio: 500,
    },
    
    {
        id: 2,
        nombre: "De Cancha",
        ingredientes: ["Masa de Pizza", "Salsa de Tomate", "Orégano", "Aceitunas"],
        precio: 450,
    },
    
    {
        id: 3,
        nombre: "Jamón",
        ingredientes: ["Masa de Pizza", "Salsa de Tomate", "Muzzarela", "Jamon", "Aceitunas"],
        precio: 700,
    },
    
    {
        id: 4,
        nombre: "Jamón y Morrón",
        ingredientes: ["Masa de Pizza", "Salsa de Tomate", "Muzzarela", "Jamon", "Morrón", "Aceitunas"],
        precio: 800,
    },
    
    {
        id: 5,
        nombre: "Jamón y Rúcula",
        ingredientes: ["Masa de Pizza", "Salsa de Tomate", "Muzzarela", "Jamon", "Rúcula", "Aceitunas"],
        precio: 800,
    },
    
    {
        id: 6,
        nombre: "Fugazzeta",
        ingredientes: ["Masa de Pizza", "Muzzarela", "Jamon", "Cebolla"],
        precio: 1000,
    },
    
];
    
const idPizza = document.getElementById("numeroPizza");
const qPizza = document.getElementById("cantidadPizzas");
const pedirPizza = document.querySelector(".pedirPizza");
const cardContainer = document.querySelector(".cardContainer");
const deleteButton = document.querySelector(".delete-btn");

let listaPizzas = JSON.parse(localStorage.getItem("Pizzas")) || [];

//TODO:

const showError = (input, message) => {
    const campoForm = input.parentElement;
    const errorField = campoForm.querySelector("small");

    errorField.classList.remove("success");
    errorField.classList.add("error");

    errorField.textContent = message;
}

const showSuccess = (input) => {
    const campoForm = input.parentElement;
    const errorField = campoForm.querySelector("small");

    errorField.classList.add("success");
    errorField.classList.remove("error");

    errorField.textContent = "";
}

//Valida si el ID es encontrado en el listado de pizzas
const validarId = (idElegido) => {

    valid = false

    let id = +idElegido;

    const pizzaElegida = pizzas.filter(pizza => pizza['id'] === id)

    if (pizzaElegida.length === 0) {
        showError(idPizza,"El número ingresado es inválido. Por favor, seleccione una pizza del 1 al 6")
    } else {
        showSuccess(idPizza)
        valid = true;
    }

    return valid;
}

//Valida si la cantidad está entre 1 y 10
const validarCantidad = (cantidad) => {
    valid = false;

    let cantidadElegida = +cantidad

    if (cantidadElegida <= 0) {
        showError(qPizza, "No puede ordenar una cantidad menor a 1 pizza.")
    } else if (cantidadElegida > 10) {
        showError(qPizza, "No puede pedir más de 10 pizzas en un solo pedido. Si desea más, por favor agregue un nuevo pedido.")
    } else {
        showSuccess(qPizza)
        valid = true;
    };

    return valid;


}

// Extrae el objeto del array, que coincida con el ID provisto
const extraerPizza = (idElegido) => {
    let id = +idElegido;
    const pizzaElegida = pizzas.filter(pizza => pizza['id'] === id).shift();
    return pizzaElegida;
}

const isValidForm = () => {
    const idValid = validarId(idPizza.value);
    const qValid = validarCantidad(qPizza.value);

    return (idValid && qValid);
}

const calcularTotal = (precio) => {
    const cantidad = qPizza.value;
    const total =  cantidad * precio;
    return total; 
}

const renderPizza = (pizza) => {

    const {id, nombre, ingredientes, precio} = pizza;

    return `<div class="cardPizza">
                <h2 class="nombrePizza">${nombre}</h2>
                <h4 class="precioPizza">${precio} c/u</h4>
                    <div class="precioTotal">
                        <h3>Precio Total: $${calcularTotal(precio)}</h3>
                    </div>
            </div>`
}

const saveToLocalStorage = () => {
    localStorage.setItem("Pizzas", JSON.stringify(listaPizzas));
};


const renderListaPizzas = () => {
    cardContainer.innerHTML = listaPizzas.join("");
}

const addPizza = (e) => {
    e.preventDefault();

    const pizzaElegida = extraerPizza(idPizza.value);

    if (isValidForm()) {
        const pizzaNueva = renderPizza(pizzaElegida);
        listaPizzas = [...listaPizzas, pizzaNueva];
        renderListaPizzas(pizzaElegida);
        saveToLocalStorage();
        hideDeleteButton(listaPizzas);
    }
}

const hideDeleteButton = (listaPizzas) => {
    if (listaPizzas.length === 0) {
        deleteButton.classList.add("hidden")
    } else {
        deleteButton.classList.remove("hidden")
    }
}

const borrarPizza = () => {
    listaPizzas = [];

    saveToLocalStorage();
    renderListaPizzas();
    hideDeleteButton(listaPizzas);
}

const init = () => {
    renderListaPizzas();
    pedirPizza.addEventListener("submit", addPizza);
    deleteButton.addEventListener("click", borrarPizza);
    hideDeleteButton(listaPizzas);
};

init();
