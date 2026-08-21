"use strict";

/*
=========================================================
OLUKAYODE HOSPITAL
COMPLETE WEBSITE JAVASCRIPT

IMPORTANT:
The website does NOT depend on Three.js anymore.

The 3D anatomy models are loaded through isolated
Sketchfab iframes.

Therefore a 3D failure cannot kill the website.
=========================================================
*/


/* =====================================================
HELPERS
===================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


function safe(fn) {

    try {
        fn();
    } catch (error) {
        console.error(
            "Olukayode feature error:",
            error
        );
    }

}


/* =====================================================
DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    safe(initMobileMenu);
    safe(initReveal);
    safe(initCounters);
    safe(initFAQ);
    safe(initGallery);
    safe(initTestimonials);
    safe(initWhatsApp);
    safe(initBackToTop);
    safe(initYear);
    safe(initBodyExplorer);
    safe(initSketchfabModels);

});


/* =====================================================
MOBILE MENU
===================================================== */

function initMobileMenu() {

    const menuBtn = $("#menuBtn");
    const nav = $("#navMenu");

    if (!menuBtn || !nav) return;


    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        const open =
            nav.classList.contains("active");

        menuBtn.setAttribute(
            "aria-label",
            open ? "Close menu" : "Open menu"
        );

        menuBtn.textContent =
            open ? "×" : "☰";

    });


    $$("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });

}


/* =====================================================
SCROLL REVEAL
===================================================== */

function initReveal() {

    const elements = $$(".reveal");

    if (!elements.length) return;


    if (!("IntersectionObserver" in window)) {

        elements.forEach(el =>
            el.classList.add("visible")
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(el =>
        observer.observe(el)
    );

}


/* =====================================================
COUNTERS
===================================================== */

function initCounters() {

    const counters = $$(".counter");

    if (!counters.length) return;


    function animate(counter) {

        const target =
            Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;


        const duration = 1500;
        const start = performance.now();


        function update(time) {

            const progress =
                Math.min(
                    (time - start) / duration,
                    1
                );


            const eased =
                1 - Math.pow(1 - progress, 3);


            counter.textContent =
                Math.floor(target * eased);


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

            }

        }


        requestAnimationFrame(update);

    }


    if (!("IntersectionObserver" in window)) {

        counters.forEach(animate);

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animate(entry.target);

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .5
            }
        );


    counters.forEach(counter =>
        observer.observe(counter)
    );

}


/* =====================================================
FAQ

THIS FIXES THE FAQ ISSUE.
===================================================== */

function initFAQ() {

    const questions =
        $$(".faq-question");

    if (!questions.length) return;


    questions.forEach(question => {

        question.addEventListener("click", () => {

            const item =
                question.closest(".faq-item");

            if (!item) return;


            const wasOpen =
                item.classList.contains("active");


            /* Close every other question */

            $$(".faq-item").forEach(other => {

                if (other !== item) {

                    other.classList.remove(
                        "active"
                    );

                    const otherButton =
                        $(".faq-question", other);

                    if (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


            /* Toggle clicked question */

            item.classList.toggle(
                "active",
                !wasOpen
            );


            question.setAttribute(
                "aria-expanded",
                String(!wasOpen)
            );

        });

    });

}


/* =====================================================
GALLERY
===================================================== */

function initGallery() {

    const items =
        $$(".gallery-item");

    const lightbox =
        $("#lightbox");

    const image =
        $("#lightboxImage");

    const closeButton =
        $("#closeLightbox");


    if (!items.length || !lightbox || !image) {
        return;
    }


    items.forEach(item => {

        item.addEventListener("click", () => {

            const source =
                item.dataset.image ||
                $("img", item)?.src;

            if (!source) return;


            image.src = source;

            lightbox.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        });

    });


    function close() {

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

        setTimeout(() => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                image.src = "";

            }

        }, 300);

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            close
        );

    }


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                close();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains("active")
            ) {

                close();

            }

        }
    );

}


/* =====================================================
TESTIMONIALS
===================================================== */

function initTestimonials() {

    const track =
        $("#testimonialTrack");

    const previous =
        $("#testimonialPrev");

    const next =
        $("#testimonialNext");

    const dots =
        $("#testimonialDots");


    if (!track) return;


    const cards =
        $$(".testimonial-card", track);

    if (!cards.length) return;


    let index = 0;


    function visibleCards() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;

    }


    function maxIndex() {

        return Math.max(
            0,
            cards.length - visibleCards()
        );

    }


    function update() {

        const visible =
            visibleCards();

        const max =
            maxIndex();


        if (index > max) {
            index = max;
        }


        const width =
            cards[0].getBoundingClientRect().width;


        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;


        const offset =
            index * (width + gap);


        track.style.transform =
            `translateX(-${offset}px)`;


        updateDots();

    }


    function updateDots() {

        if (!dots) return;


        dots.innerHTML = "";


        const total =
            maxIndex() + 1;


        for (
            let i = 0;
            i < total;
            i++
        ) {

            const dot =
                document.createElement("button");


            dot.type = "button";

            dot.className =
                "testimonial-dot";


            if (i === index) {

                dot.classList.add(
                    "active"
                );

            }


            dot.setAttribute(
                "aria-label",
                `Go to testimonial ${i + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    index = i;

                    update();

                }
            );


            dots.appendChild(dot);

        }

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                const max =
                    maxIndex();

                index =
                    index >= max
                        ? 0
                        : index + 1;

                update();

            }
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                const max =
                    maxIndex();

                index =
                    index <= 0
                        ? max
                        : index - 1;

                update();

            }
        );

    }


    window.addEventListener(
        "resize",
        update
    );


    update();

}


/* =====================================================
WHATSAPP
===================================================== */

function initWhatsApp() {

    const form =
        $("#whatsappForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#name")?.value.trim() || "";

            const phone =
                $("#phone")?.value.trim() || "";

            const subject =
                $("#subject")?.value.trim() || "";

            const message =
                $("#message")?.value.trim() || "";


            if (
                !name ||
                !phone ||
                !subject ||
                !message
            ) {

                alert(
                    "Please complete all fields before continuing."
                );

                return;

            }


            const number =
                "2348033602308";


            const text =
`Hello Olukayode Hospital,

My name is ${name}.

Phone: ${phone}

Subject: ${subject}

Enquiry:
${message}`;


            const url =
                `https://wa.me/${number}?text=${encodeURIComponent(text)}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =====================================================
BACK TO TOP
===================================================== */

function initBackToTop() {

    const button =
        $("#backToTop");

    if (!button) return;


    function update() {

        button.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }


    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    update();

}


/* =====================================================
YEAR
===================================================== */

function initYear() {

    const year =
        $("#year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =====================================================
BODY INFORMATION
===================================================== */

function initBodyExplorer() {

    const buttons =
        $$(".body-part-btn");

    const title =
        $("#bodyPartTitle");

    const description =
        $("#bodyPartDescription");

    const facts =
        $("#bodyPartFacts");


    if (!buttons.length) return;


    const data = {

        brain: {
            title: "Brain",
            description:
                "The brain is the main organ of the nervous system. It helps control movement, senses, memory, thinking and many automatic body functions.",
            system: "Nervous system",
            focus: "Control & coordination"
        },

        heart: {
            title: "Heart",
            description:
                "The heart is a muscular organ that pumps blood around the body through the circulatory system.",
            system: "Circulatory system",
            focus: "Blood circulation"
        },

        lungs: {
            title: "Lungs",
            description:
                "The lungs are organs of the respiratory system. They help exchange oxygen and carbon dioxide during breathing.",
            system: "Respiratory system",
            focus: "Gas exchange"
        },

        stomach: {
            title: "Digestive System",
            description:
                "The digestive system breaks food down into nutrients that the body can absorb and use.",
            system: "Digestive system",
            focus: "Digestion"
        },

        bones: {
            title: "Skeletal System",
            description:
                "The skeletal system provides structural support, protects important organs and works with muscles to enable movement.",
            system: "Skeletal system",
            focus: "Support & movement"
        },

        muscles: {
            title: "Muscular System",
            description:
                "Muscles allow the body to move and contribute to posture and other important functions.",
            system: "Muscular system",
            focus: "Movement"
        }

    };


    function selectPart(part) {

        const selected =
            data[part];

        if (!selected) return;


        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.part === part
            );

        });


        if (title) {

            title.textContent =
                selected.title;

        }


        if (description) {

            description.textContent =
                selected.description;

        }


        if (facts) {

            facts.innerHTML = `

                <div>
                    <span>System</span>
                    <strong>
                        ${selected.system}
                    </strong>
                </div>

                <div>
                    <span>Focus</span>
                    <strong>
                        ${selected.focus}
                    </strong>
                </div>

            `;

        }

    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectPart(
                    button.dataset.part
                );

            }
        );

    });


    selectPart("brain");

}


/* =====================================================
SKETCHFAB 3D MODEL SYSTEM
=====================================================

No Three.js.
No dynamic module.
No external JS dependency.

The actual 3D viewer is Sketchfab.

If one iframe fails, the rest of the website
continues normally.
===================================================== */

function initSketchfabModels() {

    const male =
        $("#maleModel");

    const female =
        $("#femaleModel");

    const buttons =
        $$(".model-btn");

    const loader =
        $("#anatomyLoader");

    const rotateLeft =
        $("#rotateLeft");

    const rotateRight =
        $("#rotateRight");

    const reset =
        $("#resetView");


    if (!male || !female || !buttons.length) {
        return;
    }


    /* =================================================
    MODEL SWITCH
    ================================================= */

    function switchModel(model) {

        const isFemale =
            model === "female";


        male.classList.toggle(
            "active-model",
            !isFemale
        );


        female.classList.toggle(
            "active-model",
            isFemale
        );


        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.model === model
            );

        });


        /*
        Reload only the selected model when switching.

        This keeps the two models independent.
        */

        if (isFemale) {

            female.style.display = "block";
            male.style.display = "none";

        } else {

            male.style.display = "block";
            female.style.display = "none";

        }


        if (loader) {

            loader.classList.remove(
                "loaded"
            );

            setTimeout(() => {

                loader.classList.add(
                    "loaded"
                );

            }, 700);

        }

    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                switchModel(
                    button.dataset.model
                );

            }
        );

    });


    /* =================================================
    VIEWER BUTTONS

    These send basic keyboard-style commands where
    possible. The Sketchfab viewer itself provides
    its own drag/zoom controls.
    ================================================= */

    function sendViewerCommand(model, command) {

        try {

            model.contentWindow.postMessage(
                {
                    type: "command",
                    command
                },
                "https://sketchfab.com"
            );

        } catch (error) {

            console.warn(
                "Sketchfab control unavailable:",
                error
            );

        }

    }


    if (rotateLeft) {

        rotateLeft.addEventListener(
            "click",
            () => {

                const active =
                    document.querySelector(
                        ".sketchfab-model.active-model"
                    );

                if (active) {

                    sendViewerCommand(
                        active,
                        "rotateLeft"
                    );

                }

            }
        );

    }


    if (rotateRight) {

        rotateRight.addEventListener(
            "click",
            () => {

                const active =
                    document.querySelector(
                        ".sketchfab-model.active-model"
                    );

                if (active) {

                    sendViewerCommand(
                        active,
                        "rotateRight"
                    );

                }

            }
        );

    }


    if (reset) {

        reset.addEventListener(
            "click",
            () => {

                const active =
                    document.querySelector(
                        ".sketchfab-model.active-model"
                    );

                if (!active) return;


                /*
                Recreating the iframe gives us a reliable
                reset without depending on Sketchfab's API.
                */

                const source =
                    active.src;

                active.src = "";

                setTimeout(() => {

                    active.src = source;

                }, 50);

            }
        );

    }


    /* =================================================
    LOADING
    ================================================= */

    let loadedCount = 0;


    function modelLoaded() {

        loadedCount++;


        if (loader && loadedCount >= 1) {

            setTimeout(() => {

                loader.classList.add(
                    "loaded"
                );

            }, 500);

        }

    }


    male.addEventListener(
        "load",
        modelLoaded
    );


    female.addEventListener(
        "load",
        modelLoaded
    );


    /*
    Do not let iframe failures throw errors
    into the rest of the website.
    */

    try {

        switchModel("male");

    } catch (error) {

        console.error(
            "3D model system failed safely:",
            error
        );

    }

}


/* =====================================================
GLOBAL ERROR PROTECTION
=====================================================

This logs errors rather than stopping the website.
===================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Website error:",
            event.error || event.message
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Website promise error:",
            event.reason
        );

    }
);


/* =====================================================
END
===================================================== */
