function scrollDown() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
    });

}

function scrollUp() {
    window.scrollBy({
        top: -window.innerHeight,
        behavior: 'smooth'
    })
}

function clickOnX() {
    alert('you cliciked on X');
}



