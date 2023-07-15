window.addEventListener("scroll", function () {
    var scrollHeight = window.pageYOffset;
    var scrollToTop = document.getElementById("scroll-to-top");

    if (scrollHeight > 300) {
        scrollToTop.classList.add("active");
    } else {
        scrollToTop.classList.remove("active");
    }
});

function expandCard(card) {
    card.classList.add("expanded");
    document.getElementById("overlay").style.display = "block";
}

function closeExpandedCard() {
    var expandedCard = document.querySelector(".card.expanded");
    if (expandedCard) {
        expandedCard.classList.remove("expanded");
        document.getElementById("overlay").style.display = "none";
    }
}
