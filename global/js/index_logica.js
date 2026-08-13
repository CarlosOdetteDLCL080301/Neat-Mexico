// 1. Definimos el MOCK con el contexto de Neat Hands
const productosMock = [
  {
    slug: "detergente-liquido-concentrado-20l",
    nombre_completo: "Detergente Líquido Concentrado 20L",
    precio_actual: 350.0,
    categoria: "Limpieza",
    imagen: "https://via.placeholder.com/300x300?text=Detergente+20L",
    etiqueta: "Granel",
  },
  {
    slug: "cera-capilar-fijacion-extrema",
    nombre_completo: "Cera Capilar Fijación Extrema 250g",
    precio_actual: 85.0,
    categoria: "Cuidado Personal",
    imagen: "https://via.placeholder.com/300x300?text=Cera+Capilar",
    etiqueta: "Nuevo",
  },
  {
    slug: "gel-moldeador-zero",
    nombre_completo: "Gel Moldeador Zero (Extra Firme)",
    precio_actual: 85.0,
    categoria: "Cuidado Personal",
    imagen: "global/img/gel-zero.jpg", // Aquí usamos tu imagen
    etiqueta: "24 Hrs",
  },
  {
    slug: "desengrasante-automotriz-industrial",
    nombre_completo: "Desengrasante Automotriz Industrial 5L",
    precio_actual: 190.0,
    categoria: "Automotriz",
    imagen: "https://via.placeholder.com/300x300?text=Desengrasante+5L",
    etiqueta: "Alto Impacto",
  },
  {
    slug: "suavizante-telas-libre-enjuague",
    nombre_completo: "Suavizante de Telas Libre Enjuague 10L",
    precio_actual: 160.0,
    categoria: "Limpieza",
    imagen: "https://via.placeholder.com/300x300?text=Suavizante+10L",
    etiqueta: "Ecológico",
  },
  {
    slug: "detergente-liquido-concentrado-20l",
    nombre_completo: "Detergente Líquido Concentrado 20L",
    precio_actual: 350.0,
    categoria: "Limpieza",
    imagen: "https://via.placeholder.com/300x300?text=Detergente+20L",
    etiqueta: "Granel",
  },
];

// 2. Función para pintar las tarjetas en el HTML
function renderizarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""; // Limpiar el texto de "Cargando..."

  productos.forEach((producto) => {
    const cardHTML = `
            <div class="card-producto">
                <div class="badge">${producto.etiqueta}</div>
                <img src="${producto.imagen}" alt="${producto.nombre_completo}">
                <div class="card-body">
                    <span class="cat-label">${producto.categoria}</span>
                    <h4>${producto.nombre_completo}</h4>
                    <p class="precio">$${producto.precio_actual.toFixed(2)} MXN</p>
                    <a href="producto.html?slug=${producto.slug}" class="btn-comprar">Ver Detalles</a>
                </div>
            </div>
        `;
    contenedor.innerHTML += cardHTML;
  });
}

// 3. Función principal Fetch con Fallback
function cargarCatalogo() {
  // Intenta consumir tu Servlet Java
  fetch("http://localhost:8080/api/productos?filtro=destacados") // Ajusta esta URL luego
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos cargados desde la DB correctamente");
      renderizarProductos(data);
    })
    .catch((error) => {
      console.warn(
        "No se pudo conectar a la API. Cargando MOCK data...",
        error,
      );
      renderizarProductos(productosMock);
    });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarCatalogo);
