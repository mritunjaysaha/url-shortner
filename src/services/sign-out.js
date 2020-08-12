function UserSignOut(signout) {
    console.log(signout);
    this.signoutBtn = document.querySelector(signout.button);

    console.log(this.signoutBtn);

    this.bindEvents();
}

UserSignOut.prototype.bindEvents = function () {
    this.signoutBtn.addEventListener("click", () => {
        console.log("clicked");
        this.signout().then((res) => {
            const { msgBody, msgError } = res.message;

            if (msgError) {
                console.log(msgBody);
            } else {
                console.log(msgBody);
                window.location.href = "index.html";
            }
        });
    });
};

UserSignOut.prototype.signout = async function () {
    return await fetch("http://localhost:8000/signout")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};
new UserSignOut({ button: "#signout-btn" });
