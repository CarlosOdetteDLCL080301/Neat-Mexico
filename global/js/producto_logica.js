async function cargarProducto() {
    const parametros = new URLSearchParams(window.location.search);
    const slugUrl = parametros.get('id');

    if (!slugUrl) {
        mostrarError();
        return;
    }

    let productoEncontrado = null;

    try {
        const response = await fetch('http://localhost:8080/api/productos&id=' + slugUrl);
        if (!response.ok) throw new Error("Error en la API");
        const productos = await response.json();
        productoEncontrado = productos.find(p => p.slug === slugUrl);
        
    } catch (error) {
        console.warn("API no disponible. Buscando en el MOCK...");
        
        // MOCK actualizado: Agregamos el campo "unidad_medida" (tal como se llama en tu tabla SQL)
        const mockProductos = [
            { 
                slug: "138", 
                nombre_completo: "Gel Capilar Extra Firme (Zero)", 
                precio_actual: 20.76, 
                categoria: "Personal", 
                imagen: "global/img/gel-zero.jpg",
                descripcion: "Gel moldeador de alta fijación (24 Hrs). Fórmula con 0% alcohol que no reseca el cabello ni deja residuos blancos.",
                unidad_medida: "Lt" // <--- Dato dinámico
            },//otorrinolar
            { 
                slug: "limpiapisos-morado-concentrado", 
                nombre_completo: "Limpiapisos Morado (Concentrado)", 
                precio_actual: 8.51, 
                categoria: "Hogar", 
                imagen: "https://via.placeholder.com/600x600?text=Limpiapisos+Morado",
                descripcion: "Fórmula de alta concentración diseñada para eliminar suciedad profunda y dejar un aroma duradero.",
                unidad_medida: "litro" // <--- Dato dinámico
            },
            { 
                slug: "crema-pre-entreno", 
                nombre_completo: "Crema Pre-Entreno", 
                precio_actual: 66.93, 
                categoria: "Deportiva", 
                imagen: "https://via.placeholder.com/600x600?text=Crema+Pre-entreno",
                descripcion: "Especialmente formulada para preparar tus músculos antes de la actividad física intensa.",
                unidad_medida: "pieza" // <--- Dato dinámico
            },
            { 
                slug: "transfer-tatuaje", 
                nombre_completo: "Gel Transfer para Tatuaje", 
                precio_actual: 22.60, 
                categoria: "Tatuaje", 
                imagen: "https://via.placeholder.com/600x600?text=Gel+Transfer",
                descripcion: "Gel de transferencia de alta precisión para estudios de tatuaje. Garantiza que la plantilla se adhiera perfectamente.",
                unidad_medida: "paquete" // <--- Dato dinámico
            }
        ];
        
        productoEncontrado = mockProductos.find(p => p.slug === slugUrl);
    }

    if (productoEncontrado) {
        renderizarProducto(productoEncontrado);
    } else {
        mostrarError();
    }
}

function renderizarProducto(p) {
    // 1. Migas de pan
    document.getElementById('bread-categoria').innerText = p.categoria;
    document.getElementById('bread-categoria').href = `catalogo.html?categoria=${p.categoria}`;
    document.getElementById('bread-nombre').innerText = p.nombre_completo;

    // 2. Info de producto
    document.getElementById('prod-imagen').src = p.imagen;
    document.getElementById('prod-categoria').innerText = p.categoria;
    document.getElementById('prod-nombre').innerText = p.nombre_completo;
    document.getElementById('prod-descripcion').innerText = p.descripcion || "Fórmula especializada de alto rendimiento directo de fábrica.";

    // 3. PRECIO DINÁMICO
    // Usamos p.unidad_medida. Si por algún error la base de datos devuelve null, usamos 'unidad' por defecto.
    const medida = p.unidad_medida ? p.unidad_medida.toLowerCase() : 'unidad';
    document.getElementById('prod-precio').innerText = `$${p.precio_actual.toFixed(2)} MXN / ${medida}*`;

    // 4. Botón de WhatsApp
    const numeroWhatsApp = "525518914316";
    const mensaje = `Hola, vengo de su página web. Me interesa cotizar o adquirir el producto: *${p.nombre_completo}* (por ${medida}). ¿Podrían darme más información?`;
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    document.getElementById('btn-whatsapp').href = enlaceWhatsApp;
}

function mostrarError() {
    document.getElementById('contenedor-producto').style.display = 'none';
    document.getElementById('mensaje-error').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', cargarProducto);