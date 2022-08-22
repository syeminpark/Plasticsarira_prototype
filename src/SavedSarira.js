class SavedSarira {
    constructor(threeSystem, vertices) {
        this.threeSystem = threeSystem
        this.name = threeSystem.getElementName()
        this.element = threeSystem.element;
        this.vertices = vertices
        this.scene = threeSystem.scene;

        this.gltfExporter = new THREE.GLTFExporter()
        this.objExporter = new THREE.OBJExporter();

        this.link = document.createElement('a');
        this.link.style.display = 'none';
        document.body.appendChild(this.link);
        this.selected = false;

        SavedSarira.allInstances.push(this)
        this.element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            for (let savedSarira of SavedSarira.allInstances) {
                savedSarira.selected = false;
            }
            this.selected = true;
            var menu = document.getElementById("contextMenu")
            menu.style.left = e.pageX + "px";
            menu.style.top = e.pageY + "px";
            menu.style.display = 'block';
            return false;
        });

        this.element.addEventListener('click', function (e) {

            if (document.getElementById(
                    "contextMenu").style.display == "block") {
                document.getElementById("contextMenu").style.display = 'none'
            }
        })

        //gltf menu
        document.getElementsByTagName("li")[0].addEventListener('click', (e) => {
            console.log(this.selected)
            if (this.selected == true) {
                this.exportGLTF()
            }
        })
        //obj menu
        document.getElementsByTagName("li")[1].addEventListener('click', (e) => {
            console.log(this.selected)
            if (this.selected == true) {
                this.exportOBJ()
            }
        })
    }

    static allInstances = []

    createCube(size, material) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    createSarira(pointMaterial, convexMaterial) {
        this.buffer = new Buffer(this.vertices)
        this.buffer.initialize(pointMaterial)
        this.buffer.render(this.threeSystem)
        this.buffer.bufferGeometry.setDrawRange(0, this.vertices.length)

        if (this.vertices.length > 9) {
            this.convex = new Convex(this.threeSystem, convexMaterial)
            this.convex.updateVertices(this.buffer.bufferGeometry, this.vertices.length)
            this.convex.initializeMesh()
        }
    }

    exportGLTF() {
        let meshGroup = new THREE.Object3D
        for (let mesh of this.convex.group.children) {
            let newMesh = _.cloneDeep(mesh)
            newMesh.material = this.GLTFExportMaterial
            meshGroup.add(newMesh)
        }

        this.gltfExporter.parse(
            [this.buffer.point, meshGroup],
            (result) => {
                console.log(result instanceof ArrayBuffer)
                const output = JSON.stringify(result, null, 2);
                console.log(output);
                this.saveString(output, `${this.name.trim()}.gltf`);
            },
            // called when there is an error in the generation
            function (error) {
                console.error("error")
                console.log(error);
            }
        )
    }

    exportOBJ() {
        let meshGroup = new THREE.Object3D
        meshGroup.add(this.buffer.point)
        meshGroup.add(this.convex.group)

        const output= this.objExporter.parse(meshGroup)
        this.saveString(output, `${this.name.trim()}.obj` )
    
    }

    saveString(text, filename) {
        this.save(new Blob([text], {
            type: 'text/plain'
        }), filename);
    }

    save(blob, filename) {
        this.link.href = URL.createObjectURL(blob);
        this.link.download = filename;
        this.link.click();
        // URL.revokeObjectURL( url ); breaks Firefox...
    }

    setGLTFExportMaterial(material) {
        this.GLTFExportMaterial = material
    }

    createRectFromBuffer(){
        let meshGroup = new THREE.Object3D
        console.log(this.buffer.positionList)

    }

}