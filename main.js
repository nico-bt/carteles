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

// Lights
//***********************************************************************
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)

// // White directional light.
const directionalLight = new THREE.DirectionalLight(0xfffce5, 0.75)
// directionalLight.position.x = 1
directionalLight.position.y = 50
directionalLight.position.z = 10
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xfffce5, 0.75)
directionalLight.position.x = 30
directionalLight2.position.y = 50
directionalLight2.position.z = 100
scene.add(directionalLight2)

// PointLight
const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(-60, 30, 20)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 100)
pointLight2.position.set(14, 7, 88)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 0.5, 100)
pointLight3.position.set(20, 20, 48)
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight(0xfff7c4, 0.5, 100)
pointLight4.position.set(20, 20, 10)
scene.add(pointLight4)

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
    gltf.scene.position.set(-10, -1, 85)
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
// Para que no se queje con el "top await" error - inside a funct
async function loadCarteles() {
  const cartel = await loader.loadAsync("/advertisement_billboard/scene.gltf")

  cartel.scene.position.set(12, -10, 80)
  cartel.scene.scale.set(2, 2, 2)
  scene.add(cartel.scene)

  const cartel2 = await loader.loadAsync("/advertisement_billboard/scene.gltf")
  cartel2.scene.scale.set(2, 2, 2)
  cartel2.scene.position.set(12, -10, 38)
  scene.add(cartel2.scene)

  const cartel3 = await loader.loadAsync("/advertisement_billboard/scene.gltf")
  cartel3.scene.scale.set(2.25, 2.25, 2.25)
  cartel3.scene.position.set(12, -11, -2)
  scene.add(cartel3.scene)
}
loadCarteles()

// Imagenes para Carteles
//------------------------------------------------
var loaderImg = new THREE.TextureLoader()

// img1
//--------------------------------------------
let materialImg = new THREE.MeshBasicMaterial({
  map: loaderImg.load("escuela-payasos.jpg"),
})
let geometryImg = new THREE.PlaneGeometry(12.5, 5)

// combine our image geometry and material into a mesh
let meshImg = new THREE.Mesh(geometryImg, materialImg)

meshImg.position.set(11.4, 7.8, 38.4)

// add the image to the scene
scene.add(meshImg)

// img2
//--------------------------------------------
let materialImg2 = new THREE.MeshBasicMaterial({
  map: loaderImg.load("muffins.jpg"),
})
let geometryImg2 = new THREE.PlaneGeometry(12.5, 5)

// combine our image geometry and material into a mesh
let meshImg2 = new THREE.Mesh(geometryImg2, materialImg2)

meshImg2.position.set(11.5, 7.8, 80.4)

// add the image to the scene
scene.add(meshImg2)

// img3
//--------------------------------------------
let materialImg3 = new THREE.MeshBasicMaterial({
  map: loaderImg.load("nico.jpg"),
})
let geometryImg3 = new THREE.PlaneGeometry(13.6, 6.8)

// combine our image geometry and material into a mesh
let meshImg3 = new THREE.Mesh(geometryImg3, materialImg3)

meshImg3.position.set(11.4, 9, -1.5)

// add the image to the scene
scene.add(meshImg3)

// Car character
//***********************************************************************
let car
async function loadCar() {
  const carModel = await loader.loadAsync("/car/scene.gltf")

  carModel.scene.scale.set(0.3, 0.3, 0.3)
  carModel.scene.position.set(2.5, -0.25, 93.7)
  camera.position.set(-8, 10, -18)
  carModel.scene.rotation.y = Math.PI
  scene.add(carModel.scene)
  camera.rotateY(Math.PI)
  carModel.scene.add(camera) //Asi lo sigue la camara

  car = carModel
}
loadCar()

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
  const moveStep = 0.22
  if (isKeyPressed) {
    if (keyboardEvent.keyCode === 38) {
      //No ir más allá del último cartel
      if (car.scene.position.z < 6.2) {
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
