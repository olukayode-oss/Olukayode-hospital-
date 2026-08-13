/* =========================================================
   OLUKAYODE HOSPITAL JAVASCRIPT
========================================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* Close menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* ================= ANIMATED COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(
                counter.getAttribute("data-target")
            );

            let current = 0;

            const speed = Math.max(
                10,
                Math.floor(1500 / target)
            );

            const updateCounter = () => {

                current += 1;

                if (current >= target) {

                    counter.textContent = target + "+";

                } else {

                    counter.textContent = current;

                    setTimeout(updateCounter, speed);

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: 0.6
    }

);

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= FAQ ================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item = question.parentElement;

        const answer =
            item.querySelector(".faq-answer");


        document.querySelectorAll(".faq-item")
            .forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    otherItem.querySelector(".faq-answer")
                        .style.maxHeight = null;

                }

            });


        item.classList.toggle("active");


        if (item.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;

        }

    });

});


/* ================= GALLERY LIGHTBOX ================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image =
            item.getAttribute("data-image");

        lightboxImage.src = image;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeGallery() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);


lightbox.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {

            closeGallery();

        }

    }
);


/* ================= WHATSAPP ENQUIRY ================= */

const whatsappForm =
    document.getElementById("whatsappForm");


whatsappForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
            .value.trim();


        const phone =
            document.getElementById("phone")
            .value.trim();


        const subject =
            document.getElementById("subject")
            .value.trim();


        const message =
            document.getElementById("message")
            .value.trim();


        /*
            Hospital WhatsApp number.

            International format:
            Nigeria +234
            8033602308
        */

        const hospitalNumber =
            "2348033602308";


        const text =
`Hello Olukayode Hospital.

NEW WEBSITE ENQUIRY

Name: ${name}

Phone: ${phone}

Subject: ${subject}

Message:
${message}`;


        const whatsappURL =
            "https://wa.me/" +
            hospitalNumber +
            "?text=" +
            encodeURIComponent(text);


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeGallery();

        }

    }
);
