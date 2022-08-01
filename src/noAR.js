import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { LoopOnce, SphereGeometry, TextureLoader } from 'three'
import $ from "./Jquery"
import gsap from "gsap"
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GridBroadphase } from 'cannon'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import Stats from 'stats.js'
const gltfLoader = new GLTFLoader()


class Keyboard
{
	constructor()
	{
		// Event listeners add keys to Queues.
		// Update method updates Sets accordingly.
		this.keyDownQueue  = new Set();
		this.keyUpQueue    = new Set();
		
		this.keyDownSet    = new Set();
		this.keyPressedSet = new Set();
		this.keyUpSet      = new Set();
		
		this.onKeyDown = function(key) {};
		this.onKeyUp   = function(key) {};
		
		let self = this;
		
		document.addEventListener( "keydown", 
			function(eventData) 
			{ 
				let key = eventData.key;
				if (key == " ")
					key = "Space";
				if (key.length == 1)
					key = key.toUpperCase();
				self.keyDownQueue.add( key ); 
				// activate callback function (only once)
				if ( !self.keyPressedSet.has(key) )
					self.onKeyDown(key);
			}
		);
		
		document.addEventListener( "keyup", 
			function(eventData) 
			{ 
				let key = eventData.key;
				if (key == " ")
					key = "Space";
				if (key.length == 1)
					key = key.toUpperCase();
				self.keyUpQueue.add( key ); 
				// activate callback function
				self.onKeyUp(key);
			} 
		);
	};
	
	update()
	{
		// clear previous discrete event status
		this.keyDownSet.clear();
		this.keyUpSet.clear();
		
		// update current event status
		for (let k of this.keyDownQueue)
		{
			// avoid multiple keydown events while holding key
            if ( !this.keyPressedSet.has(k) )
            {
                this.keyDownSet.add(k);
                this.keyPressedSet.add(k);
            }
		}
		
		for (let k of this.keyUpQueue)
		{
			this.keyPressedSet.delete(k);
			this.keyUpSet.add(k);
		}
		
		// clear the queues used to store events
		this.keyDownQueue.clear();
		this.keyUpQueue.clear();
	};
	
	// only true for a single frame after key down
	isKeyDown( keyName )
	{
		return ( this.keyDownSet.has(keyName) );
	};
	
	// true between key down and key up events
	isKeyPressed( keyName )
	{
		return ( this.keyPressedSet.has(keyName) );
	};
	
	// only true for a single frame after key up
	isKeyUp( keyName )
	{
		return ( this.keyUpSet.has(keyName) );
	};
	
	// set callback function
	setOnKeyDown( callbackFunction )
	{
		this.onKeyDown = callbackFunction;
	};

	// set callback function
	setOnKeyUp( callbackFunction )
	{
		this.onKeyUp = callbackFunction;
	};

}

const orangeMaterial = new THREE.MeshBasicMaterial({color:"orange"})

const pinkMaterial = new THREE.MeshBasicMaterial({color:"pink"})

const greenMaterial = new THREE.MeshBasicMaterial({color:"green"})

const yellowMaterial = new THREE.MeshBasicMaterial({color:"yellow"})




var scene, camera, renderer, clock, deltaTime, totalTime, keyboard, stats;

var mainMover, otherMover;
var mainCamera, otherCamera, topCamera;
var portalA, portalB;
var blocker1, blocker2, blocker3;
var portalRing;

initialize();
animate();

function initialize()
{
	scene = new THREE.Scene();
				
	mainCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	otherCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	topCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	topCamera.position.set(0, 30, 8);
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
	
	// let pointLight = new THREE.PointLight();
	// camera.add( pointLight );
	
	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: false
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top  = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
  
	
	stats = new Stats();
	document.body.appendChild( stats.dom );

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;
	
	keyboard = new Keyboard();
	
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

			let building = gltf.scene;
			// building.scale.x*=.1
			// building.scale.y*=.1
			// building.scale.z*=.1
			console.log(building.children)
			let children= building.children
			children.forEach((child)=>{

				// child.material= orangeMaterial;
				// child.material.opacity = 0.5;
				// child.layers.set(1)


			})
		
		scene.add(building)

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
		new THREE.BoxGeometry(10,10,10),
		skyMaterialArray1 );
	skyMesh1.position.x = -20;
	scene.add(skyMesh1);
	
	portalA = new THREE.Mesh(
		church,
		defaultMaterial.clone()
	);
	portalA.material.opacity = 0.5;
	portalA.scale.x*=.999;
	portalA.scale.y*=.999;
	portalA.scale.z*=.999;
	// portalA.position.set(-22, 0.5, -3);
	// portalA.rotation.y = Math.PI/4;
	portalA.layers.set(1);
	scene.add(portalA);
	

})


	
	// used to visualize position of camera from top view
	let mainCameraMesh = new THREE.Mesh( 
		new THREE.BoxGeometry(1,1,1), 
		new THREE.MeshBasicMaterial({
			map: loader.load("/border.png"),
			color: 0xff00ff
		}) 
	);

	// used to move main camera around
	mainMover = new THREE.Group();
	// mainMover.position.set(-21, 0.5, 0);
	mainMover.add( mainCamera );
	mainMover.add( mainCameraMesh );
	scene.add( mainMover );
	
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
	let skyMaterialArray2 = [
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
	skyMesh2.position.x = 20;
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
	let otherCameraMesh = new THREE.Mesh( 
		new THREE.BoxGeometry(1,1,1), 
		new THREE.MeshBasicMaterial({
			map: loader.load("images/border.png"),
			color: 0x00ffff
		}) 
	);

	// used to move other camera around
	otherMover = new THREE.Group();
	otherMover.add( otherCameraMesh );
	otherMover.add( otherCamera );
	scene.add(otherMover);
	
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

}


function update()
{
	stats.update();
	keyboard.update();
	// blocker1.rotation.y += 0.01;
	// blocker2.rotation.y += 0.01;
	// blocker3.rotation.y += 0.01;
	
	// portal ring color cycle
	
	// portalRing.material.color.setHSL( totalTime/10 % 1, 1, 0.75 );
	
	// move main camera
	
	let translateSpeed = 0.5; // units per second
	let distance = translateSpeed * deltaTime;
	let rotateSpeed = Math.PI/3; // radians per second
	let angle = rotateSpeed * deltaTime;
	
	if (keyboard.isKeyPressed("W"))
		mainMover.translateZ( -distance );
	if (keyboard.isKeyPressed("S"))
		mainMover.translateZ( distance );
		
	if (keyboard.isKeyPressed("A"))
		mainMover.translateX( -distance );
	if (keyboard.isKeyPressed("D"))
		mainMover.translateX( distance );
		
	if (keyboard.isKeyPressed("R"))
		mainMover.translateY( distance );
	if (keyboard.isKeyPressed("F"))
		mainMover.translateY( -distance );
		
	if (keyboard.isKeyPressed("Q"))
		mainMover.rotateY( angle );
	if (keyboard.isKeyPressed("E"))
		mainMover.rotateY( -angle );
		
	if (keyboard.isKeyPressed("T"))
		mainMover.children[0].rotateX( angle );
	if (keyboard.isKeyPressed("G"))
		mainMover.children[0].rotateX( -angle );
	
	// relatively align other camera with main camera
	if(portalA){
	let relativePosition = portalA.worldToLocal( mainMover.position.clone() );
	otherMover.position.copy( portalB.localToWorld( relativePosition ) );
	
	let relativeRotation = mainMover.quaternion.clone().multiply( portalA.quaternion.clone().invert() );	
	otherMover.quaternion.copy( relativeRotation.multiply(portalB.quaternion) ); 
	
	// keep camera tilt in sync
	otherCamera.rotation.x = mainCamera.rotation.x;
	}
}

function render()
{
	if ( keyboard.isKeyPressed("1") ) 
	{
		// view from main camera
		mainCamera.layers.enable(0);
		mainCamera.layers.enable(1);
		renderer.render( scene, mainCamera );
	}
	else if ( keyboard.isKeyPressed("2") )
	{
		// view from other camera 
		otherCamera.layers.enable(0);
		otherCamera.layers.enable(2);
		renderer.render( scene, mainCamera );
	}
	else if (keyboard.isKeyPressed("3"))
	{
		// view from top camera
		renderer.render( scene, topCamera );
	}
	else // default: portal effect
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
		
		// SECOND PASS
		// goal: draw from the portal camera perspective (which is aligned relative to the second portal)
		//   in the first portal region (set by the stencil in the previous pass)
		
		// set up a clipping plane, so that portal camera does not see anything between
		//   the portal camera and the second portal
		
		// default normal of a plane is 0,0,1. apply mesh rotation to it.
	
		
		// determine which side of the plane camera is on, for clipping plane orientation.
		if(portalA){
		// let portalToCamera = new THREE.Vector3().subVectors( mainMover.position.clone(), portalA.position.clone() ); //  applyQuaternion( mainMover.quaternion );
		// let normalPortal = new THREE.Vector3(0,0,1).applyQuaternion( portalA.quaternion );
		// let clipSide = -Math.sign( portalToCamera.dot(normalPortal) );
		
		// let clipNormal = new THREE.Vector3(0, 0, clipSide).applyQuaternion( portalB.quaternion );
		// let clipPoint = portalB.position;
		// let clipPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(clipNormal, clipPoint);
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
	}
}

function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}

function onWindowResize() 
{
	// camera.aspect = window.innerWidth / window.innerHeight;
	// camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}