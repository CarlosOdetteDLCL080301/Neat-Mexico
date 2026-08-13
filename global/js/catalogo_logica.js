let todosLosProductos = [];
const dominio = "http://localhost:8080";
const dominioImagenes = `${dominio}/proyecto01/uploads/producto_en_venta/`;
async function cargarCatalogo() {
  try {
    // Petición a tu Servlet de Java
    const response = await fetch(`${dominio}/proyecto01/InventarioOnline`);
    if (!response.ok) throw new Error("Error en la respuesta de la API");
    todosLosProductos = await response.json();
  } catch (error) {
    console.warn("API no disponible. Cargando catálogo MOCK[cite: 1]...");

    // MOCK con los productos de tu tabla de costos
    todosLosProductos = [
      // Cuidado del Hogar
      {
        id: "limpiapisos-morado-concentrado",
        nombre: "Limpiapisos Morado (Concentrado)",
        precio: 8.51,
        categoria: "Hogar",
        imagen: "https://via.placeholder.com/300x300?text=Limpiapisos",
      },
      {
        id: "suavizante-azul-economico",
        nombre: "Suavizante de Telas Azul (Económico)",
        precio: 9.37,
        categoria: "Hogar",
        imagen: "https://via.placeholder.com/300x300?text=Suavizante",
      },

      // Cuidado Personal
      {
        id: "gel-capilar-extra-firme",
        nombre: "Gel capilar extra firme",
        precio: 20.76,
        categoria: "Personal",
        imagen: "global/img/gel-zero.jpg",
      },
      {
        id: "crema-almendras-rosa",
        nombre: "Crema de almendras rosa",
        precio: 40.43,
        categoria: "Personal",
        imagen: "https://via.placeholder.com/300x300?text=Crema+Almendras",
      },

      // Deportiva
      {
        id: "crema-pre-entreno",
        nombre: "Crema pre-entreno",
        precio: 66.93,
        categoria: "Deportiva",
        imagen: "https://via.placeholder.com/300x300?text=Pre-entreno",
      },
      {
        id: "crema-post-entreno",
        nombre: "Crema post-entreno",
        precio: 52.95,
        categoria: "Deportiva",
        imagen: "https://via.placeholder.com/300x300?text=Post-entreno",
      },

      // Tatuaje
      {
        id: "transfer-tatuaje",
        nombre: "Transfer",
        precio: 22.6,
        categoria: "Tatuaje",
        imagen: "https://via.placeholder.com/300x300?text=Transfer",
      },
      {
        id: "jabon-tatuajes",
        nombre: "Jabón para tatuajes",
        precio: 21.2,
        categoria: "Tatuaje",
        imagen: "https://via.placeholder.com/300x300?text=Jabon+Tatuaje",
      },

      // Cuidado Automotriz
      {
        id: "gel-abrillantador-llantas",
        nombre: "Gel abrillantador de llantas",
        precio: 64.67,
        categoria: "Automotriz",
        imagen: "https://via.placeholder.com/300x300?text=Abrillantador",
      },
      {
        id: "quitagotas",
        nombre: "Quitagotas",
        precio: 3.71,
        categoria: "Automotriz",
        imagen: "https://via.placeholder.com/300x300?text=Quitagotas",
      },
    ];
  }

  // Leer la URL para ver si el cliente viene de la vista de segmentos
  const parametros = new URLSearchParams(window.location.search);
  const categoriaUrl = parametros.get("categoria");

  if (categoriaUrl) {
    filtrar(categoriaUrl);
  } else {
    renderizar(todosLosProductos);
  }
}

function renderizar(lista) {
  const contenedor = document.getElementById("contenedor-catalogo");

  if (lista.length === 0) {
    contenedor.innerHTML =
      '<p class="mensaje-vacio">No hay productos disponibles en esta categoría por ahora.</p>';
    return;
  }

  contenedor.innerHTML = lista
    .map(
      (p) => `
        <div class="card-producto">
            <div class="img-contenedor">
                <!-- Se manda a llamar la función procesadora aquí -->
                <img src="${procesarRutaImagen(p.imagen)}" alt="${p.nombre}">
            </div>
            <div class="card-body">
                <span class="cat-label">${p.categoria}</span>
                <h4>${p.nombre}</h4>
                <p class="precio">$${p.precio.toFixed(2)} MXN</p>
                <a href="producto.html?id=${p.id}" class="btn-comprar">Ver Detalles</a>
            </div>
        </div>
    `,
    )
    .join("");
}

function filtrar(categoria) {
  if (categoria === "todos") {
    // Limpiamos la URL sin recargar la página
    window.history.replaceState({}, "", "catalogo.html");
    return renderizar(todosLosProductos);
  }

  const filtrados = todosLosProductos.filter((p) => p.categoria === categoria);
  renderizar(filtrados);
}

function procesarRutaImagen(rutaOriginal) {
  // 1. Validar si la ruta viene vacía, nula o indefinida
  if (!rutaOriginal) {
    // Retornamos tu imagen por defecto del servidor
    return `${dominioImagenes}sin-imagen.jpg`; 
  }

  // 2. Si ya es una URL completa, se devuelve intacta
  if (rutaOriginal.startsWith("http")) {
    return rutaOriginal;
  }
  
  // 3. Cortar la ruta y extraer solo el nombre
  const nombreArchivo = rutaOriginal.split('/').pop();
  return `${dominioImagenes}${nombreArchivo}`;
}

document.addEventListener("DOMContentLoaded", cargarCatalogo);
window.history.replaceState({}, "", "catalogo.html");