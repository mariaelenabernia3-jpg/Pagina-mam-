// 1. DATA (Agrega aquí tus productos reales)
const productos = [
    { id: 1, nombre: "Sérum Glow Vitamina C", precio: 15, cat: "rostro", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600" },
    { id: 2, nombre: "Mascarilla Karseell", precio: 25, cat: "cabello", img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600" },
    { id: 3, nombre: "Kit Rutina Completa", precio: 45, cat: "kits", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600" },
    { id: 4, nombre: "Jabón de Avena", precio: 5, cat: "rostro", img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600" },
    { id: 5, nombre: "Aceite de Argán", precio: 18, cat: "cabello", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=600" },
    { id: 6, nombre: "Exfoliante Café", precio: 12, cat: "cuerpo", img: "https://images.unsplash.com/photo-1567721913486-6585f069b332?auto=format&fit=crop&w=600" },
];

let carrito = {}; 
const NUMERO_WHATSAPP = "5354385622"; 

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos('todos');
});

function renderizarProductos(filtro) {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.cat === filtro);

    filtrados.forEach(p => {
        const div = document.createElement("div");
        // Ajuste: 2 columnas en celular (col-6), 4 en PC (col-lg-3)
        div.className = "col-6 col-md-4 col-lg-3"; 
        
        div.innerHTML = `
            <div class="card card-producto h-100">
                <div class="img-wrapper">
                    <img src="${p.img}" alt="${p.nombre}">
                    <span class="price-badge">$${p.precio}</span>
                </div>
                <div class="card-body p-2 d-flex flex-column">
                    <h6 class="fw-bold mb-1 text-truncate" style="font-size: 0.95rem;">${p.nombre}</h6>
                    <small class="text-muted d-block mb-2">Disponible</small>
                    
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="text-pink small fw-bold text-uppercase" style="font-size: 0.75rem;">Lo quiero</span>
                        <button class="btn btn-add-circle shadow-sm click-effect" onclick="agregarAlCarrito(${p.id}, this)">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function filtrarProductos(cat, btn) {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarProductos(cat);
}

// CARRITO
function agregarAlCarrito(id, btnElement) {
    if (carrito[id]) {
        carrito[id]++;
    } else {
        carrito[id] = 1;
    }
    actualizarCarritoUI();
    if(btnElement) crearEfecto(btnElement);
}

function actualizarCarritoUI() {
    const contenedorItems = document.getElementById("carrito-items");
    const badge = document.getElementById("badge-carrito");
    const totalDisplay = document.getElementById("total-precio");
    
    contenedorItems.innerHTML = "";
    let total = 0;
    let itemsTotales = 0;
    const ids = Object.keys(carrito);

    if (ids.length === 0) {
        contenedorItems.innerHTML = `<div class="text-center mt-5"><p class="text-muted">¡Está vacío! 🛍️</p></div>`;
        badge.classList.add('d-none');
    } else {
        ids.forEach(id => {
            const p = productos.find(prod => prod.id == id);
            const cant = carrito[id];
            total += p.precio * cant;
            itemsTotales += cant;
            contenedorItems.innerHTML += `
                <div class="d-flex align-items-center mb-3 bg-white p-2 rounded shadow-sm border border-light">
                    <img src="${p.img}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;" class="me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 small fw-bold text-truncate" style="max-width: 120px;">${p.nombre}</h6>
                        <small class="text-muted">$${p.precio} x ${cant}</small>
                    </div>
                    <div class="d-flex gap-2 align-items-center bg-light rounded px-2">
                         <button class="btn btn-sm text-pink p-0" onclick="cambiarCant(${id}, -1)">-</button>
                         <span class="fw-bold small mx-1">${cant}</span>
                         <button class="btn btn-sm text-pink p-0" onclick="cambiarCant(${id}, 1)">+</button>
                    </div>
                </div>`;
        });
        badge.innerText = itemsTotales;
        badge.classList.remove('d-none');
    }
    totalDisplay.innerText = total;
}

function cambiarCant(id, cambio) {
    carrito[id] += cambio;
    if (carrito[id] <= 0) delete carrito[id];
    actualizarCarritoUI();
}

// EFECTO PARTÍCULAS
function crearEfecto(btn) {
    const emojis = ['💖', '✨', '🌸', '🧴'];
    const rect = btn.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top + (rect.height / 2);

    for (let i = 0; i < 6; i++) {
        const particula = document.createElement('span');
        particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particula.classList.add('particle');
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        const randomX = (Math.random() - 0.5) * 80; 
        particula.style.transform = `translate(-50%, -50%) translate(${randomX}px, 0)`;
        document.body.appendChild(particula);
        setTimeout(() => { particula.remove(); }, 800);
    }
}

// ENVIAR WHATSAPP
function enviarPedido() {
    const ids = Object.keys(carrito);
    if (ids.length === 0) return alert("Tu bolsita está vacía 🛍️");

    let mensaje = `💖 *HOLA JESSI!* Quiero hacer este pedido:%0A%0A`;
    let total = 0;
    ids.forEach(id => {
        const p = productos.find(prod => prod.id == id);
        const cant = carrito[id];
        const sub = p.precio * cant;
        total += sub;
        mensaje += `✨ ${cant}x ${p.nombre} ($${sub})%0A`;
    });
    mensaje += `%0A---------------------------%0A💰 *TOTAL: $${total} USD*%0A---------------------------%0A📍 *Dirección:* ...`;
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`, '_blank');
}