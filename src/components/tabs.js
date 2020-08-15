function Tabs() {
    this.el = document.querySelector(".tabs-tab");
    this.signin = document.querySelector("#signin");
    this.signup = document.querySelector("#signup");

    this.previousTab = document.querySelector(`article[data-val='signin']`);
    console.log(this.el);

    this.bindEvents();
}

Tabs.prototype.bindEvents = function () {
    this.el.addEventListener("click", (e) => {
        const tab = e.target.dataset["val"];
        console.log(tab);
        const selectedTab = document.querySelector(
            `article[data-val='${tab}']`
        );

        if (tab === "signin") {
            this.previousTab.classList.remove("selected-tab");
            this.signin.style.display = "flex";
            this.signup.style.display = "none";
        } else {
            console.log("here", this.previousTab);
            this.previousTab.classList.remove("selected-tab");
            this.signin.style.display = "none";
            this.signup.style.display = "flex";
        }
        this.previousTab = selectedTab;
        selectedTab.classList.add("selected-tab");
    });
};

new Tabs();
