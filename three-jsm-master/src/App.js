import {
	BoxBufferGeometry,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;

class App {

	init() {

		camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 400;

		scene = new Scene();

		const geometry = new BoxBufferGeometry( 200, 200, 200 );
		const material = new MeshBasicMaterial();

		const mesh = new Mesh( geometry, material );
		scene.add( mesh );

		renderer = new WebGLRenderer( { antialias: true, alpha: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		const canvas = document.querySelector('#c');

		canvas.appendChild( renderer.domElement );

		console.log('attach', canvas, renderer);
		
		// document.body.appendChild( renderer.domElement );
		
		window.addEventListener( 'resize', onWindowResize, false );
		
		const controls = new OrbitControls( camera, renderer.domElement );
		
		animate();
	}

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}

export default App;
