const url = "http://localhost:8000";

/**
 * sends email and password to the signin endpoint
 * @param {JSON} user
 */
async function signin(user) {
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
}

/**
 * sends email and password to the signup endpoint
 * @param {JSON} user
 */
async function signup(user) {
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
}

async function signout() {
    return await fetch(`${url}/signout`)
        .then((res) => res.json())
        .then((data) => data);
}
// signin
const signinuser = {
    email: "test@test.com",
    password: "123456789",
};

signin(signinuser).then((data) => {
    console.log({ data });
});

// const signupuser = {
//     email: "test@google.com",
//     password: "123456789",
// };

// signup(signupuser).then((data) => {
//     console.log("signup", data);
// });

// signout();
