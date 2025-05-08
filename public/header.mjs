import { toHtmlElement } from './toHtmlElement.mjs';

function createHeaderHtml() {
    return `
    <header id="site-header">
      <div class="Name">George Harrison</div>
      <label id="dark-mode-toggle">
      <input type="checkbox" id="dark-mode-checkbox" autocomplete="off" />
      Dark mode
      </label>
      <button id="menu-button" aria-label="Toggle navigation menu" aria-expanded="false">☰</button>
      <nav id="nav-links" class="nav-links hidden" aria-label="Main Navigation">
        ${createNavLink("Home", "index.html")}
        ${createNavLink("My Hobbies", "hobbies.html")}
      </nav>
    </header>
  `;
}

function createNavLink(label, href) {
    return `<a href="${href}">${label}</a>`;
}

function insertHeader() {
    const fragment = toHtmlElement(createHeaderHtml());
    const headerElement = fragment.firstElementChild;

    document.querySelector("header")?.remove();
    document.body.prepend(headerElement);

    setupMenuToggle(headerElement);
    setupDarkModeToggle();
}

function setupMenuToggle(headerElement) {
    const menuButton = headerElement.querySelector("#menu-button");
    const navLinks = headerElement.querySelector("#nav-links");

    menuButton.addEventListener("click", () => {
        const isCurrentlyHidden = navLinks.classList.contains("hidden");
        navLinks.classList.toggle("hidden");
        menuButton.setAttribute("aria-expanded", String(!isCurrentlyHidden));
        menuButton.setAttribute("aria-label", isCurrentlyHidden ? "Close navigation menu" : "Open navigation menu");
    });

    document.addEventListener("click", (event) => {
        const isClickInsideMenu = headerElement.contains(event.target);
        const isMenuOpen = !navLinks.classList.contains("hidden");

        if (!isClickInsideMenu && isMenuOpen) {
            navLinks.classList.add("hidden");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

function setupDarkModeToggle() {
    const checkbox = document.getElementById("dark-mode-checkbox");

    // Initialize checkbox from localStorage
    const saved = localStorage.getItem("dark-mode");
    const isDark = saved === "true";

    document.body.classList.toggle("dark-mode", isDark);
    checkbox.checked = isDark;

    // Listen for changes
    checkbox.addEventListener("change", () => {
        const enabled = checkbox.checked;
        document.body.classList.toggle("dark-mode", enabled);
        localStorage.setItem("dark-mode", String(enabled));
    });
}


insertHeader();











