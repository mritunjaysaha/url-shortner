async function getUser() {
    const response = await fetch("localhost:8000/api/user");
    const processedResponse = await response.json();
    console.log(processedResponse);
}

getUser();
