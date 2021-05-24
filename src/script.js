import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//gltf loader ..........1
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const span = document.querySelector('span')
const p = document.querySelector('p')

//last gsap 
import gsap from 'gsap'

//2
const gltfLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//use gsap
let t1 = gsap.timeline()




//3
gltfLoader.load('new.gltf', (gltf)=>{

    //scale zoom in and out distance
    gltf.scene.scale.set(14, 14, 14)

    //rotation set
    gltf.scene.rotation.set(4.8 , 0, 3)

    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation, 'x').min(0).max(9)
    gui.add(gltf.scene.rotation, 'y').min(0).max(9)
    gui.add(gltf.scene.rotation, 'z').min(0).max(9)

    t1.to(gltf.scene.rotation, {z: 6.1,duration:1.5})

    //scaling gsap
    t1.to(gltf.scene.scale, {x: 11, y: 11, z:11, duration:1}, '-=1')

    //position gsap
    t1.to(gltf.scene.position, {x: 0.4, duration: 1}, '-=0.85')

    //rotation gsap
    t1.to(gltf.scene.rotation, {z: 5.65,duration:1.5})

    //text gsap animation
    t1.to(span, {x:100, opacity:1, duration:1}, '-=1')
    t1.to(p, {x:100, opacity:1, duration:1}, '-=0.3')
})

// // Objects........get rid off
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// // Materials

// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

// // Mesh
// const sphere = new THREE.Mesh(geometry,material)
// scene.add(sphere)

// Lights
                            //default point light
const pointLight = new THREE.AmbientLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()