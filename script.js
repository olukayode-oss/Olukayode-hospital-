/* =========================================================
   OLUKAYODE HOSPITAL — MAIN SCRIPT
   Stable version with isolated 3D Human Body Explorer
========================================================= */


/* =========================================================
   SAFE HELPERS
========================================================= */

function byId(id) {
    return document.getElementById(id);
}

function on(element, event, callback) {
    if (element) {
        element.addEventListener(event, callback);
    }
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = byId("menuBtn");
const navMenu = byId("navMenu");

on(menuBtn, "click", () => {
    if (navMenu) {
        navMenu.classList.toggle("active");
    }
});

if (navMenu) {
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                if (counter.dataset.counted === "true") {
                    return;
                }

                counter.dataset.counted = "true";

                const target = Number(counter.dataset.target);

                if (!Number.isFinite(target) || target <= 0) {
                    counter.textContent = "0";
                    return;
                }

                let current = 0;

                const duration = 1200;
                const startTime = performance.now();

                function updateCounter(now) {

                    const progress = Math.min(
                        (now - startTime) / duration,
                        1
                    );

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    current =
                        Math.floor(target * eased);

                    counter.textContent =
                        current;

                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target + "+";

                    }
                }

                requestAnimationFrame(updateCounter);

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.35
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

} else {

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        counter.textContent =
            Number.isFinite(target)
                ? target + "+"
                : "0";

    });

}


/* =========================================================
   SCROLL REVEAL
   IMPORTANT:
   Elements are made visible safely even if the observer
   is unavailable.
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

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
                threshold: 0.08
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


/* =========================================================
   FAQ
========================================================= */

document
    .querySelectorAll(".faq-question")
    .forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const item =
                    question.parentElement;

                const answer =
                    item?.querySelector(
                        ".faq-answer"
                    );

                if (!item || !answer) return;


                document
                    .querySelectorAll(".faq-item")
                    .forEach(other => {

                        if (other !== item) {

                            other.classList.remove(
                                "active"
                            );

                            const otherAnswer =
                                other.querySelector(
                                    ".faq-answer"
                                );

                            if (otherAnswer) {
                                otherAnswer.style.maxHeight =
                                    null;
                            }

                        }

                    });


                item.classList.toggle("active");


                if (
                    item.classList.contains("active")
                ) {

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                } else {

                    answer.style.maxHeight =
                        null;

                }

            }
        );

    });


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    byId("lightbox");

const lightboxImage =
    byId("lightboxImage");

const closeLightbox =
    byId("closeLightbox");


galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        if (!lightbox || !lightboxImage) return;

        const image =
            item.dataset.image;

        if (!image) return;

        lightboxImage.src = image;

        lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


function closeGallery() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


on(closeLightbox, "click", closeGallery);


on(lightbox, "click", event => {

    if (event.target === lightbox) {
        closeGallery();
    }

});


/* =========================================================
   TESTIMONIAL CAROUSEL
========================================================= */

const testimonialTrack =
    byId("testimonialTrack");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const testimonialDots =
    byId("testimonialDots");

const testimonialPrev =
    byId("testimonialPrev");

const testimonialNext =
    byId("testimonialNext");


let testimonialIndex = 0;


if (
    testimonialTrack &&
    testimonialDots &&
    testimonialCards.length
) {

    testimonialCards.forEach((_, index) => {

        const dot =
            document.createElement("button");

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            `Go to testimonial ${index + 1}`
        );

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            testimonialIndex = index;

            updateTestimonial();

        });

        testimonialDots.appendChild(dot);

    });


    function updateTestimonial() {

        testimonialTrack.style.transform =
            `translateX(-${testimonialIndex * 100}%)`;

        testimonialDots
            .querySelectorAll("button")
            .forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === testimonialIndex
                );

            });

    }


    function nextTestimonial() {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonialCards.length
        ) {

            testimonialIndex = 0;

        }

        updateTestimonial();

    }


    function previousTestimonial() {

        testimonialIndex--;

        if (testimonialIndex < 0) {

            testimonialIndex =
                testimonialCards.length - 1;

        }

        updateTestimonial();

    }


    on(
        testimonialNext,
        "click",
        nextTestimonial
    );


    on(
        testimonialPrev,
        "click",
        previousTestimonial
    );


    setInterval(
        nextTestimonial,
        6000
    );

}


/* =========================================================
   WHATSAPP ENQUIRY
========================================================= */

const whatsappForm =
    byId("whatsappForm");


on(whatsappForm, "submit", event => {

    event.preventDefault();

    const name =
        byId("name")?.value.trim() || "";

    const phone =
        byId("phone")?.value.trim() || "";

    const subject =
        byId("subject")?.value.trim() || "";

    const message =
        byId("message")?.value.trim() || "";


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
        "_blank",
        "noopener"
    );

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    byId("backToTop");


window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


on(backToTop, "click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    byId("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ESC KEY — LIGHTBOX
========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        lightbox?.classList.contains("active")
    ) {

        closeGallery();

    }

});


/* =========================================================
   3D HUMAN BODY EXPLORER
   IMPORTANT:

   Three.js is loaded separately.

   If the CDN fails, the rest of the website
   continues working normally.
========================================================= */

async function start3DExplorer() {

    const anatomyContainer =
        byId("anatomyCanvas");

    const anatomyLoader =
        byId("anatomyLoader");


    if (!anatomyContainer) {
        return;
    }


    let THREE;
    let OrbitControls;


    /* -----------------------------------------------------
       LOAD THREE.JS SAFELY
    ----------------------------------------------------- */

    try {

        THREE =
            await import(
                "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"
            );


        const controlsModule =
            await import(
                "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js"
            );


        OrbitControls =
            controlsModule.OrbitControls;


    } catch (error) {

        console.error(
            "3D Human Body Explorer could not load:",
            error
        );


        if (anatomyLoader) {

            anatomyLoader.innerHTML = `
                <div style="
                    text-align:center;
                    padding:30px;
                    color:white;
                ">
                    <strong>
                        3D viewer unavailable
                    </strong>
                    <br>
                    <small style="
                        display:block;
                        margin-top:8px;
                        opacity:.7;
                    ">
                        The rest of the website is still available.
                    </small>
                </div>
            `;

        }

        return;

    }


    /* -----------------------------------------------------
       THREE VARIABLES
    ----------------------------------------------------- */

    let scene;
    let camera;
    let renderer;
    let controls;
    let humanModel;

    let currentGender = "male";


    /* -----------------------------------------------------
       INITIALISE
    ----------------------------------------------------- */

    function initAnatomyViewer() {

        try {

            scene =
                new THREE.Scene();


            scene.background =
                new THREE.Color(
                    0x08291c
                );


            const width =
                anatomyContainer.clientWidth ||
                600;


            const height =
                anatomyContainer.clientHeight ||
                650;


            camera =
                new THREE.PerspectiveCamera(
                    40,
                    width / height,
                    0.1,
                    100
                );


            camera.position.set(
                0,
                1.3,
                7
            );


            renderer =
                new THREE.WebGLRenderer({

                    antialias: true,

                    alpha: true

                });


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                )
            );


            renderer.setSize(
                width,
                height
            );


            anatomyContainer.appendChild(
                renderer.domElement
            );


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
                4;

            controls.maxDistance =
                10;


            controls.target.set(
                0,
                1,
                0
            );


            /* LIGHTING */

            const ambientLight =
                new THREE.AmbientLight(
                    0xffffff,
                    2
                );

            scene.add(
                ambientLight
            );


            const frontLight =
                new THREE.DirectionalLight(
                    0xffffff,
                    3
                );

            frontLight.position.set(
                3,
                5,
                5
            );

            scene.add(
                frontLight
            );


            const greenLight =
                new THREE.PointLight(
                    0x49d17c,
                    15,
                    15
                );

            greenLight.position.set(
                -4,
                2,
                3
            );

            scene.add(
                greenLight
            );


            createHumanModel();


            if (anatomyLoader) {

                anatomyLoader.style.display =
                    "none";

            }


            animate();


        } catch (error) {

            console.error(
                "3D viewer initialization failed:",
                error
            );


            if (anatomyLoader) {

                anatomyLoader.innerHTML = `
                    <div style="
                        text-align:center;
                        padding:30px;
                        color:white;
                    ">
                        <strong>
                            3D viewer unavailable
                        </strong>
                        <br>
                        <small style="
                            display:block;
                            margin-top:8px;
                            opacity:.7;
                        ">
                            Your hospital website is still working.
                        </small>
                    </div>
                `;

            }

        }

    }


    /* =====================================================
       CREATE HUMAN MODEL
    ===================================================== */

    function createHumanModel() {

        if (!scene) return;


        if (humanModel) {

            scene.remove(
                humanModel
            );

        }


        humanModel =
            new THREE.Group();


        /* COLORS */

        const skinColor =
            currentGender === "male"
                ? 0x9b5d3c
                : 0xb76f55;


        const bodyColor =
            currentGender === "male"
                ? 0x1b9a5a
                : 0x2dbf73;


        const skinMaterial =
            new THREE.MeshStandardMaterial({

                color: skinColor,

                roughness: 0.7

            });


        const bodyMaterial =
            new THREE.MeshStandardMaterial({

                color: bodyColor,

                roughness: 0.5,

                metalness: 0.05

            });


        const organMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xf06464,

                emissive: 0x330000

            });


        const boneMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xe7dfc9

            });


        /* HEAD */

        const head =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.55,
                    32,
                    32
                ),
                skinMaterial
            );


        head.position.y =
            3.5;

        head.name =
            "brain";

        humanModel.add(
            head
        );


        /* NECK */

        const neck =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.2,
                    0.23,
                    0.4,
                    16
                ),
                skinMaterial
            );


        neck.position.y =
            2.95;

        humanModel.add(
            neck
        );


        /* TORSO */

        const torso =
            new THREE.Mesh(
                new THREE.CapsuleGeometry(
                    0.85,
                    1.5,
                    12,
                    24
                ),
                bodyMaterial
            );


        torso.scale.y =
            1.15;

        torso.position.y =
            1.65;

        humanModel.add(
            torso
        );


        /* HEART */

        const heart =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.25,
                    24,
                    24
                ),
                organMaterial
            );


        heart.position.set(
            -0.15,
            1.8,
            0.8
        );

        heart.name =
            "heart";

        humanModel.add(
            heart
        );


        /* LUNGS */

        const leftLung =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.28,
                    20,
                    20
                ),
                organMaterial
            );


        leftLung.scale.y =
            1.4;

        leftLung.position.set(
            -0.35,
            2,
            0.72
        );

        leftLung.name =
            "lungs";

        humanModel.add(
            leftLung
        );


        const rightLung =
            leftLung.clone();

        rightLung.position.x =
            0.35;

        humanModel.add(
            rightLung
        );


        /* STOMACH */

        const stomachMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xf2a35e

            });


        const stomach =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.3,
                    24,
                    24
                ),
                stomachMaterial
            );


        stomach.scale.set(
            1.1,
            1.4,
            0.8
        );


        stomach.position.set(
            0.15,
            0.9,
            0.8
        );


        stomach.name =
            "stomach";

        humanModel.add(
            stomach
        );


        /* ARMS */

        [-1, 1].forEach(side => {

            const arm =
                new THREE.Mesh(
                    new THREE.CapsuleGeometry(
                        0.22,
                        1.5,
                        8,
                        16
                    ),
                    skinMaterial
                );


            arm.position.set(
                side * 1.05,
                1.7,
                0
            );


            arm.rotation.z =
                side * -0.12;


            humanModel.add(
                arm
            );

        });


        /* LEGS */

        [-1, 1].forEach(side => {

            const leg =
                new THREE.Mesh(
                    new THREE.CapsuleGeometry(
                        0.3,
                        1.8,
                        8,
                        16
                    ),
                    bodyMaterial
                );


            leg.position.set(
                side * 0.43,
                -1.1,
                0
            );


            humanModel.add(
                leg
            );

        });


        /* SPINE */

        const spine =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.08,
                    0.08,
                    2.5,
                    16
                ),
                boneMaterial
            );


        spine.position.set(
            0,
            1.4,
            -0.6
        );


        spine.name =
            "bones";

        humanModel.add(
            spine
        );


        humanModel.position.y =
            0.3;


        scene.add(
            humanModel
        );

    }


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        if (!renderer || !scene || !camera) {
            return;
        }


        requestAnimationFrame(
            animate
        );


        if (controls) {
            controls.update();
        }


        renderer.render(
            scene,
            camera
        );

    }


    /* =====================================================
       BODY DATA
    ===================================================== */

    const anatomyData = {

        brain: {

            title: "Brain",

            description:
                "The brain is a major part of the nervous system and coordinates many functions of the body.",

            system:
                "Nervous System",

            focus:
                "Control and coordination",

            position:
                [0, 3.4, 5]

        },


        heart: {

            title: "Heart",

            description:
                "The heart is a muscular organ that pumps blood through the circulatory system.",

            system:
                "Circulatory System",

            focus:
                "Blood circulation",

            position:
                [0, 1.8, 4.8]

        },


        lungs: {

            title: "Lungs",

            description:
                "The lungs are major organs of the respiratory system and are involved in breathing.",

            system:
                "Respiratory System",

            focus:
                "Gas exchange",

            position:
                [0, 2, 5]

        },


        stomach: {

            title:
                "Digestive System",

            description:
                "The digestive system processes food and helps the body obtain nutrients.",

            system:
                "Digestive System",

            focus:
                "Food processing",

            position:
                [0, 0.9, 5]

        },


        bones: {

            title:
                "Skeletal System",

            description:
                "The skeletal system provides structure and supports movement and protection.",

            system:
                "Skeletal System",

            focus:
                "Support and protection",

            position:
                [0, 1.5, 6]

        },


        muscles: {

            title:
                "Muscular System",

            description:
                "Muscles work with the skeletal system to produce movement and maintain posture.",

            system:
                "Muscular System",

            focus:
                "Movement",

            position:
                [0, 1.5, 6]

        }

    };


    const bodyPartTitle =
        byId("bodyPartTitle");

    const bodyPartDescription =
        byId("bodyPartDescription");

    const bodyPartFacts =
        byId("bodyPartFacts");


    function selectBodyPart(part) {

        const data =
            anatomyData[part];

        if (!data) return;


        if (bodyPartTitle) {

            bodyPartTitle.textContent =
                data.title;

        }


        if (bodyPartDescription) {

            bodyPartDescription.textContent =
                data.description;

        }


        if (bodyPartFacts) {

            bodyPartFacts.innerHTML = `
                <div>
                    <span>System</span>
                    <strong>${data.system}</strong>
                </div>

                <div>
                    <span>Focus</span>
                    <strong>${data.focus}</strong>
                </div>
            `;

        }


        document
            .querySelectorAll(".body-part-btn")
            .forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


        document
            .querySelector(
                `[data-part="${part}"]`
            )
            ?.classList.add("active");


        if (camera && controls) {

            camera.position.set(
                ...data.position
            );


            controls.target.set(
                0,
                1.5,
                0
            );


            controls.update();

        }

    }


    document
        .querySelectorAll(".body-part-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectBodyPart(
                        button.dataset.part
                    );

                }
            );

        });


    /* =====================================================
       MODEL SWITCH
    ===================================================== */

    document
        .querySelectorAll(".model-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    currentGender =
                        button.dataset.model ||
                        "male";


                    document
                        .querySelectorAll(
                            ".model-btn"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    createHumanModel();

                }
            );

        });


    /* =====================================================
       VIEWER CONTROLS
    ===================================================== */

    on(
        byId("rotateLeft"),
        "click",
        () => {

            if (humanModel) {

                humanModel.rotation.y +=
                    Math.PI / 8;

            }

        }
    );


    on(
        byId("rotateRight"),
        "click",
        () => {

            if (humanModel) {

                humanModel.rotation.y -=
                    Math.PI / 8;

            }

        }
    );


    on(
        byId("resetView"),
        "click",
        () => {

            if (humanModel) {

                humanModel.rotation.set(
                    0,
                    0,
                    0
                );

            }


            if (camera && controls) {

                camera.position.set(
                    0,
                    1.3,
                    7
                );


                controls.target.set(
                    0,
                    1,
                    0
                );


                controls.update();

            }

        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                !renderer ||
                !camera ||
                !anatomyContainer
            ) {

                return;

            }


            const width =
                anatomyContainer.clientWidth ||
                600;


            const height =
                anatomyContainer.clientHeight ||
                650;


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }
    );


    /* =====================================================
       START
    ===================================================== */

    initAnatomyViewer();

}


/* =========================================================
   START 3D AFTER NORMAL WEBSITE SCRIPT
========================================================= */

start3DExplorer()
    .catch(error => {

        /*
         * Absolute final safety net.
         * Even if something unexpected happens inside
         * the 3D system, the main website remains alive.
         */

        console.error(
            "3D Explorer error:",
            error
        );

    });


/* =========================================================
   FINAL SAFETY
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Website error:",
            event.error || event.message
        );

    }
);
