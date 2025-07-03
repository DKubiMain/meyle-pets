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
});
