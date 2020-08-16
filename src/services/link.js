async function createLink(data) {
    const res = await fetch("http://localhost:8000/api/links/create", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const processed = await res.json();

    console.log(processed);
}
const data = {
    url: "asdkjahsj",
    shortenUrl: "shortenit",
    createdBy: "5f37ee8e926e5a652493296d",
};
createLink(data);
