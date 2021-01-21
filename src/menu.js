class Menu {
    constructor(menuBtn, exitBtn, nav) {
        this.menuBtn = this.getElement(menuBtn);
        this.exitBtn = this.getElement(exitBtn);
        this.nav = this.getElement(nav);

        console.log(this.menuBtn);
        console.log(this.exitBtn);
        console.log(this.nav);

        this.bindEvents();
    }

    bindEvents() {
        this.menuBtn.addEventListener("click", () => {
            this.nav.classList.add("open-nav");
            this.menuBtn.style.display = "none";
            this.exitBtn.style.display = "block";
        });
        this.exitBtn.addEventListener("click", () => {
            this.nav.classList.remove("open-nav");
            this.menuBtn.style.display = "block";
            this.exitBtn.style.display = "none";
        });
    }

    getElement(element) {
        return document.querySelector(element);
    }
}

new Menu("#menu-btn", "#exit-btn", "#nav");
