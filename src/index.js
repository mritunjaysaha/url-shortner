/**
 *
 * @param {id} el container for the shortened links
 * @param {id} inputEL input for the url
 * @param {id} shortenBtn button to generate the shorten link
 */

function ShortenURL(el, inputEL, shortenBtn, shortenBtnP, spinnerContainer) {
    this.el = document.querySelector(el);
    this.input = document.querySelector(inputEL);
    this.shortenBtn = document.querySelector(shortenBtn);
    this.shortenBtnP = document.querySelector(shortenBtnP);
    this.spinnerContainer = document.querySelector(spinnerContainer);

    this.btnNumber = 0;
    this.url = "";
    this.shortenedUrl = "";
    this.startSpinner = false;

    this.bindEvents();
}

ShortenURL.prototype.startAnimation = function () {
    this.shortenBtnP.style.display = "none";
    this.spinnerContainer.style.display = "block";
};

ShortenURL.prototype.stopAnimation = function () {
    this.shortenBtnP.style.display = "block";
    this.spinnerContainer.style.display = "none";
};

/**
 *
 * @param {String} url
 */
ShortenURL.prototype.generateLink = async function (url) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const processedResponse = await response.json();
    console.log(processedResponse.result);
    console.log(processedResponse.result.full_short_link);
    this.shortenedUrl = processedResponse.result.full_short_link;
    this.createComponent();

    if (this.shortenedUrl !== "") {
        this.stopAnimation();
    }

    this.shortenedUrl = "";
};

ShortenURL.prototype.bindEvents = function () {
    this.input.addEventListener("input", (e) => {
        this.url = e.target.value;
        console.log(this.url);
    });

    this.shortenBtn.addEventListener("click", (e) => {
        this.startAnimation();
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
        }
    });
};

/**
 *
 * @param {<p></p>} shortURLNode
 * @returns {bool}
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
        btn.innerText = "Copy";
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
    "#shorten-btn-p",
    ".spinner-container"
);
