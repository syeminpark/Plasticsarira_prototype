

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


//-----rgb to hex converter 
function color(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
