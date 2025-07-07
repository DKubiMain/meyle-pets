document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  let products = [];

  // Cargar productos desde JSON
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderProducts(products);
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
      grid.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    });

  // Filtrar por texto o categoría
  searchInput.addEventListener("input", () => {
    const filtered = filterProducts();
    renderProducts(filtered);
  });

  categoryFilter.addEventListener("change", () => {
    const filtered = filterProducts();
    renderProducts(filtered);
  });

  // Función para filtrar productos
  function filterProducts() {
    const text = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    return products.filter((product) => {
      const matchesText =
        product.nombre.toLowerCase().includes(text) ||
        product.descripcion.toLowerCase().includes(text);
      const matchesCategory = category === "" || product.categoria === category;
      return matchesText && matchesCategory;
    });
  }

  // Renderizar productos en el grid
  function renderProducts(productList) {
    grid.innerHTML = ""; // Limpiar contenido anterior

    if (productList.length === 0) {
      grid.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    productList.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${product.imagen}" alt="${product.nombre}" loading="lazy" />
        <h3>${product.nombre}</h3>
        <p class="price">$${product.precio.toLocaleString("es-CO")}</p>
        <p>${product.descripcion}</p>
        <a href="https://wa.me/573186328667?text=Hola%20Meylé%20Pets,%20quiero%20comprar%20${encodeURIComponent(
          product.nombre
        )}" target="_blank">Comprar por WhatsApp</a>
      `;

      grid.appendChild(card);
    });
  }

  // Funcionalidad para abrir la imagen ampliada
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG" && e.target.closest(".card")) {
      const modal = document.getElementById("imageModal");
      const modalImg = document.getElementById("modalImage");
      modal.style.display = "block";
      modalImg.src = e.target.src;
      modalImg.alt = e.target.alt;
    }
  });

  // Cerrar el modal al hacer clic en la X o fuera de la imagen
  document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("imageModal").style.display = "none";
  });

  document.getElementById("imageModal").addEventListener("click", (e) => {
    if (e.target.id === "imageModal") {
      e.target.style.display = "none";
    }
  });

  const tallas = [
    {
      talla: "S",
      cuello: [26, 34],
      pecho: 46,
      largo: 29,
      razas: ["Yorkshire", "Tacita de té", "Minj toy", "Gato criollo adulto"],
    },
    {
      talla: "M",
      cuello: [35, 43],
      pecho: 50,
      largo: 33,
      razas: [
        "Shih Tzu",
        "Pekinés",
        "Bulldog Francés",
        "Mini Schnauzer",
        "Gato grande",
      ],
    },
    {
      talla: "L",
      cuello: [41, 53],
      pecho: 60,
      largo: 41,
      razas: [
        "Pug",
        "Poodle",
        "Cocker",
        "Criollo mediano",
        "French y Schnauzer grandes",
      ],
    },
    {
      talla: "XL",
      cuello: [52, 64],
      pecho: 71,
      largo: 50,
      razas: ["Beagle", "Cocker Spaniel", "Bull Terriers", "Shar Pei"],
    },
    {
      talla: "XXL",
      cuello: [65, 70],
      pecho: 78,
      largo: 60,
      razas: ["Bulldog", "Chow Chow", "Labrador"],
    },
    {
      talla: "XXXL",
      cuello: [71, 75],
      pecho: 93,
      largo: 70,
      razas: ["Pastor Alemán", "Golden Retriever", "Husky"],
    },
  ];

  document.getElementById("sizeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = document.getElementById("calcularBtn");
    const result = document.getElementById("resultadoTalla");
    btn.disabled = true;
    btn.textContent = "Calculando...";

    // Simula un pequeño retardo para UX (puedes omitir el setTimeout si no lo necesitas)
    setTimeout(() => {
      const cuello = parseFloat(document.getElementById("cuello").value);
      const pecho = parseFloat(document.getElementById("pecho").value);
      const largo = parseFloat(document.getElementById("largo").value);

      const talla = tallas.find(
        (t) =>
          cuello >= t.cuello[0] &&
          cuello <= t.cuello[1] &&
          pecho <= t.pecho + 5 &&
          pecho >= t.pecho - 5 &&
          largo <= t.largo + 5 &&
          largo >= t.largo - 5
      );

      if (talla) {
        result.innerHTML = `
        <strong>Talla sugerida:</strong> ${talla.talla}<br />
        <strong>Razas asociadas:</strong> ${talla.razas.join(", ")}
      `;
      } else {
        result.innerHTML = `<span style="color: red;">No se encontró una talla exacta para las medidas ingresadas.</span>`;
      }

      btn.disabled = false;
      btn.textContent = "Calcular talla";
    }, 800); // 500 ms solo para ver el efecto
  });
});
