const contenedorProductos = document.getElementById("contenedorProductos") 

const productosJson = "productos.json"
let productosFetch

fetch(productosJson)
 .then(respuesta => respuesta.json())
  .then(datos => {
     datos.forEach(element => {
        productosFetch = datos.slice(0)
        const divProducto = document.createElement("div")
        divProducto.className = "divProducto"
         divProducto.innerHTML = `
         <div class="d-flex flex-column align-items-center cajaProducto">
         <h4 class="h4Producto">${element.nombre}</h4>
         <img class="imgProductos" src="img/${element.id}.png">
         <h6 class="h6Producto">Precio: $${element.precio}</h6>
         <button class="my-4 btnAgregarAlCarrito" id="agregarAlCarrito${element.id}">Agregar Al Carrito</button>
         </div>
         `

         contenedorProductos.appendChild(divProducto)

        const btn = document.getElementById(`agregarAlCarrito${element.id}`)
        btn.addEventListener("click", () => {
         productoEnCarrito(element.id) 
         Toastify({
            text: "Producto agregado al carrito",
            color: "white",
            duration: 1200,
            position: "right",
            gravity: "bottom",
            style: {
                background: "#08415C"
            }
        }).showToast()
        
        
        })

    });
})
.catch(error => console.log(error))


// Agrego productos al carrito

let carrito = []

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        mostrarCarrito()
    }
 
})


 const productoEnCarrito = (id) => {
     const producto = productosFetch.find(producto => producto.id === id)
     const productoEnElCarrito = carrito.find(producto => producto.id === id)
     if(productoEnElCarrito){
         productoEnElCarrito.cantidad++;
     }else {
         carrito.push(producto) 
         mostrarCarrito()
     }
    
 }


 const contenedorCarrito = document.getElementById("contenedorCarrito")
 const btnVerCarrito = document.getElementById("btnVerCarrito")
const contadorCarrito = document.getElementById("contadorCarrito")
 
 btnVerCarrito.addEventListener("click", () => {
    mostrarCarrito()    
 })

const mostrarCarrito = () => {
contenedorCarrito.innerHTML = ""
    carrito.forEach(producto => {
           const div = document.createElement("div")
           div.className = "cajaProductoEnCarrito"
           div.innerHTML = `
        <p class="pNombre">${producto.nombre}</p>
        <p class="pPrecio">precio: $${producto.precio}</p>
        <p class="pCantidad">cantidad: ${producto.cantidad}</p>
        <button class="my-4 btnEliminar" onClick="eliminarProductoDelCarrito(${producto.id})"><img src="img/eliminar.png"</button>
       
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log(carrito);
    })
    contadorCarrito.innerText = carrito.length
    calcularTotalCompra()
}


 const eliminarProductoDelCarrito = (id) => {
    const productoEliminado = carrito.find(producto =>producto.id === id)
    carrito.splice(carrito.indexOf[productoEliminado], 1)
   mostrarCarrito()
 }

const totalCompra = document.getElementById("totalCompra")

function calcularTotalCompra () {

     let total = 0
     carrito.forEach(producto =>
      total += producto.precio * producto.cantidad 
     )
     totalCompra.innerHTML =  total
}

const btnVaciarCarrito = document.getElementById("btnVaciarCarrito")

btnVaciarCarrito.addEventListener("click", () => {
    if(carrito.length == 0){

        Swal.fire({
            title: "Atencion",
            text: "El carrito ya esta vacio.",      
            icon: "info",
            background: "white",
            confirmButtonColor: "#08415C",
            iconColor: "red",
            confirmButtonText: "Entendido"
        })
    }else {
        carrito.splice(0, carrito.length)
        localStorage.clear()
    }
    mostrarCarrito()
})

const btnComprarCarrito = document.getElementById("comprarCarrito")
btnComprarCarrito.addEventListener("click", comprarCarrito)

function comprarCarrito () {
    total = 0
    carrito.forEach(producto => {
     total += producto.precio * producto.cantidad 
     cantidadProductosEnCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
})
if(carrito.length == 0){
    Swal.fire({
        title: "Atencion",
        text: "No tienes productos en el carrito.",      
        icon: "info",
        background: "white",
        confirmButtonColor: "#08415C",
        iconColor: "red",
        confirmButtonText: "Entendido"
    })
}else {
    Swal.fire({
       title: `Compraste ${cantidadProductosEnCarrito } productos por $${total}`,
       icon: "success",
        confirmButtonText: "Aceptar",
   }).then((resultado) => {
       if(resultado.isConfirmed){
           carrito.splice(0, carrito.length)
           localStorage.clear()
       }
       mostrarCarrito()
   })
}
}

// Js para el modal


const modalContenedor = document.getElementById("modalContenedor")
const modalCarrito = document.getElementById("modalCarrito")
const btnCerrarCarrito = document.getElementById("cerrarCarrito")

btnVerCarrito.addEventListener("click", () => {
modalContenedor.classList.toggle(`modal-active`)
})
btnCerrarCarrito.addEventListener("click", () => {
    modalContenedor.classList.toggle(`modal-active`)
})

modalContenedor.addEventListener("click", (event) => {
    modalContenedor.classList.toggle(`modal-active`)
})

modalCarrito.addEventListener("click", (event) => {
    event.stopPropagation()
})