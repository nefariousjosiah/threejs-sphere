import * as THREE from 'three';
import './styles.css'
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//Scene

const scene = new THREE.Scene();

//sphere

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
    roughness: 0.2,
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//lights
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

//Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20;
scene.add(camera);

//Controls


//Renderer

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width , sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);


//Resize

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height= widnow.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;


const loop = () => {
    controls.update()
    renderer.render (scene, camera);
    window.requestAnimationFrame(loop)
}
loop()
//Timeline
const t1 = gsap.timeline({default: {duration: 1}})
t1.fromTo(mesh.scale, {z: 0, x: 0, y:0}, {z: 1, x: 1, y:1})
t1.fromTo('nav', {y: '-100%'}, {y: "0%"});
t1.fromTo(".title", {opacity: 0}, {opacity: 1})


//Mouse Animation Colors
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        let rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150
        ];

        // Animation for sphere
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, { r: newColor.r, g: newColor.g, b: newColor.b });
    }
});
