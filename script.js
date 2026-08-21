/* =====================================================
OLUKAYODE HOSPITAL
INTERACTIONS + ANIMATIONS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
    MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            const active =
                navMenu.classList.toggle("active");

            menuBtn.classList.toggle(
                "active",
                active
            );

            menuBtn.setAttribute(
                "aria-expanded",
                active
            );

            document.body.classList.toggle(
                "menu-open",
                active
            );

        });


        navMenu.querySelectorAll("a")
            .forEach(link => {

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

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

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
                rootMargin: "0px 0px -40px 0px"
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

    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        const duration = 1400;

        const startTime =
            performance.now();

        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );

            counter.textContent =
                Math.floor(
                    eased * target
                );

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target;

            }

        }

        requestAnimationFrame(update);

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .7
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =================================================
    FAQ
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains("active");


                faqItems.forEach(other => {

                    other.classList.remove(
                        "active"
                    );

                    const button =
                        other.querySelector(
                            ".faq-question"
                        );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });


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

        if (!lightbox || !lightboxImage)
            return;

        lightboxImage.src =
            image;

        lightbox.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeBox() {

        if (!lightbox)
            return;

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                openLightbox(
                    item.dataset.image
                );

            }
        );

    });


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeBox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeBox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeBox();

            }

        }
    );


    /* =================================================
    TESTIMONIAL SLIDER
    ================================================= */

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const prev =
        document.getElementById(
            "testimonialPrev"
        );

    const next =
        document.getElementById(
            "testimonialNext"
        );

    const dotsContainer =
        document.getElementById(
            "testimonialDots"
        );

    const cards =
        document.querySelectorAll(
            ".testimonial-card"
        );


    let currentSlide = 0;


    function getSlidesVisible() {

        if (window.innerWidth <= 600)
            return 1;

        if (window.innerWidth <= 1100)
            return 2;

        return 3;

    }


    function getMaxSlide() {

        return Math.max(
            0,
            cards.length -
            getSlidesVisible()
        );

    }


    function buildDots() {

        if (!dotsContainer)
            return;

        dotsContainer.innerHTML = "";

        const total =
            getMaxSlide() + 1;

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

            if (i === currentSlide) {

                dot.classList.add(
                    "active"
                );

            }

            dot.addEventListener(
                "click",
                () => {

                    currentSlide = i;

                    updateSlider();

                }
            );

            dotsContainer.appendChild(
                dot
            );

        }

    }


    function updateSlider() {

        if (!track)
            return;

        const visible =
            getSlidesVisible();

        const cardWidth =
            cards[0]?.getBoundingClientRect()
                .width || 0;

        const gap = 20;

        const offset =
            currentSlide *
            (cardWidth + gap);

        track.style.transform =
            `translateX(-${offset}px)`;


        if (dotsContainer) {

            dotsContainer
                .querySelectorAll(
                    ".testimonial-dot"
                )
                .forEach(
                    (dot, index) => {

                        dot.classList.toggle(
                            "active",
                            index === currentSlide
                        );

                    }
                );

        }

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                currentSlide++;

                if (
                    currentSlide >
                    getMaxSlide()
                ) {

                    currentSlide = 0;

                }

                updateSlider();

            }
        );

    }


    if (prev) {

        prev.addEventListener(
            "click",
            () => {

                currentSlide--;

                if (currentSlide < 0) {

                    currentSlide =
                        getMaxSlide();

                }

                updateSlider();

            }
        );

    }


    buildDots();

    updateSlider();


    window.addEventListener(
        "resize",
        () => {

            if (
                currentSlide >
                getMaxSlide()
            ) {

                currentSlide =
                    getMaxSlide();

            }

            buildDots();
            updateSlider();

        }
    );


    /* =================================================
    AUTO TESTIMONIAL
    ================================================= */

    let testimonialTimer =
        setInterval(
            () => {

                if (
                    document.hidden ||
                    !track
                ) return;

                currentSlide++;

                if (
                    currentSlide >
                    getMaxSlide()
                ) {

                    currentSlide = 0;

                }

                updateSlider();

            },
            6000
        );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                clearInterval(
                    testimonialTimer
                );

            } else {

                testimonialTimer =
                    setInterval(
                        () => {

                            currentSlide++;

                            if (
                                currentSlide >
                                getMaxSlide()
                            ) {

                                currentSlide = 0;

                            }

                            updateSlider();

                        },
                        6000
                    );

            }

        }
    );


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
                    document.getElementById(
                        "name"
                    ).value.trim();

                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();

                const subject =
                    document.getElementById(
                        "subject"
                    ).value.trim();

                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                const text =
                    `Hello Olukayode Hospital.%0A%0A` +
                    `Name: ${encodeURIComponent(name)}%0A` +
                    `Phone: ${encodeURIComponent(phone)}%0A` +
                    `Subject: ${encodeURIComponent(subject)}%0A%0A` +
                    `${encodeURIComponent(message)}`;


                const whatsappURL =
                    `https://wa.me/2348033602308?text=${text}`;


                window.open(
                    whatsappURL,
                    "_blank"
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


    function updateBackToTop() {

        if (!backToTop)
            return;

        backToTop.classList.toggle(
            "show",
            window.scrollY > 600
        );

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    if (backToTop) {

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

    let ticking = false;


    function heroParallax() {

        if (!heroVisual)
            return;

        if (
            window.innerWidth <= 850
        ) {

            heroVisual.style.transform =
                "";

            return;

        }


        const scroll =
            window.scrollY;

        if (scroll > 800)
            return;

        heroVisual.style.transform =
            `translateY(${scroll * .055}px)`;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    () => {

                        heroParallax();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    /* =================================================
    3D TILT-LIKE CARD DEPTH
    ================================================= */

    const interactiveCards =
        document.querySelectorAll(
            ".service-card, .stat-card"
        );


    interactiveCards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth < 850
                )
                    return;


                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 4;

                const rotateX =
                    ((y / rect.height) - .5) * -4;


                card.style.transform =
                    `translateY(-8px)
                     perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =================================================
    CURRENT YEAR
    ================================================= */

    const year =
        document.getElementById(
            "year"
        );

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =================================================
    SMOOTH ANCHOR SCROLL
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetID ||
                        targetID === "#"
                    )
                        return;


                    const target =
                        document.querySelector(
                            targetID
                        );

                    if (!target)
                        return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});
