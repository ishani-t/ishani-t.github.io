/* Your JS here. */
console.log('Hello World!')


// NAVBAR: smooth scrolling, resizing, position indications
window.onscroll = function() { scrollOffset() };
var navbar = document.getElementById("navbar");
var top_holder = document.getElementById("top-offset")
var navlinks = document.querySelectorAll(".smooth-scroll");

var navOffset = navbar.offsetHeight;

navlinks.forEach(link => {
    link.addEventListener('click', function handleClick(e) {

        // console.log('box clicked', e);
        // console.log(this.hash);

        var section = document.querySelector(this.hash);
        var navbar_height = navbar.offsetHeight;

        var sect_prop = section.getBoundingClientRect();

        e.preventDefault();
        window.scrollTo(0, sect_prop.top + window.scrollY - navbar_height + 1);

    })
})

function scrollOffset() {
    // console.log(navOffset);
    scrollpos = window.scrollY;
    
    if(scrollpos > navOffset) {
        navbar.classList.add("nav-fixed");
        top_holder.style.height= navbar.offsetHeight.toString() + "px";
    } else {
        navbar.classList.remove("nav-fixed");
        top_holder.style.height= navbar.offsetHeight.toString() + "px";
    }

    navlinks.forEach(link => {
        let section = document.querySelector(link.hash);
        // console.log(section);
        // console.log(section.offsetTop);
        if(scrollpos + navbar.offsetHeight > section.offsetTop) {
            if(scrollpos + navbar.offsetHeight < section.offsetTop + section.offsetHeight) {
                if(link != navlinks[0]) {
                    link.classList.add("nav-item-active");
                }
            } else {
                link.classList.remove("nav-item-active");
            }
            // console.log(section);
        } else {
            link.classList.remove("nav-item-active");
        }

    })

    if(window.innerHeight + scrollpos + 1 >= document.body.offsetHeight) {
        navlinks.forEach(link => {
            link.classList.remove("nav-item-active");
        })
        navlinks[navlinks.length - 1].classList.add("nav-item-active");
    }

}


// MODAL POPUPS
var modals = document.querySelectorAll(".modal");
var modalButtons = document.querySelectorAll(".modal-button");
var spans = document.querySelectorAll(".close");

modalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const index = Array.from(modalButtons).indexOf(e.target);
        modals[index].style.display="block";
    });
})

spans.forEach(close=> {
    close.addEventListener('click', (e) => {
        const index = Array.from(spans).indexOf(e.target);
        modals[index].style.display="none";
    })
})

window.onclick = function(e) {
    console.log("here");
    for(var i = 0; i < modals.length; i++) {
        if (e.target == modals[i]) {
            modals[i].style.display = "none";
        }
    }
}


// CAROUSEL LISTENERS
var next_button = document.getElementById("carousel-next");
var prev_button = document.getElementById("carousel-prev");
var dots = document.querySelectorAll(".dot");

// initialize to 0th slide
let slideIndex = 0;
setSlideVisible(slideIndex);

// event listeners for arrows and dots
next_button.addEventListener('click', function(e) {
    setSlideVisible(slideIndex += 1);
})

prev_button.addEventListener('click', function(e) {
    setSlideVisible(slideIndex -= 1);
})


dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = Array.from(dots).indexOf(e.target);
        setSlideVisible(slideIndex = index);

    })
})

function setSlideVisible(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n >= slides.length) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
}