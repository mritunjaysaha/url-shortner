function UserSignOut(signout) {
    console.log(signout);
    this.signoutBtn = document.querySelector(signout.button);
    this.signoutBtnMobile = document.querySelector("#signout-btn-mobile");
    console.log(this.signoutBtn);
    console.log(this.signoutBtnMobile);

    this.bindEvents();
}

UserSignOut.prototype.bindEvents = function () {
    this.signoutBtn.addEventListener("click", (e) => {
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

    this.signoutBtnMobile.addEventListener("click", (e) => {
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

// UserSignOut.prototype.signout = async function () {
//     return await fetch("http://localhost:8000/signout")
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {
//             return data;
//         });
// };

UserSignOut.prototype.signout = async function () {
    console.log("here");
    const response = await fetch("http://localhost:8000/api/user");
    const processedResponse = await response.json();
    console.log(response);
    console.log(processedResponse);
};
new UserSignOut({ button: "#signout-btn" });
