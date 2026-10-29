import * as THREE from 'three';

// 1. Escena y Cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

// 2. Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. Iluminación (Direccional + Ambiental)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// 4. Geometría compartida y Materiales (Lambert/Standard para reaccionar a la luz)
const geometry = new THREE.BoxGeometry(1, 1, 1);

const cube1 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x00ff00 })); // Verde
const cube2 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x0000ff })); // Azul
const cube3 = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xff0000 })); // Rojo

// Posicionar los tres cubos en el eje X
cube1.position.x = -2;
cube2.position.x = 0;
cube3.position.x = 2;

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);

// 5. Bucle de Animación con variaciones de velocidad
function animate() {
  requestAnimationFrame(animate);

  // Rotación Cubo Verde
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  // Rotación Cubo Azul
  cube2.rotation.x += 0.02;
  cube2.rotation.y += 0.01;

  // Rotación Cubo Rojo
  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.03;

  renderer.render(scene, camera);
}

animate();

// Adjustar al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});