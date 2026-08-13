async function cargarProducto() {
  const parametros = new URLSearchParams(window.location.search);
  const idUrl = parametros.get("id");

  if (!idUrl) {
    mostrarError();
    return;
  }

  let productoEncontrado = null;

  try {
    const response = await fetch(
      "http://localhost:8080/proyecto01/Productos?id=" + idUrl,
    );

    if (!response.ok) throw new Error("Error en la API");

    // 1. Convertimos la respuesta a JSON
    const productoJson = await response.json();

    // 2. Como la API ya devuelve el objeto exacto, se lo asignamos directamente
    productoEncontrado = productoJson;
  } catch (error) {
    console.warn(
      "API no disponible o error en la petición. Buscando en el MOCK...",
      error,
    );

    const mockProductos = [
      {
        id: "138",
        nombre: "Gel Capilar Extra Firme (Zero)",
        precio: 20.76,
        categoria: "Personal",
        imagen: "global/img/gel-zero.jpg",
        descripcion:
          "Gel moldeador de alta fijación (24 Hrs). Fórmula con 0% alcohol que no reseca el cabello ni deja residuos blancos.",
        magnitud: "Lt",
      },
      // ... (el resto de tus mocks)
    ];

    // El MOCK sí es un arreglo, así que aquí SÍ usamos .find()
    // OJO: Usamos == en lugar de === por si idUrl es string "138" y el mock tuviera número 138
    productoEncontrado = mockProductos.find((p) => p.id == idUrl);
  }

  if (productoEncontrado && productoEncontrado.id) {
    renderizarProducto(productoEncontrado);
  } else {
    mostrarError();
  }
}
function renderizarProducto(p) {
  // 1. Migas de pan
  document.getElementById("bread-categoria").innerText = p.categoria;
  document.getElementById("bread-categoria").href =
    `catalogo.html?categoria=${p.categoria}`;
  document.getElementById("bread-nombre").innerText = p.nombre;

  // ==========================================
  // PROCESAMIENTO DE LA IMAGEN
  // ==========================================
  let urlImagenFinal = p.imagen;

  // Verificamos si la ruta viene de la base de datos (contiene "uploads")
  if (urlImagenFinal && urlImagenFinal.includes("uploads/producto_en_venta")) {
    // .split('/').pop() extrae SOLO el nombre final del archivo ignorando los "../"
    const nombreArchivo = urlImagenFinal.split("/").pop();

    // Construimos la URL absoluta correcta
    urlImagenFinal = `http://localhost:8080/proyecto01/uploads/producto_en_venta/${nombreArchivo}`;
  }
  // ==========================================

  // 2. Info de producto
  // Usamos la URL ya procesada
  document.getElementById("prod-imagen").src = urlImagenFinal;

  document.getElementById("prod-categoria").innerText = p.categoria;
  document.getElementById("prod-nombre").innerText = p.nombre;
  document.getElementById("prod-descripcion").innerText =
    p.descripcion ||
    "Fórmula especializada de alto rendimiento directo de fábrica.";

  // 3. PRECIO DINÁMICO
  const medida = p.magnitud ? p.magnitud.toLowerCase() : "unidad";
  // Nos aseguramos de que el precio sea un número antes de usar .toFixed(2)
  const precioNum =
    typeof p.precio === "number" ? p.precio : parseFloat(p.precio);
  document.getElementById("prod-precio").innerText =
    `$${precioNum.toFixed(2)} MXN / ${medida}*`;

  // 4. Botón de WhatsApp
  const numeroWhatsApp = "525518914316";
  const mensaje = `Hola, vengo de su página web. Me interesa cotizar o adquirir el producto: *${p.nombre}* (por ${medida}). ¿Podrían darme más información?`;
  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  document.getElementById("btn-whatsapp").href = enlaceWhatsApp;
}

function mostrarError() {
  document.getElementById("contenedor-producto").style.display = "none";
  document.getElementById("mensaje-error").style.display = "block";
}

document.addEventListener("DOMContentLoaded", cargarProducto);
