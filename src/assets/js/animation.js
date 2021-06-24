import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

var scene, camera, renderer, sphere, sphere2, torus, torus2;
var shape = [];

function init () {
	var t = THREE;

	scene = new t.Scene();
	camera = new t.PerspectiveCamera(105,window.innerWidth/window.innerHeight, 1,5000);
	camera.position.z = 2000;

	renderer = new t.WebGLRenderer({alpha:true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setClearColor( 0xffffff, 0);
	renderer.shadowMapSoft = true;
	renderer.autoClear = false;
	document.body.appendChild(renderer.domElement);

	window.addEventListener("resize", function (argument) {
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );
	})

	var  controls = new THREE.OrbitControls( camera,  renderer.domElement);
}

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);

	for(var x = 0; x< shape.length;x++) {
		shape[x].position.z -= 5

		if(shape[x].position.z < -1000) {
			shape[x].position.z = getRandomArbitrary(0,2000)
		}
	}
}

function randomStars() {
	var material;

	var rs = [];

	var pos = {
		x : 0,
		y : 0,
		z : 0
	}
	var color = "#fc6bcf";

	for(var x = 0; x < 200; x++) {
		material = new THREE.MeshPhongMaterial({
			color      : new THREE.Color("#fff"),
			emissive   : new THREE.Color("#35bad8"),
			shininess  : new THREE.Color("#fff"),
			shininess  :  100,
			shading    :  THREE.FlatShading,
		});
		if(x %2 == 0) {
			material.emissive = new THREE.Color(color);
		}

		pos.x = getRandomArbitrary(-(window.innerWidth+500),window.innerWidth+500);
		pos.y = getRandomArbitrary(-(window.innerHeight+1000),window.innerHeight+1000);
		pos.z = getRandomArbitrary(-1000,2000);

		rs[x] = new THREE.TetrahedronGeometry(getRandomArbitrary(2,20),1);
		shape[x] = new THREE.Mesh(rs[x], material);
		shape[x].castShadow = true;
		shape[x].position.set(pos.x,pos.y,pos.z);
		scene.add(shape[x])
	}
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


init();
randomStars();
