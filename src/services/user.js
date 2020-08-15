async function getUser() {
    const response = await fetch("http://localhost:8000/api/user");
    const processedResponse = await response.json();
    console.log(processedResponse);
}

getUser();
