

function ellipse(positionList, diameter, color) {
    let radius=diameter/2
    let segment=radius*4
    const geometry = new THREE.SphereGeometry(radius,segment,segment);
    const material = new THREE.MeshPhongMaterial({
        color: color
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(positionList[0],positionList[1],positionList[2])
    return sphere
}


function point(positionList,size,color){

    var dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( new THREE.Vector3(positionList[0],positionList[1],positionList[2]).toArray(), 3 ) );
    var dotMaterial = new THREE.PointsMaterial( { size: size, color:color} );
    var dot = new THREE.Points( dotGeometry, dotMaterial );
  return dot;
}

//예시 큐브 
function createCube() {
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshPhongMaterial({
      color: '#8AC'
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0)
  return cube
}

//-----rgb to hex converter 
function color(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
