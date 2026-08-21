document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE MENU */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuBtn.textContent =
                navMenu.classList.contains("active")
                    ? "×"
                    : "☰";
        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuBtn.textContent = "☰";
            });

        });

    }


    /* SCROLL REVEAL */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* COUNTERS */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                if (counter.dataset.started) return;

                counter.dataset.started = "true";

                const target =
                    Number(counter.dataset.target);

                const suffix =
                    counter.dataset.suffix || "";

                const duration = 1600;

                const startTime =
                    performance.now();


                function updateCounter(now) {

                    const progress =
                        Math.min(
                            (now - startTime) / duration,
                            1
                        );

                    const value =
                        Math.floor(
                            progress * target
                        );

                    counter.textContent =
                        value + suffix;


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target + suffix;
                    }

                }


                requestAnimationFrame(
                    updateCounter
                );

                counterObserver.unobserve(counter);

            });

        }, {
            threshold: 0.5
        });


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* FAQ */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {

        question.addEventListener("click", () => {

            const item =
                question.closest(".faq-item");

            const isActive =
                item.classList.contains("active");


            document
                .querySelectorAll(".faq-item")
                .forEach(faq => {

                    faq.classList.remove("active");

                    const button =
                        faq.querySelector(
                            ".faq-question"
                        );

                    if (button) {

                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });


            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }

        });

    });


    /* GALLERY LIGHTBOX */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeLightbox =
        document.getElementById("closeLightbox");


    document
        .querySelectorAll(".gallery-item")
        .forEach(item => {

            item.addEventListener("click", () => {

                const image =
                    item.dataset.image;

                if (!image) return;

                lightboxImage.src = image;

                lightbox.classList.add("active");

                document.body.style.overflow = "hidden";

            });

        });


    function closeGallery() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeGallery
        );

    }


    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {

                closeGallery();
            }

        });

    }


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            closeGallery();
        }

    });


    /* TESTIMONIAL SLIDER */

    const testimonialTrack =
        document.getElementById("testimonialTrack");

    const testimonialPrev =
        document.getElementById("testimonialPrev");

    const testimonialNext =
        document.getElementById("testimonialNext");

    const testimonialDots =
        document.getElementById("testimonialDots");


    if (testimonialTrack) {

        const cards =
            Array.from(
                testimonialTrack.children
            );

        let currentSlide = 0;


        function getVisibleCards() {

            if (window.innerWidth <= 750) {

                return 1;
            }

            if (window.innerWidth <= 1000) {

                return 2;
            }

            return 3;
        }


        function getMaxSlide() {

            return Math.max(
                0,
                cards.length -
                getVisibleCards()
            );
        }


        function createDots() {

            testimonialDots.innerHTML = "";

            const total =
                getMaxSlide() + 1;

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

                dot.setAttribute(
                    "aria-label",
                    `Go to testimonial ${i + 1}`
                );


                dot.addEventListener("click", () => {

                    currentSlide = i;

                    updateSlider();
                });


                testimonialDots.appendChild(dot);

            }

        }


        function updateSlider() {

            const maxSlide =
                getMaxSlide();

            currentSlide =
                Math.min(
                    Math.max(currentSlide, 0),
                    maxSlide
                );


            const cardWidth =
                cards[0].getBoundingClientRect().width;

            const gap = 20;

            testimonialTrack.style.transform =
                `translateX(-${
                    currentSlide *
                    (cardWidth + gap)
                }px)`;


            testimonialDots
                .querySelectorAll(".testimonial-dot")
                .forEach((dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentSlide
                    );

                });

        }


        createDots();

        updateSlider();


        testimonialNext.addEventListener("click", () => {

            const maxSlide =
                getMaxSlide();

            currentSlide =
                currentSlide >= maxSlide
                    ? 0
                    : currentSlide + 1;

            updateSlider();

        });


        testimonialPrev.addEventListener("click", () => {

            const maxSlide =
                getMaxSlide();

            currentSlide =
                currentSlide <= 0
                    ? maxSlide
                    : currentSlide - 1;

            updateSlider();

        });


        window.addEventListener(
            "resize",
            () => {

                createDots();

                updateSlider();

            }
        );

    }


    /* WHATSAPP FORM */

    const whatsappForm =
        document.getElementById("whatsappForm");


    if (whatsappForm) {

        whatsappForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();

                const phone =
                    document
                        .getElementById("phone")
                        .value
                        .trim();

                const subject =
                    document
                        .getElementById("subject")
                        .value
                        .trim();

                const message =
                    document
                        .getElementById("message")
                        .value
                        .trim();


                const text =
`Hello Olukayode Hospital,

Name: ${name}
Phone: ${phone}
Subject: ${subject}

Enquiry:
${message}`;


                const whatsappURL =
                    "https://wa.me/2348033602308?text=" +
                    encodeURIComponent(text);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* BACK TO TOP */

    const backToTop =
        document.getElementById("backToTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");
        }

    });


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* FOOTER YEAR */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();
    }

});
