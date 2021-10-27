class Shader {
    constructor() {
        this.uniforms = {
            pointTexture: {
                value: new THREE.TextureLoader().load("textures/circle.png")
            }
        }

        print("done")
        this.shaderMaterial = new THREE.ShaderMaterial({

            uniforms: this.uniforms,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent,

            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });

    }
}