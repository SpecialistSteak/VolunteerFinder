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
    document.addEventListener("keydown", handleKeyPress);
}

function closeExpandedCard() {
    var expandedCard = document.querySelector(".card.expanded");
    if (expandedCard) {
        expandedCard.classList.remove("expanded");
        document.getElementById("overlay").style.display = "none";
        document.removeEventListener("keydown", handleKeyPress);
    }
}

function handleKeyPress(event) {
    if (event.key === "Escape") {
        closeExpandedCard();
    }
}

// function expandCard(card) {
//     card.classList.add("expanded");
//     document.getElementById("overlay").style.display = "block";
// }
//
// function closeExpandedCard() {
//     var expandedCard = document.querySelector(".card.expanded");
//     if (expandedCard) {
//         expandedCard.classList.remove("expanded");
//         document.getElementById("overlay").style.display = "none";
//     }
// }

/*
Template for HTML Card:
<div class="card" onclick="expandCard(this)">
        <div class="card-image">
            <img src="https://wallpapercave.com/wp/L2sK0lI.jpg" alt="Volunteer Opportunity 1">
        </div>
        <div class="card-content">
            <h2>Volunteer Opportunity 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod nisi, ac malesuada velit
                bibendum vel. Donec euismod nisl ut magna aliquam, eget bibendum sapien lacinia.</p>
            <p><strong>URL:</strong> <a href="#">...</a></p>
            <p><strong>Name:</strong> Volunteer Opportunity 1</p>
            <p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p><strong>Location:</strong> ...</p>
        </div>
    </div>
 */