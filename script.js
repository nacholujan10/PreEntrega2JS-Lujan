let productos = [
    { id: 1, nombre: "Maiz", subtipo: "Amarillo", precio: 500, imagen: "assets/img/maizblanco.png" },
    { id: 2, nombre: "Maiz", subtipo: "Blanco", precio: 400, imagen: "assets/img/maizblanco.png" },
    { id: 3, nombre: "Sorgo", subtipo: "Forrajero", precio: 380, imagen: "assets/img/sorgo.png" },
    { id: 4, nombre: "Soja", subtipo: "Gris", precio: 370, imagen: "assets/img/soja.png" },
    { id: 5, nombre: "Soja", subtipo: "Negra", precio: 410, imagen: "assets/img/soja.png" },
    { id: 6, nombre: "Trigo", subtipo: "Pan", precio: 420, imagen: "assets/img/trigo.png" },
    { id: 7, nombre: "Trigo", subtipo: "Candeal", precio: 440, imagen: "assets/img/trigo.png" },
    { id: 8, nombre: "Girasol", subtipo: "Confitero", precio: 550, imagen: "assets/img/girasol.png" },
    { id: 9, nombre: "Girasol", subtipo: "Oleaginoso", precio: 480, imagen: "assets/img/girasol.png" }
];

function crearTarjetas(productos) {
    let container = document.getElementById("productos-container");
    container.innerHTML = "";

    productos.forEach(producto => {
        let card = document.createElement("div");
        card.classList.add("card");

        let imagen = document.createElement("img");
        imagen.src = producto.imagen;
        card.appendChild(imagen);

        let nombre = document.createElement("h2");
        nombre.textContent = producto.nombre + " " + producto.subtipo;
        card.appendChild(nombre);

        let precio = document.createElement("p");
        precio.textContent = "Precio: $" + producto.precio.toFixed(2);
        card.appendChild(precio);

        container.appendChild(card);
    });
}

function filtrarTarjetas(precioMaximo) {
    let productosFiltrados = productos.filter(producto => producto.precio <= precioMaximo);
    if (productosFiltrados.length > 0) {
        crearTarjetas(productosFiltrados);
    } else {
        alert("No hay productos con precio igual o menor a $" + precioMaximo);
    }
}

function buscarProducto(nombreProducto) {
    let productoEncontrado = productos.filter(producto => producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase()));
    if (productoEncontrado.length > 0) {
        crearTarjetas(productoEncontrado);
    } else {
        alert("Producto no encontrado.");
    }
}

window.onload = function() {
    crearTarjetas(productos);
    
    let opcion = prompt("Seleccione una opción:\n1. Filtrar por precio máximo\n2. Buscar por nombre\n");
    if (opcion === "1") {
        let precioMaximo = parseFloat(prompt("Ingrese el precio máximo para filtrar productos:"));
        filtrarTarjetas(precioMaximo);
    } else if (opcion === "2") {
        let nombreProducto = prompt("Ingrese el nombre del producto a buscar:");
        buscarProducto(nombreProducto);
    } else {
        alert("Opción no válida.");
    }
};