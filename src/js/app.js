import * as THREE from 'three';
import sayHello from './lib/sayHello';
import fragment from './shader/fragment.glsl';
import vertex from './shader/vertex.glsl';

class Sketch {
	constructor(container) {
		this.container = container;

		const frustumSize = 10;
		const aspect = window.innerWidth / window.innerHeight;
		this.camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
		// this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000);
	  this.camera.position.set(0, 7, 10);
	  this.camera.lookAt(new THREE.Vector3());
		this.camera.rotateZ(130)

	  this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	  this.renderer.setSize( window.innerWidth, window.innerHeight );
	  this.renderer.setAnimationLoop( this.animation.bind(this) );

		this.time = 0;

		this.colors = [
			new THREE.Color( 0xfdf3d0 ),
			new THREE.Color( 0xfeb7a5 ),
			new THREE.Color( 0xf7aab0 ),
			new THREE.Color( 0xd27c87 ),
			new THREE.Color( 0xae697c ),
		];

		this.init();
	}

	init() {
		this.geometry = new THREE.CylinderGeometry( 2, 2, 1, 4, 1, true);

		this.material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			uniforms: {
				time: {type: 'f', value: this.time},
				offset: {type: 'f', value: 0},
				color: {type: 'c', value: 0},
			},
			fragmentShader: fragment,
			vertexShader: vertex,
		});

		const numberOfCylinders = 10;
		this.materials = [];

		for (let i = 0; i < numberOfCylinders; i++) {
			const newMaterial = this.material.clone();
			newMaterial.uniforms.offset.value = i;
			newMaterial.uniforms.color.value = this.colors[i % 5];

			this.materials.push(newMaterial);

			const mesh = new THREE.Mesh( this.geometry, newMaterial );
		  mesh.position.y = i - 5;

		  this.scene.add( mesh );
		}
		
		this.container.appendChild(this.renderer.domElement)
		window.addEventListener('resize', this.resize.bind(this));
	}

	animation() {
		this.time += 0.005;

		/* eslint-disable no-param-reassign */
		this.materials.forEach( mat => {
			mat.uniforms.time.value = this.time;
		});
		this.renderer.render( this.scene, this.camera );
	}

	resize () {
		const width = window.innerWidth;
		const height = window.innerHeight;
		this.renderer.setSize( width, height );
	  this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}
}

const container = document.querySelector('.container');
const sketch = new Sketch(container);

sayHello();