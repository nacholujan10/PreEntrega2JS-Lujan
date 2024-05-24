async function fetchProductos() {
    try {
        let response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Hubo un problema con la operación fetch:', error);
        return [];
    }
}

async function iniciarAplicacion() {
    let productos = await fetchProductos();
    crearTarjetas(productos);
    mostrarCarrito();

    let busquedaInput = document.getElementById("busqueda");
    let filtrarBtn = document.getElementById("filtrar-btn");

    function buscarProducto(busqueda) {
        let busquedaMinuscula = busqueda.toLowerCase();
        let productosFiltrados = productos.filter(producto => {
            return producto.nombre.toLowerCase().includes(busquedaMinuscula) || producto.subtipo.toLowerCase().includes(busquedaMinuscula);
        });

        crearTarjetas(productosFiltrados);
    }

    filtrarBtn.addEventListener("click", function () {
        let busqueda = busquedaInput.value.trim();
        if (busqueda !== "") {
            buscarProducto(busqueda);
        } else {
            Swal.fire('Error', 'Ingrese un término de búsqueda válido.', 'error');
        }
    });

    let vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn");
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    let comprarBtn = document.getElementById("comprar-btn");
    comprarBtn.addEventListener("click", procesarCompra);
}

window.onload = function () {
    iniciarAplicacion();
}

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
        precio.textContent = "Precio USD por TON: $" + producto.precio.toFixed(2);
        card.appendChild(precio);

        let agregarCarritoBtn = document.createElement("button");
        agregarCarritoBtn.textContent = "Agregar al Carrito";
        agregarCarritoBtn.addEventListener("click", function () {
            agregarAlCarrito(producto);
            Swal.fire('Agregado!', 'Producto agregado al carrito!', 'success');
        });
        card.appendChild(agregarCarritoBtn);

        container.appendChild(card);
    });
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto });
    }
    mostrarCarrito();
    guardarCarritoEnLocalStorage();
}

function mostrarCarrito() {
    let carritoLista = document.getElementById("carrito-lista");
    carritoLista.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.innerHTML = `
            ${producto.nombre} ${producto.subtipo} - $${producto.precio.toFixed(2)} x ${producto.cantidad}
            <span class="buttons">
                <button onclick="aumentarCantidad(${index})">+</button>
                <button onclick="disminuirCantidad(${index})">-</button>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </span>
        `;
        carritoLista.appendChild(item);

        let subtotalProducto = producto.precio * producto.cantidad;
        total += subtotalProducto;
    });

    let totalElement = document.getElementById("total");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    guardarCarritoEnLocalStorage();
}

function aumentarCantidad(index) {
    carrito[index].cantidad++;
    mostrarCarrito();
    guardarCarritoEnLocalStorage();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        mostrarCarrito();
        guardarCarritoEnLocalStorage();
    }
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    guardarCarritoEnLocalStorage();
    Swal.fire('Vaciado!', 'El carrito ha sido vaciado!', 'success');
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function procesarCompra() {
    vaciarCarrito();
    localStorage.setItem("compraRealizada", "true");
    Swal.fire('Compra realizada!', 'Su compra ha sido procesada con éxito!', 'success');
}

function cargarCarritoDesdeLocalStorage() {
    let carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

let carrito = cargarCarritoDesdeLocalStorage();


