class Particle {
  constructor(index, worldSize) {
    this.index = index;

    this.worldSize = worldSize;

    this.initPos();
    this.initWrap();
    this.mass = MyMath.random(0, 1);

    this.velLimit = 0.1;
    this.wrapCenter = new THREE.Vector3(0, 0, 0);

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);

    this.color = new THREE.Color('white');
    this.opacity = 1.0;

    this.isEaten = false;
    this.isActive = false;
  }

  initPos(){
    this.position = new THREE.Vector3(
      MyMath.random(-this.worldSize, this.worldSize),
      MyMath.random(-this.worldSize, this.worldSize),
      MyMath.random(-this.worldSize, this.worldSize));

    if (this.position.length() > this.worldSize) this.position.setLength(this.worldSize);
  }

  setPos(newPos){
    this.position = newPos;
  }

  setColor(newColor){
    this.color = newColor;
  }

  applyForce(force) {
    this.acceleration.add(force);
    this.acceleration.multiplyScalar(this.mass);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (this.velocity.length() > this.velLimit) this.velocity.multiplyScalar(0.1);
    this.acceleration.setLength(0);
  }

  initWrap(){
    this.wrapCenter = new THREE.Vector3(0, 0, 0);
    this.wrapSize = this.worldSize;
    this.velLimit = 0.1;
  }

  wrap() {
    const distance = this.wrapCenter.distanceTo(this.position);
    if (distance > this.wrapSize) {
      this.velocity.multiplyScalar(-0.9999);
    }
  }
}

class Food extends Particle {
  constructor(index, worldSize) {
    super(index, worldSize);
    this.type = 0; //food

    this.nutrients = MyMath.random(0.01, 0.1);
    this.isEaten = false;
  }

  Eaten(){
    //먹히면 사라지고 World 어딘가에 리스폰
    if (this.isEaten == true){
      super.initPos();
    }
  }
}

class MicroPlastic extends Particle {
  constructor(index, worldSize, plasticPos) {
    super(index, worldSize);

    if (plasticPos != null){
      this.position = new THREE.Vector3(
        plasticPos.x,
        plasticPos.y,
        plasticPos.z);
    }

    this.type = 1; //plastic
    this.data = new MicroplasticDatabase();

    this.data.initialize();
    this.set_plasticType();
    this.set_passByArray();

    this.isSarira = false;
    this.toxicity = false;

    this.area = 0;
  }

  set_passByArray() {
    if (MyMath.random(0, 1) < 0.3) {
      this.data.setPassBy('Plankton');
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Plankton');
      }
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Herbivores');
      }
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Carnivores');
      }
    }
    if (MyMath.random(0, 1) < 0.3) {
      this.data.setPassBy('Herbivores');
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Plankton');
      }
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Herbivores');
      }
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Carnivores');
      }
    }
    if (MyMath.random(0, 1) < 0.3) {
      this.data.setPassBy('Carnivores');
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Plankton');
      }
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Herbivores');
      }
      if (MyMath.random(0, 1) < 0.15) {
        this.data.setPassBy('Carnivores');
      }
    }
  }

  set_plasticType() {

    if (this.position.x > 0 && this.position.y > 0) this.area = 1;
    if (this.position.x > 0 && this.position.y <= 0) this.area = 2;
    if (this.position.x <= 0 && this.position.y > 0) this.area = 3;
    if (this.position.x <= 0 && this.position.y <= 0) this.area = 4;

    const randomNum_plastic = MyMath.random(0, 100);
    let microType = "";

    switch (this.area) {
      case 1:
        if (randomNum_plastic > 40) microType = "Polyethylene";
        else if (randomNum_plastic <= 40 && randomNum_plastic > 20) microType = "Polypropylene";
        else if (randomNum_plastic <= 20 && randomNum_plastic > 10) microType = "Polystyrene";
        else if (randomNum_plastic <= 10 && randomNum_plastic > 7) microType = "Polyamide";
        else if (randomNum_plastic <= 7 && randomNum_plastic > 4) microType = "Polyester";
        else if (randomNum_plastic <= 4 && randomNum_plastic > 1) microType = "Acrylic";
        else if (randomNum_plastic <= 1 && randomNum_plastic > 0.6) microType = "Polyacetal";
        else if (randomNum_plastic <= 0.6 && randomNum_plastic > 0.3) microType = "PolyvinylChloride";
        else microType = "Polyurethane";

        break;

      case 2:
        if (randomNum_plastic > 70) microType = "Polyacetal";
        else if (randomNum_plastic <= 70 && randomNum_plastic > 43) microType = "Polyester";
        else if (randomNum_plastic <= 43 && randomNum_plastic > 26) microType = "PolyvinylChloride";
        else if (randomNum_plastic <= 26 && randomNum_plastic > 19) microType = "Acrylic";
        else if (randomNum_plastic <= 19 && randomNum_plastic > 15) microType = "Polypropylene";
        else if (randomNum_plastic <= 15 && randomNum_plastic > 11) microType = "Polyamide";
        else if (randomNum_plastic <= 11 && randomNum_plastic > 7) microType = "Polyethylene";
        else if (randomNum_plastic <= 7 && randomNum_plastic > 5) microType = "Polystyrene";
        else microType = "Polyurethane";

        break;

      case 3:
        if (randomNum_plastic > 70) microType = "Polyethylene";
        else if (randomNum_plastic <= 70 && randomNum_plastic > 43) microType = "Polypropylene";
        else if (randomNum_plastic <= 43 && randomNum_plastic > 26) microType = "Polystyrene";
        else if (randomNum_plastic <= 26 && randomNum_plastic > 19) microType = "Polyamide";
        else if (randomNum_plastic <= 19 && randomNum_plastic > 15) microType = "Polyester";
        else if (randomNum_plastic <= 15 && randomNum_plastic > 11) microType = "Acrylic";
        else if (randomNum_plastic <= 11 && randomNum_plastic > 7) microType = "Polyacetal";
        else if (randomNum_plastic <= 7 && randomNum_plastic > 5) microType = "PolyvinylChloride";
        else microType = "Polyurethane";

        break;

      case 4:
        if (randomNum_plastic > 70) microType = "Polyacetal";
        else if (randomNum_plastic <= 70 && randomNum_plastic > 43) microType = "Polyester";
        else if (randomNum_plastic <= 43 && randomNum_plastic > 26) microType = "Polyethylene";
        else if (randomNum_plastic <= 26 && randomNum_plastic > 19) microType = "Polypropylene";
        else if (randomNum_plastic <= 19 && randomNum_plastic > 15) microType = "Polyamide";
        else if (randomNum_plastic <= 15 && randomNum_plastic > 11) microType = "Acrylic";
        else if (randomNum_plastic <= 11 && randomNum_plastic > 7) microType = "Polystyrene";
        else if (randomNum_plastic <= 7 && randomNum_plastic > 5) microType = "PolyvinylChloride";
        else microType = "Polyurethane";
        break;
    }

    const randomNum_product = MyMath.random(0, 15);
    let originalForm = "";

    switch (microType) {
      case "Polyethylene":
        if (randomNum_product > 14) originalForm = "squeeze bottles";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "laundry detergent";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "cutting board";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "garbage bins";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "sandwich bag";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "ready-meal tray";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "cooking oil bottle";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "first aid blanket";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "polar fleece";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "jerry can";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "drum";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "ice box";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "Fishing rope";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "bulleproof vest";
        else originalForm = "fuel tank";

        break;

      case "Polypropylene":
        if (randomNum_product > 14) originalForm = "syringes";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "chip bag";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "specimen bottle";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "car battery case";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "instrument panel";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "rugs";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "crisp bags";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "lunch box";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "packing tape";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "tobacco Package";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "beach slipper";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "tote bag";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "vacuum cleaner";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "car bumper";
        else originalForm = "door trim";

        break;

      case "Polystyrene":
        if (randomNum_product > 14) originalForm = "refrigerator";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "air conditioner";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "oven";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "microwaves";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "knob";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "tv";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "computer";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "CD case";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "egg carton";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "model car";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "ruler";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "hair comb";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "videocassettes";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "gardening pot";
        else originalForm = "protective seat";

        break;

      case "Polyamide":
        if (randomNum_product > 14) originalForm = "toothbrush";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "wheel";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "glove";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "guitar  pic";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "tennis racket string";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "tent";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "banner";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "motor insulator";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "wheel cover";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "cable protection";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "conveyor belt";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "circuit breaker";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "fuse";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "ski binding";
        else originalForm = "violin string";

        break;

      case "Polyester":
        if (randomNum_product > 14) originalForm = "seat belt";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "fishing net";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "underwear";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "towel";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "blanket";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "mouse pad";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "LCD";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "diaper";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "laundry bag";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "table cloth";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "balloon";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "x-ray film";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "canoe";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "curtain";
        else originalForm = "air filter";

        break;

      case "Acrylic":
        if (randomNum_product > 14) originalForm = "lens";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "picture frame";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "shelf";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "bulletproof panel";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "fiber optics";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "aquarium";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "pole sign";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "bike helmet";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "retail display";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "submarine periscope";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "airplane window";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "canopy";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "display case";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "car paint";
        else originalForm = "skylight";

        break;

      case "Polyacetal":
        if (randomNum_product > 14) originalForm = "eyeglass frame";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "ball bearing";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "knife handle";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "lock system";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "shower head";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "spring";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "faucet";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "fuel pump";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "control cable";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "kettle";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "drawer runner";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "bushings";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "filter housing";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "insulin pen";
        else originalForm = "snap fastening";

        break;

      case "PolyvinylChloride":
        if (randomNum_product > 14) originalForm = "credit card";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "rain coat";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "boot";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "shower curtain";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "shrink wrap";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "heat duct";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "vinyl records";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "synthetic leather";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "drainage pipe";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "window frame";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "artificial skin";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "blood bags";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "phonograph record";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "traffic cone";
        else originalForm = "garden hose";

        break;

      case "Polyurethane":
        if (randomNum_product > 14) originalForm = "couch";
        else if (randomNum_product <= 14 && randomNum_product > 13) originalForm = "sport shoe";
        else if (randomNum_product <= 13 && randomNum_product > 12) originalForm = "rollerblade";
        else if (randomNum_product <= 12 && randomNum_product > 11) originalForm = "tire";
        else if (randomNum_product <= 11 && randomNum_product > 10) originalForm = "electric instrument";
        else if (randomNum_product <= 10 && randomNum_product > 9) originalForm = "cushion floor";
        else if (randomNum_product <= 9 && randomNum_product > 8) originalForm = "engine tubing";
        else if (randomNum_product <= 8 && randomNum_product > 7) originalForm = "composite wood";
        else if (randomNum_product <= 7 && randomNum_product > 6) originalForm = "sponge";
        else if (randomNum_product <= 6 && randomNum_product > 5) originalForm = "mattress padding";
        else if (randomNum_product <= 5 && randomNum_product > 4) originalForm = "wall insulation";
        else if (randomNum_product <= 4 && randomNum_product > 3) originalForm = "boat deck";
        else if (randomNum_product <= 3 && randomNum_product > 2) originalForm = "water tank";
        else if (randomNum_product <= 2 && randomNum_product > 1) originalForm = "watch-band wrapping";
        else originalForm = "swimsuit";

        break;
    }

    this.data.microType = microType;
    this.data.originalForm = originalForm;
  }
}
