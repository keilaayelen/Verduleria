// Json
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        pintarCarrito(productos);
    });


// Mis contenedores
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");


// Mis productos 
const productos = [
    {
        id: 1,
        nombre: "Tomate",
        precio: 300,
        img: "https://th.bing.com/th/id/OIP.jP2VYVGUy-fX0djlFDZGfAHaE6?pid=ImgDet&rs=1"
    },
    {
        id: 2,
        nombre: "Cebolla",
        precio: 450,
        img: "https://greens.com.gt/wp-content/uploads/2020/04/Cebolla-Blanca.jpg"
    },
    {
        id: 3,
        nombre: "Morron",
        precio: 500,
        img: "https://th.bing.com/th/id/R.9a8f44ccd90741895d112201db2d5119?rik=5NnavbO5sH2Q1Q&riu=http%3a%2f%2flahoradelasalud.com%2fblog%2fwp-content%2fuploads%2f2020%2f11%2fMORRON-2-1024x768.jpg&ehk=ti%2bEqGyc%2foxEwce%2fdAw71pxsmzSs1FZq%2f8Gd%2fJR%2f%2faY%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        id: 4,
        nombre: "Papa",
        precio: 200,
        img: "https://www.todoparaellas.com/u/fotografias/m/2021/3/5/f800x450-18927_70373_5050.jpg"
    },
    {
        id: 5,
        nombre: "Ajo",
        precio: 100,
        img: "https://cdn.cienradios.com/wp-content/uploads/sites/3/2020/09/ajo.jpg"
    },
    {
        id: 6,
        nombre: "Manzana",
        precio: 280,
        img: "https://th.bing.com/th/id/OIP.YdBKMKhZk429atkjPqNh1AHaHa?pid=ImgDet&rs=1"
    },
    {
        id: 7,
        nombre: "Brocoli",
        precio: 670,
        img: "https://misremedios.com/wp-content/uploads/2016/09/brocoli.jpg"
    },
    {
        id: 8,
        nombre: "Hongos",
        precio: 170,
        img: "https://th.bing.com/th/id/OIP.VlSO5XMwrnMHYs5qQ9JOfgHaE7?pid=ImgDet&rs=1"
    }
]


//Ver carrito
let carrito = [];
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src= "${product.img}">
    <h3> ${product.nombre}</h3>
    <p class="price">${product.precio}</p>
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
        });
    });
});


//Eventos 
// Ver carrito

const pintarCarrito = () => {

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
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    pintarCarrito();
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


