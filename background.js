// Simple Three.js animated background: rotating wireframe particles
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const starsGeom = new THREE.BufferGeometry();
const starCount = 10000;
const positions = new Float32Array(starCount * 3);
for (let i=0; i<starCount*3; i++) {
  positions[i] = (Math.random() - 0.5) * 2000;
}
starsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1
});
const stars = new THREE.Points(starsGeom, starMaterial);
scene.add(stars);

camera.position.z = 1;
camera.rotation.x = Math.PI / 2;

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// handle resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
