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

    this.btnNumber = 0;
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

    this.createComponent();
};

ShortenURL.prototype.bindEvents = function () {
    this.input.addEventListener("input", (e) => {
        this.url = e.target.value;
        console.log(this.url);
    });

    this.shortenBtn.addEventListener("click", (e) => {
        this.generateLink(this.url);
    });

    this.el.addEventListener("click", (e) => {
        const linkNumber = e.target.dataset["number"];
        const link = document.querySelector(`p[data-link="${linkNumber}"]`);
        console.log(linkNumber);
        console.log(link);

        if (this.copyToClipboard(link)) {
            console.log("copied");
            this.changeButtonText(linkNumber);
        } else {
            console.log("sahdkas");
        }
    });
};

/**
 *
 * @param {<p></p>} shortURLNode
 */
ShortenURL.prototype.copyToClipboard = function (shortURLNode) {
    try {
        const range = document.createRange();
        window.getSelection().removeAllRanges();
        range.selectNode(shortURLNode);
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        return true;
    } catch (err) {
        return false;
    }
};

ShortenURL.prototype.changeButtonText = function (btnDataSet) {
    const btn = document.querySelector(`button[data-number='${btnDataSet}']`);
    btn.classList.add("add-violet");
    btn.innerText = "Copied!";

    setTimeout(function () {
        btn.classList.remove("add-violet");
    }, 2000);
};

ShortenURL.prototype.createComponent = function () {
    const container = document.createElement("div");
    container.classList.add("shortened-links");

    const link = document.createElement("p");
    link.innerText = this.url;
    link.classList.add("links");

    container.appendChild(link);

    const linkandbtn = document.createElement("div");
    linkandbtn.classList.add("shortened-links-btn");

    const shortlink = document.createElement("p");
    shortlink.innerText = this.shortenedUrl;
    shortlink.classList.add("links");
    shortlink.classList.add("blue");
    shortlink.dataset["link"] = this.btnNumber;

    linkandbtn.appendChild(shortlink);

    const copybtn = document.createElement("button");
    copybtn.classList.add("btn-copy");
    copybtn.innerText = "Copy";
    copybtn.dataset["number"] = this.btnNumber;
    this.btnNumber++;

    linkandbtn.appendChild(copybtn);

    container.appendChild(linkandbtn);
    this.el.appendChild(container);
};

new ShortenURL(
    "#shortened-links-container",
    "#url-input",
    "#shorten-btn",
    ".shortened-links"
);
