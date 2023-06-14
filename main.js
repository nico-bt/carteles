import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

// Creating the scene, camera and renderer
//***********************************************************************
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 9
camera.position.y = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// Background Texture
//***********************************************************************
const skyTexture = new THREE.TextureLoader().load("/sky.jpg")
scene.background = skyTexture

// Light
//***********************************************************************
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)

// // White directional light.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.85)
// directionalLight.position.x = 1
directionalLight.position.y = 10
directionalLight.position.z = 10
scene.add(directionalLight)

// PointLight
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-20, 20, -20)
scene.add(pointLight)

// Floor
//***********************************************************************
const floorGeometry = new THREE.PlaneGeometry(200, 200, 10, 10)

const grassTexture = new THREE.TextureLoader().load("grass.jpg")
grassTexture.generateMipmaps = false
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xfff666,
  map: grassTexture,
  side: THREE.DoubleSide,
})
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
floorMesh.rotation.x = Math.PI / 2
floorMesh.position.y = -1
scene.add(floorMesh)

const roadGeometry = new THREE.BoxGeometry(10, 200, 0.1, 1)

const roadTexture = new THREE.TextureLoader().load(
  "/HighwayRoadClean01_MR_1K/HighwayRoadClean01_1K_BaseColor.png"
)
roadTexture.rotation = Math.PI / 2
roadTexture.wrapS = THREE.RepeatWrapping
roadTexture.wrapT = THREE.RepeatWrapping
const roadMaterial = new THREE.MeshStandardMaterial({
  color: 0xf2f2f2f2,
  map: roadTexture,
})

const roadMesh = new THREE.Mesh(roadGeometry, roadMaterial)
roadMesh.rotation.x = Math.PI / 2
roadMesh.position.y = -1
scene.add(roadMesh)

// Loading models
//***********************************************************************
const loader = new GLTFLoader()

// Arbustos
//------------------------------------------------
loader.load(
  "scene.gltf",
  function (gltf) {
    gltf.scene.position.set(-14, -1, 25)
    gltf.scene.scale.set(2, 2, 2)
    scene.add(gltf.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)
loader.load(
  "scene.gltf",
  function (gltf) {
    gltf.scene.position.set(-15, -1, 76)
    gltf.scene.scale.set(2, 2, 2)
    scene.add(gltf.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)
loader.load(
  "scene.gltf",
  function (gltf) {
    gltf.scene.position.set(10, -1, 62)
    gltf.scene.scale.set(1, 1, 1)
    scene.add(gltf.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)
loader.load(
  "scene.gltf",
  function (gltf) {
    gltf.scene.position.set(-50, -1, 10)
    gltf.scene.scale.set(6, 6, 6)
    scene.add(gltf.scene)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

// Carteles
//------------------------------------------------
const payasosTexture = new THREE.TextureLoader().load("escuela-payasos.jpg")

const cartel = await loader.loadAsync("/advertisement_billboard/scene.gltf")

cartel.scene.position.set(12, -10, 80)
cartel.scene.scale.set(2, 2, 2)
console.log(cartel.parser.textureLoader)
scene.add(cartel.scene)

const cartel2 = await loader.loadAsync("/advertisement_billboard/scene.gltf")
cartel2.scene.scale.set(2, 2, 2)
cartel2.scene.position.set(12, -10, 38)
scene.add(cartel2.scene)

const cartel3 = await loader.loadAsync("/advertisement_billboard/scene.gltf")
cartel3.scene.scale.set(2.25, 2.25, 2.25)
cartel3.scene.position.set(12, -10, -2)
scene.add(cartel3.scene)

// Ball character
//***********************************************************************
const car = await loader.loadAsync("/car/scene.gltf")

car.scene.scale.set(0.3, 0.3, 0.3)
car.scene.position.set(2, -0.25, 93.7)
camera.position.set(-8, 10, -18)
car.scene.rotation.y = Math.PI
scene.add(car.scene)
camera.rotateY(Math.PI)
car.scene.add(camera) //Asi lo sigue la camara

// Moving the character
// Left: 37, Up: 38, Right: 39, Down: 40, Space: 32, z:90, x:88
//***********************************************************************
let keyboardEvent
let isKeyPressed = false

window.addEventListener("keydown", onKeyDown, false)
window.addEventListener("keyup", onKeyUp, false)

function onKeyDown(event) {
  keyboardEvent = event
  isKeyPressed = true
}

function onKeyUp(event) {
  keyboardEvent = event
  isKeyPressed = false
}

// En vez de usar eventlistener suelto, al meter update() dentro del animate(), hace la animación más fluida y sin delay al keyPress
function update() {
  const moveStep = 0.15
  if (isKeyPressed) {
    if (keyboardEvent.keyCode === 38) {
      //No ir más allá del último cartel
      if (car.scene.position.z < 8.6) {
        return
      }
      car.scene.translateZ(moveStep) //Para avanzar hacia donde mira en vez de fijo en un eje
    }

    if (keyboardEvent.keyCode === 40) {
      //No ir más atrás del primer cartel
      if (car.scene.position.z > 93.7) {
        return
      }
      car.scene.translateZ(-moveStep)
    }
  }
}

// Rendering the scene
//***********************************************************************
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  update()
}
animate()

// Window resize
//***********************************************************************
window.addEventListener("resize", onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
