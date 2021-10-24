//make lights 
function customLight(scene) {
    const light = new THREE.AmbientLight(0x404040, 1); // soft white light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // intensity value
    directionalLight.position.set(25, 100, 10);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    scene.add(light, directionalLight);
}



//createBox
function customBox(scene, xPos, yPos, zPos) {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(xPos, yPos, zPos)
    scene.add(cube);
    return cube
}

//create plane
function customPlane(scene) {
    const geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, -28, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
}

//custom renderer 
function customRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.shadowMap.enabled = true; //basic= unfiltered. pcf(default)= filters percentage close algorithm. pcf soft. vsm.   
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer
}