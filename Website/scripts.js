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
        let country = document.getElementById("city").value;
        let city = document.getElementById("area").value;
        let keywords = document.getElementById("keywords").value.split("/");
        keywords = keywords.map(keyword => keyword.trim()).filter(keyword => keyword !== "");

        console.log(country);
        console.log(city);
        console.log(keywords);

        const fullScreenDiv = document.querySelector('.full-screen');

        fade(fullScreenDiv, function() {
            fullScreenDiv.remove();  // Remove the element after fade completes
        });
    });
});

function fade(element, callback) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            callback();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}