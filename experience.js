/* =========================================================
   ZYPHERA DIGITAL — EXPERIENCE.JS
   Three.js Interactive 3D Experience
   ========================================================= */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


/* =========================================================
   SECTION DATA
   ========================================================= */

const SECTIONS = [
    {
        id: 'home',
        label: 'Home',
        title: 'Digital Technology & Solutions',
        description:
            'Building smarter digital experiences through technology, design and security. Zyphera Digital is an independent technology studio delivering reliable, modern solutions.',
        tags: [
            'IT Support',
            'Web Development',
            'Networking',
            'Security'
        ],
        color: 0x22d3ee,
        position: new THREE.Vector3(0, 2, 0),
        shape: 'core'
    },

    {
        id: 'services',
        label: 'Services',
        title: 'What We Provide',
        description:
            'Technical troubleshooting, modern web development, cybersecurity assessment, and network infrastructure support — practical solutions built for the real world.',
        tags: [
            'IT Support',
            'Web Dev',
            'Cybersecurity',
            'Networking'
        ],
        color: 0x06b6d4,
        position: new THREE.Vector3(-7, 1.8, -5),
        shape: 'octahedron'
    },

    {
        id: 'projects',
        label: 'Projects',
        title: 'Technology Lab',
        description:
            'Operational environments and active development systems — from IT support simulations and networking labs to cybersecurity home labs and AI assistants.',
        tags: [
            'IT Lab',
            'Networking',
            'Cybersecurity',
            'Nova AI'
        ],
        color: 0x0891b2,
        position: new THREE.Vector3(7, 1.8, -5),
        shape: 'torus'
    },

    {
        id: 'about',
        label: 'About',
        title: 'Technology Built With Purpose',
        description:
            'Zyphera Digital focuses on practical technology solutions across IT support, web development, networking and cybersecurity — combining technical expertise with thoughtful design.',
        tags: [
            'Independent Studio',
            'Full-Stack',
            'Security-First'
        ],
        color: 0x67e8f9,
        position: new THREE.Vector3(-7, 1.8, 5),
        shape: 'icosahedron'
    },

    {
        id: 'contact',
        label: 'Contact',
        title: 'Have a Project in Mind?',
        description:
            "Let's build something together. Reach out for IT support, web development, cybersecurity, or networking — we'd love to hear about your project.",
        tags: [
            'Get Started',
            'Collaborate',
            'Consult'
        ],
        color: 0x0ea5e9,
        position: new THREE.Vector3(7, 1.8, 5),
        shape: 'ring'
    }
];


/* =========================================================
   DOM
   ========================================================= */

const canvas =
    document.getElementById('canvas');

const labelsContainer =
    document.getElementById('labels');

const infoPanel =
    document.getElementById('infoPanel');

const infoClose =
    document.getElementById('infoClose');

const infoLabel =
    document.getElementById('infoLabel');

const infoTitle =
    document.getElementById('infoTitle');

const infoDesc =
    document.getElementById('infoDesc');

const infoTags =
    document.getElementById('infoTags');

const btnBack =
    document.getElementById('btnBack');

const hudHint =
    document.getElementById('hudHint');

const logoReset =
    document.getElementById('logoReset');

const loader =
    document.getElementById('loader');


/* =========================================================
   SAFETY CHECK
   ========================================================= */

if (!canvas) {

    console.error(
        'Zyphera Digital: #canvas was not found.'
    );

    throw new Error(
        'Three.js canvas not found.'
    );
}


/* =========================================================
   RENDERER
   ========================================================= */

const renderer =
    new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.2;


/* =========================================================
   SCENE
   ========================================================= */

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x030712
    );


scene.fog =
    new THREE.FogExp2(
        0x030712,
        0.018
    );


/* =========================================================
   CAMERA
   ========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
            window.innerHeight,
        0.1,
        200
    );


const overviewPosition =
    new THREE.Vector3(
        0,
        6,
        18
    );


const overviewTarget =
    new THREE.Vector3(
        0,
        1,
        0
    );


camera.position.copy(
    overviewPosition
);


/* =========================================================
   ORBIT CONTROLS
   ========================================================= */

const controls =
    new OrbitControls(
        camera,
        canvas
    );


controls.target.copy(
    overviewTarget
);


controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.maxPolarAngle =
    Math.PI / 2.1;

controls.minDistance = 5;

controls.maxDistance = 30;

controls.enablePan = false;

controls.enabled = true;


/* =========================================================
   LIGHTING
   ========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0x0c4a6e,
        0.4
    );

scene.add(
    ambientLight
);


const mainLight =
    new THREE.DirectionalLight(
        0x22d3ee,
        1.2
    );


mainLight.position.set(
    10,
    20,
    10
);


mainLight.castShadow = true;


mainLight.shadow.mapSize.set(
    2048,
    2048
);


mainLight.shadow.camera.near =
    0.5;

mainLight.shadow.camera.far =
    60;

mainLight.shadow.camera.left =
    -20;

mainLight.shadow.camera.right =
    20;

mainLight.shadow.camera.top =
    20;

mainLight.shadow.camera.bottom =
    -20;


scene.add(
    mainLight
);


const fillLight =
    new THREE.PointLight(
        0x06b6d4,
        2,
        40
    );


fillLight.position.set(
    -8,
    8,
    -8
);


scene.add(
    fillLight
);


const rimLight =
    new THREE.PointLight(
        0x0891b2,
        1.5,
        40
    );


rimLight.position.set(
    8,
    6,
    8
);


scene.add(
    rimLight
);


/* =========================================================
   ENVIRONMENT
   ========================================================= */

function createGridFloor() {

    const grid =
        new THREE.GridHelper(
            60,
            60,
            0x0891b2,
            0x0e7490
        );


    grid.material.opacity =
        0.25;

    grid.material.transparent =
        true;

    grid.position.y = 0;

    scene.add(grid);


    const floorGeometry =
        new THREE.PlaneGeometry(
            60,
            60
        );


    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x020617,
            metalness: 0.8,
            roughness: 0.3
        });


    const floor =
        new THREE.Mesh(
            floorGeometry,
            floorMaterial
        );


    floor.rotation.x =
        -Math.PI / 2;


    floor.receiveShadow = true;

    scene.add(floor);
}


/* =========================================================
   PLATFORMS
   ========================================================= */

function createPlatform(
    x,
    z,
    color
) {

    const group =
        new THREE.Group();


    const disc =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                1.4,
                1.5,
                0.15,
                32
            ),

            new THREE.MeshStandardMaterial({
                color: 0x0f172a,
                metalness: 0.9,
                roughness: 0.2,
                emissive: color,
                emissiveIntensity: 0.08
            })
        );


    disc.position.y = 0.08;

    disc.castShadow = true;

    disc.receiveShadow = true;

    group.add(disc);


    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.5,
                0.03,
                8,
                64
            ),

            new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.6
            })
        );


    ring.rotation.x =
        -Math.PI / 2;

    ring.position.y = 0.16;

    group.add(ring);


    group.position.set(
        x,
        0,
        z
    );


    scene.add(group);

    return group;
}


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

    const count = 800;


    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        positions[i * 3] =
            (Math.random() - 0.5) *
            50;


        positions[i * 3 + 1] =
            Math.random() * 25;


        positions[i * 3 + 2] =
            (Math.random() - 0.5) *
            50;
    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({
            color: 0x22d3ee,
            size: 0.06,
            transparent: true,
            opacity: 0.5,
            blending:
                THREE.AdditiveBlending,
            depthWrite: false
        });


    const points =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(points);

    return points;
}


/* =========================================================
   DATA STREAMS
   ========================================================= */

function createDataStreams() {

    const streams = [];


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const points = [];


        const startX =
            (Math.random() - 0.5) *
            40;


        const startZ =
            (Math.random() - 0.5) *
            40;


        for (
            let j = 0;
            j <= 10;
            j++
        ) {

            points.push(
                new THREE.Vector3(
                    startX +
                        j * 0.5,

                    0.5 +
                        Math.sin(
                            j * 0.8
                        ) * 0.3,

                    startZ +
                        j * 0.3
                )
            );
        }


        const curve =
            new THREE.CatmullRomCurve3(
                points
            );


        const tube =
            new THREE.Mesh(
                new THREE.TubeGeometry(
                    curve,
                    40,
                    0.02,
                    6,
                    false
                ),

                new THREE.MeshBasicMaterial({
                    color: 0x06b6d4,
                    transparent: true,
                    opacity: 0.15
                })
            );


        scene.add(tube);

        streams.push(tube);
    }


    return streams;
}


/* =========================================================
   OBJECT STORAGE
   ========================================================= */

const interactiveObjects = [];

const objectMeshes = [];

const labelElements = {};

const objectGroups = {};


/* =========================================================
   GLOW MATERIAL
   ========================================================= */

function createGlowMaterial(
    color
) {

    return new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.9,
        roughness: 0.15,
        emissive: color,
        emissiveIntensity: 0.6
    });
}


/* =========================================================
   OBJECT GEOMETRY
   ========================================================= */

function createShape(
    shape,
    color
) {

    const material =
        createGlowMaterial(
            color
        );


    let geometry;


    switch (shape) {

        case 'octahedron':

            geometry =
                new THREE.OctahedronGeometry(
                    1.25,
                    1
                );

            break;


        case 'torus':

            geometry =
                new THREE.TorusGeometry(
                    0.95,
                    0.28,
                    16,
                    48
                );

            break;


        case 'icosahedron':

            geometry =
                new THREE.IcosahedronGeometry(
                    1.2,
                    1
                );

            break;


        case 'ring':

            geometry =
                new THREE.TorusKnotGeometry(
                    0.8,
                    0.25,
                    64,
                    16
                );

            break;


        case 'core':
        default:

            geometry =
                new THREE.IcosahedronGeometry(
                    1.35,
                    2
                );

            break;
    }


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    /*
     * Store the original material
     * properties for hover animation.
     */

    mesh.userData.baseColor =
        color;

    mesh.userData.baseScale =
        1;

    return mesh;
}


/* =========================================================
   CREATE INTERACTIVE OBJECT
   ========================================================= */

function createInteractiveObject(
    section
) {

    const group =
        new THREE.Group();


    group.position.copy(
        section.position
    );


    group.userData.sectionId =
        section.id;


    group.userData.baseY =
        section.position.y;


    const mesh =
        createShape(
            section.shape,
            section.color
        );


    group.add(mesh);


    /*
     * Outer glow sphere.
     */

    const glowGeometry =
        new THREE.SphereGeometry(
            1.7,
            24,
            24
        );


    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: section.color,
            transparent: true,
            opacity: 0.045,
            side: THREE.BackSide,
            blending:
                THREE.AdditiveBlending,
            depthWrite: false
        });


    const glow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );


    group.add(glow);


    /*
     * Orbiting ring.
     */

    const orbitRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.65,
                0.018,
                8,
                64
            ),

            new THREE.MeshBasicMaterial({
                color: section.color,
                transparent: true,
                opacity: 0.5
            })
        );


    orbitRing.rotation.x =
        Math.PI / 2;


    group.add(
        orbitRing
    );


    /*
     * Small point light.
     */

    const light =
        new THREE.PointLight(
            section.color,
            0.8,
            8
        );


    light.position.set(
        0,
        0.5,
        0
    );


    group.add(light);


    scene.add(group);


    interactiveObjects.push(
        group
    );


    objectMeshes.push(
        mesh
    );


    objectGroups[
        section.id
    ] = group;


    return group;
}


/* =========================================================
   LABEL CREATION
   ========================================================= */

function createLabel(
    section
) {

    if (!labelsContainer) {
        return;
    }


    const label =
        document.createElement(
            'button'
        );


    label.className =
        'object-label';


    label.type =
        'button';


    label.dataset.section =
        section.id;


    label.innerHTML = `
        <span class="label-dot"></span>
        <span class="label-text">
            ${section.label}
        </span>
    `;


    label.addEventListener(
        'click',
        event => {

            event.stopPropagation();

            focusSection(
                section.id
            );
        }
    );


    labelsContainer.appendChild(
        label
    );


    labelElements[
        section.id
    ] = label;
}


/* =========================================================
   BUILD WORLD
   ========================================================= */

createGridFloor();

const particles =
    createParticles();

const streams =
    createDataStreams();


SECTIONS.forEach(
    section => {

        if (
            section.id !==
            'home'
        ) {

            createPlatform(
                section.position.x,
                section.position.z,
                section.color
            );
        }


        createInteractiveObject(
            section
        );


        createLabel(
            section
        );
    }
);


/* =========================================================
   RAYCASTING
   ========================================================= */

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2(
        -10,
        -10
    );


let hoveredObject = null;

let selectedSection = null;


/* =========================================================
   MOUSE POSITION
   ========================================================= */

window.addEventListener(
    'pointermove',
    event => {

        mouse.x =
            (event.clientX /
                window.innerWidth) *
                2 -
            1;


        mouse.y =
            -(event.clientY /
                window.innerHeight) *
                2 +
            1;
    },
    {
        passive: true
    }
);


/* =========================================================
   POINTER DOWN
   ========================================================= */

window.addEventListener(
    'pointerdown',
    event => {

        if (
            event.target !== canvas
        ) {
            return;
        }


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const intersections =
            raycaster.intersectObjects(
                objectMeshes,
                false
            );


        if (
            intersections.length
        ) {

            const mesh =
                intersections[0]
                    .object;


            const sectionId =
                mesh.parent
                    ?.userData
                    ?.sectionId;


            if (sectionId) {

                focusSection(
                    sectionId
                );
            }
        }
    }
);


/* =========================================================
   HOVER
   ========================================================= */

function updateHover() {

    raycaster.setFromCamera(
        mouse,
        camera
    );


    const intersections =
        raycaster.intersectObjects(
            objectMeshes,
            false
        );


    const newHovered =
        intersections.length
            ? intersections[0].object
            : null;


    if (
        hoveredObject !==
        newHovered
    ) {

        if (hoveredObject) {

            hoveredObject
                .userData
                .hovered = false;
        }


        hoveredObject =
            newHovered;


        if (hoveredObject) {

            hoveredObject
                .userData
                .hovered = true;


            canvas.style.cursor =
                'pointer';

        } else {

            canvas.style.cursor =
                'grab';
        }
    }
}


/* =========================================================
   INFO PANEL
   ========================================================= */

function openInfoPanel(
    section
) {

    if (!infoPanel) {
        return;
    }


    selectedSection =
        section.id;


    if (infoLabel) {

        infoLabel.textContent =
            section.label;
    }


    if (infoTitle) {

        infoTitle.textContent =
            section.title;
    }


    if (infoDesc) {

        infoDesc.textContent =
            section.description;
    }


    if (infoTags) {

        infoTags.innerHTML = '';


        section.tags.forEach(
            tag => {

                const li =
                    document.createElement(
                        'li'
                    );


                li.textContent =
                    tag;


                infoTags.appendChild(
                    li
                );
            }
        );
    }


    infoPanel.classList.add(
        'active'
    );


    infoPanel.setAttribute(
        'aria-hidden',
        'false'
    );


    if (hudHint) {

        hudHint.textContent =
            'Section selected';
    }
}


/* =========================================================
   CLOSE INFO PANEL
   ========================================================= */

function closeInfoPanel() {

    if (!infoPanel) {
        return;
    }


    infoPanel.classList.remove(
        'active'
    );


    infoPanel.setAttribute(
        'aria-hidden',
        'true'
    );


    selectedSection =
        null;


    if (hudHint) {

        hudHint.textContent =
            'Click an object to explore';
    }
}


/* =========================================================
   CAMERA FOCUS
   ========================================================= */

let cameraAnimation = null;


function focusSection(
    sectionId
) {

    const section =
        SECTIONS.find(
            item =>
                item.id ===
                sectionId
        );


    if (!section) {
        return;
    }


    const object =
        objectGroups[
            section.id
        ];


    if (!object) {
        return;
    }


    /*
     * Object location.
     */

    const target =
        object.position.clone();


    /*
     * Camera offset.
     */

    const offset =
        new THREE.Vector3(
            0,
            3.2,
            8
        );


    if (
        section.id ===
        'home'
    ) {

        offset.set(
            0,
            3.5,
            9
        );
    }


    const destination =
        target.clone().add(
            offset
        );


    cameraAnimation = {

        startPosition:
            camera.position.clone(),

        endPosition:
            destination,

        startTarget:
            controls.target.clone(),

        endTarget:
            target,

        startTime:
            performance.now(),

        duration:
            1100
    };


    openInfoPanel(
        section
    );


    updateLabels();


    if (
        window.history &&
        window.history.replaceState
    ) {

        window.history.replaceState(
            null,
            '',
            `#${section.id}`
        );
    }
}


/* =========================================================
   RETURN TO OVERVIEW
   ========================================================= */

function returnToOverview() {

    closeInfoPanel();


    cameraAnimation = {

        startPosition:
            camera.position.clone(),

        endPosition:
            overviewPosition.clone(),

        startTarget:
            controls.target.clone(),

        endTarget:
            overviewTarget.clone(),

        startTime:
            performance.now(),

        duration:
            1000
    };


    if (
        window.history &&
        window.history.replaceState
    ) {

        window.history.replaceState(
            null,
            '',
            '#home'
        );
    }
}


/* =========================================================
   CAMERA ANIMATION
   ========================================================= */

function updateCameraAnimation() {

    if (!cameraAnimation) {
        return;
    }


    const elapsed =
        performance.now() -
        cameraAnimation.startTime;


    const progress =
        Math.min(
            elapsed /
                cameraAnimation.duration,
            1
        );


    /*
     * Smooth cubic easing.
     */

    const eased =
        1 -
        Math.pow(
            1 - progress,
            3
        );


    camera.position.lerpVectors(
        cameraAnimation.startPosition,
        cameraAnimation.endPosition,
        eased
    );


    controls.target.lerpVectors(
        cameraAnimation.startTarget,
        cameraAnimation.endTarget,
        eased
    );


    if (progress >= 1) {

        cameraAnimation =
            null;
    }
}


/* =========================================================
   LABEL POSITIONING
   ========================================================= */

const labelOffset =
    new THREE.Vector3(
        0,
        1.8,
        0
    );


function updateLabels() {

    if (!labelsContainer) {
        return;
    }


    SECTIONS.forEach(
        section => {

            const label =
                labelElements[
                    section.id
                ];


            const object =
                objectGroups[
                    section.id
                ];


            if (
                !label ||
                !object
            ) {
                return;
            }


            const position =
                object.position
                    .clone()
                    .add(
                        labelOffset
                    );


            position.project(
                camera
            );


            const x =
                (position.x * 0.5 +
                    0.5) *
                window.innerWidth;


            const y =
                (-position.y * 0.5 +
                    0.5) *
                window.innerHeight;


            const visible =
                position.z <
                1;


            label.style.transform =
                `translate(-50%, -50%) translate(${x}px, ${y}px)`;


            label.style.opacity =
                visible
                    ? '1'
                    : '0';


            label.style.pointerEvents =
                visible
                    ? 'auto'
                    : 'none';


            label.classList.toggle(
                'selected',
                selectedSection ===
                    section.id
            );
        }
    );
}


/* =========================================================
   OBJECT ANIMATION
   ========================================================= */

const clock =
    new THREE.Clock();


function animateObjects(
    elapsed
) {

    interactiveObjects.forEach(
        (group, index) => {

            const sectionId =
                group.userData
                    .sectionId;


            const section =
                SECTIONS.find(
                    item =>
                        item.id ===
                        sectionId
                );


            if (!section) {
                return;
            }


            const mesh =
                group.children[0];


            const glow =
                group.children[1];


            const orbit =
                group.children[2];


            /*
             * Floating animation.
             */

            const float =
                Math.sin(
                    elapsed * 1.2 +
                    index
                ) * 0.15;


            group.position.y =
                section.position.y +
                float;


            /*
             * Rotation.
             */

            mesh.rotation.x +=
                0.0025;


            mesh.rotation.y +=
                0.005;


            orbit.rotation.z +=
                0.008;


            orbit.rotation.x +=
                0.002;


            /*
             * Hover scale.
             */

            const hovered =
                mesh.userData.hovered;


            const targetScale =
                hovered
                    ? 1.18
                    : 1;


            const currentScale =
                mesh.scale.x;


            const nextScale =
                THREE.MathUtils.lerp(
                    currentScale,
                    targetScale,
                    0.12
                );


            mesh.scale.setScalar(
                nextScale
            );


            /*
             * Glow animation.
             */

            const pulse =
                0.04 +
                (
                    Math.sin(
                        elapsed * 2 +
                        index
                    ) + 1
                ) *
                0.015;


            if (glow) {

                glow.material.opacity =
                    hovered
                        ? 0.1
                        : pulse;
            }


            /*
             * Selected object gets
             * stronger illumination.
             */

            const isSelected =
                selectedSection ===
                section.id;


            if (
                mesh.material &&
                mesh.material
                    .emissiveIntensity !==
                    undefined
            ) {

                const targetIntensity =
                    isSelected
                        ? 1.1
                        : hovered
                            ? 0.85
                            : 0.6;


                mesh.material
                    .emissiveIntensity =
                    THREE.MathUtils.lerp(
                        mesh.material
                            .emissiveIntensity,
                        targetIntensity,
                        0.08
                    );
            }
        }
    );
}


/* =========================================================
   PARTICLE ANIMATION
   ========================================================= */

function animateParticles(
    elapsed
) {

    if (!particles) {
        return;
    }


    particles.rotation.y =
        elapsed * 0.008;


    particles.rotation.x =
        Math.sin(
            elapsed * 0.1
        ) * 0.02;
}


/* =========================================================
   DATA STREAM ANIMATION
   ========================================================= */

function animateStreams(
    elapsed
) {

    streams.forEach(
        (stream, index) => {

            stream.material.opacity =
                0.1 +
                (
                    Math.sin(
                        elapsed * 1.2 +
                        index
                    ) + 1
                ) *
                0.025;
        }
    );
}


/* =========================================================
   INFO PANEL EVENTS
   ========================================================= */

if (infoClose) {

    infoClose.addEventListener(
        'click',
        event => {

            event.stopPropagation();

            returnToOverview();
        }
    );
}


if (btnBack) {

    btnBack.addEventListener(
        'click',
        event => {

            event.stopPropagation();

            returnToOverview();
        }
    );
}


if (logoReset) {

    logoReset.addEventListener(
        'click',
        event => {

            event.preventDefault();

            returnToOverview();
        }
    );
}


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    'resize',
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        updateLabels();
    }
);


/* =========================================================
   LOADING SCREEN
   ========================================================= */

function finishLoading() {

    if (!loader) {
        return;
    }


    setTimeout(
        () => {

            loader.classList.add(
                'loaded'
            );

        },
        700
    );
}


/* =========================================================
   ANIMATION LOOP
   ========================================================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    updateHover();

    updateCameraAnimation();

    animateObjects(
        elapsed
    );

    animateParticles(
        elapsed
    );

    animateStreams(
        elapsed
    );


    controls.update();

    updateLabels();


    renderer.render(
        scene,
        camera
    );
}


/* =========================================================
   START
   ========================================================= */

animate();

finishLoading();


/* =========================================================
   PUBLIC API
   Used by main.js
   ========================================================= */

window.ZypheraExperience = {

    sections: SECTIONS,

    focusSection,

    returnToOverview,

    openInfoPanel,

    closeInfoPanel
};


console.log(
    '%cZYPHERA DIGITAL 3D EXPERIENCE',
    'color:#22d3ee;font-size:18px;font-weight:700;'
);

console.log(
    '%cThree.js experience initialized.',
    'color:#94a3b8;font-size:12px;'
);