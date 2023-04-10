//main.js
let productos = [];
const agregarProductos = listaProductos => {
    listaProductos.forEach(function (producto) {
        console.log(producto);
    });
};

fetch("./productos.json")
    .then(response => response.json())
    .then(data => agregarProductos(data));
    
// Mis contenedores
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");


//Agregar productos al carrito
let carrito = [];
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src= "${product.img}">
    <h3> ${product.nombre}</h3>
    <p class="price">${product.precio}</p>
    <p> Cantidad: ${product.cantidad}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "comprar";
    content.append(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        });
        saveLocal();
    });
});


//Eventos 
// Ver carrito

const pintarCarrito = () => {

    //Creando recuadro de Carrito
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modalHeaderTitle">Carrito</h1>
    `;

    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h2");
    modalbutton.innerText = "x";
    modalbutton.className = "modalHeaderButton";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    // Mostrar mi compra
    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modalContent";
        carritoContent.innerHTML = `
        <img scr="${product.img}">
        <h3> ${product.nombre}</h3>
        <p>$${product.precio}</p>
    `;
        modalContainer.append(carritoContent);

        // Eliminar productos
        let eliminar = document.createElement("span");

        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });


    // Resultado de mi compra
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    const totalFinal = document.createElement("div");
    totalFinal.className = "totalFinal";
    totalFinal.innerHTML = `El total a pagar es $${total}`;
    modalContainer.append(totalFinal);
};

// Funcionalidad al boton
verCarrito.addEventListener("click", pintarCarrito)

// Dandole funcionalidad a mi boton de eliminar producto del carrito
const eliminarProducto = () => {
    //Libreria..
    Toastify({
        text: "Producto eliminado",
        duration: 1300,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();

    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    pintarCarrito();
};



// set item 
const saveLocal = () => {
    localStorage.setItem("guardarCarro", JSON.stringify(carrito));
};



//Dark Mode
const botonColorMode = document.querySelector("#color-mode");
const body = document.body;

let darkMode = localStorage.getItem("dark-mode");

function activarDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "activado");
}

function desactivarDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "desactivado");
}

botonColorMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "activado") {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
});

function comprobarModo() {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "activado") {
        activarDarkMode();
    } else {
        desactivarDarkMode();
    }
}

comprobarModo();





