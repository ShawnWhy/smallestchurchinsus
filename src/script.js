import './style.css'
import * as THREE from 'three'
import { FirstPersonControls}from 'three/examples/jsm/controls/FirstPersonControls.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { LoopOnce, Scene, SphereGeometry, TextureLoader } from 'three'
import CANNON, { Sphere } from 'cannon'
import $ from "./Jquery"
import Stats from '../node_modules/stats.js'
import { PointerLockControls } from './PointerLockControls.js';

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let lock = false;
let building;
let Eggmixer;
let shellmixer
let pearmixer
let doormixer
let skyMaterialArray2 =[]

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();



const onKeyDown = function ( event ) {

	console.log(event)

	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = true;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = true;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = true;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = true;
			break;

		case 'Space':
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;

	}

};

const onKeyUp = function ( event ) {

	console.log(event)


	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = false;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = false;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = false;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = false;
			break;

	}

};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

const textureLoader = new THREE.TextureLoader()


var scene, camera, renderer, clock, deltaTime, totalTime, keyboard 

let stats;

var mainMover, otherMover;
var mainCamera, otherCamera, topCamera;
var portalA, portalB;
var blocker1, blocker2, blocker3;
var portalRing;

let controls

let eggIntersect = [];
let shellIntersect = []
let pearIntersect = []

let eggAnimation
let shellAnimation
let pearAnimation
let doorAnimation



// var audiobounce = new Audio('/glass.wav');

// const playHitSound = (collision) =>
// {
//     const impactStrength = collision.contact.getImpactVelocityAlongNormal()

//     if(impactStrength > 10)
//     {
//         audiobounce.volume = Math.random()
//         audiobounce.currentTime = 0
//         audiobounce.play()
//     }
// }



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
scene = new THREE.Scene()

//raycaster
const raycaster = new THREE.Raycaster()

//cannon


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

    if(sizes.width>860){
        camera.position.set(3, 0, 10)
        }
        else{
            camera.position.set(-25, 0, -10)
        }

})

const mouse = new THREE.Vector2()
mouse.x = null
mouse.y=null


window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

    // console.log(mouse)
})

const gltfLoader = new GLTFLoader()





/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('orange', .5)
scene.add(ambientLight)

/**
 * Camera
 */
// Base camera
camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
if(sizes.width>860){
camera.position.set(3, 0, 10)
}
else{
    camera.position.set(-25, 0, -10)
}


scene.add(camera)


function initialize()
{
	
				
	mainCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	otherCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	topCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	topCamera.position.set(0, 0, 0);
	topCamera.lookAt( scene.position );	
	scene.add( topCamera );
	
	topCamera.layers.enable(0); // automatic, but added for clarity
	topCamera.layers.enable(1);
	topCamera.layers.enable(2);

	let ambientLight = new THREE.AmbientLight( 0xcccccc, 1.00 );
	scene.add( ambientLight );

	const directionalLight = new THREE.DirectionalLight('#ebdbb7', 1)
	directionalLight.castShadow = true
	directionalLight.shadow.mapSize.set(1024, 1024)
	directionalLight.shadow.camera.far = 15
	directionalLight.shadow.camera.left = - 7
	directionalLight.shadow.camera.top = 7
	directionalLight.shadow.camera.right = 7
	directionalLight.shadow.camera.bottom = - 7
	directionalLight.position.set(- 5, 5, 0)
	scene.add(directionalLight)

	
	stats = new Stats();
	document.body.appendChild( stats.dom );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
	
	// keyboard = new Keyboard();
	
	let loader = new THREE.TextureLoader();

		// floor
		let floorGeometry = new THREE.PlaneGeometry(100, 100);
		let floorMaterial = new THREE.MeshBasicMaterial({ 
			color:"red",
			transparent: true,
			opacity: 0.5,
		});
		let floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
		floorMesh.rotation.x = -Math.PI/2;
		// scene.add( floorMesh );
		
		// material for portals and blockers
		let defaultMaterial = new THREE.MeshBasicMaterial({
			map: loader.load("/sphere-colored.png"), 
			color: 0x444444,
			// w,
			transparent: true
		});
	

	//CHURCH

	// portalA.position.set(-22, 0.5, -3);

	gltfLoader.load(
		'/smallest church.glb',
		(gltf) =>
		{

			building = gltf.scene;
			// building.scale.x*=.1
			// building.scale.y*=.1
			// building.scale.z*=.1
			console.log(building.children)
			let children= building.children
			children[4].material= defaultMaterial.clone()
			children[4].material.opacity= 0.5;
			children[4].layers.set(1)
		
		
		scene.add(building)

		Eggmixer = new THREE.AnimationMixer(children[1])
		shellmixer = new THREE.AnimationMixer(children[3])
		pearmixer = new THREE.AnimationMixer(children[2])
		doormixer = new THREE.AnimationMixer(children[0])
        // console.log(mixer)
		console.log(gltf.animations)
        eggAnimation = Eggmixer.clipAction(gltf.animations[5]) 

        shellAnimation = shellmixer.clipAction(gltf.animations[11]) 
		pearAnimation = pearmixer.clipAction(gltf.animations[7])
		doorAnimation = doormixer.clipAction(gltf.animations[0])  

		
        // console.log(walk)
        eggAnimation.timeScale=2.5
        eggAnimation.clampWhenFinished=true
        // eggAnimation.play()

		shellAnimation.timeScale=2.5
        shellAnimation.clampWhenFinished=true
        // shellAnimation.play()

		pearAnimation.timeScale=2.5
        pearAnimation.clampWhenFinished=true
        // pearAnimation.play()

		doorAnimation.timeScale=2.5
        doorAnimation.clampWhenFinished=true
        // doorAnimation.play()
        

		})

	gltfLoader.load(
		'/wallpaper.glb',
		(gltf) =>
		{
		  
		  let church = gltf.scene.children[0].geometry;
	  
		
	  
	  
	

	
	// Portal A ================================
	
	// textures from http://www.humus.name/
	let skyMaterialArray1 = [
		new THREE.MeshBasicMaterial( { map: loader.load("/px.png"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("/nx.png"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("/py.png"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("/ny.png"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("/pz.png"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("/nz.png"), side: THREE.BackSide } ),
	];
	let skyMesh1 = new THREE.Mesh(
		new THREE.BoxGeometry(50,50,50),
		skyMaterialArray1 );
	// skyMesh1.position.x = -20;
	scene.add(skyMesh1);
	
	portalA = new THREE.Mesh(
		church,
		defaultMaterial.clone()
	);
	portalA.material.opacity = 0.5;
	portalA.scale.x*=.999;
	portalA.scale.y*=.999;
	portalA.scale.z*=.999;
	portalA.position.set(-22, 0.5, -3);
	// portalA.rotation.y = Math.PI/4;
	portalA.layers.set(1);
	scene.add(portalA);
	

})


	
	// // used to visualize position of camera from top view
	// let mainCameraMesh = new THREE.Mesh( 
	// 	new THREE.BoxGeometry(1,1,1), 
	// 	new THREE.MeshBasicMaterial({
	// 		map: loader.load("/border.png"),
	// 		color: 0xff00ff
	// 	}) 
	// );

	// // used to move main camera around

	
	// mainMover.add( mainCameraMesh );
	scene.add( mainCamera );
	
	// blockers used to check depth test and clipping plane
	
	// blocker1 = new THREE.Mesh(
	// 	new THREE.SphereGeometry(0.25, 32, 32),
	// 	// defaultMaterial.clone()
	// 	orangeMaterial
	// );
	// blocker1.material.color = new THREE.Color(0xff0000);
	// // blocker1.position.set(-21.25, 0.5, -2);
	// scene.add(blocker1);
		
	// Portal B ================================
	
	// textures from http://www.humus.name/
	skyMaterialArray2 = [
		new THREE.MeshBasicMaterial( { map: loader.load("mountain/posx.jpg"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("mountain/negx.jpg"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("mountain/posy.jpg"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("mountain/negy.jpg"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("mountain/posz.jpg"), side: THREE.BackSide } ),
		new THREE.MeshBasicMaterial( { map: loader.load("mountain/negz.jpg"), side: THREE.BackSide } ),
	];
	let skyMesh2 = new THREE.Mesh(
		new THREE.BoxGeometry(40,40,40),
		skyMaterialArray2 );
	skyMesh2.position.x = 50;
	skyMesh2.layers.set(2)
	scene.add(skyMesh2);
	
	portalB = new THREE.Mesh(
		new THREE.CircleGeometry(1, 64),
		defaultMaterial.clone()
	);
	portalB.material.opacity = 0.5;
	portalB.position.set(24, 0.5, -5);
	portalB.rotation.y = -Math.PI/4;
	portalB.layers.set(2);
	scene.add(portalB);
	
	// used to visualize position of camera from top view
	// let otherCameraMesh = new THREE.Mesh( 
	// 	new THREE.BoxGeometry(1,1,1), 
	// 	new THREE.MeshBasicMaterial({
	// 		map: loader.load("images/border.png"),
	// 		color: 0x00ffff
	// 	}) 
	// );

	// used to move other camera around
	// otherMover = new THREE.Group();
	// otherMover.add( otherCameraMesh );
	// otherMover.add( otherCamera );
	// scene.add(otherMover);
	otherCamera.position.x=50;
	scene.add(otherCamera)
	
	// blockers used to check depth test and clipping plane
	
	// blocker2 = new THREE.Mesh(
	// 	new THREE.SphereGeometry(0.20, 32, 32),
	// 	// defaultMaterial.clone()
	// 	greenMaterial
	// );
	// blocker2.material.color = new THREE.Color(0x00ff00);
	// blocker2.position.set(23.25,0.25,-4.5);
	// scene.add(blocker2);
	
	// blocker3 = new THREE.Mesh(
	// 	new THREE.SphereGeometry(0.20, 32, 32),
	// 	defaultMaterial.clone()
	// );
	// blocker3.material.color = new THREE.Color(0x0000ff);
	// blocker3.position.set(26,0.25,-6);
	// scene.add(blocker3);

	controls = new PointerLockControls( mainCamera, canvas );


	scene.add( controls.getObject() );
	controls.getObject().position.y+=.4


}

function render()
{

		let gl = renderer.getContext();
		
		
		// clear buffers now: color, depth, stencil 
		renderer.clear(true,true,true);
		// do not clear buffers before each render pass
		renderer.autoClear = false;
		
		
		// FIRST PASS
		// goal: using the stencil buffer, place 1's in position of first portal

		// enable the stencil buffer
		gl.enable(gl.STENCIL_TEST);
		
		// layer 1 contains only the first portal
		mainCamera.layers.set(1); 

		gl.stencilFunc(gl.ALWAYS, 1, 0xff);
		gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
		gl.stencilMask(0xff);

		// only write to stencil buffer (not color or depth)
		gl.colorMask(false,false,false,false);
		gl.depthMask(false);
		
		renderer.render( scene, mainCamera );
		raycaster.setFromCamera(mouse, mainCamera)
		
		// SECOND PASS
		// goal: draw from the portal camera perspective (which is aligned relative to the second portal)
		//   in the first portal region (set by the stencil in the previous pass)
		
		// set up a clipping plane, so that portal camera does not see anything between
		//   the portal camera and the second portal
		
		// default normal of a plane is 0,0,1. apply mesh rotation to it.
	
		
		// determine which side of the plane camera is on, for clipping plane orientation.
		if(portalA){
		let portalToCamera = new THREE.Vector3().subVectors( mainCamera.position.clone(), portalA.position.clone() ); //  applyQuaternion( mainMover.quaternion );
		let normalPortal = new THREE.Vector3(0,0,1).applyQuaternion( portalA.quaternion );
		let clipSide = -Math.sign( portalToCamera.dot(normalPortal) );
		
		let clipNormal = new THREE.Vector3(0, 0, clipSide).applyQuaternion( portalB.quaternion );
		let clipPoint = portalB.position;
		let clipPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(clipNormal, clipPoint);
		// renderer.clippingPlanes = [clipPlane];
		}
		gl.colorMask(true,true,true,true);
		gl.depthMask(true);
		
		gl.stencilFunc(gl.EQUAL, 1, 0xff);
		gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
		
		otherCamera.layers.set(2);
		renderer.render( scene, otherCamera );
		
		// disable clipping planes
		renderer.clippingPlanes = [];
		
		// THIRD PASS
		// goal: set the depth buffer data for the first portal,
		//   so that it can be occluded by other objects
		
		// finished with stencil
		gl.disable(gl.STENCIL_TEST);
		
		gl.colorMask(false,false,false,false);
		gl.depthMask(true);
		// need to clear the depth buffer, in case of occlusion
		renderer.clear(false, true, false);
		renderer.render( scene, mainCamera );
		
		// FINAL PASS
		// goal: draw the rest of the scene

		gl.colorMask(true,true,true,true);
		gl.depthMask(true);
		
		mainCamera.layers.set(0); // layer 0 contains everything but portals
		renderer.render( scene, mainCamera );
		
		// set things back to normal
		renderer.autoClear = true;

		controls = new PointerLockControls( mainCamera, canvas );
		// // controls.target.set(0, .1, 0)
		// controls.enableDamping = true

	

		scene.add( controls.getObject() );
	
		raycaster.setFromCamera(mouse, mainCamera)
	// }
}

$(canvas).click((e)=>{
	e.preventDefault()
	e.stopPropagation()
	if(shellIntersect.length>0){
		skyMaterialArray2 = [
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/posx.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/negx.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/posy.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/negy.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/posz.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/negz.jpg"), side: THREE.BackSide } ),
		];
	}

	if(pearIntersect.length>0){
		skyMaterialArray2 = [
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/posx.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/negx.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/posy.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/negy.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/posz.jpg"), side: THREE.BackSide } ),
			new THREE.MeshBasicMaterial( { map: loader.load("mountain/negz.jpg"), side: THREE.BackSide } ),
		];
	}
	if(eggIntersect.length>0){
		doorAnimation.play()
		doorAnimation.clampWhenFinished = true
		doorAnimation.timeScale=3
		doorAnimation.setLoop( THREE.LoopOnce )
	}

	
})

// Controls


/**
 * Renderer
 */
renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

// renderer.setClearColor( 'orange',.5);

// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


let oldElapsedTime=null;

clock = new THREE.Clock()
let previousTime = 0

canvas.addEventListener( 'click', function () {
if(lock !== true){
	controls.lock();
	lock = true;
	console.log(controls.pointerSpeed)

}
else{
	controls.unlock();
	lock = false;
	console.log(controls.pointerSpeed)

}

} );


const tick = () =>{
 
    
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime


	





	render();
	// console.log("SDSADAD")
	// console.log(controls.isLocked)
	if ( lock == true ) {
		console.log("heye hey ")
		console.log(controls.getObject().position)

		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;


		let delta = ( elapsedTime - prevTime ) /10;
		console.log(delta);

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		// velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );

		controls.getObject().position.y += ( velocity.y * delta ); // new behavior
		mainCamera.position.copy(controls.getObject().position)

		// if ( controls.getObject().position.y < 10 ) {

		// 	velocity.y = 0;
		// 	controls.getObject().position.y = 10;
		// 	mainCamera.position.copy(controls.getObject().position)
		

		// 	canJump = true;

		}


		    if(building != null){
    eggIntersect = raycaster.intersectObject(building.children[1])
	shellIntersect = raycaster.intersectObject(building.children[3].children[0].children[1])
	pearIntersect = raycaster.intersectObject(building.children[2])

  

    if(eggIntersect.length>0){
		eggAnimation.play()
	
          
            
        }
		else{


			// doorAnimation.reset()
			eggAnimation.stop()
			// eggAnimation.reset()



		}

		if(pearIntersect.length>0){
			pearAnimation.play()
			pearAnimation.play()
			
			pearAnimation.weight=1
			pearAnimation.setEffectiveWeight(1)
			pearAnimation.clampWhenFinished = true
			pearAnimation.timeScale=3
			pearAnimation.setLoop( THREE.LoopOnce )
		}
		else{

			pearAnimation.reset()
		}

		if(shellIntersect.length>0){
			shellAnimation.play()
		
			
			shellAnimation.weight=1
			shellAnimation.setEffectiveWeight(1)
			shellAnimation.clampWhenFinished = true
			shellAnimation.timeScale=3
			shellAnimation.setLoop( THREE.LoopOnce )
		}
		else{

			shellAnimation.reset()
		}


}


		mainCamera.position.copy(controls.getObject().position)
		prevTime = elapsedTime;
		oldElapsedTime = elapsedTime;

		if(Eggmixer)
		{
			Eggmixer.update(deltaTime)
		}

		if(shellmixer)
		{
			shellmixer.update(deltaTime)
		}

		if(pearmixer)
		{
			pearmixer.update(deltaTime)
		}

		if(doormixer)
		{
			doormixer.update(deltaTime)
		}




	// }

	

	otherCamera.rotation.copy(mainCamera.rotation)
	// console.log(otherCamera.quaternion)
	// console.log(mainCamera.quaternion)
	// console.log(controls.getObject().quaternion)

    window.requestAnimationFrame(tick)


}
initialize();
tick()