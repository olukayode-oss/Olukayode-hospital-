import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import {
    OrbitControls
} from
"https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


document
    .querySelectorAll("#navMenu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });


/* =========================================================
   ANIMATED COUNTERS
========================================================= */

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

                let current = 0;

                const speed =
                    Math.max(
                        10,
                        Math.floor(1500 / target)
                    );


                function updateCounter() {

                    current++;

                    if (current >= target) {

                        counter.textContent =
                            target + "+";

                    } else {

                        counter.textContent =
                            current;

                        setTimeout(
                            updateCounter,
                            speed
                        );

                    }

                }


                updateCounter();

                counterObserver.unobserve(
                    counter
                );

            });

        },

        {
            threshold: .6
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

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
            threshold: .12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


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
                    item.querySelector(
                        ".faq-answer"
                    );


                document
                    .querySelectorAll(
                        ".faq-item"
                    )
                    .forEach(other => {

                        if (other !== item) {

                            other.classList.remove(
                                "active"
                            );

                            other
                                .querySelector(
                                    ".faq-answer"
                                )
                                .style.maxHeight =
                                null;

                        }

                    });


                item.classList.toggle(
                    "active"
                );


                if (
                    item.classList.contains(
                        "active"
                    )
                ) {

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

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
    document.querySelectorAll(
        ".gallery-item"
    );

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            lightboxImage.src =
                item.dataset.image;

            lightbox.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

});


function closeGallery() {

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow = "";

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeGallery();

        }

    }
);


/* =========================================================
   TESTIMONIAL CAROUSEL
========================================================= */

const testimonialTrack =
    document.getElementById(
        "testimonialTrack"
    );

const testimonialCards =
    document.querySelectorAll(
        ".testimonial-card"
    );

const testimonialDots =
    document.getElementById(
        "testimonialDots"
    );

const testimonialPrev =
    document.getElementById(
        "testimonialPrev"
    );

const testimonialNext =
    document.getElementById(
        "testimonialNext"
    );


let testimonialIndex = 0;


testimonialCards.forEach(
    (_, index) => {

        const dot =
            document.createElement(
                "button"
            );

        if (index === 0) {

            dot.classList.add(
                "active"
            );

        }


        dot.addEventListener(
            "click",
            () => {

                testimonialIndex =
                    index;

                updateTestimonial();

            }
        );


        testimonialDots.appendChild(
            dot
        );

    }
);


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


testimonialNext.addEventListener(
    "click",
    nextTestimonial
);


testimonialPrev.addEventListener(
    "click",
    previousTestimonial
);


/* AUTO MOVE */

setInterval(
    nextTestimonial,
    6000
);


/* =========================================================
   WHATSAPP ENQUIRY
========================================================= */

const whatsappForm =
    document.getElementById(
        "whatsappForm"
    );


whatsappForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value.trim();

        const phone =
            document
                .getElementById("phone")
                .value.trim();

        const subject =
            document
                .getElementById("subject")
                .value.trim();

        const message =
            document
                .getElementById("message")
                .value.trim();


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


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
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


/* =========================================================
   CURRENT YEAR
========================================================= */

document
    .getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            closeGallery();

        }

    }
);


/* =========================================================
   3D HUMAN BODY EXPLORER
========================================================= */

const anatomyContainer =
    document.getElementById(
        "anatomyCanvas"
    );

const anatomyLoader =
    document.getElementById(
        "anatomyLoader"
    );


let scene;
let camera;
let renderer;
let controls;
let humanModel;
let currentGender = "male";


/* -------------------------
   INITIALISE 3D VIEWER
------------------------- */

function initAnatomyViewer() {

    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x08291c
        );


    camera =
        new THREE.PerspectiveCamera(
            40,
            anatomyContainer.clientWidth /
            anatomyContainer.clientHeight,
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
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        anatomyContainer.clientWidth,
        anatomyContainer.clientHeight
    );


    anatomyContainer.appendChild(
        renderer.domElement
    );


    controls =
        new OrbitControls(
            camera,
            renderer.domElement
        );


    controls.enableDamping = true;

    controls.dampingFactor = .06;

    controls.enablePan = false;

    controls.minDistance = 4;

    controls.maxDistance = 10;

    controls.target.set(
        0,
        1,
        0
    );


    /* LIGHTS */

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


    anatomyLoader.style.display =
        "none";


    animate();

}


/* =========================================================
   CREATE INTERACTIVE HUMAN MODEL

   This creates a stylised 3D anatomical figure.
   A real GLB anatomy model can later replace it.
========================================================= */

function createHumanModel() {

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

            roughness: .7

        });


    const bodyMaterial =
        new THREE.MeshStandardMaterial({

            color: bodyColor,

            roughness: .5,

            metalness: .05

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
                .55,
                32,
                32
            ),

            skinMaterial

        );


    head.position.y = 3.5;

    head.name = "brain";

    humanModel.add(head);


    /* NECK */

    const neck =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .2,
                .23,
                .4,
                16
            ),

            skinMaterial

        );


    neck.position.y = 2.95;

    humanModel.add(neck);


    /* TORSO */

    const torso =
        new THREE.Mesh(

            new THREE.CapsuleGeometry(
                .85,
                1.5,
                12,
                24
            ),

            bodyMaterial

        );


    torso.scale.y = 1.15;

    torso.position.y = 1.65;

    humanModel.add(torso);


    /* HEART */

    const heart =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .25,
                24,
                24
            ),

            organMaterial

        );


    heart.position.set(
        -.15,
        1.8,
        .8
    );


    heart.name = "heart";

    humanModel.add(
        heart
    );


    /* LUNGS */

    const leftLung =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .28,
                20,
                20
            ),

            organMaterial

        );


    leftLung.scale.y = 1.4;

    leftLung.position.set(
        -.35,
        2,
        .72
    );


    leftLung.name =
        "lungs";


    humanModel.add(
        leftLung
    );


    const rightLung =
        leftLung.clone();


    rightLung.position.x =
        .35;


    humanModel.add(
        rightLung
    );


    /* STOMACH */

    const stomach =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .3,
                24,
                24
            ),

            new THREE.MeshStandardMaterial({

                color: 0xf2a35e

            })

        );


    stomach.scale.set(
        1.1,
        1.4,
        .8
    );


    stomach.position.set(
        .15,
        .9,
        .8
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
                    .22,
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
            side * -.12;


        humanModel.add(
            arm
        );

    });


    /* LEGS */

    [-1, 1].forEach(side => {

        const leg =
            new THREE.Mesh(

                new THREE.CapsuleGeometry(
                    .3,
                    1.8,
                    8,
                    16
                ),

                bodyMaterial

            );


        leg.position.set(
            side * .43,
            -1.1,
            0
        );


        humanModel.add(
            leg
        );

    });


    /* BONE SYSTEM VISUAL */

    const spine =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .08,
                .08,
                2.5,
                16
            ),

            boneMaterial

        );


    spine.position.set(
        0,
        1.4,
        -.6
    );


    spine.name =
        "bones";


    humanModel.add(
        spine
    );


    humanModel.position.y =
        .3;


    scene.add(
        humanModel
    );

}


/* =========================================================
   ANIMATE
========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (!renderer) return;


        const width =
            anatomyContainer.clientWidth;

        const height =
            anatomyContainer.clientHeight;


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height
        );

    }
);


/* =========================================================
   BODY INFORMATION
========================================================= */

const anatomyData = {

    brain: {

        title:
            "Brain",

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

        title:
            "Heart",

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

        title:
            "Lungs",

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
            [0, .9, 5]

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
    document.getElementById(
        "bodyPartTitle"
    );

const bodyPartDescription =
    document.getElementById(
        "bodyPartDescription"
    );

const bodyPartFacts =
    document.getElementById(
        "bodyPartFacts"
    );


function selectBodyPart(part) {

    const data =
        anatomyData[part];


    if (!data) return;


    bodyPartTitle.textContent =
        data.title;


    bodyPartDescription.textContent =
        data.description;


    bodyPartFacts.innerHTML =
`
<div>
    <span>System</span>
    <strong>${data.system}</strong>
</div>

<div>
    <span>Focus</span>
    <strong>${data.focus}</strong>
</div>
`;


    document
        .querySelectorAll(
            ".body-part-btn"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    document
        .querySelector(
            `[data-part="${part}"]`
        )
        ?.classList.add(
            "active"
        );


    if (camera) {

        camera.position.set(
            ...data.position
        );


        controls.target.set(
            0,
            1.5,
            0
        );

    }

}


document
    .querySelectorAll(
        ".body-part-btn"
    )
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


/* =========================================================
   MODEL SWITCH
========================================================= */

document
    .querySelectorAll(
        ".model-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                currentGender =
                    button.dataset.model;


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


/* =========================================================
   VIEWER CONTROLS
========================================================= */

document
    .getElementById("rotateLeft")
    .addEventListener(
        "click",
        () => {

            humanModel.rotation.y +=
                Math.PI / 8;

        }
    );


document
    .getElementById("rotateRight")
    .addEventListener(
        "click",
        () => {

            humanModel.rotation.y -=
                Math.PI / 8;

        }
    );


document
    .getElementById("resetView")
    .addEventListener(
        "click",
        () => {

            humanModel.rotation.set(
                0,
                0,
                0
            );


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

        }
    );


/* =========================================================
   START 3D VIEWER
========================================================= */

initAnatomyViewer();
