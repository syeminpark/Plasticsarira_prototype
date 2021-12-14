function createConvexMaterial() {
    return new THREE.MeshPhysicalMaterial({
        transmission: 0.93,
        thickness: 1,
        roughness: 0.,
        clearcoat: 1,
        metalness: 0.06,
        clearcoatRoughness: 0.4,


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
        size: 0.3
    });
}