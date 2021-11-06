class PE extends Microplastic {

    constructor(threeSystem) {
        super(threeSystem);
        // PE(polyethylene  PP(polypropylene) PS(polystyrene) PA(polyamide) PET(Polyester)  Acrylic  POM(polyoxymethylene) PVC(polyvinyl chloride) PU(polyurethane)
        this.microType = "Polyethylene";
        this.madeIn = 1979
        this.originalFormList = ["Grocery Bag", "Squeeze Bottle", "Laundry Detergent", "Cutting Board", "Garbage Bin", "Sandwich Bag", "Ready-Meal Tray", "Cooking Oil Bottles", "First Aid Blankets", "Polar Fleece"]
        this.density = 0.94
        this.tensileStrength = 4554
    }

    initialize(){
        super.initialize(undefined,this.density,this.tensileStrength)
    }

    initializePassDataList(){
        super.initializePassDataList([this.originalFormList[Math.round(random(0,this.originalFormList.length-1))],Math.round(random(this.madeIn,2021)),this.microType,["empty"],"empty"])
    }
        
    
    
}