window.addEventListener("scroll", function () {
    var scrollHeight = window.pageYOffset;
    var scrollToTop = document.getElementById("scroll-to-top");

    if (scrollHeight > 300) {
        scrollToTop.classList.add("active");
    } else {
        scrollToTop.classList.remove("active");
    }
});