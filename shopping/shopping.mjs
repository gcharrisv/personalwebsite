const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];


/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement("article");

    article.innerHTML = `
        <img src="${product.imageSrc}" alt="${product.name}" />
        <div class="product-details">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <div>
                <button class="buy-button">Add to cart</button>
                <span class="num-in-cart">${product.numInCart} in cart</span>
            </div>
        </div>
    `;

    const button = article.querySelector(".buy-button");
    button.addEventListener("click", () => {
        product.numInCart++;
        rerenderAllProducts();
        rerenderCart();
    });

    return article;
}

/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const section = document.querySelector(".product-list");
    section.innerHTML = "<h2>Search results</h2>";

    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const card = renderProductCard(product);
            section.appendChild(card);
        }
    }
}

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = "";

    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const item = document.createElement("div");
            item.innerHTML = `
                <p>${product.name} x${product.numInCart}</p>
                <button class="remove-button">Remove</button>
            `;

            item.querySelector(".remove-button").addEventListener("click", () => {
                product.numInCart--;
                rerenderAllProducts();
                rerenderCart();
            });

            cartItems.appendChild(item);
        }
    }
}


const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const minStr = minPriceInput.value;
    const maxStr = maxPriceInput.value;

    const min = Number.parseFloat(minStr);
    const max = Number.parseFloat(maxStr);

    if (!isNaN(min) && product.price < min) return false;
    if (!isNaN(max) && product.price > max) return false;

    return true;
}

minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);

rerenderAllProducts();
rerenderCart();

