signin = async (user) => {
    return fetch(`http://localhost:8000/signin`, {
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

const user = {
    email: "test@test.com",
    password: "123456789",
};

signin(user).then((data) => {
    console.log({ data });
});
