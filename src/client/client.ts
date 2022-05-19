import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.y = 1
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
const startButton = document.getElementById('startButton') as HTMLInputElement
startButton.addEventListener(
    'click',
    function () {
        controls.lock()
    },
    false
)

const controls = new PointerLockControls(camera, renderer.domElement)
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
const material = new THREE.MeshBasicMaterial({
    color: 0xc1c1c1
})
const plane = new THREE.Mesh(planeGeometry, material)
plane.rotateX(-Math.PI / 2)
scene.add(plane)


const material2 = new THREE.MeshBasicMaterial({
    color: 0x000050
})

const structures: THREE.Mesh[] = []
for (let i = 0; i < 20; i++) {
    const pillar = new THREE.BoxGeometry(5, 10, 20)

    const box = new THREE.Mesh(pillar, material2)
    structures.push(box)
}

structures.forEach((wall) => {
    wall.position.x = Math.random() * 100 - 50
    wall.position.z = Math.random() * 100 - 50
    wall.geometry.computeBoundingBox()
    wall.position.y = ((wall.geometry.boundingBox as THREE.Box3).max.y - (wall.geometry.boundingBox as THREE.Box3).min.y) / 2
    scene.add(wall)
})


const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.5)
            break
        case 'KeyA':
            controls.moveRight(-0.5)
            break
        case 'KeyS':
            controls.moveForward(-0.5)
            break
        case 'KeyD':
            controls.moveRight(0.5)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    render()

}

function render() {
    renderer.render(scene, camera)
}

animate()