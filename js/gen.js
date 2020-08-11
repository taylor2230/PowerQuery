function mobileMenu() {
    let elements = document.getElementsByClassName("nav-link");
    let btn = document.getElementsByClassName('nav-control')[0];
    let style;
    let text;
    if(elements[0].style.display === "none") {
        style = "";
        text = "▲";
    } else {
        style = "none";
        text = "▼";
    }

    for(let i = 0; i < elements.length; i++) {
        elements[i].style.display = style;
    }
    btn.innerText = text;
}

function windowSize() {
    let w = window.innerWidth;
    if(w >= 740) {
        let elements = document.getElementsByClassName("nav-link");
        let btn = document.getElementsByClassName('nav-control')[0];

        for(let i = 0; i < elements.length; i++) {
            elements[i].style.display = "";
        }

        btn.innerText = "▲";
    }
}
