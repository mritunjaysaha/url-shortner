const url = "http://localhost:8000";

function UserLoginRegistration(signin, signup) {
    this.signinEmail = document.querySelector(signin.email);
    this.signinPassword = document.querySelector(signin.password);
    this.signinBtn = document.querySelector(signin.button);

    this.signupEmail = document.querySelector(signup.email);
    this.signupPassword = document.querySelector(signup.password);
    this.signupBtn = document.querySelector(signup.button);

    this.email = "";
    this.password = "";

    this.bindEvents();
}

UserLoginRegistration.prototype.bindEvents = function () {
    this.signinEmail.addEventListener("keyup", (e) => {
        this.email = e.target.value;
        console.log(this.email);
    });
};

/**
 * sends email and password to the signin endpoint
 * @param {JSON} user
 */
UserLoginRegistration.prototype.signin = async function (user) {
    return fetch(`${url}/signin`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            const { status } = res;
            console.log({ status });
            if (status !== 400 || status !== 401) {
                return res.json();
            } else {
                return res.json({
                    message: { msgBody: "Error while signin", msgError: true },
                });
            }
        })
        .then((data) => data);
};

/**
 * sends email and password to the signup endpoint
 * @param {JSON} user
 */
UserLoginRegistration.prototype.signup = async function (user) {
    console.log("signup");
    return await fetch(`${url}/signup`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

new UserLoginRegistration(
    {
        email: "#signin-email",
        password: "#signin-password",
        button: "#signin-btn",
    },
    {
        email: "#signup-email",
        password: "#signup-password",
        button: "#signup-btn",
    }
);
