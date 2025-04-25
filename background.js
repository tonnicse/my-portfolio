// Colorful particle field
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 3000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const starCount = 15000;
const geometry  = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
const colors    = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  // position
  positions[3*i]     = (Math.random() - 0.5) * 2000;
  positions[3*i + 1] = (Math.random() - 0.5) * 2000;
  positions[3*i + 2] = (Math.random() - 0.5) * 2000;
  // per-vertex color
  colors[3*i]     = Math.random();
  colors[3*i + 1] = Math.random();
  colors[3*i + 2] = Math.random();
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 1.2,
  vertexColors: true,
  transparent: true,
  opacity: 0.8
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

camera.position.z = 800;

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.x += 0.0001;
  stars.rotation.y += 0.0003;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
