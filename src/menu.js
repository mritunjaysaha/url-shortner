function Menu(el, button, icon, close) {
    this.el = document.querySelector(el);
    this.button = document.querySelector(button);
    this.hamburgerMenuIcon = document.querySelector(icon);
    this.closeIcon = document.querySelector(close);
    this.displayMenu = false;
    this.bindEvents();
}

Menu.prototype.bindEvents = function () {
    this.button.addEventListener("click", () => {
        if (this.displayMenu === false) {
            this.el.style.display = "flex";
            this.displayMenu = true;
            this.hamburgerMenuIcon.style.display = "none";
            this.closeIcon.style.display = "block";
        } else {
            this.el.style.display = "none";
            this.displayMenu = false;
            this.hamburgerMenuIcon.style.display = "block";
            this.closeIcon.style.display = "none";
        }
    });
};

new Menu("#menu", "#hamburger", ".hamburger-icon", ".menu-close-icon");
