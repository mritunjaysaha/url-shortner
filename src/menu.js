function Menu(el, button) {
    this.el = document.querySelector(el);
    this.button = document.querySelector(button);

    this.displayMenu = false;

    this.bindEvents();
}

Menu.prototype.bindEvents = function () {
    this.button.addEventListener("click", (e) => {
        console.log("clicked");
        // this.el.style.display = "flex";
        if (this.displayMenu === false) {
            this.el.style.display = "flex";
            this.displayMenu = true;
        } else {
            this.el.style.display = "none";
            this.displayMenu = false;
        }
    });
};

new Menu("#menu", "#hamburger");
