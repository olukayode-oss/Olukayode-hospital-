/* =========================================================
OLUKAYODE HOSPITAL
INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
    ELEMENTS
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navbar = document.getElementById("navbar");

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");

    const year =
        document.getElementById("year");


    /* =====================================================
    YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
    MOBILE MENU
    ===================================================== */

    function closeMenu() {

        menuBtn?.classList.remove("active");
        navMenu?.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    menuBtn?.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuBtn.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    document.querySelectorAll("#navMenu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* =====================================================
    NAVBAR SCROLL
    ===================================================== */

    function handleScroll() {

        const scrollY = window.scrollY;

        navbar?.classList.toggle(
            "scrolled",
            scrollY > 20
        );

        backToTop?.classList.toggle(
            "show",
            scrollY > 600
        );


        /* Scroll progress */

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollY / documentHeight) * 100
                : 0;

        if (scrollProgress) {
            scrollProgress.style.width =
                `${progress}%`;
        }

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =====================================================
    BACK TO TOP
    ===================================================== */

    backToTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
    REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        element => revealObserver.observe(element)
    );


    /* =====================================================
    STAGGER CARDS
    ===================================================== */

    document.querySelectorAll(
        ".services-grid .reveal, " +
        ".gallery-grid .reveal, " +
        ".faq-container .reveal, " +
        ".stats-section .reveal"
    ).forEach((element, index) => {

        element.style.transitionDelay =
            `${(index % 4) * 80}ms`;

    });


    /* =====================================================
    COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    const counterObserver =
        new IntersectionObserver(
            entries => {

                if (
                    countersStarted ||
                    !entries.some(
                        entry => entry.isIntersecting
                    )
                ) {
                    return;
                }

                countersStarted = true;

                counters.forEach(counter => {

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    let current = 0;

                    const duration = 1400;

                    const start =
                        performance.now();

                    function animate(time) {

                        const elapsed =
                            time - start;

                        const progress =
                            Math.min(
                                elapsed / duration,
                                1
                            );

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        current =
                            Math.floor(
                                eased * target
                            );

                        counter.textContent =
                            current;

                        if (progress < 1) {
                            requestAnimationFrame(
                                animate
                            );
                        } else {
                            counter.textContent =
                                target;
                        }

                    }

                    requestAnimationFrame(
                        animate
                    );

                });

                counterObserver.disconnect();

            },
            {
                threshold: 0.4
            }
        );

    const stats =
        document.querySelector(".stats-section");

    if (stats) {
        counterObserver.observe(stats);
    }


    /* =====================================================
    FAQ
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question?.addEventListener(
            "click",
            () => {

                const alreadyOpen =
                    item.classList.contains("active");

                faqItems.forEach(other => {

                    other.classList.remove(
                        "active"
                    );

                    other.querySelector(
                        ".faq-question"
                    )?.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

                if (!alreadyOpen) {

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


    /* =====================================================
    GALLERY LIGHTBOX
    ===================================================== */

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

    document.querySelectorAll(
        ".gallery-item"
    ).forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                if (!image) return;

                lightboxImage.src = image;

                lightbox.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    function closeGallery() {

        lightbox?.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    closeLightbox?.addEventListener(
        "click",
        closeGallery
    );


    lightbox?.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeGallery();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox?.classList.contains("active")
            ) {
                closeGallery();
            }

        }
    );


    /* =====================================================
    TESTIMONIAL SLIDER
    ===================================================== */

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

    let testimonialIndex = 0;

    function cardsPerView() {

        if (window.innerWidth <= 800) {
            return 1;
        }

        if (window.innerWidth <= 1100) {
            return 2;
        }

        return 3;

    }


    function totalSlides() {

        return Math.max(
            1,
            cards.length -
            cardsPerView() +
            1
        );

    }


    function createDots() {

        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        for (
            let i = 0;
            i < totalSlides();
            i++
        ) {

            const dot =
                document.createElement(
                    "button"
                );

            dot.className =
                "testimonial-dot";

            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                `Go to testimonial ${i + 1}`
            );

            dot.addEventListener(
                "click",
                () => {

                    testimonialIndex = i;

                    updateTestimonials();

                }
            );

            dotsContainer.appendChild(dot);

        }

    }


    function updateTestimonials() {

        if (!track || !cards.length) {
            return;
        }

        const visible =
            cardsPerView();

        const gap = 18;

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const movement =
            (cardWidth + gap) *
            testimonialIndex;

        track.style.transform =
            `translateX(-${movement}px)`;


        const dots =
            dotsContainer?.querySelectorAll(
                ".testimonial-dot"
            );

        dots?.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === testimonialIndex
                );

            }
        );

        if (
            testimonialIndex >=
            totalSlides()
        ) {

            testimonialIndex =
                totalSlides() - 1;

        }

    }


    prev?.addEventListener(
        "click",
        () => {

            testimonialIndex--;

            if (testimonialIndex < 0) {
                testimonialIndex =
                    totalSlides() - 1;
            }

            updateTestimonials();

        }
    );


    next?.addEventListener(
        "click",
        () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                totalSlides()
            ) {
                testimonialIndex = 0;
            }

            updateTestimonials();

        }
    );


    createDots();

    window.addEventListener(
        "resize",
        () => {

            createDots();

            if (
                testimonialIndex >=
                totalSlides()
            ) {
                testimonialIndex =
                    totalSlides() - 1;
            }

            updateTestimonials();

        }
    );


    updateTestimonials();


    /* =====================================================
    AUTO TESTIMONIAL SLIDER
    ===================================================== */

    let testimonialTimer =
        setInterval(() => {

            if (
                document.visibilityState !==
                "visible"
            ) {
                return;
            }

            testimonialIndex++;

            if (
                testimonialIndex >=
                totalSlides()
            ) {
                testimonialIndex = 0;
            }

            updateTestimonials();

        }, 6500);


    document.querySelector(
        ".testimonial-slider"
    )?.addEventListener(
        "mouseenter",
        () => {
            clearInterval(
                testimonialTimer
            );
        }
    );


    document.querySelector(
        ".testimonial-slider"
    )?.addEventListener(
        "mouseleave",
        () => {

            testimonialTimer =
                setInterval(() => {

                    testimonialIndex++;

                    if (
                        testimonialIndex >=
                        totalSlides()
                    ) {
                        testimonialIndex = 0;
                    }

                    updateTestimonials();

                }, 6500);

        }
    );


    /* =====================================================
    WHATSAPP FORM
    ===================================================== */

    const whatsappForm =
        document.getElementById(
            "whatsappForm"
        );

    whatsappForm?.addEventListener(
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
`Hello Olukayode Hospital.

Name: ${name}
Phone: ${phone}
Subject: ${subject}

Enquiry:
${message}`;


            const whatsappURL =
                "https://wa.me/2348033602308" +
                "?text=" +
                encodeURIComponent(text);


            window.open(
                whatsappURL,
                "_blank",
                "noopener"
            );

        }
    );


    /* =====================================================
    CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {
                closeMenu();
            }

        }
    );

});
