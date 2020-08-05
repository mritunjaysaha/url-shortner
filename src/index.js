/**
 * @param
 * @return hashid, the hashid is added to https://rel.ink/${hashid}
 */
async function shortly() {
    const body = JSON.stringify({
        url:
            "https://www.frontendmentor.io/solutions/desktopfirst-shortly-landing-page-with-react-and-sass-wUwZMU7sl/preview",
    });

    const res = await fetch("https://rel.ink/api/links/", {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log(await res.json());
}

// https://rel.ink/9yXG7L
// https://rel.ink/${hashid}
shortly();
