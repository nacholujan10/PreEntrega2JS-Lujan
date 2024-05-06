// Array de objetos de productos con IDs y nombres separados
let productos = [
    { id: 1, nombre: "Maiz", subtipo: "Amarillo", precio: 539, cantidad: 1, imagen: "assets/img/maiz.png" },
    { id: 2, nombre: "Maiz", subtipo: "Blanco", precio: 517, cantidad: 1, imagen: "assets/img/maizblanco.png" },
    { id: 3, nombre: "Sorgo", subtipo: "Forrajero", precio: 550, cantidad: 1, imagen: "assets/img/sorgo.png" },
    { id: 4, nombre: "Soja", subtipo: "Gris", precio: 600, cantidad: 1, imagen: "assets/img/soja.png" },
    { id: 5, nombre: "Soja", subtipo: "Negra", precio: 590, cantidad: 1, imagen: "assets/img/soja.png" },
    { id: 6, nombre: "Trigo", subtipo: "Pan", precio: 485, cantidad: 1, imagen: "assets/img/trigo.png" },
    { id: 7, nombre: "Trigo", subtipo: "Candeal", precio: 500, cantidad: 1, imagen: "assets/img/trigo.png" },
    { id: 8, nombre: "Girasol", subtipo: "Confitero", precio: 425, cantidad: 1, imagen: "assets/img/girasol.png" },
    { id: 9, nombre: "Girasol", subtipo: "Oleaginoso", precio: 400, cantidad: 1, imagen: "assets/img/girasol.png" }
]

function crearTarjetas(productos) {
    let container = document.getElementById("productos-container")
    container.innerHTML = ""

    productos.forEach(producto => {
        let card = document.createElement("div")
        card.classList.add("card")

        let imagen = document.createElement("img")
        imagen.src = producto.imagen
        card.appendChild(imagen)

        let nombre = document.createElement("h2")
        nombre.textContent = producto.nombre + " " + producto.subtipo
        card.appendChild(nombre)

        let precio = document.createElement("p")
        precio.textContent = "Precio USD por TON: $" + producto.precio.toFixed(2)
        card.appendChild(precio)

        let agregarCarritoBtn = document.createElement("button")
        agregarCarritoBtn.textContent = "Agregar al Carrito"
        agregarCarritoBtn.addEventListener("click", function () {
            agregarAlCarrito(producto)
        })
        card.appendChild(agregarCarritoBtn)

        container.appendChild(card)
    })
}

function agregarAlCarrito(producto) {
    carrito.push(producto)
    mostrarCarrito()
    guardarCarritoEnLocalStorage()
}

function mostrarCarrito() {
    let carritoLista = document.getElementById("carrito-lista")
    carritoLista.innerHTML = ""

    let total = 0;

    carrito.forEach((producto, index) => {
        let item = document.createElement("li")
        item.textContent = `${producto.nombre} ${producto.subtipo} - $${producto.precio.toFixed(2)} x ${producto.cantidad}`

        let aumentarBtn = document.createElement("button")
        aumentarBtn.textContent = "+"
        aumentarBtn.addEventListener("click", function () {
            aumentarCantidad(index)
        })
        item.appendChild(aumentarBtn)

        let eliminarBtn = document.createElement("button")
        eliminarBtn.textContent = "Eliminar"
        eliminarBtn.addEventListener("click", function () {
            eliminarProducto(index)
        })
        item.appendChild(eliminarBtn)

        let disminuirBtn = document.createElement("button");
        disminuirBtn.textContent = "-"
        disminuirBtn.addEventListener("click", function () {
            disminuirCantidad(index)
        })
        item.appendChild(disminuirBtn)

        carritoLista.appendChild(item)

        let subtotalProducto = producto.precio * producto.cantidad
        total += subtotalProducto
    })

    let totalElement = document.getElementById("total")
    totalElement.textContent = `Total: $${total.toFixed(2)}`
}

function eliminarProducto(index) {
    carrito.splice(index, 1)
    mostrarCarrito()
    guardarCarritoEnLocalStorage()
}

function aumentarCantidad(index) {
    carrito[index].cantidad++
    mostrarCarrito()
    guardarCarritoEnLocalStorage()
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--
        mostrarCarrito()
        guardarCarritoEnLocalStorage()
    }
}


function vaciarCarrito() {
    carrito = []
    mostrarCarrito()
    guardarCarritoEnLocalStorage()
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function cargarCarritoDesdeLocalStorage() {
    let carritoGuardado = localStorage.getItem("carrito")
    return carritoGuardado ? JSON.parse(carritoGuardado) : []
}

let carrito = cargarCarritoDesdeLocalStorage()

// Llamo a la función para crear todas las tarjetas cuando se carga la página

window.onload = function () {
    crearTarjetas(productos)
    mostrarCarrito()

    let busquedaInput = document.getElementById("busqueda")
    let filtrarBtn = document.getElementById("filtrar-btn")

    function buscarProducto(busqueda) {
        let busquedaMinuscula = busqueda.toLowerCase()
        let productosFiltrados = productos.filter(producto => {
            return producto.nombre.toLowerCase().includes(busquedaMinuscula) || producto.subtipo.toLowerCase().includes(busquedaMinuscula)
        })

        crearTarjetas(productosFiltrados)
    }

    filtrarBtn.addEventListener("click", function () {
        let busqueda = busquedaInput.value.trim()
        if (busqueda !== "") {
            buscarProducto(busqueda)
        } else {
            mostrarMensaje("Ingrese un término de búsqueda válido.")
        }
    });

    let vaciarCarritoBtn = document.getElementById("vaciar-carrito-btn")
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito)
}

function procesarCompra() {
    let mensajeConfirmacion = document.getElementById("mensaje-confirmacion")
    mensajeConfirmacion.style.display = "block"

    vaciarCarrito()

    localStorage.setItem("compraRealizada", "true")
}

let comprarBtn = document.getElementById("comprar-btn")
comprarBtn.addEventListener("click", procesarCompra)


