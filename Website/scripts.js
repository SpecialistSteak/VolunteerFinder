window.addEventListener("scroll", function () {
    let scrollHeight = window.scrollY;
    let scrollToTop = document.getElementById("scroll-to-top");

    if (scrollHeight > 300) {
        scrollToTop.classList.remove("inactive");
        scrollToTop.classList.add("active");
    } else {
        scrollToTop.classList.remove("active");
        scrollToTop.classList.add("inactive");
    }
});

function expandCard(card) {
    console.log("EXPAND");
    card.classList.add("expanded");

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";
    card.appendChild(closeBtn);

    document.getElementById("overlay").style.display = "block";
    closeBtn.addEventListener("click", closeExpandedCard);
    document.addEventListener("keydown", handleKeyPress);
}

function closeExpandedCard() {
    //This is really scuffed, but it works
    setTimeout(function () {
        console.log("CLOSE");
        let closeBtn = document.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.removeAttribute("onclick");
            closeBtn.remove();
        }
        let expandedCard = document.querySelector(".card.expanded");
        if (expandedCard) {
            expandedCard.classList.remove("expanded");
            document.getElementById("overlay").style.display = "none";
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, 0);
    let closeBtn = document.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.removeAttribute("onclick");
        closeBtn.remove();
    }
}

function handleKeyPress(event) {
    if (event.key === "Escape") {
        console.log("ESCAPE")
        closeExpandedCard();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("input-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let country = document.getElementById("country").value;
        let city = document.getElementById("city").value;
        let keywords = document.getElementById("keywords").value.split("/");

        console.log(country);
        console.log(city);
        console.log(keywords);

        const fullScreenDiv = document.querySelector('.full-screen');
        fullScreenDiv.remove();
    });
});
