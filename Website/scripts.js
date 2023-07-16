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

//     foreach item in this, create a card in the format
//     <div className="card content flow" onClick="expandCard(this)">
//         <div className="card-image">
//             <img src="https://wallpapercave.com/wp/L2sK0lI.jpg" alt="Volunteer Opportunity 1">
//         </div>
//         <div className="card-content">
//             <h2>Volunteer Opportunity 1</h2>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod nisi, ac malesuada velit
//                 bibendum vel. Donec euismod nisl ut magna aliquam, eget bibendum sapien lacinia.</p>
//             <p><strong>URL:</strong> <a href="#">...</a></p>
//
//             <p><strong>Telephone Number:</strong> ...</p>
//         </div>
//     </div>

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("input-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        let country = document.getElementById("city").value;
        let city = document.getElementById("area").value;
        let keywords = document.getElementById("keywords").value.split("/");
        keywords = keywords.map(keyword => keyword.trim()).filter(keyword => keyword !== "");
        if (typeof keywords === "string") {
            keywords = [keywords];
        }

        let x = await getVolunteerOpportunities(country, city, keywords);
        console.log(x);
        let y = await getVolunteers(x);
        console.log(y);

        const fullScreenDiv = document.querySelector('.full-screen');

        fade(fullScreenDiv, function () {
            fullScreenDiv.remove();  // Remove the element after fade completes
        });
    });
});

async function getVolunteers(query) {
    const options = {method: 'GET'};

    fetch("http://localhost:8080/results?query=" + query, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function getVolunteerOpportunities(country, city, keywords) {
    const params = new URLSearchParams({
        city: city,
        country: country,
        keywords: keywords,
    });
    const url = `http://localhost:8080/query?${params.toString()}`;
    let queryLink;

    fetch(url, { method: "POST" })
        .then((response) => response.json())
        .then((response) =>{
            console.log(response);
            queryLink = response;
        })
        .catch((err) => console.error(err));
    return queryLink;
}

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
};