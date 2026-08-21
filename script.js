/* =====================================================
OLUKAYODE HOSPITAL
PREMIUM INTERACTIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("active");

            menuBtn.classList.toggle(
                "active",
                isOpen
            );

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu after selecting link */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =================================================
       NAVBAR SCROLL EFFECT
    ================================================= */

    const navbar =
        document.getElementById("navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =================================================
       COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    const duration = 1600;

                    const startTime =
                        performance.now();

                    function updateCounter(
                        currentTime
                    ) {

                        const elapsed =
                            currentTime - startTime;

                        const progress =
                            Math.min(
                                elapsed / duration,
                                1
                            );

                        /* Smooth easing */

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        counter.textContent =
                            Math.floor(
                                target * eased
                            );

                        if (progress < 1) {

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }

                    requestAnimationFrame(
                        updateCounter
                    );

                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: .5
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =================================================
       GALLERY LIGHTBOX
    ================================================= */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeLightbox =
        document.getElementById(
            "closeLightbox"
        );

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    function openLightbox(image) {

        if (!lightbox || !lightboxImage) {
            return;
        }

        lightboxImage.src = image;

        lightbox.classList.add("active");

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeLightboxFunction() {

        if (!lightbox) return;

        lightbox.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );

        setTimeout(() => {

            if (lightboxImage) {
                lightboxImage.src = "";
            }

        }, 300);

    }


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                if (image) {
                    openLightbox(image);
                }

            }
        );

    });


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeLightboxFunction
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeLightboxFunction();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeLightboxFunction();
            }

        }
    );


    /* =================================================
       FAQ
    ================================================= */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        if (!question) return;

        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                /* Close all */

                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherQuestion =
                            otherItem.querySelector(
                                ".faq-question"
                            );

                        if (otherQuestion) {

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );


                /* Open selected */

                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });


    /* =================================================
       TESTIMONIAL SLIDER
    ================================================= */

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const prevButton =
        document.getElementById(
            "testimonialPrev"
        );

    const nextButton =
        document.getElementById(
            "testimonialNext"
        );

    const dotsContainer =
        document.getElementById(
            "testimonialDots"
        );


    if (
        track &&
        prevButton &&
        nextButton &&
        dotsContainer
    ) {

        const cards =
            Array.from(
                track.querySelectorAll(
                    ".testimonial-card"
                )
            );

        let currentIndex = 0;

        let cardsPerView =
            getCardsPerView();

        function getCardsPerView() {

            if (window.innerWidth <= 550) {
                return 1;
            }

            if (window.innerWidth <= 1050) {
                return 2;
            }

            return 3;

        }


        function getMaxIndex() {

            return Math.max(
                0,
                cards.length - cardsPerView
            );

        }


        function buildDots() {

            dotsContainer.innerHTML = "";

            const total =
                getMaxIndex() + 1;

            for (
                let i = 0;
                i < total;
                i++
            ) {

                const dot =
                    document.createElement(
                        "button"
                    );

                dot.type = "button";

                dot.className =
                    "testimonial-dot";

                if (
                    i === currentIndex
                ) {
                    dot.classList.add(
                        "active"
                    );
                }

                dot.addEventListener(
                    "click",
                    () => {

                        currentIndex = i;

                        updateSlider();

                    }
                );

                dotsContainer.appendChild(
                    dot
                );

            }

        }


        function updateSlider() {

            cardsPerView =
                getCardsPerView();

            const maxIndex =
                getMaxIndex();

            currentIndex =
                Math.min(
                    currentIndex,
                    maxIndex
                );

            if (!cards.length) return;


            const cardWidth =
                cards[0].getBoundingClientRect()
                    .width;

            const gap =
                parseFloat(
                    getComputedStyle(track)
                        .gap
                ) || 0;

            const distance =
                currentIndex *
                (cardWidth + gap);

            track.style.transform =
                `translateX(-${distance}px)`;


            document
                .querySelectorAll(
                    ".testimonial-dot"
                )
                .forEach(
                    (dot, index) => {

                        dot.classList.toggle(
                            "active",
                            index === currentIndex
                        );

                    }
                );

        }


        prevButton.addEventListener(
            "click",
            () => {

                currentIndex--;

                if (currentIndex < 0) {

                    currentIndex =
                        getMaxIndex();

                }

                updateSlider();

            }
        );


        nextButton.addEventListener(
            "click",
            () => {

                currentIndex++;

                if (
                    currentIndex >
                    getMaxIndex()
                ) {

                    currentIndex = 0;

                }

                updateSlider();

            }
        );


        buildDots();
        updateSlider();


        window.addEventListener(
            "resize",
            () => {

                cardsPerView =
                    getCardsPerView();

                buildDots();
                updateSlider();

            }
        );


        /* Touch swipe */

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.touches[0].clientX;

            },
            { passive: true }
        );


        track.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .clientX;

                const distance =
                    touchStartX -
                    touchEndX;

                if (
                    Math.abs(distance) < 45
                ) {
                    return;
                }

                if (distance > 0) {
                    nextButton.click();
                } else {
                    prevButton.click();
                }

            },
            { passive: true }
        );

    }


    /* =================================================
       WHATSAPP FORM
    ================================================= */

    const whatsappForm =
        document.getElementById(
            "whatsappForm"
        );

    if (whatsappForm) {

        whatsappForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document
                        .getElementById("name")
                        ?.value.trim();

                const phone =
                    document
                        .getElementById("phone")
                        ?.value.trim();

                const subject =
                    document
                        .getElementById("subject")
                        ?.value.trim();

                const message =
                    document
                        .getElementById("message")
                        ?.value.trim();


                const text =
`Hello Olukayode Hospital.

My name is ${name}.

Phone: ${phone}

Subject: ${subject}

Enquiry:
${message}`;


                const whatsappURL =
                    "https://wa.me/2348033602308?text=" +
                    encodeURIComponent(text);


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener"
                );

            }
        );

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 600) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            },
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =================================================
       SUBTLE HERO PARALLAX
    ================================================= */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    const heroGlowOne =
        document.querySelector(
            ".hero-glow-one"
        );

    const heroGlowTwo =
        document.querySelector(
            ".hero-glow-two"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (
                scroll < window.innerHeight &&
                heroVisual
            ) {

                heroVisual.style.transform =
                    `translateY(${scroll * .035}px)`;

            }

            if (heroGlowOne) {

                heroGlowOne.style.transform =
                    `translateY(${scroll * .08}px)`;

            }

            if (heroGlowTwo) {

                heroGlowTwo.style.transform =
                    `translateY(-${scroll * .05}px)`;

            }

        },
        { passive: true }
    );


    /* =================================================
       IMAGE LAZY LOADING
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach(img => {

            if (
                !img.hasAttribute("loading") &&
                !img.closest(".hero")
            ) {

                img.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        });


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
