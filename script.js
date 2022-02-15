import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//Loader

const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("https://i.ibb.co/yhJ13HZ/map3.jpg");
const normalTexture2 = textureLoader.load("https://i.ibb.co/q7cfRBt/map2.png");
const normalTexture3 = textureLoader.load(
  "https://i.ibb.co/SR31NT5/Ground-Dirt-009-Normal.jpg"
);

const stoneBaseColor = textureLoader.load(
  "https://i.ibb.co/kghv5Ph/Stone-06-diffuse-Original.png"
);
const stoneNormalMap = textureLoader.load(
  "https://i.ibb.co/Jn1Yg0v/Stone-06-normal.png"
);
const stoneHeight = textureLoader.load(
  "https://i.ibb.co/Nj4h3dw/Stone-06-height.png"
);
const stoneRoughness = textureLoader.load(
  "https://i.ibb.co/BBKps2T/Stone-06-smoothness.png"
);

const pebblesBaseColor = textureLoader.load(
  "https://i.ibb.co/K2Z8hwR/Pebbles-01-diffuse-Original.png"
);
const pebblesNormalMap = textureLoader.load(
  "https://i.ibb.co/2v7d5GX/Pebbles-01-normal.png"
);
const pebblesHeight = textureLoader.load(
  "https://i.ibb.co/dJv0ZmP/Pebbles-01-height.png"
);
const pebblesRoughness = textureLoader.load(
  "https://i.ibb.co/fr7z92C/Pebbles-01-smoothness.png"
);

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();
// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
const geometry2 = new THREE.SphereBufferGeometry(0.5, 64, 64);
const geometry3 = new THREE.SphereBufferGeometry(0.5, 64, 64);
// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.8;
material.roughness = 0.1;
material.normalMap = normalTexture;
material.color = new THREE.Color("rgb(27, 156, 169)");

const materialStone = new THREE.MeshStandardMaterial({
  normalMap: stoneNormalMap,
  displacementMap: stoneHeight,
  displacementScale: 0.1,
  map: stoneBaseColor,
  roughnessMap: stoneRoughness,
  roughness: 50,
});

const materialPebbles = new THREE.MeshStandardMaterial({
  normalMap: pebblesNormalMap,
  displacementMap: pebblesHeight,
  displacementScale: 0.1,
  map: pebblesBaseColor,
  roughnessMap: pebblesRoughness,
  roughness: 5,
});

// const material2 = new THREE.MeshStandardMaterial();
// material2.metalness = 0.7;
// material2.roughness = 0.2;
// material2.normalMap = normalTexture2;
// material2.color = new THREE.Color("rgb(27, 156, 169)");

// Mesh
const sphere = new THREE.Mesh(geometry, materialStone);
const penta = new THREE.Mesh(geometry2, materialPebbles);
const bola = new THREE.Mesh(geometry3, material);
scene.add(bola, penta, sphere);
bola.position.set(-1.5, 0, -2);
penta.position.set(0, 0, -1);
sphere.position.set(1.5, 0, 0);
// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight("rgb(250, 0, 0)", 2);
pointLight2.position.set(-1.73, 1, -1.86);
pointLight2.intensity = 1.4;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight("rgb(255, 255, 255)", 2);
pointLight3.position.set(6, -5.72, -2.43);
pointLight3.intensity = 1.12;
scene.add(pointLight3);

const light = gui.addFolder("Light 1");
const light2 = gui.addFolder("Light 2");
const light3 = gui.addFolder("Light 3");

light.add(pointLight.position, "x").min(-10).max(10).step(0.01);
light.add(pointLight.position, "y").min(-10).max(10).step(0.01);
light.add(pointLight.position, "z").min(-10).max(10).step(0.01);
light.add(pointLight, "intensity").min(-10).max(10).step(0.01);

const lightColor = {
  color: 0xff0000,
};

light.addColor(lightColor, "color").onChange(() => {
  pointLight.color.set(lightColor.color);
});

light2.add(pointLight2.position, "x").min(-10).max(10).step(0.01);
light2.add(pointLight2.position, "y").min(-10).max(10).step(0.01);
light2.add(pointLight2.position, "z").min(-10).max(10).step(0.01);
light2.add(pointLight2, "intensity").min(-10).max(10).step(0.01);

const light2Color = {
  color: 0xff0000,
};

light2.addColor(light2Color, "color").onChange(() => {
  pointLight2.color.set(light2Color.color);
});

light3.add(pointLight3.position, "x").min(-10).max(10).step(0.01);
light3.add(pointLight3.position, "y").min(-10).max(10).step(0.01);
light3.add(pointLight3.position, "z").min(-10).max(10).step(0.01);
light3.add(pointLight3, "intensity").min(-10).max(10).step(0.01);

const light3Color = {
  color: 0xffffff,
};

light3.addColor(light3Color, "color").onChange(() => {
  pointLight3.color.set(light3Color.color);
});

const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.5);
// scene.add(pointLightHelper2);

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.5);
// scene.add(pointLightHelper3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

const texto = document.getElementById("perro");

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function updateSphere(event) {
  sphere.position.y = window.scrollY * 0.002;
  penta.position.y = window.scrollY * 0.002;
  bola.position.y = window.scrollY * 0.002;

}

window.addEventListener("scroll", updateSphere);
window.addEventListener("scroll", reveal);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  penta.rotation.y = 0.5 * elapsedTime;

  penta.rotation.y += 0.5 * (targetX - penta.rotation.y);
  penta.rotation.x += 0.05 * (targetY - penta.rotation.x);
  penta.position.z += -0.17 * (targetY - penta.rotation.x);

  bola.rotation.y = 0.5 * elapsedTime;

  bola.rotation.y += 0.5 * (targetX - bola.rotation.y);
  bola.rotation.x += 0.05 * (targetY - bola.rotation.x);
  bola.position.z += -0.3 * (targetY - bola.rotation.x);
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
