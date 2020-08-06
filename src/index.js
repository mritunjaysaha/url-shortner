/**
 *
 * @param {id} el container for the shortened links
 * @param {id} inputEL input for the url
 * @param {id} shortenBtn button to generate the shorten link
 */
function ShortenURL(el, inputEL, shortenBtn) {
    this.el = document.querySelector(el);
    this.input = document.querySelector(inputEL);
    this.shortenBtn = document.querySelector(shortenBtn);

    this.url = "";
    this.shortenedUrl = "";

    this.bindEvents();
}

/**
 *
 * @param {String} url
 */
ShortenURL.prototype.generateLink = async function (url) {
    const body = JSON.stringify({
        url: url,
    });
    const res = await fetch("https://rel.ink/api/links/", {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json",
        },
    });
    const processedRes = await res.json();
    const hashid = processedRes.hashid;
    console.log(hashid);
    this.shortenedUrl = `https://rel.ink/${hashid}`;
};

ShortenURL.prototype.bindEvents = function () {
    this.input.addEventListener("input", (e) => {
        this.url = e.target.value;
        console.log(this.url);
    });

    this.shortenBtn.addEventListener("click", (e) => {
        console.log("clicked");
        this.generateLink(this.url);
        this.createComponent();
    });
};

ShortenURL.prototype.createComponent = function () {
    const container = document.createElement("div");
    container.classList.add("shortened-links");

    const link = document.createElement("p");
    link.innerText = "https://mritunjaysaha.netlify.app";
    link.classList.add("links");

    container.appendChild(link);

    const linkandbtn = document.createElement("div");
    linkandbtn.classList.add("shortened-links-btn");

    const shortlink = document.createElement("p");
    shortlink.innerText = "https://rel.ink/sjhdkja";
    shortlink.classList.add("links");
    shortlink.classList.add("blue");

    linkandbtn.appendChild(shortlink);

    const copybtn = document.createElement("button");
    copybtn.classList.add("btn-copy");
    copybtn.innerText = "Copy";

    linkandbtn.appendChild(copybtn);

    container.appendChild(linkandbtn);
    this.el.appendChild(container);
};
new ShortenURL("#shortened-links-container", "#url-input", "#shorten-btn");
