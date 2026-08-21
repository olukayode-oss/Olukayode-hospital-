/* =========================================================
   OLUKAYODE HOSPITAL
   COMPLETE WEBSITE JAVASCRIPT
   3D MODULE ISOLATED SO IT CANNOT BREAK THE WEBSITE
========================================================= */

"use strict";

/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

function safe(fn) {
    try {
        fn();
    } catch (error) {
        console.error("Olukayode Hospital:", error);
    }
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Each feature is isolated.
       If one fails, the others continue working. */

    safe(initMobileMenu);
    safe(initRevealAnimations);
    safe(initCounters);
    safe(initFAQ);
    safe(initGallery);
    safe(initTestimonials);
    safe(initWhatsAppForm);
    safe(initBackToTop);
    safe(initYear);
    safe(initBodyExplorer);
    safe(init3DAnatomy);

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuBtn = $("#menuBtn");
    const navMenu = $("#navMenu");

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const opened = navMenu.classList.contains("active");

        menuBtn.setAttribute(
            "aria-label",
            opened ? "Close menu" : "Open menu"
        );

    });


    /* Close menu after clicking a navigation link */

    $$("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

function initRevealAnimations() {

    const elements = $$(".reveal");

    if (!elements.length) return;


    /* Fallback if IntersectionObserver is unavailable */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }


    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    elements.forEach(element => observer.observe(element));

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters = $$(".counter");

    if (!counters.length) return;


    const animateCounter = counter => {

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target)) return;

        const duration = 1600;
        const startTime = performance.now();


        function update(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            /* Smooth easing */

            const eased =
                1 - Math.pow(1 - progress, 3);

            const current =
                Math.floor(target * eased);

            counter.textContent = current;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

            }

        }


        requestAnimationFrame(update);

    };


    if (!("IntersectionObserver" in window)) {

        counters.forEach(animateCounter);

        return;

    }


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(counter => observer.observe(counter));

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const questions = $$(".faq-question");

    if (!questions.length) return;


    questions.forEach(question => {

        question.addEventListener("click", () => {

            const item = question.closest(".faq-item");

            if (!item) return;


            const answer = $(".faq-answer", item);

            if (!answer) return;


            const isOpen =
                item.classList.contains("active");


            /* Close all other FAQ items */

            $$(".faq-item").forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                }

            });


            /* Open / close selected item */

            item.classList.toggle(
                "active",
                !isOpen
            );

        });

    });

}


/* =========================================================
   GALLERY + LIGHTBOX
========================================================= */

function initGallery() {

    const galleryItems = $$(".gallery-item");

    const lightbox = $("#lightbox");
    const lightboxImage = $("#lightboxImage");
    const closeLightbox = $("#closeLightbox");

    if (!galleryItems.length) return;


    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const image =
                item.dataset.image ||
                $("img", item)?.src;

            if (!image) return;


            if (lightboxImage) {

                lightboxImage.src = image;

            }


            if (lightbox) {

                lightbox.classList.add("active");

                document.body.classList.add(
                    "lightbox-open"
                );

            }

        });

    });


    function close() {

        if (lightbox) {

            lightbox.classList.remove("active");

        }

        document.body.classList.remove(
            "lightbox-open"
        );

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            close
        );

    }


    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {

                close();

            }

        });

    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            close();

        }

    });

}


/* =========================================================
   TESTIMONIAL CAROUSEL
========================================================= */

function initTestimonials() {

    const track = $("#testimonialTrack");
    const prev = $("#testimonialPrev");
    const next = $("#testimonialNext");
    const dotsContainer = $("#testimonialDots");

    if (!track) return;


    const cards =
        $$(".testimonial-card", track);

    if (!cards.length) return;


    let currentIndex = 0;


    function getVisibleCards() {

        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;

    }


    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCards()
        );

    }


    function updateSlider() {

        const visible =
            getVisibleCards();

        const max =
            getMaxIndex();


        if (currentIndex > max) {

            currentIndex = max;

        }


        /*
          Calculate movement using the actual
          card width rather than a hard-coded value.
        */

        if (cards[0]) {

            const cardWidth =
                cards[0].getBoundingClientRect().width;

            const gap =
                parseFloat(
                    getComputedStyle(track).gap
                ) || 0;

            const offset =
                currentIndex *
                (cardWidth + gap);


            track.style.transform =
                `translateX(-${offset}px)`;

        }


        updateDots();

    }


    function updateDots() {

        if (!dotsContainer) return;


        dotsContainer.innerHTML = "";


        const total =
            getMaxIndex() + 1;


        for (let i = 0; i < total; i++) {

            const dot =
                document.createElement("button");


            dot.type = "button";

            dot.className =
                "testimonial-dot";


            if (i === currentIndex) {

                dot.classList.add("active");

            }


            dot.setAttribute(
                "aria-label",
                `Go to testimonial ${i + 1}`
            );


            dot.addEventListener("click", () => {

                currentIndex = i;

                updateSlider();

            });


            dotsContainer.appendChild(dot);

        }

    }


    if (next) {

        next.addEventListener("click", () => {

            const max =
                getMaxIndex();

            currentIndex =
                currentIndex >= max
                    ? 0
                    : currentIndex + 1;

            updateSlider();

        });

    }


    if (prev) {

        prev.addEventListener("click", () => {

            const max =
                getMaxIndex();

            currentIndex =
                currentIndex <= 0
                    ? max
                    : currentIndex - 1;

            updateSlider();

        });

    }


    window.addEventListener(
        "resize",
        updateSlider
    );


    updateSlider();

}


/* =========================================================
   WHATSAPP ENQUIRY FORM
========================================================= */

function initWhatsAppForm() {

    const form = $("#whatsappForm");

    if (!form) return;


    form.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            $("#name")?.value.trim() || "";

        const phone =
            $("#phone")?.value.trim() || "";

        const subject =
            $("#subject")?.value.trim() || "";

        const message =
            $("#message")?.value.trim() || "";


        if (!name || !phone || !subject || !message) {

            alert(
                "Please complete all fields before continuing."
            );

            return;

        }


        const whatsappNumber =
            "2348033602308";


        const text =
`Hello Olukayode Hospital,

My name is ${name}.

Phone: ${phone}

Subject: ${subject}

Enquiry:
${message}`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button = $("#backToTop");

    if (!button) return;


    function update() {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    update();

}


/* =========================================================
   FOOTER YEAR
========================================================= */

function initYear() {

    const year = $("#year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   HUMAN BODY INFORMATION
========================================================= */

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


    const anatomyData = {

        brain: {

            title: "Brain",

            description:
                "The brain is the main organ of the nervous system. It helps control movement, senses, memory, thinking and many automatic body functions.",

            system:
                "Nervous system",

            focus:
                "Control & coordination"

        },


        heart: {

            title: "Heart",

            description:
                "The heart is a muscular organ that pumps blood around the body through the circulatory system.",

            system:
                "Circulatory system",

            focus:
                "Blood circulation"

        },


        lungs: {

            title: "Lungs",

            description:
                "The lungs are organs of the respiratory system. They help exchange oxygen and carbon dioxide during breathing.",

            system:
                "Respiratory system",

            focus:
                "Gas exchange"

        },


        stomach: {

            title: "Digestive System",

            description:
                "The digestive system breaks food down into nutrients that the body can absorb and use.",

            system:
                "Digestive system",

            focus:
                "Digestion"

        },


        bones: {

            title: "Skeletal System",

            description:
                "The skeletal system provides structural support, protects important organs and works with muscles to enable movement.",

            system:
                "Skeletal system",

            focus:
                "Support & movement"

        },


        muscles: {

            title: "Muscular System",

            description:
                "Muscles allow the body to move and also contribute to posture and other important functions.",

            system:
                "Muscular system",

            focus:
                "Movement"

        }

    };


    function selectPart(part) {

        const data =
            anatomyData[part];

        if (!data) return;


        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.part === part
            );

        });


        if (title) {

            title.textContent =
                data.title;

        }


        if (description) {

            description.textContent =
                data.description;

        }


        if (facts) {

            facts.innerHTML = `

                <div>

                    <span>System</span>

                    <strong>
                        ${data.system}
                    </strong>

                </div>

                <div>

                    <span>Focus</span>

                    <strong>
                        ${data.focus}
                    </strong>

                </div>

            `;

        }


        /* Tell the 3D viewer which area is selected */

        window.dispatchEvent(
            new CustomEvent(
                "olukayode:body-part",
                {
                    detail: {
                        part
                    }
                }
            )
        );

    }


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            selectPart(
                button.dataset.part
            );

        });

    });


    /* Initial state */

    selectPart("brain");

}


/* =========================================================
   3D ANATOMY
=========================================================

   IMPORTANT:

   There is NO static Three.js import at the top of this file.

   That means:

   - If Three.js loads -> 3D starts.
   - If Three.js fails -> website continues.
   - If OrbitControls fails -> website continues.
   - If WebGL is unavailable -> website continues.
   - If the model fails -> website continues.
========================================================= */

async function init3DAnatomy() {

    const container =
        $("#anatomyCanvas");

    const loader =
        $("#anatomyLoader");


    if (!container) return;


    /*
      First make the 3D area safe.

      If JavaScript / WebGL / CDN fails,
      we display a fallback instead of breaking
      the rest of the website.
    */

    function showFallback(message) {

        if (loader) {

            loader.innerHTML = `

                <div class="loader-ring"></div>

                <span>
                    ${message}
                </span>

            `;

        }


        container.classList.add(
            "three-fallback"
        );

    }


    /*
      Check WebGL before loading Three.js.
    */

    let canvas;

    try {

        canvas =
            document.createElement("canvas");

        const gl =
            canvas.getContext("webgl2") ||
            canvas.getContext("webgl");


        if (!gl) {

            showFallback(
                "Interactive 3D unavailable on this device"
            );

            return;

        }

    } catch (error) {

        console.warn(
            "WebGL unavailable:",
            error
        );

        showFallback(
            "Interactive 3D unavailable"
        );

        return;

    }


    /*
      Dynamic imports.

      These are intentionally inside try/catch.

      A failed CDN request therefore cannot
      terminate the rest of script.js.
    */

    let THREE;
    let OrbitControls;


    try {

        THREE = await import(
            "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
        );

    } catch (error) {

        console.warn(
            "Three.js could not load:",
            error
        );

        showFallback(
            "3D anatomy is temporarily unavailable"
        );

        return;

    }


    try {

        const controlsModule =
            await import(
                "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js"
            );

        OrbitControls =
            controlsModule.OrbitControls;

    } catch (error) {

        /*
          OrbitControls is optional.

          We can still display the 3D model
          without interactive controls.
        */

        console.warn(
            "OrbitControls unavailable:",
            error
        );

        OrbitControls = null;

    }


    /* =====================================================
       THREE.JS SETUP
    ===================================================== */

    try {

        const {

            Scene,
            PerspectiveCamera,
            WebGLRenderer,
            AmbientLight,
            DirectionalLight,
            Group,
            Mesh,
            SphereGeometry,
            CapsuleGeometry,
            CylinderGeometry,
            BoxGeometry,
            MeshStandardMaterial,
            MeshBasicMaterial,
            Color

        } = THREE;


        const scene =
            new Scene();


        scene.background =
            new Color(0xf5faf8);


        /* Camera */

        const camera =
            new PerspectiveCamera(
                35,
                container.clientWidth /
                Math.max(
                    container.clientHeight,
                    1
                ),
                0.1,
                100
            );


        camera.position.set(
            0,
            1.2,
            6
        );


        /* Renderer */

        const renderer =
            new WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );


        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );


        renderer.outputColorSpace =
            THREE.SRGBColorSpace;


        renderer.domElement.setAttribute(
            "aria-label",
            "Interactive human anatomy model"
        );


        container.appendChild(
            renderer.domElement
        );


        /* =================================================
           LIGHTING
        ================================================= */

        const ambient =
            new AmbientLight(
                0xffffff,
                2.2
            );


        scene.add(ambient);


        const directional =
            new DirectionalLight(
                0xffffff,
                3
            );


        directional.position.set(
            3,
            5,
            5
        );


        scene.add(directional);


        const fill =
            new DirectionalLight(
                0xdff7ee,
                2
            );


        fill.position.set(
            -4,
            2,
            2
        );


        scene.add(fill);


        /* =================================================
           PROCEDURAL HUMAN MODEL

           This is intentionally generated with Three.js
           so the viewer does not depend on a remote .glb file.

           It is an educational visualisation, not a
           medically accurate anatomical model.
        ================================================= */

        const human =
            new Group();


        scene.add(human);


        const skinMaterial =
            new MeshStandardMaterial({
                color: 0xd89c78,
                roughness: 0.75,
                metalness: 0
            });


        const shirtMaterial =
            new MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.7
            });


        const pantsMaterial =
            new MeshStandardMaterial({
                color: 0x1f4f46,
                roughness: 0.8
            });


        const redMaterial =
            new MeshStandardMaterial({
                color: 0xc62828,
                roughness: 0.5
            });


        const blueMaterial =
            new MeshStandardMaterial({
                color: 0x3977b7,
                roughness: 0.5
            });


        const boneMaterial =
            new MeshStandardMaterial({
                color: 0xe8dfc8,
                roughness: 0.9
            });


        /* HEAD */

        const head =
            new Mesh(
                new SphereGeometry(
                    0.38,
                    32,
                    24
                ),
                skinMaterial
            );


        head.position.y = 2.7;

        human.add(head);


        /* NECK */

        const neck =
            new Mesh(
                new CylinderGeometry(
                    0.18,
                    0.2,
                    0.35,
                    24
                ),
                skinMaterial
            );


        neck.position.y = 2.25;

        human.add(neck);


        /* TORSO */

        const torso =
            new Mesh(
                new CapsuleGeometry(
                    0.62,
                    1.0,
                    8,
                    20
                ),
                shirtMaterial
            );


        torso.position.y = 1.55;

        human.add(torso);


        /* LEFT ARM */

        const leftArm =
            new Mesh(
                new CapsuleGeometry(
                    0.17,
                    1.0,
                    6,
                    16
                ),
                skinMaterial
            );


        leftArm.position.set(
            -0.78,
            1.55,
            0
        );


        leftArm.rotation.z =
            -0.15;


        human.add(leftArm);


        /* RIGHT ARM */

        const rightArm =
            new Mesh(
                new CapsuleGeometry(
                    0.17,
                    1.0,
                    6,
                    16
                ),
                skinMaterial
            );


        rightArm.position.set(
            0.78,
            1.55,
            0
        );


        rightArm.rotation.z =
            0.15;


        human.add(rightArm);


        /* LEFT LEG */

        const leftLeg =
            new Mesh(
                new CapsuleGeometry(
                    0.22,
                    1.25,
                    6,
                    16
                ),
                pantsMaterial
            );


        leftLeg.position.set(
            -0.32,
            0.25,
            0
        );


        human.add(leftLeg);


        /* RIGHT LEG */

        const rightLeg =
            new Mesh(
                new CapsuleGeometry(
                    0.22,
                    1.25,
                    6,
                    16
                ),
                pantsMaterial
            );


        rightLeg.position.set(
            0.32,
            0.25,
            0
        );


        human.add(rightLeg);


        /* =================================================
           INTERNAL ORGAN VISUALS
        ================================================= */

        const organs =
            new Group();


        human.add(organs);


        /* HEART */

        const heart =
            new Mesh(
                new SphereGeometry(
                    0.18,
                    24,
                    20
                ),
                redMaterial
            );


        heart.position.set(
            0.12,
            1.75,
            0.48
        );


        organs.add(heart);


        /* LUNGS */

        const leftLung =
            new Mesh(
                new SphereGeometry(
                    0.22,
                    20,
                    16
                ),
                blueMaterial
            );


        leftLung.scale.set(
            0.8,
            1.3,
            0.6
        );


        leftLung.position.set(
            -0.22,
            1.82,
            0.43
        );


        organs.add(leftLung);


        const rightLung =
            leftLung.clone();


        rightLung.position.x =
            0.22;


        organs.add(rightLung);


        /* BRAIN */

        const brain =
            new Mesh(
                new SphereGeometry(
                    0.23,
                    24,
                    20
                ),
                blueMaterial
            );


        brain.position.set(
            0,
            2.72,
            0.3
        );


        organs.add(brain);


        /* STOMACH */

        const stomach =
            new Mesh(
                new SphereGeometry(
                    0.25,
                    24,
                    18
                ),
                redMaterial
            );


        stomach.scale.set(
            0.8,
            1.2,
            0.7
        );


        stomach.position.set(
            -0.1,
            1.35,
            0.42
        );


        organs.add(stomach);


        /* SKELETAL SPINE */

        const spine =
            new Mesh(
                new CylinderGeometry(
                    0.07,
                    0.07,
                    1.35,
                    12
                ),
                boneMaterial
            );


        spine.position.set(
            0,
            1.55,
            -0.45
        );


        human.add(spine);


        /* =================================================
           MODEL SWITCH
        ================================================= */

        let currentModel =
            "male";


        /*
          The current procedural model is neutral.
          The switch changes visual presentation without
          relying on external model files.
        */

        const modelButtons =
            $$(".model-btn");


        modelButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    modelButtons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    button.classList.add(
                        "active"
                    );


                    currentModel =
                        button.dataset.model ||
                        "male";


                    if (currentModel === "female") {

                        torso.scale.x =
                            0.9;

                        head.scale.set(
                            0.96,
                            1,
                            0.96
                        );

                    } else {

                        torso.scale.x =
                            1;

                        head.scale.set(
                            1,
                            1,
                            1
                        );

                    }

                }
            );

        });


        /* =================================================
           ORBIT CONTROLS
        ================================================= */

        let controls = null;


        if (OrbitControls) {

            controls =
                new OrbitControls(
                    camera,
                    renderer.domElement
                );


            controls.enableDamping =
                true;


            controls.dampingFactor =
                0.06;


            controls.enablePan =
                false;


            controls.minDistance =
                3.5;


            controls.maxDistance =
                9;


            controls.target.set(
                0,
                1.5,
                0
            );


            controls.update();

        }


        /* =================================================
           ROTATION BUTTONS
        ================================================= */

        const rotateLeft =
            $("#rotateLeft");

        const rotateRight =
            $("#rotateRight");

        const resetView =
            $("#resetView");


        if (rotateLeft) {

            rotateLeft.addEventListener(
                "click",
                () => {

                    human.rotation.y -=
                        Math.PI / 8;

                }
            );

        }


        if (rotateRight) {

            rotateRight.addEventListener(
                "click",
                () => {

                    human.rotation.y +=
                        Math.PI / 8;

                }
            );

        }


        if (resetView) {

            resetView.addEventListener(
                "click",
                () => {

                    human.rotation.set(
                        0,
                        0,
                        0
                    );


                    camera.position.set(
                        0,
                        1.2,
                        6
                    );


                    if (controls) {

                        controls.target.set(
                            0,
                            1.5,
                            0
                        );

                        controls.update();

                    }

                }
            );

        }


        /* =================================================
           BODY PART HIGHLIGHTING
        ================================================= */

        window.addEventListener(
            "olukayode:body-part",
            event => {

                const part =
                    event.detail?.part;


                /* Reset */

                [
                    brain,
                    heart,
                    leftLung,
                    rightLung,
                    stomach
                ].forEach(mesh => {

                    mesh.scale.set(
                        1,
                        1,
                        1
                    );

                });


                if (part === "brain") {

                    brain.scale.set(
                        1.45,
                        1.45,
                        1.45
                    );

                }


                if (part === "heart") {

                    heart.scale.set(
                        1.7,
                        1.7,
                        1.7
                    );

                }


                if (part === "lungs") {

                    leftLung.scale.multiplyScalar(
                        1.4
                    );

                    rightLung.scale.multiplyScalar(
                        1.4
                    );

                }


                if (part === "stomach") {

                    stomach.scale.multiplyScalar(
                        1.5
                    );

                }


                if (part === "bones") {

                    spine.scale.set(
                        1.7,
                        1,
                        1.7
                    );

                }


                if (part === "muscles") {

                    leftArm.scale.multiplyScalar(
                        1.15
                    );

                    rightArm.scale.multiplyScalar(
                        1.15
                    );

                }

            }
        );


        /* =================================================
           RESIZE
        ================================================= */

        function resize() {

            const width =
                Math.max(
                    container.clientWidth,
                    1
                );


            const height =
                Math.max(
                    container.clientHeight,
                    1
                );


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }


        window.addEventListener(
            "resize",
            resize
        );


        resize();


        /* =================================================
           REMOVE LOADER
        ================================================= */

        if (loader) {

            loader.classList.add(
                "loaded"
            );

            setTimeout(() => {

                if (loader.parentNode) {

                    loader.style.display =
                        "none";

                }

            }, 500);

        }


        /* =================================================
           ANIMATION LOOP
        ================================================= */

        let animationFrame;


        function animate() {

            animationFrame =
                requestAnimationFrame(
                    animate
                );


            /*
              Very subtle idle movement.
              The user can still rotate the model.
            */

            human.rotation.y +=
                0.0015;


            if (controls) {

                controls.update();

            }


            renderer.render(
                scene,
                camera
            );

        }


        animate();


        /* =================================================
           CLEANUP IF PAGE IS HIDDEN
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.hidden
                ) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                } else {

                    animate();

                }

            }
        );


        console.log(
            "Olukayode Hospital 3D anatomy initialized successfully."
        );


    } catch (error) {

        /*
          THIS IS THE MOST IMPORTANT SAFETY NET.

          If anything inside the 3D setup crashes,
          the rest of the website remains alive.
        */

        console.error(
            "3D anatomy failed safely:",
            error
        );


        showFallback(
            "Interactive 3D temporarily unavailable"
        );

    }

}


/* =========================================================
   GLOBAL ERROR PROTECTION
========================================================= */

/*
  Prevent unexpected errors from producing an
  unusable page.

  We intentionally DO NOT reload the page.
*/

window.addEventListener(
    "error",
    event => {

        console.error(
            "Website error:",
            event.error || event.message
        );

    }
);


/*
  Catch rejected dynamic imports/promises.
*/

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Website promise error:",
            event.reason
        );

    }
);


/* =========================================================
   END
========================================================= */
