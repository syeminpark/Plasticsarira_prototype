function createConvexMaterial() {
    return new THREE.MeshPhysicalMaterial({
        transmission: 0.9,
        thickness: 1,
        roughness: 0.3,
        clearcoat: 1,
        metalness: 0,
        clearcoatRoughness: 0,
    })
}

function createGlassMaterial() {
    return new THREE.MeshPhysicalMaterial({
        transmission: 0.99,
        thickness: 1,
        roughness: 0,
        clearcoat: 1,
        metalness: 0.4,
        clearcoatRoughness: 1,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,

    })
}

function createPointMaterial() {
    return new THREE.PointsMaterial({
        color: 'white',
        size: 0.3,
        side: THREE.DoubleSide,

    });
}


function createStandardMaterial() {
    return new THREE.MeshStandardMaterial({
        color: 'white',
        transparent: true,
        depthWrite:true,
        depthTest:true,
        opacity: 0.5,
        metalness: 0.3,
        roughness: 0.1,
        side: THREE.DoubleSide,
    });
}

function createParticleMaterial(){
    return new THREE.PointsMaterial({
        color: 'white',
        size: 0.4,
        side: THREE.DoubleSide,
        opacity: 1.,
        transparent: true,
        vertexColors: true,
    });
}

function createLifeMaterial(){
    return new THREE.ShaderMaterial({
        uniforms:
        {
            "c": { type: "f", value: 1.0 },
            "p": { type: "f", value: 1.4 },
            glowColor: { type: "c", value: new THREE.Color(0xffffff) },
            viewVector: { type: "v3", value: threeSystemController.worldThreeSystem.camera.position }
        },
        vertexShader: lifeShader.vertexShader, 
        fragmentShader: lifeShader.fragmentShader, 
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending
    });
}

function createLifeNoiseMaterial(count, gap){
    return new THREE.ShaderMaterial({
        uniforms: { 
            // float initialized to 0
            time: { type: "f", value: 0.0 },
            noiseCount:{type: "f", value: count},
            noiseGap:{type: "f", value: gap},

            "c": { type: "f", value: 1.0 },
            "p": { type: "f", value: 1.4 },
            glowColor: { type: "c", value: new THREE.Color(0xffffff) },
            viewVector: { type: "v3", value: threeSystemController.worldThreeSystem.camera.position }
        },
        vertexShader: lifeShader_noise.vertexShader, 
        fragmentShader: lifeShader_noise.fragmentShader,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending
    });
}