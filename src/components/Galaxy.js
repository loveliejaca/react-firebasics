import React, { useRef, useLayoutEffect } from "react"
import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS

export default function Galaxy() {
  const canvas = useRef();
  let scene,
    camera,
    renderer,
    aspect,
    fov,
    plane,
    far,
    mouseX,
    mouseY,
    windowHalfX,
    windowHalfY,
    geometry,
    starStuff,
    materialOptions,
    stars;

  function init() {

    mouseX = 0;
    mouseY = 0;

    aspect = window.innerWidth / window.innerHeight;
    fov = 40;
    plane = 1;
    far = 800;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      plane,
      far
    );

    camera.position.z = far / 2;

    scene = new THREE.Scene({ antialias: true });
    scene.fog = new THREE.FogExp2(0x1b1b1b, 0.0001);

    starForge();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    canvas.current.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onMouseMove, false);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    var time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (-mouseY - camera.position.y) * 0.005;

    for (let i = 0; i < scene.children.length; i++) {

        let object = scene.children[i];

        if (object instanceof THREE.PointCloud) {

            object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        }
    }


    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function createCanvasMaterial(size) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    // create exture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = '#fff';
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
  }

  function starForge() {
    var amount = 20000;
    geometry = new THREE.SphereGeometry(1000, 100, 50);


    materialOptions = {
      color: new THREE.Color(0xffffff),
      size: 1.5,
      map: createCanvasMaterial(100),
      // sizeAttenuation: false,
      transparency: true,
      opacity: 0.8
    };

    starStuff = new THREE.PointsMaterial(materialOptions);


    for (var i = 0; i < amount; i++) {
      var item = new THREE.Vector3();
      item.x = Math.random() * 2000 - 1000;
      item.y = Math.random() * 2000 - 1000;
      item.z = Math.random() * 2000 - 1000;

      geometry.vertices.push(item);
    }

    stars = new THREE.Points(geometry, starStuff);
    scene.add(stars);
  }

  function onMouseMove(e) {
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
  }

  useLayoutEffect(() => {
    init();
    animate();
  });

  return (
    <div className="galaxy" ref={canvas}></div>
  )
}
