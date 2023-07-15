window.addEventListener("scroll", function () {
    let scrollHeight = window.scrollY;
    let scrollToTop = document.getElementById("scroll-to-top");

    if (scrollHeight > 300) {
        scrollToTop.classList.add("active");
    } else {
        scrollToTop.classList.remove("active");
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
    } , 0);
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