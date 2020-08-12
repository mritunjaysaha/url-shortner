const url = "http://localhost:8000";

function UserSignInSignUp(signin, signup) {
    this.signinEmail = document.querySelector(signin.email);
    this.signinPassword = document.querySelector(signin.password);
    this.signinBtn = document.querySelector(signin.button);

    this.signupEmail = document.querySelector(signup.email);
    this.signupPassword = document.querySelector(signup.password);
    this.signupBtn = document.querySelector(signup.button);

    this.email = "test@test.com";
    this.password = "123456789";

    this.bindEvents();
}

UserSignInSignUp.prototype.bindEvents = function () {
    this.signinEvents();
    this.signupEvents();
};

UserSignInSignUp.prototype.signinEvents = function () {
    this.signinEmail.addEventListener("keyup", (e) => {
        this.email = e.target.value;
    });

    this.signinPassword.addEventListener("keyup", (e) => {
        this.password = e.target.value;
    });

    this.signinBtn.addEventListener("click", (e) => {
        this.signin({
            email: this.email,
            password: this.password,
        }).then((res) => {
            console.log(res !== true);
            if (res) {
                window.location.href = "home.html";
            }
        });
    });
};

UserSignInSignUp.prototype.signupEvents = function () {
    this.signupEmail.addEventListener("keyup", (e) => {
        this.email = e.target.value;
    });

    this.signupPassword.addEventListener("keyup", (e) => {
        this.password = e.target.value;
    });

    this.signupBtn.addEventListener("click", (e) => {
        console.log("clicked");
        this.signup({
            email: this.email,
            password: this.password,
        }).then((res) => {
            console.log(res);
            const { msgBody, msgError } = res.message;
            if (msgError) {
                console.log({ msgBody });
            } else {
                console.log("redirect to the login section");
            }
        });
    });
};

/**
 * sends email and password to the signin endpoint
 * @param {JSON} user
 */
UserSignInSignUp.prototype.signin = async function (user) {
    return fetch(`${url}/signin`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        const { status } = res;
        console.log(res);
        if (status !== 400 || status !== 401) {
            return res.json({ status });
        } else {
            return res.json({
                message: { msgBody: "Error while signin", msgError: true },
            });
        }
    });
    // .then((data) => data);
};

/**
 * sends email and password to the signup endpoint
 * @param {JSON} user
 */
UserSignInSignUp.prototype.signup = async function (user) {
    return await fetch(`${url}/signup`, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (status !== 400 || status !== 401) {
                return res.json({ status });
            } else {
                return res.json({
                    message: { msgBody: "Error while signin", msgError: true },
                });
            }
        })
        .then((data) => {
            return data;
        });
};

new UserSignInSignUp(
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
